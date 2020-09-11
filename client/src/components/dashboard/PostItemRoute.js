import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dashboard from './Dashboard';
import PostItem from './PostItem';
function PostItemRoute({ user, location }) {
  return (
    <Dashboard checkPage={location.pathname}>
      <h3 className='text-dark'>Posts</h3>
      <div className='post-list'>
        {user.posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </Dashboard>
  );
}
PostItemRoute.propTypes = {
  user: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps)(PostItemRoute);
