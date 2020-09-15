import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getCurrentProfile } from '../../actions/profile';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import Posts from './Posts';
import HashLoader from 'react-spinners/HashLoader';

function hexToRGB(h) {
  let r = 0,
    g = 0,
    b = 0;

  // 3 digits
  if (h.length == 4) {
    r = '0x' + h[1] + h[1];
    g = '0x' + h[2] + h[2];
    b = '0x' + h[3] + h[3];

    // 6 digits
  } else if (h.length == 7) {
    r = '0x' + h[1] + h[2];
    g = '0x' + h[3] + h[4];
    b = '0x' + h[5] + h[6];
  }

  return 'rgb(' + +r + ',' + +g + ',' + +b + ')';
}
function Me({ profile: { profile, loading }, getCurrentProfile }) {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  return loading || profile === null ? (
    <div style={{ position: 'fixed', right: '50%', bottom: '50%' }}>
      <HashLoader size={36} color={'#3b49df'} loading={true} />
    </div>
  ) : (
    <Fragment>
      <div className='me'>
        <div
          className='me__banner'
          style={{ backgroundColor: hexToRGB(profile.brand_color) }}
        >
          <div className='me__wrap'>
            <div className='me__content bg-white'>
              <div className='action-follow'>
                <Link
                  to='/settings'
                  style={{ marginRight: 0 }}
                  className='btn btn-dark'
                >
                  Edit Profile
                </Link>
              </div>
              <div className='me__top'>
                <img
                  style={{ backgroundColor: hexToRGB(profile.brand_color) }}
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
          <Posts user_id={profile.user._id} />
        </div>
      </div>
    </Fragment>
  );
}
Me.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, { getCurrentProfile })(Me);
