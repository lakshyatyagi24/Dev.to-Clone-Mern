import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLikeInReading, addBookmarksInReading } from '../../actions/post';
import { MarkdownPreview } from 'react-marked-markdown';
import ActionPostItem from './ActionPostItem';

const PostItem = ({
  addLikeInReading,
  addBookmarksInReading,
  auth,
  post: {
    _id,
    title,
    likes,
    bookmarks,
    content,
    user,
    likesCount,
    bookmarksCount,
    date,
  },
  profile,
  setAuth,
}) => {
  const [liked, setLiked] = useState(
    auth.user === null ? true : likes.includes(auth.user._id)
  );
  const [bookmarked, setBookMarked] = useState(
    auth.user === null ? true : bookmarks.includes(auth.user._id)
  );

  const [likesState, setLikes] = useState(likesCount);
  const [bookmarksState, setBookMarks] = useState(bookmarksCount);

  const incLikes = () => setLikes(likesState + 1);
  const decLikes = () => setLikes(likesState - 1);
  const incBookMarks = () => setBookMarks(bookmarksCount + 1);
  const decBookMarks = () => setBookMarks(bookmarksCount - 1);
  // useEffect(() => {
  //   setLiked(liked);
  //   setBookMarked(bookmarked)
  // }, [liked,bookmarked]);
  const handleLikeAction = () => {
    if (!auth.isAuthenticated && !localStorage.token) {
      return setAuth(true);
    } else {
      if (liked) {
        setLiked(false);
        decLikes();
        addLikeInReading(_id);
        return setAuth(false);
      } else {
        setLiked(true);
        incLikes();
        addLikeInReading(_id);
        return setAuth(false);
      }
    }
  };
  const handleBookmarksAction = () => {
    if (!auth.isAuthenticated && !localStorage.token) {
      return setAuth(true);
    } else {
      if (bookmarked) {
        setBookMarked(false);
        decBookMarks();
        addBookmarksInReading(_id);
        return setAuth(false);
      } else {
        setBookMarked(true);
        incBookMarks();
        addBookmarksInReading(_id);
        return setAuth(false);
      }
    }
  };
  return (
    <div className='post my-1'>
      <ActionPostItem
        handleBookmarksAction={handleBookmarksAction}
        handleLikeAction={handleLikeAction}
        liked={liked}
        likesState={likesState}
        bookmarked={bookmarked}
        bookmarksState={bookmarksState}
      />

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
          <Link style={{ display: 'flex' }} to={`/profile/user/${user._id}`}>
            <img className='round-img' src={user.avatar} alt='' />
            <h5 style={{ marginLeft: '5px' }}>{user.name}</h5>
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
      {profile !== null ? (
        <div>
          <div style={{ height: 'auto' }}>
            <div className='top-bar'></div>
            <div className='bg-white right-side-post'>
              <div className='user-info'>
                <Link
                  style={{
                    display: 'flex',
                    position: 'absolute',
                    top: '-30px',
                  }}
                  to={`/profile/user/${profile.user._id}`}
                >
                  <img className='round-img' src={profile.user.avatar} alt='' />
                  <h5 style={{ marginLeft: '5px', alignSelf: 'flex-end' }}>
                    {profile.user.name}
                  </h5>
                </Link>
              </div>
              <div className='text-dark py-2'>{profile.bio}</div>
              <div className='text-dark py-2'>{profile.bio}</div>
              <div className='text-dark py-2'>{profile.bio}</div>
              <div className='text-dark py-2'>{profile.bio}</div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  profile: PropTypes.object,
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
