import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostItem from './PostItem';
import PostForm from './PostForm';
import { getPosts } from '../../actions/post';
import BeatLoader from 'react-spinners/BeatLoader';
import LoginPopUp from '../auth/LoginPopUp';

const Posts = ({ getPosts, post: { posts, loading } }) => {
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return (
    <Fragment>
      {auth ? <LoginPopUp setAuth={setAuth} /> : null}
      <h1 className='large text-primary'>Posts</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome to the community
      </p>
      <PostForm />
      <div className='posts'>
        {loading ? (
          <BeatLoader size={15} color={'#17a2b8'} loading={true} />
        ) : (
          <Fragment>
            {posts.map((post) => (
              <PostItem key={post._id} post={post} setAuth={setAuth} />
            ))}
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
