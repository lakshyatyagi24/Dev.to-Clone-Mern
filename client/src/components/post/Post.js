import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BeatLoader from 'react-spinners/BeatLoader';
import PostItem from './PostItem';
import CommentForm from '../post/CommentForm';
import CommentItem from '../post/CommentItem';
import { getPost } from '../../actions/post';
import LoginPopUp from '../auth/LoginPopUp';

const Post = ({ getPost, post: { post, loading }, match }) => {
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);

  return loading || post === null ? (
    <BeatLoader size={15} color={'#17a2b8'} loading={true} />
  ) : (
    <Fragment>
      {auth ? <LoginPopUp setAuth={setAuth} /> : null}
      <PostItem post={post} setAuth={setAuth} />

      <CommentForm setAuth={setAuth} postId={post._id} />
      <div className='post my-1'>
        <div></div>
        <div
          className='bg-white'
          style={{
            border: 'none',
            outline: 'none',
            boxShadow: '0 0 0 1px rgba(8, 9, 10, 0.1)',
            padding: '30px',
          }}
        >
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
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);
