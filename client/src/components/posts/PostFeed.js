import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addBookmarks } from '../../actions/post';

const PostFeed = ({
  addBookmarks,
  auth,
  post: {
    _id,
    title,
    name,
    avatar,
    user,
    comments,
    bookmarks,
    likesCount,
    date,
  },
  setAuth,
}) => {
  const handleBookmarksAction = () => {
    if (!auth.isAuthenticated && !localStorage.token) {
      return setAuth(true);
    } else {
      addBookmarks(_id);
      return setAuth(false);
    }
  };
  return (
    <div className='post-feed p-1 my bg-white'>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex' }}>
          <Link to={`/profile/user/${user}`}>
            <img className='round-img-feed' src={avatar} alt='' />
          </Link>
          <div style={{ marginLeft: '10px' }}>
            <h5 className='text-dark'>{name}</h5>
            <p className='post-date'>
              Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
            </p>
          </div>
        </div>
        <div className='read-action'>
          <button
            onClick={handleBookmarksAction}
            className='btn btn-light btn-hover'
          >
            {auth.isAuthenticated &&
            bookmarks.some((item) => item.user.toString() === auth.user._id) ? (
              <i
                className='fas fa-bookmark'
                style={{ color: '#3b49df', fontSize: '18px' }}
              />
            ) : (
              <i className='far fa-bookmark' style={{ fontSize: '18px' }} />
            )}
          </button>
        </div>
      </div>
      <Link className='title-hover' to={`/${name}/${_id}`}>
        <h3 className='text-dark my-1 '>{title}</h3>
      </Link>

      <Link to={`/${name}/${_id}`} className='like-action'>
        <button className='btn btn-light btn-hover'>
          <i className='far fa-heart' style={{ marginRight: '5px' }} />
          <span>{likesCount}</span>
        </button>
      </Link>
      <Link to={`/${name}/${_id}`} className='discuss-action'>
        <button className='btn btn-light  btn-hover'>
          <i className='far fa-comment-alt' style={{ marginRight: '5px' }} />
          <span>{comments.length > 0 && <span>{comments.length}</span>}</span>
        </button>
      </Link>
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
