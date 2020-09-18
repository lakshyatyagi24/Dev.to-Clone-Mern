import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import { toast } from 'react-toastify';
import store from '../../store';

const Login = ({ login, history, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    if (isAuthenticated) {
      return;
    }
    e.preventDefault();
    if (email && password) {
      const res = await login(email, password);
      if (res) {
        store.dispatch({ type: 'CLEAR_POSTS' });
        return history.push('/');
      }
    } else {
      return toast.error('Please fill all fields');
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <div className='container'>
      <div className='login-wrap'>
        <div className='login'>
          <h1 className='text-dark'>Welcome to Dev!</h1>
          <h1 className='text-dark'>Sign in</h1>
          <form className='form' onSubmit={onSubmit}>
            <div className='form-group'>
              <input
                type='email'
                placeholder='Email'
                name='email'
                value={email}
                onChange={onChange}
                required
                style={{
                  borderRadius: '5px',
                  height: '50px',
                  backgroundColor: '#f9fafa',
                }}
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                placeholder='Password'
                name='password'
                value={password}
                onChange={onChange}
                minLength='6'
                style={{
                  borderRadius: '5px',
                  height: '50px',
                  backgroundColor: '#f9fafa',
                }}
                required
              />
            </div>
            <input
              className='btn btn-dark'
              style={{
                backgroundColor: 'royalblue',
                width: '100%',
                textAlign: 'center',
                height: '50px',
              }}
              type='submit'
              value='Login'
            />
          </form>
          <p className='my-1'>
            Don't have an account?{' '}
            <Link style={{ color: 'royalblue' }} to='/register'>
              Sign Up
            </Link>
          </p>
          <p className='my-1'>
            <Link style={{ color: 'royalblue' }} to='/users/password/forget'>
              Forgot password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
