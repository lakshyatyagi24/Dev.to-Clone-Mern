import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostFeed from './PostFeed';
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

      <div className='post feed'>
        <div>
          <div className='left-side-feed p-1 my-1 bg-white'></div>
        </div>
        <div>
          <h4 className='text-dark'>Posts</h4>
          {loading || posts === null ? (
            <BeatLoader size={15} color={'#3b49df'} loading={true} />
          ) : (
            <Fragment>
              {posts.map((post) => (
                <PostFeed key={post._id} post={post} setAuth={setAuth} />
              ))}
            </Fragment>
          )}
        </div>
        <div>
          <div className='right-side-feed p-1 my-1 bg-white'></div>
        </div>
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
