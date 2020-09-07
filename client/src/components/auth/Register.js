import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import BeatLoader from 'react-spinners/BeatLoader';

const Register = ({ register }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const [isCompleted, setComplete] = useState(false);
  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (name && email && password) {
      if (password !== password2) {
        return toast.error('Passwords do not match');
      } else {
        setComplete(true);
        const res = await register({ name, email, password });
        if (res) {
          return setComplete(false);
        } else {
          return setComplete(false);
        }
      }
    } else {
      return toast.error('Please fill all fields');
    }
  };

  if (localStorage.token) {
    return <Redirect to='/' />;
  }

  return (
    <div className='login-wrap sign-up'>
      <div className='login'>
        <h1 className='text-dark'>Welcome to Dev!</h1>
        <h1 className='text-dark'>Sign up</h1>
        <form className='form' onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Name'
              name='name'
              value={name}
              onChange={onChange}
              style={{
                borderRadius: '5px',
                height: '50px',
                backgroundColor: '#f9fafa',
              }}
            />
          </div>
          <div className='form-group'>
            <input
              type='email'
              placeholder='Email Address'
              name='email'
              value={email}
              onChange={onChange}
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
              placeholder='Confirm Password'
              name='password2'
              value={password2}
              onChange={onChange}
              style={{
                borderRadius: '5px',
                height: '50px',
                backgroundColor: '#f9fafa',
              }}
            />
          </div>
          {<BeatLoader size={15} color={'#3b49df'} loading={isCompleted} />}
          {!isCompleted && (
            <input
              type='submit'
              className='btn btn-dark'
              style={{
                background: '#3b49df',
                width: '100%',
                textAlign: 'center',
                height: '50px',
              }}
              value='Register'
            />
          )}
        </form>
        <p className='my-1'>
          Already have an account?{' '}
          <Link to='/login' style={{ color: 'royalblue' }}>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
};

export default connect(null, { register })(Register);
