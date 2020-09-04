import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, addBookmarks } from '../../actions/post';
import { MarkdownPreview } from 'react-marked-markdown';

const PostItem = ({
  addLike,
  addBookmarks,
  auth,
  post: { _id, title, content, name, avatar, user, likes, bookmarks, date },
  setAuth,
}) => {
  const handleLikeAction = () => {
    if (!auth.isAuthenticated) {
      return setAuth(true);
    } else {
      addLike(_id);
      return setAuth(false);
    }
  };
  const handleBookmarksAction = () => {
    if (!auth.isAuthenticated) {
      return setAuth(true);
    } else {
      addBookmarks(_id);
      return setAuth(false);
    }
  };
  return (
    <div className='post my-1'>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <button
          onClick={handleLikeAction}
          type='button'
          className='btn btn-light'
          style={{ margin: '0 0 10px 0' }}
        >
          {auth.isAuthenticated &&
          likes.map((item) => item.user.toString()).indexOf(auth.user._id) >
            -1 ? (
            <i className='fas fa-thumbs-up' style={{ color: '#17a2b8' }} />
          ) : (
            <i className='fas fa-thumbs-up' />
          )}
        </button>
        <span style={{ display: 'block' }}>
          {likes.length > 0 ? <span>{likes.length}</span> : <span>0</span>}
        </span>
        <button
          onClick={handleBookmarksAction}
          type='button'
          className='btn btn-light'
          style={{ margin: '0 0 10px 0' }}
        >
          {auth.isAuthenticated &&
          bookmarks.map((item) => item.user.toString()).indexOf(auth.user._id) >
            -1 ? (
            <i className='far fa-bookmark' style={{ color: '#17a2b8' }} />
          ) : (
            <i className='far fa-bookmark' />
          )}
        </button>
        <span style={{ display: 'block' }}>
          {bookmarks.length > 0 ? (
            <span>{bookmarks.length}</span>
          ) : (
            <span>0</span>
          )}
        </span>
      </div>
      <div
        className='bg-white'
        style={{
          boxShadow: '0 0 0 1px rgba(8, 9, 10, 0.1)',
          border: 'unset',
          borderRadius: '5px',
          padding: '30px 60px',
        }}
      >
        <h1
          style={{
            fontSize: '3rem',
            wordWrap: 'break-word',
          }}
          className='text-dark'
        >
          {title}
        </h1>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: '20px 0',
          }}
        >
          <Link style={{ display: 'flex' }} to={`/profile/user/${user}`}>
            <img className='round-img' src={avatar} alt='' />
            <h6 style={{ marginLeft: '5px' }}>{name}</h6>
          </Link>
          <p
            className='post-date'
            style={{ alignSelf: 'flex-end', margin: '0' }}
          >
            Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
          </p>
        </div>
        <MarkdownPreview className='post-item' value={content} />
      </div>
      <div>
        <div
          className='bg-white'
          style={{
            boxShadow: '0 0 0 1px rgba(8, 9, 10, 0.1)',
            border: 'unset',
            borderRadius: '5px',
            padding: '15px',
            height: 'auto',
          }}
        ></div>
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  addBookmarks: PropTypes.func.isRequired,
  showActions: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, addBookmarks })(PostItem);
