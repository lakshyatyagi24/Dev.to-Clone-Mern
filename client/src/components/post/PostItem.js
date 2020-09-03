import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike } from '../../actions/post';
import { MarkdownPreview } from 'react-marked-markdown';

const PostItem = ({
  addLike,
  auth,
  post: { _id, title, content, name, avatar, user, likes, date },
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
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <button
            onClick={handleLikeAction}
            type='button'
            className='btn btn-light'
            style={{ marginBottom: '10px', width: '60px' }}
          >
            {auth.isAuthenticated &&
            likes.map((item) => item.user.toString()).indexOf(auth.user._id) >
              -1 ? (
              <i
                className='fas fa-thumbs-up'
                style={{ color: '#17a2b8', marginRight: '5px' }}
              />
            ) : (
              <i className='fas fa-thumbs-up' style={{ marginRight: '5px' }} />
            )}
            <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
          </button>

          <button
            type='button'
            className='btn btn-light'
            style={{ marginBottom: '10px', width: '60px' }}
          >
            <i className='far fa-comment-alt' />
          </button>
          <button
            type='button'
            className='btn btn-light'
            style={{ marginBottom: '10px', width: '60px' }}
          >
            <i className='far fa-bookmark' />
          </button>
        </div>
      </div>
      <div>
        <h3 className='text-primary my-1'>{title}</h3>
        <Link to={`/profile/user/${user}`}>
          <img className='round-img' src={avatar} alt='' />
          <h5>{name}</h5>
        </Link>
        <p className='post-date'>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>
        <MarkdownPreview value={content} />
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
