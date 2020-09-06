import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Setting = ({ auth: { user }, children, checkPage }) => {
  const style = {
    display: 'block',
    width: '100%',
    backgroundColor: '#f6f6f6',
    padding: '15px',
  };
  return (
    <Fragment>
      <h1 style={{ padding: '0 6rem' }} className='text-dark my-1'>
        Setting for <span style={{ color: 'royalblue' }}>@{user.name}</span>
      </h1>
      <div style={{ padding: '0 6rem' }} className='settings my-1'>
        <div className='side-setting'>
          <Link
            style={{
              display: 'block',
              width: '100%',
              backgroundColor:
                checkPage === '/settings/user/account' ? '#eef0f1' : '#fff',
              padding: '8px',
            }}
            to='/settings/user/profile'
            className='btn btn-light'
          >
            Profile
          </Link>
          <Link
            style={{
              display: 'block',
              width: '100%',
              backgroundColor:
                checkPage === '/settings/user/profile' ? '#eef0f1' : '#fff',
              padding: '8px',
            }}
            to='/settings/user/account'
            className='btn btn-light'
          >
            Account
          </Link>
        </div>
        {children}
      </div>
    </Fragment>
  );
};
Setting.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Setting);
