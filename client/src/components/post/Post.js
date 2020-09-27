import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PuffLoader from 'react-spinners/PuffLoader';
import PostItem from './PostItem';
import CommentForm from '../post/CommentForm';
import CommentItem from '../post/CommentItem';
import { getPost } from '../../actions/post';
import LoginPopUp from '../auth/LoginPopUp';

const Post = ({ getPost, post: { post, loading, profile }, match }) => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);
  return loading || !post ? (
    <div style={{ position: 'fixed', right: '50%', bottom: '50%' }}>
      <PuffLoader size={46} color={'#3b49df'} loading={true} />
    </div>
  ) : (
    <div className='post-item-container container'>
      {auth ? <LoginPopUp setAuth={setAuth} /> : null}
      <PostItem post={post} profile={profile} setAuth={setAuth} />

      <div className='post post-comment py'>
        <div></div>

        <div className='bg-white comment-item'>
          <CommentForm setAuth={setAuth} postId={post._id} />
          <p className='text-dark my'>Comments ({post.commentsCount})</p>

          {post.comments.map((comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              postId={post._id}
              userId={post.user._id}
            />
          ))}
        </div>
        <div></div>
      </div>
    </div>
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
