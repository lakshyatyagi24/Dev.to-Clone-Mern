import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getCurrentProfile } from '../../actions/profile';
import { connect } from 'react-redux';
import Moment from 'react-moment';

function Me({ user, profile: { profile }, getCurrentProfile }) {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  return (
    <Fragment>
      {profile && (
        <div className='me'>
          <div className='me__banner'>
            <div className='me__wrap'>
              <div className='me__content bg-white'>
                <div className='me__top'>
                  <img
                    className='round-img me-avatar'
                    alt=''
                    src={user.avatar}
                  />
                </div>
                <div className='me__info'>
                  <h1 className='text-dark me-name'>{user.name}</h1>
                  <p className='text-dark me-bio'>{profile.bio}</p>
                  <div className='me-meta'>
                    <p className='me-location'>
                      <i
                        className='fas fa-map-marker-alt'
                        style={{ fontSize: '1.4rem', marginRight: '8px' }}
                      />
                      {profile.locations}
                    </p>
                    <p className='me-location'>
                      <i
                        className='fas fa-birthday-cake'
                        style={{ fontSize: '1.4rem', marginRight: '8px' }}
                      />
                      Joined <Moment format='DD/MM/YYYY'>{profile.date}</Moment>
                    </p>
                    <a
                      style={{ display: 'block' }}
                      href={profile.social.github}
                    >
                      <i
                        style={{ fontSize: '1.4rem', marginRight: '8px' }}
                        className='fab fa-github'
                      />
                    </a>
                    <a
                      style={{ display: 'block' }}
                      href={profile.social.twitter}
                    >
                      <i
                        style={{ fontSize: '1.4rem', marginRight: '8px' }}
                        className='fab fa-twitter'
                      />
                    </a>
                    <a
                      style={{ display: 'block' }}
                      href={profile.social.facebook}
                    >
                      <i
                        style={{ fontSize: '1.4rem', marginRight: '8px' }}
                        className='fab fa-facebook'
                      />
                    </a>
                    <a
                      style={{ display: 'block' }}
                      href={profile.social.youtube}
                    >
                      <i
                        style={{ fontSize: '1.4rem', marginRight: '8px' }}
                        className='fab fa-youtube'
                      />
                    </a>
                    <a
                      style={{ display: 'block' }}
                      href={profile.social.linkedin}
                    >
                      <i
                        style={{ fontSize: '1.4rem', marginRight: '8px' }}
                        className='fab fa-linkedin'
                      />
                    </a>
                    <a
                      style={{ display: 'block' }}
                      href={profile.social.instagram}
                    >
                      <i
                        style={{ fontSize: '1.4rem', marginRight: '8px' }}
                        className='fab fa-instagram'
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
Me.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.auth.user,
  profile: state.profile,
});
export default connect(mapStateToProps, { getCurrentProfile })(Me);
