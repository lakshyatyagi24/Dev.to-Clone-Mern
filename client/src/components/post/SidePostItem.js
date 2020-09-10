import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { follow } from '../../actions/auth';
import { connect } from 'react-redux';
import ActionFollow from './ActionFollow';
const SidePostItem = ({ user, data, profile, follow, auth, setAuth }) => {
  const handleFollow = () => {
    if (auth.isAuthenticated && localStorage.token) {
      follow(user._id);
      return setAuth(false);
    } else {
      return setAuth(true);
    }
  };
  return (
    <div className='side-post-item'>
      <div className='side-post-item__wrap'>
        <div className='top-bar'></div>
        <div className='bg-white box'>
          <div className='user-info'>
            <Link
              style={{
                display: 'flex',
                position: 'absolute',
                top: '-30px',
              }}
              to={`/profile/user/${user._id}`}
            >
              <img className='round-img' src={user.avatar} alt='' />
              <h5 style={{ marginLeft: '5px', alignSelf: 'flex-end' }}>
                {user.name}
              </h5>
            </Link>
          </div>
          {profile.bio && <div className='py-1-5'>{profile.bio}</div>}
          {auth.isAuthenticated && auth.user._id === user._id && (
            <Link
              style={{
                height: '40px',
                width: '100%',
                margin: '20px 0 0 0',
                textAlign: 'center',
              }}
              className='btn btn-dark'
              to='/settings'
            >
              Edit
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
                : data.following.some((item) => item._id === user._id) ||
                  user.followers.includes(auth.user._id)
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
