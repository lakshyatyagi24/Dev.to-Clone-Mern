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
    coverImage,
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
  const [likesState, setLikes] = useState(likesCount);
  const [bookmarksState, setBookMarks] = useState(bookmarksCount);

  const incLikes = () => setLikes(likesState + 1);
  const decLikes = () => setLikes(likesState - 1);
  const incBookMarks = () => setBookMarks(bookmarksState + 1);
  const decBookMarks = () => setBookMarks(bookmarksState - 1);
  useEffect(() => {
    setLikes(likesCount);
    setBookMarks(bookmarksCount);
  }, [likesCount, bookmarksCount]);
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
    <div className='post py post-main'>
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
      <div>
        <div className='main-post-item bg-white'>
          {coverImage && (
            <div style={{ height: '340px' }}>
              <img
                alt=''
                src={coverImage}
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            </div>
          )}
          <div style={{ padding: '30px 60px' }}>
            <h1
              style={{
                fontSize: '3rem',
                lineHeight: '1.2',
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
              <Link
                style={{ display: 'flex' }}
                to={`/profile/user/${user._id}`}
              >
                <img
                  style={{ objectFit: 'cover' }}
                  className='round-img'
                  src={user.avatar}
                  alt=''
                />
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
        </div>
      </div>

      <SidePostItem
        auth={auth}
        user={user}
        profile={profile}
        setAuth={setAuth}
      />
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
