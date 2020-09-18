import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { forget } from '../../actions/auth';
import { toast } from 'react-toastify';

import PuffLoader from 'react-spinners/PuffLoader';
import { Redirect } from 'react-router-dom';

const Forget = ({ forget, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    isCompleted: false,
  });

  const { email, isCompleted } = formData;

  const onChange = (e) => setFormData({ ...formData, email: e.target.value });

  const onSubmit = async (e) => {
    if (isAuthenticated) {
      return;
    }
    e.preventDefault();
    if (email) {
      setFormData({
        ...formData,
        isCompleted: true,
      });
      const res = await forget({ email });
      if (res) {
        return setFormData({
          ...formData,
          isCompleted: false,
        });
      } else {
        return setFormData({
          ...formData,
          isCompleted: false,
        });
      }
    } else {
      return toast.error('Please provide your email');
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <div className='container'>
      <div className='login-wrap forget-pwd'>
        <div className='login'>
          <h1 className='text-dark'>Forget Password</h1>
          <form className='form' onSubmit={onSubmit}>
            <div className='form-group'>
              <input
                type='email'
                placeholder='Email Address'
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
            {
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <PuffLoader size={36} color={'#3b49df'} loading={isCompleted} />
              </div>
            }
            {!isCompleted && (
              <input
                type='submit'
                className='btn btn-dark'
                style={{
                  backgroundColor: 'royalblue',
                  width: '100%',
                  textAlign: 'center',
                  height: '50px',
                }}
                value='Confirm'
              />
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

Forget.propTypes = {
  forget: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { forget })(Forget);
