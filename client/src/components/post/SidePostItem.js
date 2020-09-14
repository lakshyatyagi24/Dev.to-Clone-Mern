import React, { useState, useEffect } from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { follow } from '../../actions/auth';
import { connect } from 'react-redux';
import ActionFollow from './ActionFollow';
const SidePostItem = ({ user, profile, follow, auth, setAuth }) => {
  const handleFollow = () => {
    if (auth.isAuthenticated && localStorage.token) {
      follow(user._id);
      return setAuth(false);
    } else {
      return setAuth(true);
    }
  };

  console.log(typeof profile.brand_color);
  return (
    <div className='side-post-item'>
      <div className='side-post-item__wrap'>
        <div
          style={{
            backgroundColor: `#4169e1`,
          }}
          className='top-bar'
        >
          {/* {profile.brand_color} */}
        </div>

        <div className='bg-white box'>
          <div className='user-info'>
            <Link
              style={{
                display: 'flex',
                marginTop: '-30px',
              }}
              to={
                auth.user && auth.user._id === user._id
                  ? `/profile/me`
                  : `/profile/user/${user._id}`
              }
            >
              <img className='round-img side-avatar' src={user.avatar} alt='' />
              <h4 style={{ marginLeft: '5px', alignSelf: 'flex-end' }}>
                {user.name}
              </h4>
            </Link>
          </div>
          {profile.bio && <div className='my'>{profile.bio}</div>}
          {auth.isAuthenticated && auth.user._id === user._id && (
            <Link
              style={{
                width: '100%',
                textAlign: 'center',
              }}
              className='btn btn-dark my'
              to='/settings'
            >
              Edit Profile
            </Link>
          )}
          <ActionFollow
            setAuth={setAuth}
            user={user}
            handleFollow={handleFollow}
            auth={auth}
            isFollowing={
              auth.user === null
                ? null
                : auth.user.following.some((item) => item._id === user._id)
            }
          />

          {profile.title && (
            <div className='py'>
              <div className='info-post-item'>Work</div>
              {profile.title}
            </div>
          )}
          {profile.locations && (
            <div className='py'>
              <div className='info-post-item'>Location</div>
              {profile.locations}
            </div>
          )}

          <div className='py'>
            <div className='info-post-item'>Joined</div>
            <Moment format='DD/MM/YYYY'>{profile.date}</Moment>
          </div>
        </div>
      </div>
    </div>
  );
};
export default connect(null, { follow })(SidePostItem);
