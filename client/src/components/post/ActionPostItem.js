import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
const ActionPostItem = ({
  auth,
  handleBookmarksAction,
  handleLikeAction,
  likedState,
  bookmarkedState,
  likesState,
  bookmarksState,
  incLikes,
  decLikes,
  incBookMarks,
  decBookMarks,
  setAuth,
}) => {
  const [liked, setLiked] = useState(likedState);
  const [bookmarked, setBookMarked] = useState(bookmarkedState);

  useEffect(() => {
    setLiked(likedState);
    setBookMarked(bookmarkedState);
  }, [likedState, bookmarkedState]);
  const handleLike = () => {
    if (auth.isAuthenticated && localStorage.token) {
      if (liked) {
        setLiked(false);
        decLikes();
        handleLikeAction();
      } else {
        setLiked(true);
        incLikes();
        handleLikeAction();
      }
    } else {
      return setAuth(true);
    }
  };
  const handleBookMark = () => {
    if (auth.isAuthenticated && localStorage.token) {
      if (bookmarked) {
        setBookMarked(false);
        decBookMarks();
        handleBookmarksAction();
      } else {
        setBookMarked(true);
        incBookMarks();
        handleBookmarksAction();
      }
    } else {
      return setAuth(true);
    }
  };
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'fixed',
          marginTop: '3rem',
        }}
      >
        <div className='like-action'>
          <button
            onClick={handleLike}
            className='btn btn-light btn-hover action-post'
            style={
              auth.isAuthenticated && liked
                ? {
                    border: '2px solid #dc1818',
                    backgroundColor: '#f8e4e4',
                  }
                : {}
            }
          >
            <i
              className={
                auth.isAuthenticated && liked ? 'fas fa-heart' : 'far fa-heart'
              }
              style={{
                color: auth.isAuthenticated && liked ? '#dc1818' : '',
                fontSize: '20px',
              }}
            />
          </button>
        </div>

        <span
          style={{
            display: 'block',
            marginBottom: '10px',
            color: auth.isAuthenticated && liked ? '#dc1818' : '',
          }}
        >
          {likesState >= 0 && likesState}
        </span>

        <div className='read-action'>
          <button
            onClick={handleBookMark}
            className='btn btn-light btn-hover action-post'
            style={
              auth.isAuthenticated && bookmarked
                ? {
                    border: '2px solid #3b49df',
                    backgroundColor: '#e8e9f9',
                  }
                : {}
            }
          >
            <i
              className={
                auth.isAuthenticated && bookmarked
                  ? 'fas fa-bookmark'
                  : 'far fa-bookmark'
              }
              style={{
                color: auth.isAuthenticated && bookmarked ? '#3b49df' : '',
                fontSize: '20px',
              }}
            />
          </button>
        </div>

        <span
          style={{
            display: 'block',
            color: auth.isAuthenticated && bookmarked ? '#3b49df' : '',
          }}
        >
          <span>{bookmarksState >= 0 && bookmarksState}</span>
        </span>
      </div>
    </div>
  );
};

ActionPostItem.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(ActionPostItem);