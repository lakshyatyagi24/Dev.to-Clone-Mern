import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ActionFeed from './ActionFeed';

const Navbar = ({ auth: { isAuthenticated, user, loading } }) => {
  return (
    <nav className='wrap-header grid'>
      <div className='top-header'>
        <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <div className='logo'>
            <Link to='/'>
              <i className='fas fa-code' /> DevCommunity
            </Link>
          </div>
          <div className='header-search_bar'>
            <input
              className='header-search_bar-input'
              type='text'
              placeholder='Search...'
            />
          </div>
        </div>
        <div>
          {loading ? null : !isAuthenticated ? (
            <div className='guest-link'>
              <Link
                style={{ color: '#3b49df' }}
                className='btn btn-light'
                to='/login'
              >
                Login
              </Link>
              <Link
                style={{ background: '#3b49df' }}
                className='btn btn-dark'
                to='/register'
              >
                Create account
              </Link>
            </div>
          ) : (
            <div className='auth-link'>
              <Link className='btn btn-dark btn-nav' to='/write-post'>
                Write Post
              </Link>
              <div className='nav-hover'>
                <Link
                  className='btn btn-light btn-nav comment-nav'
                  style={{
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  to='/write-post'
                >
                  <i
                    style={{ fontSize: '1.2rem' }}
                    className='far fa-comments'
                  ></i>
                </Link>
              </div>
              <div className='nav-hover'>
                <Link
                  className='btn btn-light btn-nav chat-nav'
                  style={{
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  to='/write-post'
                >
                  <i style={{ fontSize: '1.2rem' }} className='far fa-bell'></i>
                </Link>
              </div>
              <div
                className='avatar-feed'
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <ActionFeed />
                <div className='action-connect'></div>
                {user === null ? null : (
                  <img className='round-img' src={user.avatar} alt='' />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Navbar);
