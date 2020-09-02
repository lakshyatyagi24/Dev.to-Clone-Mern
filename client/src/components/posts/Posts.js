import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostFeed from './PostFeed';
// import PostForm from './PostForm';
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
      <h1 className='text-primary'>Posts</h1>
      {/* <PostForm /> */}
      <div className='posts'>
        {loading || posts === null ? (
          <BeatLoader size={15} color={'#17a2b8'} loading={true} />
        ) : (
          <Fragment>
            {posts.map((post) => (
              <PostFeed key={post._id} post={post} />
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
