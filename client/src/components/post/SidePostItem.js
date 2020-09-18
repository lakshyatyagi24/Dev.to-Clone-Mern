import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { follow } from '../../actions/auth';
import { connect } from 'react-redux';
import ActionFollow from './ActionFollow';
import store from '../../store';

const SidePostItem = ({ user, profile, follow, auth, setAuth, hexToRGB }) => {
  const handleFollow = () => {
    if (auth.isAuthenticated) {
      follow(user._id);
      return setAuth(false);
    } else {
      return setAuth(true);
    }
  };
  return (
    <div className='side-post-item'>
      <div className='side-post-item__wrap'>
        <div className='bg-white box'>
          <div
            style={{
              height: '30px',
              width: '100%',
              borderTopRightRadius: '5px',
              borderTopLeftRadius: '5px',
              backgroundColor: hexToRGB(profile.brand_color),
            }}
          ></div>
          <div style={{ padding: '15px' }}>
            <div className='user-info'>
              <Link
                onClick={() => store.dispatch({ type: 'CLEAR_DATA' })}
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
                <img
                  style={{ objectFit: 'cover' }}
                  className='round-img side-avatar'
                  src={user.avatar}
                  alt=''
                />
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
                !auth.user
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
    </div>
  );
};
export default connect(null, { follow })(SidePostItem);
