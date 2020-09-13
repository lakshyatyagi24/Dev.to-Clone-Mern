import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getUserProfile } from '../../actions/profile';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { follow } from '../../actions/auth';
import LoginPopUp from '../auth/LoginPopUp';
import ActionFollow from './ActionFollow';
import { Link } from 'react-router-dom';

function UserProfile({ profile: { profile }, getUserProfile, match, auth }) {
  const [_auth, setAuth] = useState(false);
  useEffect(() => {
    getUserProfile(match.params.id);
  }, [getUserProfile, match.params.id]);
  const handleFollow = () => {
    if (auth.isAuthenticated && localStorage.token) {
      follow(profile.user._id);
      return setAuth(false);
    } else {
      return setAuth(true);
    }
  };
  return (
    profile && (
      <Fragment>
        <div className='me'>
          {_auth ? <LoginPopUp setAuth={setAuth} /> : null}
          <div className='me__banner'>
            <div className='me__wrap'>
              <div className='me__content bg-white'>
                <div className='action-follow'>
                  {auth.user && auth.user._id === profile.user._id ? (
                    <Link
                      to='/settings'
                      style={{ marginRight: 0 }}
                      className='btn btn-dark'
                    >
                      Edit Profile
                    </Link>
                  ) : (
                    <ActionFollow
                      setAuth={setAuth}
                      handleFollow={handleFollow}
                      auth={auth}
                      isFollowing={
                        auth.user === null
                          ? null
                          : auth.user.following.some(
                              (item) => item._id === profile.user._id
                            )
                      }
                    />
                  )}
                </div>
                <div className='me__top'>
                  <img
                    className='round-img me-avatar'
                    alt=''
                    src={profile.user.avatar}
                  />
                </div>
                <div className='me__info'>
                  <h1 className='text-dark me-name'>{profile.user.name}</h1>
                  {profile.bio && (
                    <p className='text-dark me-bio'>{profile.bio}</p>
                  )}

                  <div className='me-meta'>
                    {profile.locations && (
                      <p className='me-location'>
                        <i
                          className='fas fa-map-marker-alt'
                          style={{ fontSize: '1.25rem', marginRight: '8px' }}
                        />
                        {profile.locations}
                      </p>
                    )}

                    <p className='me-location'>
                      <i
                        className='fas fa-birthday-cake'
                        style={{ fontSize: '1.25rem', marginRight: '8px' }}
                      />
                      Joined <Moment format='DD/MM/YYYY'>{profile.date}</Moment>
                    </p>
                    {profile.social.github && (
                      <a
                        style={{ display: 'block' }}
                        href={profile.social.github}
                      >
                        <i
                          style={{ fontSize: '1.25rem', marginRight: '8px' }}
                          className='fab fa-github'
                        />
                      </a>
                    )}
                    {profile.social.twitter && (
                      <a
                        style={{ display: 'block' }}
                        href={profile.social.twitter}
                      >
                        <i
                          style={{ fontSize: '1.25rem', marginRight: '8px' }}
                          className='fab fa-twitter'
                        />
                      </a>
                    )}
                    {profile.social.facebook && (
                      <a
                        style={{ display: 'block' }}
                        href={profile.social.facebook}
                      >
                        <i
                          style={{ fontSize: '1.25rem', marginRight: '8px' }}
                          className='fab fa-facebook'
                        />
                      </a>
                    )}
                    {profile.social.youtube && (
                      <a
                        style={{ display: 'block' }}
                        href={profile.social.youtube}
                      >
                        <i
                          style={{ fontSize: '1.25rem', marginRight: '8px' }}
                          className='fab fa-youtube'
                        />
                      </a>
                    )}
                    {profile.social.linkedin && (
                      <a
                        style={{ display: 'block' }}
                        href={profile.social.linkedin}
                      >
                        <i
                          style={{ fontSize: '1.25rem', marginRight: '8px' }}
                          className='fab fa-linkedin'
                        />
                      </a>
                    )}
                    {profile.social.instagram && (
                      <a
                        style={{ display: 'block' }}
                        href={profile.social.instagram}
                      >
                        <i
                          style={{ fontSize: '1.25rem', marginRight: '8px' }}
                          className='fab fa-instagram'
                        />
                      </a>
                    )}
                  </div>
                </div>
                <div className='me-work'>
                  <div className='me-work__wrap'>
                    {profile.education && (
                      <div className='me-work__item'>
                        <span className='text-dark'>Education</span>
                        <p className='text-dark'>{profile.education}</p>
                      </div>
                    )}
                    {profile.title && (
                      <div className='me-work__item'>
                        <span className='text-dark'>Work</span>
                        <p className='text-dark'>{profile.title}</p>
                      </div>
                    )}
                    {profile.website && (
                      <div className='me-work__item'>
                        <span className='text-dark'>Website</span>
                        <a
                          style={{ display: 'block', fontSize: '1rem' }}
                          href={profile.website}
                        >
                          <i className='fas fa-link' />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  );
}
UserProfile.propTypes = {
  getUserProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});
export default connect(mapStateToProps, { getUserProfile })(UserProfile);
