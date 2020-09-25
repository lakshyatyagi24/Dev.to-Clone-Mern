import React, { useRef, useEffect, Fragment, useState } from 'react';
import {
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TwitterShareButton,
} from 'react-share';

const SharePost = ({ setShare }) => {
  const useOutside = (ref) => {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShare(false);
        }
      }
      document.addEventListener('mouseup', handleClickOutside);
      return () => {
        document.removeEventListener('mouseup', handleClickOutside);
      };
    }, [ref]);
  };
  const [copySuccess, setCopySuccess] = useState('');
  const textAreaRef = useRef(null);
  const wrapperRef = useRef(null);
  useOutside(wrapperRef);

  const copyToClipboard = (e) => {
    textAreaRef.current.select();
    document.execCommand('copy');
    e.target.focus();
    setCopySuccess('Ok!');
  };
  return (
    <div ref={wrapperRef} className='share-post'>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          ref={textAreaRef}
          type='text'
          className='header-search_bar-input'
          value={window.location.href}
          readOnly={true}
        />
        {document.queryCommandSupported('copy') && (
          <Fragment>
            <button
              onClick={copyToClipboard}
              style={{
                margin: '0 0 0 0.5rem',
                width: '50px',
                padding: '0.5rem',
                fontSize: '0.85rem',
              }}
              className='btn btn-light'
            >
              {!copySuccess ? 'Copy' : copySuccess}
            </button>
          </Fragment>
        )}
      </div>
      <div className='btn-share'>
        <FacebookShareButton
          style={{ width: '100%' }}
          className='btn btn-light '
          url={window.location.href}
        >
          Share to facebook
        </FacebookShareButton>
      </div>
      <div className='btn-share'>
        <TwitterShareButton
          style={{ width: '100%' }}
          className='btn btn-light '
          url={window.location.href}
        >
          Share to twiter
        </TwitterShareButton>
      </div>
      <div className='btn-share'>
        <LinkedinShareButton
          style={{ width: '100%' }}
          className='btn btn-light '
          url={window.location.href}
        >
          Share to linkedin
        </LinkedinShareButton>
      </div>
      <div className='btn-share'>
        <RedditShareButton
          style={{ width: '100%' }}
          className='btn btn-light '
          url={window.location.href}
        >
          Share to reddit
        </RedditShareButton>
      </div>
    </div>
  );
};

export default SharePost;
