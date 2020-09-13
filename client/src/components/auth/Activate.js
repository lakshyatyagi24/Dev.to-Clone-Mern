import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { activate } from '../../actions/auth';
import HashLoader from 'react-spinners/HashLoader';

const Activate = ({ activate, match }) => {
  const [formData, setFormData] = useState({
    name: '',
    token: '',
    isActived: false,
    isProcessing: false,
  });

  useEffect(() => {
    let token = match.params.token;
    let { name } = jwt.decode(token);

    if (token) {
      setFormData({ ...formData, name, token });
    }
  }, []);
  const { name, token, isActived, isProcessing } = formData;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      isProcessing: true,
    });
    const res = await activate({ token });
    if (res) {
      return setFormData({
        ...formData,
        isActived: true,
        isProcessing: false,
      });
    } else {
      return setFormData({
        ...formData,
        isProcessing: false,
      });
    }
  };

  if (localStorage.token) {
    return <Redirect to='/' />;
  }

  return (
    <div className='container'>
      <div className='login-wrap active-acc'>
        <div className='login'>
          <p className='lead'>Welcome {name}</p>
          <form className='form' onSubmit={handleSubmit}>
            {
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <HashLoader
                  size={36}
                  color={'#3b49df'}
                  loading={isProcessing}
                />
              </div>
            }
            {!isProcessing && (
              <input
                className='btn btn-dark'
                style={{
                  background: '#3b49df',
                  width: '100%',
                  textAlign: 'center',
                  height: '50px',
                  fontSize: '1.4rem',
                }}
                type='submit'
                value='Active'
              />
            )}
          </form>
          {isActived && (
            <p className='my-1'>
              Your account is <b>actived!</b> Let{' '}
              <Link style={{ color: 'royalblue' }} to='/login'>
                Sign In
              </Link>{' '}
              now
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

Activate.propTypes = {
  activate: PropTypes.func.isRequired,
};

export default connect(null, { activate })(Activate);
