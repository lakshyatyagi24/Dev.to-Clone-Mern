import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import PostFeed from '../posts/PostFeed';
import LoginPopUp from '../auth/LoginPopUp';

const Posts = ({ posts, profile_data }) => {
  const [auth, setAuth] = useState(false);
  return (
    <Fragment>
      {auth ? <LoginPopUp setAuth={setAuth} /> : null}

      <div className='post feed-profile container post-profile'>
        <div>
          <div className='left-side-feed p-1 my'>
            <div style={{ borderBottom: '1px solid #aaa' }}>
              <h5>Skills/languages</h5>
              <div className='my-2'>{profile_data.skills}</div>
            </div>
            <div className='my-2'>
              <div>{posts.length} posts published</div>
            </div>
          </div>
        </div>
        <div>
          <Fragment>
            {posts.map((post) => (
              <PostFeed key={post._id} post={post} setAuth={setAuth} />
            ))}
          </Fragment>
        </div>
        <div>
          {/* <div className='right-side-feed p-1 my-1 bg-white'></div> */}
        </div>
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
  profile_data: PropTypes.object.isRequired,
};

export default Posts;
