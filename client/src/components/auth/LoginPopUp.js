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
        <h1 className='text-primary'>Log in to continue</h1>
        <p className='lead'>
          <i className='fas fa-user' />
          <Link to='/login'> Sign Into</Link> your Account
        </p>
        <p className='my-1'>
          Don't have an account? <Link to='/register'>Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPopUp;
