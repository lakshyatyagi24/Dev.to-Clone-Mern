import React, { Fragment, useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reset } from '../../actions/auth';
import { toast } from 'react-toastify';

const Reset = ({ reset, isAuthenticated, match }) => {
  const [formData, setFormData] = useState({
    password1: '',
    password2: '',
    token: '',
    isCompleted: false,
  });

  const { password1, password2, token, isCompleted } = formData;
  useEffect(() => {
    let token = match.params.token;
    if (token) {
      setFormData({ ...formData, token });
    }
  }, [match.params.token]);
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password1 && password2) {
      if (password1 === password2) {
        const res = await reset({
          newPassword: password1,
          resetPasswordLink: token,
        });
        if (res) {
          return setFormData({
            ...formData,
            isCompleted: true,
          });
        } else {
          // return setFormData({
          //   ...formData,
          //   isCompleted: false
          // });
        }
      } else {
        return toast.error("Passwords don't matches");
      }
    } else {
      return toast.error('Type your new password to confirm!');
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Reset Password</h1>
      <form className='form' onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password1'
            value={password1}
            onChange={onChange}
            minLength='6'
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            value={password2}
            onChange={onChange}
            minLength='6'
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Confirm' />
      </form>
      {isCompleted && (
        <p className='my-1'>
          Reset password complete!, <Link to='/login'>Sign In</Link>
        </p>
      )}
    </Fragment>
  );
};

Reset.propTypes = {
  reset: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { reset })(Reset);
