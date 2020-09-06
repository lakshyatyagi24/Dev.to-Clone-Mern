import React from 'react';
import { connect } from 'react-redux';
import Setting from './Setting';
import PropTypes from 'prop-types';
import { deleteAccount } from '../../actions/profile';

const Account = ({ auth: { user }, deleteAccount, location }) => {
  return (
    <Setting checkPage={location.pathname}>
      <div className='main-setting'>
        <div className='main-setting__dashboard  bg-white'>
          <form className='form'>
            <label htmlFor='email'>Email</label>
            <div className='form-group form-fix'>
              <input
                type='email'
                name='email'
                style={{
                  borderRadius: '5px',
                  height: '50px',
                  backgroundColor: '#f9fafa',
                }}
              />
            </div>
            <label htmlFor='name'>Name</label>
            <div className='form-group form-fix'>
              <input
                type='text'
                name='name'
                style={{
                  borderRadius: '5px',
                  height: '50px',
                  backgroundColor: '#f9fafa',
                }}
              />
            </div>
            <label htmlFor='Avatar'>Avatar</label>
            <div
              style={{ display: 'flex', alignItems: 'center' }}
              className='form-group form-fix'
            >
              <img alt='' src={user.avatar} className='round-img' />
              <input
                className='btn btn-light'
                type='file'
                name='avatar'
                style={{
                  borderRadius: '5px',
                  height: '40px',
                  backgroundColor: '#f9fafa',
                  marginLeft: '20px',
                }}
              />
            </div>
            <label htmlFor='email'>Password</label>
            <div className='form-group form-fix'>
              <input
                type='password'
                name='password1'
                style={{
                  borderRadius: '5px',
                  height: '50px',
                  backgroundColor: '#f9fafa',
                }}
              />
            </div>
            <label htmlFor='email'>Re-password</label>
            <div className='form-group form-fix'>
              <input
                type='password'
                name='password2'
                style={{
                  borderRadius: '5px',
                  height: '50px',
                  backgroundColor: '#f9fafa',
                }}
              />
            </div>
            <input type='submit' value='Save' className='btn btn-dark my-1' />
          </form>
        </div>
        <div
          style={{ marginTop: '20px' }}
          className='main-setting__dashboard  bg-white'
        >
          <h1 className='text-danger'>Danger Zone</h1>
          <p style={{ margin: '8px 0' }} className='text-dark'>
            <b>Delete account</b>
          </p>
          <p>Deleting your account will:</p>
          <ul>
            <li>
              delete your profile, along with your authentication associations.
              This does not include applications permissions.
            </li>
            <li>
              delete any and all content you have, such as articles, comments,
              your reading list or chat messages.
            </li>
            <li>allow your username to become available to anyone.</li>
          </ul>
          <div className='my-1'>
            <button className='btn btn-danger' onClick={() => deleteAccount()}>
              <i className='fas fa-user-minus' /> Delete My Account
            </button>
          </div>
        </div>
      </div>
    </Setting>
  );
};

Account.propTypes = {
  auth: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteAccount })(Account);
