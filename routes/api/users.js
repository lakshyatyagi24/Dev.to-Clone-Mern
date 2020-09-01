const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const config = require('config');
const { validationResult } = require('express-validator');
const normalize = require('normalize-url');
const nodemailer = require('nodemailer');
const { errorHandler } = require('../../helpers/dbErrorHandling');
const {
  validSign,
  forgotPasswordValidator,
  resetPasswordValidator
} = require('../../helpers/valid');

const User = require('../../models/User');

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post('/', validSign, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }

    //* generate token for active account
    const token = jwt.sign(
      {
        name,
        email,
        password
      },
      config.get('JWT_ACCOUNT_ACTIVATION'),
      {
        expiresIn: '1d'
      }
    );
    //* email sending
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.get('NODEMAILER_EMAIL'),
        pass: config.get('NODEMAILER_PASS')
      }
    });
    const content = `
              <h1>Please click this link to active your account</h1>
              <p>${config.get('CLIENT_URL')}/users/activate/${token}</p>
              <hr/>
              <p>This email contain sensetive information</p>
              <p>${config.get('CLIENT_URL')}</p>
          `;
    const mainOptions = {
      from: config.get('NODEMAILER_EMAIL'),
      to: email,
      subject: 'Account activation link',
      html: content
    };
    transporter
      .sendMail(mainOptions)
      .then(() => {
        return res.json({
          message: `An email has been sent to ${email}`
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json({
          errors: [{ msg: errorHandler(err) }]
        });
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    POST api/users/activate
// @desc     Active user
// @access   Public

router.post('/activate', async (req, res) => {
  const { token } = req.body;
  if (token) {
    jwt.verify(token, config.get('JWT_ACCOUNT_ACTIVATION'), (err, decoded) => {
      if (err) {
        return res.status(400).json({
          errors: [{ msg: 'Expired Token. Sign Up again' }]
        });
      } else {
        const { name, email, password } = jwt.decode(token);
        const avatar = normalize(
          gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
          }),
          { forceHttps: true }
        );
        const user = new User({
          name,
          email,
          avatar,
          password
        });
        user.save((err, user) => {
          if (err) {
            return res.status(400).json({
              errors: [{ msg: 'Already actived!' }]
            });
          } else {
            return res.json({
              message: 'Actived success, you can log in now'
            });
          }
        });
      }
    });
  } else {
    return res.status(400).json({
      errors: [{ msg: 'Error happening please try again' }]
    });
  }
});

// @route    POST api/users/forget
// @desc     Send request for reset pwd
// @access   Public

router.put('/password/forget', forgotPasswordValidator, async (req, res) => {
  const { email } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(422).json({
      errors: [{ msg: firstError }]
    });
  } else {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        errors: [{ msg: 'User with this email does not exist' }]
      });
    }
    const token = jwt.sign(
      {
        _id: user._id
      },
      config.get('JWT_RESET_PASSWORD'),
      { expiresIn: '15m' }
    );

    //* email sending
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.get('NODEMAILER_EMAIL'),
        pass: config.get('NODEMAILER_PASS')
      }
    });
    const content = `
                  <h1>Please Click to link to reset your password</h1>
                  <p>${config.get(
                    'CLIENT_URL'
                  )}/users/password/reset/${token}</p>
                  <hr/>
                  <p>This email contain sensetive information</p>
                  <p>${config.get('CLIENT_URL')}</p>
              `;
    const mainOptions = {
      from: config.get('NODEMAILER_EMAIL'),
      to: email,
      subject: 'Password reset link',
      html: content
    };
    user.updateOne(
      {
        resetPasswordLink: token
      },
      (err, success) => {
        if (err) {
          return res.status(400).json({
            errors: [{ msg: errorHandler(err) }]
          });
        } else {
          transporter
            .sendMail(mainOptions)
            .then(() => {
              return res.json({
                message: `An email has been sent to ${email}`
              });
            })
            .catch((err) => {
              return res.json({
                errors: [{ msg: err.message }]
              });
            });
        }
      }
    );
  }
});

// @route    POST api/users/reset
// @desc     Confirm reset pwd
// @access   Public
router.put('/password/reset', resetPasswordValidator, async (req, res) => {
  const { resetPasswordLink, newPassword } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(422).json({
      errors: [{ msg: firstError }]
    });
  } else {
    if (resetPasswordLink) {
      jwt.verify(resetPasswordLink, config.get('JWT_RESET_PASSWORD'), function (
        err,
        decoded
      ) {
        if (err) {
          return res.status(400).json({
            errors: [{ msg: 'Expired link. Try again' }]
          });
        }

        User.findOne(
          {
            resetPasswordLink
          },
          (err, user) => {
            if (err || !user) {
              return res.status(400).json({
                errors: [{ msg: 'Something went wrong. Try later' }]
              });
            }
            const updatedFields = {
              password: newPassword,
              resetPasswordLink: ''
            };

            user = _.extend(user, updatedFields);

            user.save((err, result) => {
              if (err) {
                return res.status(400).json({
                  errors: [{ msg: 'Error resetting user password' }]
                });
              }
              res.json({
                message: `Reset password done! You can login with your new password`
              });
            });
          }
        );
      });
    }
  }
});

module.exports = router;
