import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLikeInReading, addBookmarksInReading } from '../../actions/post';
import { MarkdownPreview } from 'react-marked-markdown';
import ActionPostItem from './ActionPostItem';
import SidePostItem from './SidePostItem';

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
  setAuth,
}) => {
  const [likesState, setLikes] = useState(likesCount);
  const [bookmarksState, setBookMarks] = useState(bookmarksCount);

  const incLikes = () => setLikes(likesState + 1);
  const decLikes = () => setLikes(likesState - 1);
  const incBookMarks = () => setBookMarks(bookmarksCount + 1);
  const decBookMarks = () => setBookMarks(bookmarksCount - 1);
  useEffect(() => {
    setLikes(likesCount);
    setBookMarks(bookmarksCount);
  }, [likesCount, bookmarksCount]);
  const handleLikeAction = () => {
    if (!auth.isAuthenticated && !localStorage.token) {
      return setAuth(true);
    } else {
      addLikeInReading(_id);
      return setAuth(false);
    }
  };
  const handleBookmarksAction = () => {
    if (!auth.isAuthenticated && !localStorage.token) {
      return setAuth(true);
    } else {
      addBookmarksInReading(_id);
      return setAuth(false);
    }
  };
  return (
    <div className='post py-1'>
      <ActionPostItem
        handleBookmarksAction={handleBookmarksAction}
        handleLikeAction={handleLikeAction}
        likedState={auth.user === null ? null : likes.includes(auth.user._id)}
        likesState={likesState}
        bookmarkedState={
          auth.user === null ? null : bookmarks.includes(auth.user._id)
        }
        bookmarksState={bookmarksState}
        incLikes={incLikes}
        decLikes={decLikes}
        incBookMarks={incBookMarks}
        decBookMarks={decBookMarks}
        setAuth={setAuth}
      />

      <div className='bg-white main-post-item'>
        <h1
          style={{
            fontSize: '3rem',
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
            Posted on <Moment format='DD/MM/YYYY'>{date}</Moment>
          </p>
        </div>
        <MarkdownPreview className='post-item' value={content} />
      </div>

      <SidePostItem user={user} />
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
