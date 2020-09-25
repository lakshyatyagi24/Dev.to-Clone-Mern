import React from 'react';

const ConfirmRemoveReComt = ({
  setRemoveReComt,
  deleteReplyComment,
  postId,
  comtId,
  _id,
}) => {
  return (
    <div className='backdrop'>
      <div className='child remove-comt close-action'>
        <button
          onClick={() => {
            document.body.style.overflow = '';
            setRemoveReComt(false);
          }}
          style={{ position: 'absolute', right: 0, top: 0, margin: '8px' }}
          className='btn btn-light btn-hover '
        >
          <i style={{ color: '#363c44' }} className='fas fa-times' />
        </button>
        <h2 className='text-dark'>Are your sure?</h2>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button
            onClick={() => {
              deleteReplyComment(postId, comtId, _id);
              document.body.style.overflow = '';
              setRemoveReComt(false);
            }}
            className='btn btn-dark m-1'
          >
            Yes
          </button>
          <button
            onClick={() => {
              document.body.style.overflow = '';
              setRemoveReComt(false);
            }}
            className='btn btn-light m-1'
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRemoveReComt;
