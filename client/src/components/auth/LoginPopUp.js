import React from 'react';
import { Link } from 'react-router-dom';

const LoginPopUp = ({ setAuth }) => {
  const handleClick = (e) => {
    if (e.target.classList.contains('backdrop')) {
      setAuth(false);
    }
  };
  return (
    <div className='backdrop' onClick={handleClick}>
      <div className='child'>
        <h1 style={{ padding: '20px 0' }} className='text-dark'>
          Log in to continue
        </h1>
        <p>
          We're a place where coders share, stay up-to-date and grow their
          careers.
        </p>

        <Link
          style={{
            background: '#3b49df',
            width: '100%',
            textAlign: 'center',
            margin: '20px 0 0 0',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          className='btn btn-dark'
          to='/login'
        >
          <i style={{ fontSize: '1.6rem' }} className='fas fa-sign-in-alt'></i>
        </Link>

        <p className='my-1'>
          Don't have an account?{' '}
          <Link to='/register' style={{ color: 'royalblue' }}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPopUp;
