import React, { useState, Fragment, useEffect } from 'react';
import Setting from './Setting';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';
import BeatLoader from 'react-spinners/BeatLoader';

const initialState = {
  website: '',
  locations: '',
  title: '',
  skills: '',
  bio: '',
  education: '',
  twitter: '',
  facebook: '',
  linkedin: '',
  youtube: '',
  instagram: '',
};

const Profile = ({
  location,
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
}) => {
  const [displaySocialInputs, toggleSocialInputs] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [isCompleted, setComplete] = useState(false);
  useEffect(() => {
    if (!profile) getCurrentProfile();
    if (!loading && profile) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      for (const key in profile.social) {
        if (key in profileData) profileData[key] = profile.social[key];
      }
      setFormData(profileData);
    }
  }, [loading, getCurrentProfile, profile]);
  const {
    website,
    locations,
    title,
    skills,
    bio,
    education,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setComplete(true);
    const res = await createProfile(formData);
    if (res) {
      return setComplete(false);
    } else {
      return setComplete(false);
    }
  };
  return (
    <Setting checkPage={location.pathname}>
      {loading || profile === null ? (
        <div style={{ position: 'fixed', right: '50%', bottom: '50%' }}>
          <BeatLoader size={15} color={'#3b49df'} loading={true} />
        </div>
      ) : (
        <div className='main-setting bg-white'>
          <div className='main-setting__dashboard'>
            <p className='my-1'>
              <i className='far fa-edit' /> (*) Fill out all this fields to
              everyone known more about you!
            </p>
            <form className='form' onSubmit={onSubmit}>
              <label htmlFor='website'>Website</label>
              <div className='form-group form-fix'>
                <input
                  type='text'
                  name='website'
                  style={{
                    borderRadius: '5px',
                    height: '50px',
                    backgroundColor: '#f9fafa',
                  }}
                  value={website}
                  onChange={onChange}
                />
              </div>
              <label htmlFor='location'>Location</label>
              <div className='form-group form-fix'>
                <input
                  type='text'
                  name='locations'
                  style={{
                    borderRadius: '5px',
                    height: '50px',
                    backgroundColor: '#f9fafa',
                  }}
                  value={locations}
                  onChange={onChange}
                />
              </div>
              <label htmlFor='title'>Employment title</label>
              <div className='form-group form-fix'>
                <input
                  type='text'
                  name='title'
                  style={{
                    borderRadius: '5px',
                    height: '50px',
                    backgroundColor: '#f9fafa',
                  }}
                  value={title}
                  onChange={onChange}
                />
              </div>
              <label htmlFor='education'>Education</label>
              <div className='form-group form-fix'>
                <input
                  type='text'
                  name='education'
                  style={{
                    borderRadius: '5px',
                    height: '50px',
                    backgroundColor: '#f9fafa',
                  }}
                  value={education}
                  onChange={onChange}
                />
              </div>
              <label htmlFor='skills'>Skills/Languages</label>
              <div className='form-group form-fix'>
                <textarea
                  name='skills'
                  style={{
                    borderRadius: '5px',
                    height: '150px',
                    resize: 'none',
                    backgroundColor: '#f9fafa',
                  }}
                  value={skills}
                  onChange={onChange}
                />
              </div>
              <label htmlFor='bio'>Bio</label>
              <div className='form-group form-fix'>
                <textarea
                  name='bio'
                  style={{
                    borderRadius: '5px',
                    height: '150px',
                    resize: 'none',
                    backgroundColor: '#f9fafa',
                  }}
                  value={bio}
                  onChange={onChange}
                />
              </div>
              <div className='my-2'>
                <button
                  onClick={() => toggleSocialInputs(!displaySocialInputs)}
                  type='button'
                  className='btn btn-light'
                >
                  Add Social Network Links
                </button>
                <span>Optional</span>
              </div>

              {displaySocialInputs && (
                <Fragment>
                  <div className='form-group social-input'>
                    <i className='fab fa-twitter fa-2x' />
                    <input
                      type='text'
                      placeholder='Twitter URL'
                      name='twitter'
                      style={{
                        borderRadius: '5px',
                        height: '50px',
                        backgroundColor: '#f9fafa',
                      }}
                      value={twitter}
                      onChange={onChange}
                    />
                  </div>

                  <div className='form-group social-input'>
                    <i className='fab fa-facebook fa-2x' />
                    <input
                      type='text'
                      placeholder='Facebook URL'
                      name='facebook'
                      style={{
                        borderRadius: '5px',
                        height: '50px',
                        backgroundColor: '#f9fafa',
                      }}
                      value={facebook}
                      onChange={onChange}
                    />
                  </div>

                  <div className='form-group social-input'>
                    <i className='fab fa-youtube fa-2x' />
                    <input
                      type='text'
                      placeholder='YouTube URL'
                      name='youtube'
                      style={{
                        borderRadius: '5px',
                        height: '50px',
                        backgroundColor: '#f9fafa',
                      }}
                      value={youtube}
                      onChange={onChange}
                    />
                  </div>

                  <div className='form-group social-input'>
                    <i className='fab fa-linkedin fa-2x' />
                    <input
                      type='text'
                      placeholder='Linkedin URL'
                      name='linkedin'
                      style={{
                        borderRadius: '5px',
                        height: '50px',
                        backgroundColor: '#f9fafa',
                      }}
                      value={linkedin}
                      onChange={onChange}
                    />
                  </div>

                  <div className='form-group social-input'>
                    <i className='fab fa-instagram fa-2x' />
                    <input
                      type='text'
                      placeholder='Instagram URL'
                      name='instagram'
                      style={{
                        borderRadius: '5px',
                        height: '50px',
                        backgroundColor: '#f9fafa',
                      }}
                      value={instagram}
                      onChange={onChange}
                    />
                  </div>
                </Fragment>
              )}
              {<BeatLoader size={15} color={'#3b49df'} loading={isCompleted} />}
              {!isCompleted && (
                <input
                  type='submit'
                  value='Save'
                  className='btn btn-dark my-1'
                />
              )}
            </form>
          </div>
        </div>
      )}
    </Setting>
  );
};

Profile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  Profile
);
