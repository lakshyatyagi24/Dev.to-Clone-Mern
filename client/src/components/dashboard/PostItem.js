import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deletePost } from '../../actions/post';
import PuffLoader from 'react-spinners/PuffLoader';
import store from '../../store';
function PostItem({ post, deletePost }) {
  return !post ? (
    <div style={{ position: 'fixed', right: '50%', bottom: '50%' }}>
      <PuffLoader size={36} color={'#3b49df'} loading={true} />
    </div>
  ) : (
    <div className='post-list__item bg-white my'>
      <div className='post-list__item-wrap'>
        <div className='item-infor'>
          <Link
            onClick={() => store.dispatch({ type: 'CLEAR_POST' })}
            to={`/post/${post._id}`}
            style={{
              color: 'royalblue',
              fontSize: '1.2rem',
              fontWeight: '500',
            }}
          >
            {post.title}
          </Link>
          <p className='date'>
            <span style={{ color: '#666', fontWeight: '600' }}>Published:</span>{' '}
            <Moment format='DD/MM/YYYY'>{' ' + post.date}</Moment>
          </p>
        </div>
        <div className='action-statis'>
          <div style={{ display: 'flex' }}>
            <div style={{ margin: '8px' }}>
              <i
                className='far fa-comment-alt'
                style={{ marginRight: '6px' }}
              />
              {post.commentsCount}
            </div>
            <div style={{ margin: '8px' }}>
              <i className='far fa-heart' style={{ marginRight: '6px' }} />
              {post.likesCount}
            </div>
            <div style={{ margin: '8px' }}>
              <i className='far fa-bookmark' style={{ marginRight: '6px' }} />
              {post.bookmarksCount}
            </div>
          </div>
        </div>
        <div className='action-button'>
          <div style={{ display: 'flex' }}>
            <Link
              to={`/write-post/edit/${post._id}`}
              type='button'
              className='btn btn-light action-comt'
            >
              <i className='far fa-edit' />
            </Link>
            <button
              onClick={() => deletePost(post._id)}
              type='button'
              className='btn btn-light action-comt'
            >
              <i className='fas fa-times' />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
};
export default connect(null, { deletePost })(PostItem);
