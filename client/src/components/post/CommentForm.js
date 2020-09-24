import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';
import mongoose from 'mongoose';

const CommentForm = ({ postId, addComment, isAuth, setAuth, auth }) => {
  const [text, setText] = useState('');
  const handleForm = () => {
    if (!isAuth) {
      document.body.style.overflow = 'hidden';
      return setAuth(true);
    } else {
      return setAuth(false);
    }
  };

  return (
    <Fragment>
      <form
        className='form'
        onSubmit={(e) => {
          e.preventDefault();
          const date = new Date();
          addComment(postId, {
            _id: mongoose.Types.ObjectId(),
            name: auth.user.name,
            avatar: auth.user.avatar,
            userId: auth.user._id,
            text,
            date: date.toISOString(),
            reply: [],
          });
          setText('');
        }}
      >
        <p className='text-dark my'>Discussion</p>
        <textarea
          onFocus={handleForm}
          name='text'
          cols='30'
          rows='8'
          placeholder='Login to post comments'
          value={text}
          onChange={(e) => {
            if (!isAuth) {
              return setAuth(true);
            }
            setText(e.target.value);
          }}
          required
          style={{
            resize: 'none',
            border: 'none',
            outline: 'none',
            boxShadow: '0 0 0 1px rgba(8, 9, 10, 0.1)',
            borderRadius: '5px',
            backgroundColor: '#eef0f1',
          }}
        />
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </Fragment>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  isAuth: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
  auth: state.auth,
});
export default connect(mapStateToProps, { addComment })(CommentForm);
