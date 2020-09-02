import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
      <Link to='/' className='btn'>
        Back To Posts
      </Link>
      <PostItem post={post} showActions={true} setAuth={setAuth} />
      <CommentForm setAuth={setAuth} postId={post._id} />
      <div className='comments'>
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
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
