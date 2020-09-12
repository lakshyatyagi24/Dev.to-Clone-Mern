import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Setting from './Setting';
import PropTypes from 'prop-types';
import { deleteAccount } from '../../actions/profile';
import { loadUser, updateUser } from '../../actions/auth';
import { ProgressBar } from '../posts/ProgressBar';
import { toast } from 'react-toastify';
import HashLoader from 'react-spinners/HashLoader';

const initialState = {
  email: '',
  name: '',
  password1: '',
  password2: '',
};

const Account = ({
  auth: { user, loading },
  deleteAccount,
  location,
  loadUser,
  updateUser,
}) => {
  const types = ['image/png', 'image/jpeg', 'image/jpg'];
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [isCompleted, setComplete] = useState(false);
  const [imageUrl, setImageUpdateUser] = useState('');
  const { name, email, password1, password2 } = formData;
  useEffect(() => {
    if (!user) loadUser();
    if (!loading && user) {
      const userData = { ...initialState };
      for (const key in user) {
        if (key in userData) userData[key] = user[key];
      }
      setFormData(userData);
    }
  }, [loading, loadUser, user]);
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const changeHandler = (e) => {
    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError('');
    } else {
      setFile(null);
      setError('Plz select an image file (png or jpeg/jpg)');
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const { email, name, password1, password2 } = formData;
    if (password1 !== password2) {
      return toast.error('Password does not match!');
    }
    if (imageUrl && imageUrl.length > 0) {
      const avt = imageUrl;
      setComplete(true);
      const res = await updateUser({
        email,
        name,
        password: password1,
        avatar: avt,
      });
      if (res) {
        return setComplete(false);
      } else {
        return setComplete(false);
      }
    } else {
      setComplete(true);
      const res = await updateUser({ email, name, password: password1 });
      if (res) {
        return setComplete(false);
      } else {
        return setComplete(false);
      }
    }
  };
  return (
    <Setting checkPage={location.pathname}>
      {loading || user === null ? (
        <div style={{ position: 'fixed', right: '50%', bottom: '50%' }}>
          <HashLoader size={36} color={'#3b49df'} loading={true} />
        </div>
      ) : (
        <div className='main-setting'>
          <div className='main-setting__dashboard  bg-white'>
            <form className='form' onSubmit={onSubmit}>
              <label htmlFor='email'>Email</label>
              <div className='form-group form-fix'>
                <input
                  type='email'
                  name='email'
                  style={{
                    borderRadius: '5px',
                    height: '50px',
                    backgroundColor: '#f9fafa',
                  }}
                  value={email}
                  onChange={onChange}
                />
              </div>
              <label htmlFor='name'>Name</label>
              <div className='form-group form-fix'>
                <input
                  type='text'
                  name='name'
                  style={{
                    borderRadius: '5px',
                    height: '50px',
                    backgroundColor: '#f9fafa',
                  }}
                  value={name}
                  onChange={onChange}
                />
              </div>
              <label htmlFor='Avatar'>Avatar</label>
              <div
                style={{ display: 'flex', alignItems: 'center' }}
                className='form-group form-fix'
              >
                <img alt='' src={user.avatar} className='round-img' />
                <input
                  className='btn btn-light'
                  type='file'
                  name='avatar'
                  style={{
                    borderRadius: '5px',
                    height: '40px',
                    backgroundColor: '#f9fafa',
                    marginLeft: '20px',
                  }}
                  onChange={changeHandler}
                />
              </div>
              <div style={{ width: '100%' }} className='output'>
                {error && <div className='error'>{error}</div>}
                {file && <div>{file.name}</div>}
                {file && (
                  <ProgressBar
                    file={file}
                    setFile={setFile}
                    setImageUpdateUser={setImageUpdateUser}
                  />
                )}
              </div>
              <label htmlFor='email'>Password</label>
              <div className='form-group form-fix'>
                <input
                  type='password'
                  name='password1'
                  style={{
                    borderRadius: '5px',
                    height: '50px',
                    backgroundColor: '#f9fafa',
                  }}
                  value={password1}
                  onChange={onChange}
                />
              </div>
              <label htmlFor='email'>Re-password</label>
              <div className='form-group form-fix'>
                <input
                  type='password'
                  name='password2'
                  style={{
                    borderRadius: '5px',
                    height: '50px',
                    backgroundColor: '#f9fafa',
                  }}
                  value={password2}
                  onChange={onChange}
                />
              </div>
              {<HashLoader size={36} color={'#3b49df'} loading={isCompleted} />}
              {!isCompleted && (
                <input
                  type='submit'
                  value='Save'
                  className='btn btn-dark my-1'
                />
              )}
            </form>
          </div>
          <div
            style={{ marginTop: '20px' }}
            className='main-setting__dashboard  bg-white'
          >
            <h1 className='text-danger'>Danger Zone</h1>
            <p style={{ margin: '8px 0' }} className='text-dark'>
              <b>Delete account</b>
            </p>
            <p>Deleting your account will:</p>
            <ul>
              <li>
                delete your profile, along with your authentication
                associations. This does not include applications permissions.
              </li>
              <li>
                delete any and all content you have, such as articles, comments,
                your reading list or chat messages.
              </li>
              <li>allow your username to become available to anyone.</li>
            </ul>
            <div className='my-1'>
              <button
                className='btn btn-danger'
                onClick={() => deleteAccount()}
              >
                <i className='fas fa-user-minus' /> Delete My Account
              </button>
            </div>
          </div>
        </div>
      )}
    </Setting>
  );
};

Account.propTypes = {
  auth: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  deleteAccount,
  loadUser,
  updateUser,
})(Account);
