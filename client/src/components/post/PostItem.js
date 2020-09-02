import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike } from '../../actions/post';

const PostItem = ({
  addLike,
  auth,
  post: { _id, text, name, avatar, user, likes, date },
  showActions,
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
  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/user/${user}`}>
          <img className='round-img' src={avatar} alt='' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>{text}</p>
        <p className='post-date'>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>
        {showActions && (
          <Fragment>
            <button
              onClick={handleLikeAction}
              type='button'
              className='btn btn-light'
            >
              {auth.isAuthenticated &&
              likes.map((item) => item.user.toString()).indexOf(auth.user._id) >
                -1 ? (
                <i
                  className='fas fa-thumbs-up'
                  style={{ color: '#17a2b8', marginRight: '5px' }}
                />
              ) : (
                <i
                  className='fas fa-thumbs-up'
                  style={{ marginRight: '5px' }}
                />
              )}
              <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
            </button>

            <button type='button' className='btn btn-light'>
              <i className='far fa-comment-alt' />
            </button>
            <button type='button' className='btn btn-light'>
              <i className='far fa-bookmark' />
            </button>
            {/* {comments.length > 0 && (
                <i className='far fa-comment'>
                  <span className='comment-count'>{comments.length}</span>
                </i>
              )} */}
            {/* {!auth.loading && user === auth.user._id && (
            <button
              onClick={() => deletePost(_id)}
              type="button"
              className="btn btn-danger"
            >
              <i className="fas fa-times" />
            </button>
          )} */}
          </Fragment>
        )}
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
  showActions: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike })(PostItem);
