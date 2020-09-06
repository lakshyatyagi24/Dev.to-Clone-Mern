import React, { useState, Fragment } from 'react';
import Setting from './Setting';
import PropTypes from 'prop-types';

const Profile = ({ location }) => {
  const [displaySocialInputs, toggleSocialInputs] = useState(false);
  return (
    <Setting checkPage={location.pathname}>
      <div className='main-setting bg-white'>
        <div className='main-setting__dashboard'>
          <h1 className='text-dark my-1'>
            Fill all this fields to everyone known more about you
          </h1>
          <form className='form'>
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
              />
            </div>
            <label htmlFor='location'>Location</label>
            <div className='form-group form-fix'>
              <input
                type='text'
                name='location'
                style={{
                  borderRadius: '5px',
                  height: '50px',
                  backgroundColor: '#f9fafa',
                }}
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
                  />
                </div>
              </Fragment>
            )}
            <input type='submit' value='Save' className='btn btn-dark my-1' />
          </form>
        </div>
      </div>
    </Setting>
  );
};

Profile.propTypes = {};

export default Profile;
