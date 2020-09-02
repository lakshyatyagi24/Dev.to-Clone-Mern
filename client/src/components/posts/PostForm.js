import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import { Redirect } from 'react-router-dom';

const PostForm = ({ addPost, isAuth }) => {
  const [text, setText] = useState('');
  const [checkAuth, setCheckAuth] = useState(false);
  const handleForm = () => {
    if (!isAuth) {
      return setCheckAuth(true);
    } else {
      return setCheckAuth(false);
    }
  };
  if (checkAuth) {
    return <Redirect to='/login' />;
  }
  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Say Something...</h3>
      </div>
      <form
        className='form my-1'
        onSubmit={(e) => {
          e.preventDefault();
          addPost({ text });
          setText('');
        }}
      >
        <textarea
          onFocus={handleForm}
          name='text'
          cols='30'
          rows='5'
          placeholder='Create a post'
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  isAuth: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { addPost })(PostForm);
