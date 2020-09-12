import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editReplyComment } from '../../actions/post';

const CommentEditReply = ({
  setEdit,
  comment,
  replyId,
  editReplyComment,
  postId,
  comtId,
}) => {
  const [text, setText] = useState(comment);

  const handleClick = (e) => {
    if (e.target.classList.contains('backdrop')) {
      setEdit(false);
    }
  };
  return (
    <div className='backdrop' onClick={handleClick}>
      <div className='child edit-comment close-action'>
        <form
          className='form'
          onSubmit={(e) => {
            e.preventDefault();
            editReplyComment(postId, comtId, replyId, { data: text });
            setEdit(false);
          }}
        >
          <textarea
            name='text'
            rows='8'
            cols='80'
            value={text}
            onChange={(e) => setText(e.target.value)}
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
          <button
            onClick={() => setEdit(false)}
            className='btn btn-light btn-hover'
          >
            <i style={{ color: '#363c44' }} className='fas fa-times' />
          </button>
        </form>
      </div>
    </div>
  );
};
CommentEditReply.propTypes = {
  comment: PropTypes.string.isRequired,
  editReplyComment: PropTypes.func.isRequired,
};

export default connect(null, { editReplyComment })(CommentEditReply);