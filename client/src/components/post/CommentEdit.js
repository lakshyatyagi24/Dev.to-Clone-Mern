import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editComment } from '../../actions/post';

const CommentEdit = ({ setEdit, comment, editComment, postId, comtId }) => {
  const [data, setData] = useState(comment);
  const handleClick = (e) => {
    if (e.target.classList.contains('backdrop')) {
      setEdit(false);
    }
  };
  return (
    <div className='backdrop' onClick={handleClick}>
      <div className='child edit-comment close-action'>
        <button
          onClick={() => setEdit(false)}
          style={{ position: 'absolute', right: 0, top: 0, margin: '8px' }}
          className='btn btn-light btn-hover '
        >
          <i style={{ color: '#363c44' }} className='fas fa-times' />
        </button>
        <form
          className='form my-1'
          onSubmit={(e) => {
            e.preventDefault();
            editComment(postId, comtId, { data });
            setData('');
            setEdit(false);
          }}
        >
          <textarea
            name='text'
            rows='8'
            cols='80'
            value={data}
            onChange={(e) => setData(e.target.value)}
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
          <input
            style={{ position: 'absolute', right: 0, marginRight: '28px' }}
            type='submit'
            className='btn btn-dark my-1'
            value='Submit'
          />
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
