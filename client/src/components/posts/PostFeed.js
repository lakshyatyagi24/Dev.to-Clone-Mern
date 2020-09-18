import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addBookmarks } from '../../actions/post';
import ActionPostFeed from './ActionPostFeed';
import { timeSince } from '../../utils/timesince';

const PostFeed = ({
  addBookmarks,
  auth,
  path,
  index,
  post: {
    _id,
    title,
    coverImage,
    user,
    tags,
    bookmarks,
    bookmarksCount,
    likesCount,
    commentsCount,
    date,
  },
  setAuth,
}) => {
  const [bookmarksState, setBookMarks] = useState(bookmarksCount);

  const incBookMarks = () => setBookMarks(bookmarksState + 1);
  const decBookMarks = () => setBookMarks(bookmarksState - 1);
  useEffect(() => {
    setBookMarks(bookmarksCount);
  }, [bookmarksCount]);
  const handleBookmarksAction = () => {
    if (!auth.isAuthenticated) {
      return setAuth(true);
    } else {
      addBookmarks(_id);
      return setAuth(false);
    }
  };
  return (
    <div className='my'>
      <div className='post-feed bg-white'>
        {path === '/' && coverImage && index === 0 && (
          <Link
            style={{ display: 'block', height: '275px' }}
            to={`/post/${_id}`}
          >
            <img
              alt=''
              src={coverImage}
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
          </Link>
        )}
        <div className='p-1'>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Link
              to={
                auth.user && auth.user._id === user._id
                  ? `/profile/me`
                  : `/profile/user/${user._id}`
              }
              style={{ display: 'flex', width: 'fit-content' }}
            >
              <img
                className='round-img'
                style={{ objectFit: 'cover' }}
                src={user.avatar}
                alt=''
              />

              <div style={{ marginLeft: '10px' }}>
                <h5 className='text-dark'>{user.name}</h5>
                <p className='post-date'>
                  <Moment format='DD/MM/YY'>{date}</Moment>
                  {` (${timeSince(date)} ago)`}
                </p>
              </div>
            </Link>
            <ActionPostFeed
              isBookMarked={
                !auth.user ? null : bookmarks.includes(auth.user._id)
              }
              setAuth={setAuth}
              handleBookmarksAction={handleBookmarksAction}
              setBookMarks={setBookMarks}
              bookmarksState={bookmarksState}
              incBookMarks={incBookMarks}
              decBookMarks={decBookMarks}
            />
          </div>
          <Link className='title-hover' to={`/post/${_id}`}>
            <h1 className='text-dark m-1-tags'>{title}</h1>
          </Link>
          <div className='tags-feed m-1-tags'>
            {tags.length > 0 &&
              tags.map((tag) => (
                <Link
                  className='tags-item'
                  key={tag._id}
                  to={`/tags/${tag._id}/${tag.tagName}`}
                >
                  <span key={tag._id}>{'#' + tag.tagName}</span>
                </Link>
              ))}
          </div>
          <div className='m-1-actions-feed'>
            <Link to={`/post/${_id}`} className='like-action'>
              <button
                style={{ marginRight: 0 }}
                className='btn btn-light btn-hover'
              >
                <i className='far fa-heart' style={{ marginRight: '5px' }} />
                <span>{likesCount}</span>
              </button>
            </Link>
            <Link to={`/post/${_id}`} className='discuss-action'>
              <button className='btn btn-light  btn-hover'>
                <i
                  className='far fa-comment-alt'
                  style={{ marginRight: '5px' }}
                />
                <span>{commentsCount}</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

PostFeed.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addBookmarks: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { addBookmarks })(PostFeed);
