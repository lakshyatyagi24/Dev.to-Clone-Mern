import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLikeInReading, addBookmarksInReading } from '../../actions/post';
import { MarkdownPreview } from 'react-marked-markdown';

const PostItem = ({
  addLikeInReading,
  addBookmarksInReading,
  auth,
  post: { _id, title, content, name, avatar, user, likes, bookmarks, date },
  setAuth,
}) => {
  const handleLikeAction = () => {
    if (!auth.isAuthenticated) {
      return setAuth(true);
    } else {
      addLikeInReading(_id);
      return setAuth(false);
    }
  };
  const handleBookmarksAction = () => {
    if (!auth.isAuthenticated) {
      return setAuth(true);
    } else {
      addBookmarksInReading(_id);
      return setAuth(false);
    }
  };
  return (
    <div className='post my-1'>
      <div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'fixed',
          }}
        >
          <div className='like-action'>
            <button
              onClick={handleLikeAction}
              className='btn btn-light btn-hover'
              style={{ margin: '0' }}
            >
              {auth.isAuthenticated &&
              likes.some((item) => item.user.toString() === auth.user._id) ? (
                <i
                  className='fas fa-heart'
                  style={{ color: '#dc3545', fontSize: '20px' }}
                />
              ) : (
                <i className='far fa-heart' style={{ fontSize: '20px' }} />
              )}
            </button>
          </div>
          <span style={{ display: 'block', marginBottom: '10px' }}>
            {likes.length > 0 ? <span>{likes.length}</span> : <span>0</span>}
          </span>
          <div className='read-action'>
            <button
              onClick={handleBookmarksAction}
              className='btn btn-light btn-hover'
              style={{ margin: '0' }}
            >
              {auth.isAuthenticated &&
              bookmarks.some(
                (item) => item.user.toString() === auth.user._id
              ) ? (
                <i
                  className='fas fa-bookmark'
                  style={{ color: '#3b49df', fontSize: '20px' }}
                />
              ) : (
                <i className='far fa-bookmark' style={{ fontSize: '20px' }} />
              )}
            </button>
          </div>
          <span style={{ display: 'block' }}>
            {bookmarks.length > 0 ? (
              <span>{bookmarks.length}</span>
            ) : (
              <span>0</span>
            )}
          </span>
        </div>
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
            <h5 style={{ marginLeft: '5px' }}>{name}</h5>
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
        <div className='top-bar'></div>
        <div className='bg-white right-side-post'>
          <div className='user-info'>
            <Link
              style={{ display: 'flex', position: 'absolute', top: '-30px' }}
              to={`/profile/user/${user}`}
            >
              <img className='round-img' src={avatar} alt='' />
              <h5 style={{ marginLeft: '5px', alignSelf: 'flex-end' }}>
                {name}
              </h5>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLikeInReading: PropTypes.func.isRequired,
  addBookmarksInReading: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  addLikeInReading,
  addBookmarksInReading,
})(PostItem);
