import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function Dashboard({ children, checkPage, user }) {
  return (
    <div className='dashboard my-1'>
      <div className='dashboard__wrap'>
        <h1 className='dashboard__title text-dark'>Dashboard</h1>
        <div className='dashboard__content my-1'>
          <aside className='dashboard__side'>
            <div className='dashboard__side-wrap'>
              <div className='side-setting'>
                <Link
                  style={{
                    display: 'flex',
                    width: '100%',
                    backgroundColor:
                      checkPage !== '/dashboard' ? '#eef0f1' : '#fff',
                    padding: '5px',
                    justifyContent: 'space-between',
                  }}
                  to='/dashboard'
                  className='btn btn-light'
                >
                  <div>Posts</div>
                  <div className='count-dashboard'>{user.postCount}</div>
                </Link>
                <Link
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    backgroundColor:
                      checkPage !== '/dashboard/followers' ? '#eef0f1' : '#fff',
                    padding: '5px',
                  }}
                  to='/dashboard/followers'
                  className='btn btn-light'
                >
                  <div>Followers</div>
                  <div className='count-dashboard'>{user.followersCount}</div>
                </Link>
                <Link
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    backgroundColor:
                      checkPage !== '/dashboard/followings'
                        ? '#eef0f1'
                        : '#fff',
                    padding: '5px',
                  }}
                  to='/dashboard/followings'
                  className='btn btn-light'
                >
                  <div>Followings</div>
                  <div className='count-dashboard'>{user.followingCount}</div>
                </Link>
              </div>
            </div>
          </aside>
          <div className='dashboard__main'>
            <div className='dashboard__main-wrap'>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
Dashboard.propTypes = {
  user: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps)(Dashboard);
