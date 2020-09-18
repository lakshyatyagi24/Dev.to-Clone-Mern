import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ActionFeed from './ActionFeed';
import PuffLoader from 'react-spinners/PuffLoader';
import { Notify, Chat } from '../icons/icons';

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
          {loading ? (
            <div style={{ position: 'fixed', right: '50%', bottom: '50%' }}>
              <PuffLoader size={36} color={'#3b49df'} loading={true} />
            </div>
          ) : !isAuthenticated ? (
            <div className='guest-link'>
              <Link
                style={{ color: 'royalblue' }}
                className='btn btn-light'
                to='/login'
              >
                Login
              </Link>
              <Link
                style={{ backgroundColor: 'royalblue' }}
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
                  style={{
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0.5rem',
                    margin: '0.25rem',
                  }}
                  to='/write-post'
                >
                  <Chat />
                </Link>
              </div>
              <div className='nav-hover'>
                <Link
                  style={{
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0.5rem',
                    margin: '0.25rem',
                  }}
                  to='/write-post'
                >
                  <Notify />
                </Link>
              </div>
              {!user ? null : (
                <div
                  className='avatar-feed'
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <ActionFeed user={user} />
                  <div className='action-connect'></div>

                  <img
                    style={{
                      objectFit: 'cover',
                      padding: '0.1rem',
                      margin: '0.25rem',
                    }}
                    className='round-img'
                    src={user.avatar}
                    alt=''
                  />
                </div>
              )}
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
