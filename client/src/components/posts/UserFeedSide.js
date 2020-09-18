import React, { Fragment } from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ReadingLists, DashBoard, Settings, Sign, Tags } from '../icons/icons';

function UserFeedSide({ _auth }) {
  return (
    <div className='user-feed-side'>
      {_auth.isAuthenticated ? (
        <Fragment>
          {!_auth.user ? null : (
            <div className='side-item'>
              <Link to='/profile/me' className='user-feed__info'>
                <img
                  alt=''
                  style={{ objectFit: 'cover', marginRight: '5px' }}
                  className='round-img-feed'
                  src={_auth.user.avatar}
                />
                <div>
                  <span className='text-dark' style={{ fontWeight: '600' }}>
                    {`${_auth.user.name}`}{' '}
                  </span>
                  <p className='post-date'>
                    <span>Joined </span>
                    <Moment format='DD/MM/YYYY'>{_auth.user.createdAt}</Moment>
                  </p>
                </div>
              </Link>
            </div>
          )}
          <div className='side-item'>
            <Link className='user-feed__info' to='/dashboard'>
              <DashBoard />
              <span style={{ marginLeft: '8px' }}>Dashboard</span>
            </Link>
          </div>
          <div className='side-item'>
            <Link className='user-feed__info' to='/dashboard/reading-list'>
              <ReadingLists />
              <span style={{ marginLeft: '8px' }}>Reading list</span>
            </Link>
          </div>
          <div className='side-item'>
            <Link
              className='user-feed__info'
              style={{ marginBottom: '0 ' }}
              to='/settings'
            >
              <Settings />
              <span style={{ marginLeft: '8px' }}>Settings</span>
            </Link>
          </div>
          <div className='side-item'>
            <Link
              className='user-feed__info'
              style={{ marginBottom: '0 ' }}
              to='/tags'
            >
              <Tags />
              <span style={{ marginLeft: '8px' }}>Tags</span>
            </Link>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div className='side-item'>
            <Link
              className='user-feed__info'
              style={{ marginBottom: '0 ' }}
              to='/login'
            >
              <Sign />
              <span style={{ marginLeft: '8px', fontWeight: '600' }}>
                Sign In/Up
              </span>
            </Link>
          </div>
          <div className='side-item'>
            <Link
              className='user-feed__info'
              style={{ marginBottom: '0 ' }}
              to='/tags'
            >
              <Tags />
              <span style={{ marginLeft: '8px' }}>Tags</span>
            </Link>
          </div>
        </Fragment>
      )}
    </div>
  );
}
UserFeedSide.propTypes = {
  _auth: PropTypes.object.isRequired,
};
export default UserFeedSide;
