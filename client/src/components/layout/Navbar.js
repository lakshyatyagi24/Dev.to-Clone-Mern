import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ActionFeed from './ActionFeed';
import PuffLoader from 'react-spinners/PuffLoader';
import { Notify, Chat } from '../icons/icons';
import store from '../../store';
import { getPosts } from '../../actions/post';
import { getNotifications } from '../../actions/notify';
import api from '../../utils/api';
import { toast } from 'react-toastify';

const Navbar = ({
  auth: { isAuthenticated, user, loading },
  notifications_count,
}) => {
  // const [value, setValue] = useState('');
  // const handleSubmit = (e) => {
  //   if (!value) {
  //     return e.preventDefault();
  //   }
  // };
  return (
    <nav className='wrap-header grid'>
      <div className='top-header'>
        <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <div className='logo'>
            <Link
              onClick={() => {
                store.dispatch(getPosts());
                if (
                  localStorage.token &&
                  api.defaults.headers.common['x-auth-token']
                ) {
                  store.dispatch(getNotifications());
                }
              }}
              to='/'
            >
              <i className='fas fa-code' /> DevCommunity
            </Link>
          </div>
          <div className='header-search_bar'>
            <form
              // onSubmit={handleSubmit}
              action={`/dev/search`}
              method='GET'
              acceptCharset='UTF-8'
            >
              <input
                className='header-search_bar-input'
                type='text'
                name='q'
                placeholder='Search...'
                // onChange={(e) => setValue(e.target.value)}
                // value={value}
                autoComplete='off'
              />
            </form>
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
                  onClick={() =>
                    toast.dark(
                      'This feature has not been developed yet, because i"m lazy ^^ '
                    )
                  }
                  to='#!'
                >
                  <Chat />
                </Link>
              </div>
              <div style={{ position: 'relative' }} className='nav-hover'>
                <Link to='/notifications'>
                  <Notify />
                </Link>
                {notifications_count >= 99 ? (
                  <span className='notifications-status'>99</span>
                ) : notifications_count === 0 ? null : (
                  <span className='notifications-status'>
                    {notifications_count}
                  </span>
                )}
              </div>
              {!user ? null : (
                <div className='avatar-feed'>
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
  notifications_count: PropTypes.number,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  notifications_count: state.notify.notifications_count,
});

export default connect(mapStateToProps)(Navbar);
