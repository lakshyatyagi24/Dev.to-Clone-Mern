import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getUserProfile } from '../../actions/profile';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { follow } from '../../actions/auth';
import LoginPopUp from '../auth/LoginPopUp';
import ActionFollow from './ActionFollow';
import { Link } from 'react-router-dom';
import Posts from './Posts';
import HashLoader from 'react-spinners/HashLoader';

function UserProfile({
  profile: { profiles, loading },
  getUserProfile,
  match,
  follow,
  auth,
}) {
  const [_auth, setAuth] = useState(false);
  useEffect(() => {
    getUserProfile(match.params.id);
  }, [getUserProfile, match.params.id]);
  const handleFollow = () => {
    if (auth.isAuthenticated && localStorage.token) {
      follow(match.params.id);
      return setAuth(false);
    } else {
      return setAuth(true);
    }
  };
  return loading || profiles === null ? (
    <div style={{ position: 'fixed', right: '50%', bottom: '50%' }}>
      <HashLoader size={36} color={'#3b49df'} loading={true} />
    </div>
  ) : (
    <Fragment>
      <div className='me'>
        {_auth ? <LoginPopUp setAuth={setAuth} /> : null}
        <div className='me__banner'>
          <div className='me__wrap'>
            <div className='me__content bg-white'>
              <div className='action-follow'>
                {auth.user && auth.user._id === profiles.user._id ? (
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
                            (item) => item._id === profiles.user._id
                          )
                    }
                  />
                )}
              </div>
              <div className='me__top'>
                <img
                  className='round-img me-avatar'
                  alt=''
                  src={profiles.user.avatar}
                />
              </div>
              <div className='me__info'>
                <h1 className='text-dark me-name'>{profiles.user.name}</h1>
                {profiles.bio && (
                  <p className='text-dark me-bio'>{profiles.bio}</p>
                )}

                <div className='me-meta'>
                  {profiles.locations && (
                    <p className='me-location'>
                      <i
                        className='fas fa-map-marker-alt'
                        style={{ fontSize: '1.25rem', marginRight: '8px' }}
                      />
                      {profiles.locations}
                    </p>
                  )}

                  <p className='me-location'>
                    <i
                      className='fas fa-birthday-cake'
                      style={{ fontSize: '1.25rem', marginRight: '8px' }}
                    />
                    Joined <Moment format='DD/MM/YYYY'>{profiles.date}</Moment>
                  </p>
                  {profiles.social.github && (
                    <a
                      style={{ display: 'block' }}
                      href={profiles.social.github}
                    >
                      <i
                        style={{ fontSize: '1.25rem', marginRight: '8px' }}
                        className='fab fa-github'
                      />
                    </a>
                  )}
                  {profiles.social.twitter && (
                    <a
                      style={{ display: 'block' }}
                      href={profiles.social.twitter}
                    >
                      <i
                        style={{ fontSize: '1.25rem', marginRight: '8px' }}
                        className='fab fa-twitter'
                      />
                    </a>
                  )}
                  {profiles.social.facebook && (
                    <a
                      style={{ display: 'block' }}
                      href={profiles.social.facebook}
                    >
                      <i
                        style={{ fontSize: '1.25rem', marginRight: '8px' }}
                        className='fab fa-facebook'
                      />
                    </a>
                  )}
                  {profiles.social.youtube && (
                    <a
                      style={{ display: 'block' }}
                      href={profiles.social.youtube}
                    >
                      <i
                        style={{ fontSize: '1.25rem', marginRight: '8px' }}
                        className='fab fa-youtube'
                      />
                    </a>
                  )}
                  {profiles.social.linkedin && (
                    <a
                      style={{ display: 'block' }}
                      href={profiles.social.linkedin}
                    >
                      <i
                        style={{ fontSize: '1.25rem', marginRight: '8px' }}
                        className='fab fa-linkedin'
                      />
                    </a>
                  )}
                  {profiles.social.instagram && (
                    <a
                      style={{ display: 'block' }}
                      href={profiles.social.instagram}
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
                  {profiles.education && (
                    <div className='me-work__item'>
                      <span className='text-dark'>Education</span>
                      <p className='text-dark'>{profiles.education}</p>
                    </div>
                  )}
                  {profiles.title && (
                    <div className='me-work__item'>
                      <span className='text-dark'>Work</span>
                      <p className='text-dark'>{profiles.title}</p>
                    </div>
                  )}
                  {profiles.website && (
                    <div className='me-work__item'>
                      <span className='text-dark'>Website</span>
                      <a
                        style={{ display: 'block', fontSize: '1rem' }}
                        href={profiles.website}
                      >
                        <i className='fas fa-link' />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <Posts user_id={profiles.user._id} />
        </div>
      </div>
    </Fragment>
  );
}
UserProfile.propTypes = {
  getUserProfile: PropTypes.func.isRequired,
  follow: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});
export default connect(mapStateToProps, { getUserProfile, follow })(
  UserProfile
);
