import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';
import { Redirect } from 'react-router-dom';

const CommentForm = ({ postId, addComment, isAuth }) => {
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
        <h3>Leave a Comment</h3>
      </div>
      <form
        className='form my-1'
        onSubmit={(e) => {
          e.preventDefault();
          addComment(postId, { text });
          setText('');
        }}
      >
        <textarea
          onFocus={handleForm}
          name='text'
          cols='30'
          rows='5'
          placeholder='Comment the post'
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { addComment })(CommentForm);
