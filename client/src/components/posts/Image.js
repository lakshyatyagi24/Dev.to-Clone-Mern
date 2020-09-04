import React, { useState, useRef } from 'react';
import { ProgressBar } from './ProgressBar';

const Image = ({ setImage }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [copySuccess, setCopySuccess] = useState('');
  const textAreaRef = useRef(null);
  const types = ['image/png', 'image/jpeg', 'image/jpg'];
  const copyToClipboard = (e) => {
    textAreaRef.current.select();
    document.execCommand('copy');
    e.target.focus();
    setCopySuccess('Copied!');
  };
  const handleClick = (e) => {
    if (e.target.classList.contains('backdrop')) {
      setImage(false);
    }
  };
  const changeHandler = (e) => {
    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError('');
    } else {
      setFile(null);
      setError('Plz select and image file (png or jpeg/jpg)');
    }
  };
  return (
    <div className='backdrop' onClick={handleClick}>
      <div className='child add-image'>
        <h3 className='text-dark'>
          Select your image and copy under text to your editor
        </h3>
        <form>
          <input
            type='file'
            style={{ margin: '30px 0' }}
            onChange={changeHandler}
          />
        </form>
        <div style={{ width: '100%' }} className='output'>
          {error && <div className='error'>{error}</div>}
          {file && <div>{file.name}</div>}
          {file && (
            <ProgressBar
              file={file}
              setFile={setFile}
              setImageUrl={setImageUrl}
            />
          )}
        </div>
        {document.queryCommandSupported('copy') && (
          <div style={{ marginBottom: '10px' }}>
            <button className='btn btn-light' onClick={copyToClipboard}>
              Copy
            </button>
            {copySuccess}
          </div>
        )}
        <textarea
          ref={textAreaRef}
          onChange={(e) => setImageUrl(e.target.value)}
          value={imageUrl}
          style={{
            resize: 'none',
            width: '100%',
            height: '100px',
          }}
        />
      </div>
    </div>
  );
};

export default Image;