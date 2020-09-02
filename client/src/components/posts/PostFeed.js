import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';

const PostFeed = ({
  post: { _id, text, name, avatar, user, likes, comments, date },
  showActions,
}) => {
  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/user/${user}`}>
          <img className='round-img' src={avatar} alt='' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className='text-primary my-1'>{text}</p>
        <p className='post-date'>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>
        {showActions && (
          <Fragment>
            <button type='button' className='btn btn-light'>
              <i className='fas fa-thumbs-up' style={{ marginRight: '5px' }} />
              <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
            </button>
            <button type='button' className='btn btn-light'>
              <i
                className='far fa-comment-alt'
                style={{ marginRight: '5px' }}
              />
              <span>
                {comments.length > 0 && <span>{comments.length}</span>}
              </span>
            </button>
            <button type='button' className='btn btn-light'>
              <i className='far fa-bookmark' />
            </button>
            <Link to={`/${name}/${_id}`} className='btn btn-primary'>
              Discuss
            </Link>
          </Fragment>
        )}
      </div>
    </div>
  );
};

PostFeed.defaultProps = {
  showActions: true,
};

PostFeed.propTypes = {
  post: PropTypes.object.isRequired,
  showActions: PropTypes.bool,
};

export default connect(null, null)(PostFeed);
