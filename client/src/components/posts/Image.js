import React from 'react';

const Image = ({ setImage }) => {
  const handleClick = (e) => {
    if (e.target.classList.contains('backdrop')) {
      setImage(false);
    }
  };
  return (
    <div className='backdrop' onClick={handleClick}>
      <div className='child add-image'>
        <h3 className='text-dark'>
          Select your image and copy under text to your post
        </h3>
        <input type='file' style={{ margin: '30px 0' }} />
        <textarea
          value={''}
          style={{ margin: '20px 0', resize: 'none', width: '100%' }}
        />
      </div>
    </div>
  );
};

export default Image;
