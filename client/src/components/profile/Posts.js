import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostFeed from '../posts/PostFeed';
import { getPostByUser } from '../../actions/post';
import HashLoader from 'react-spinners/HashLoader';
import LoginPopUp from '../auth/LoginPopUp';
// import store from '../../store';

const Posts = ({
  getPostByUser,
  profile: { posts, loading },
  user_id,
  profile_data,
}) => {
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    // if (!loading) {
    //   store.dispatch({ type: 'SET_LOADING', payload: true });
    // }
    getPostByUser(user_id);
  }, [getPostByUser, user_id]);
  return (
    <Fragment>
      {auth ? <LoginPopUp setAuth={setAuth} /> : null}

      <div className='post feed container post-profile'>
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
          {loading || !posts ? (
            <div style={{ position: 'fixed', right: '50%', bottom: '50%' }}>
              <HashLoader size={36} color={'#3b49df'} loading={true} />
            </div>
          ) : (
            <Fragment>
              {posts.map((post) => (
                <PostFeed key={post._id} post={post} setAuth={setAuth} />
              ))}
            </Fragment>
          )}
        </div>
        <div>
          {/* <div className='right-side-feed p-1 my-1 bg-white'></div> */}
        </div>
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  getPostByUser: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getPostByUser })(Posts);
