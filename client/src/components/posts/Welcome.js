import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Welcome({ usersCount, _auth: { loading, isAuthenticated } }) {
  return (
    <div className='guest-welcome p-1'>
      <img
        className='dev-image-welcome'
        alt=''
        height='48'
        width='48'
        src='https://res.cloudinary.com/practicaldev/image/fetch/s--g3JdSGe6--/c_limit,f_auto,fl_progressive,q_80,w_190/https://practicaldev-herokuapp-com.freetls.fastly.net/assets/rainbowdev.svg'
      />
      <h3 className='text-dark'>
        <Link to='/' style={{ color: 'royalblue' }}>
          DEV{' '}
        </Link>
        is a community of {usersCount} amazing developers
      </h3>
      <p className='text-dark'>
        We're a place where coders share, stay up-to-date and grow their
        careers.
      </p>
      {loading ? null : !isAuthenticated ? (
        <Fragment>
          <Link
            to='/register'
            style={{
              textAlign: 'center',
              margin: '10px 0',
              width: '100%',
            }}
            className='btn btn-blue'
          >
            Create an account
          </Link>
          <Link
            to='/login'
            style={{
              color: 'royalblue',
              textAlign: 'center',
              margin: '0',
              width: '100%',
              backgroundColor: '#eee',
            }}
            className='btn btn-light'
          >
            Login
          </Link>
        </Fragment>
      ) : (
        <Link
          to='/write-post'
          style={{
            textAlign: 'center',
            margin: '10px 0',
            width: '100%',
          }}
          className='btn btn-blue'
        >
          Let's started
        </Link>
      )}
    </div>
  );
}
Welcome.propTypes = {
  usersCount: PropTypes.number.isRequired,
  _aut: PropTypes.object,
};
export default Welcome;
