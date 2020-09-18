import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLikeInReading, addBookmarksInReading } from '../../actions/post';
import { MarkdownPreview } from 'react-marked-markdown';
import ActionPostItem from './ActionPostItem';
import SidePostItem from './SidePostItem';
import store from '../../store';

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
    tags,
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
  function hexToRGB(h) {
    let r = 0,
      g = 0,
      b = 0;

    // 3 digits
    if (h.length === 4) {
      r = '0x' + h[1] + h[1];
      g = '0x' + h[2] + h[2];
      b = '0x' + h[3] + h[3];

      // 6 digits
    } else if (h.length === 7) {
      r = '0x' + h[1] + h[2];
      g = '0x' + h[3] + h[4];
      b = '0x' + h[5] + h[6];
    }

    return 'rgb(' + +r + ',' + +g + ',' + +b + ')';
  }
  return (
    <div className='post py post-main'>
      <ActionPostItem
        handleBookmarksAction={handleBookmarksAction}
        handleLikeAction={handleLikeAction}
        likedState={!auth.user ? null : likes.includes(auth.user._id)}
        likesState={likesState}
        bookmarkedState={!auth.user ? null : bookmarks.includes(auth.user._id)}
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
            <div className='tags-post_item my-1'>
              {tags.length > 0 &&
                tags.map((tag) => (
                  <Link
                    style={{
                      height: '30px',
                      width: 'auto',
                      backgroundColor: hexToRGB(tag.tagColor),
                      color: '#fff',
                      padding: '4px',
                      marginRight: '8px',
                      fontSize: '0.85rem',
                      borderRadius: '5px',
                    }}
                    key={tag._id}
                    to={`/tags/${tag._id}/${tag.tagName}`}
                  >
                    {'#' + tag.tagName}
                  </Link>
                ))}
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                margin: '20px 0',
              }}
            >
              <Link
                onClick={() => store.dispatch({ type: 'CLEAR_DATA' })}
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
        hexToRGB={hexToRGB}
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
