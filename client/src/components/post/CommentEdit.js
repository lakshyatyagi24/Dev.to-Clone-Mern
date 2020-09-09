import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editComment } from '../../actions/post';

const CommentEdit = ({ setEdit, comment, editComment, postId, comtId }) => {
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
            editComment(postId, comtId, { data: text });
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
CommentEdit.propTypes = {
  comment: PropTypes.string.isRequired,
  editComment: PropTypes.func.isRequired,
};

export default connect(null, { editComment })(CommentEdit);
