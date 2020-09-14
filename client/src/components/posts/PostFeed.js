import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addBookmarks } from '../../actions/post';
import ActionPostFeed from './ActionPostFeed';

const PostFeed = ({
  addBookmarks,
  auth,
  path,
  post: {
    _id,
    title,
    coverImage,
    user,
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
    if (!auth.isAuthenticated && !localStorage.token) {
      return setAuth(true);
    } else {
      addBookmarks(_id);
      return setAuth(false);
    }
  };
  const style = {
    backgroundImage: `url(${coverImage})`,
    backgroundColor: '#fff',
    height: '275px',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    position: 'relative',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',
  };
  return (
    <div className='my'>
      <div className='post-feed bg-white'>
        {path === '/' && coverImage && (
          <Link to={`/post/${_id}`}>
            <div style={style}></div>
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
              <img className='round-img-feed' src={user.avatar} alt='' />

              <div style={{ marginLeft: '10px' }}>
                <h5 className='text-dark'>{user.name}</h5>
                <p className='post-date'>
                  Posted on <Moment format='DD/MM/YYYY'>{date}</Moment>
                </p>
              </div>
            </Link>
            <ActionPostFeed
              isBookMarked={
                auth.user === null ? null : bookmarks.includes(auth.user._id)
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
            <h1 className='text-dark m-1'>{title}</h1>
          </Link>

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
