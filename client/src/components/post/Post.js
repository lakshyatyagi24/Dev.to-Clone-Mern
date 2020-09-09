import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BeatLoader from 'react-spinners/BeatLoader';
import PostItem from './PostItem';
import CommentForm from '../post/CommentForm';
import CommentItem from '../post/CommentItem';
import { getPost } from '../../actions/post';
import LoginPopUp from '../auth/LoginPopUp';

const Post = ({ getPost, post: { post, loading }, profile, match }) => {
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);
  return loading || post === null ? (
    <div style={{ position: 'fixed', right: '50%', bottom: '50%' }}>
      <BeatLoader size={15} color={'#3b49df'} loading={true} />
    </div>
  ) : (
    <Fragment>
      {auth ? <LoginPopUp setAuth={setAuth} /> : null}
      <PostItem post={post} profile={profile} setAuth={setAuth} />

      <CommentForm setAuth={setAuth} postId={post._id} />
      <div className='post my-1'>
        <div></div>

        <div
          className='bg-white comment-item'
          style={{
            border: 'none',
            outline: 'none',
            boxShadow: '0 0 0 1px rgba(8, 9, 10, 0.1)',
            padding: '30px',
            borderRadius: '5px',
          }}
        >
          <p className='text-dark my'>Comments ({post.commentsCount})</p>

          {post.comments.map((comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              postId={post._id}
            />
          ))}
        </div>
        <div></div>
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  profile: PropTypes.object,
};

const mapStateToProps = (state) => ({
  post: state.post,
  profile: state.profile.profile,
});

export default connect(mapStateToProps, { getPost })(Post);
