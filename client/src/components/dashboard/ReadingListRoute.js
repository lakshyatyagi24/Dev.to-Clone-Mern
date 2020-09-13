import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dashboard from './Dashboard';
import ReadingList from './ReadingList';
function ReadingListRoute({ user, location }) {
  return (
    <Dashboard checkPage={location.pathname}>
      <h3 className='text-dark'>Reading list</h3>
      <div className='post-list my-1'>
        {user.bookMarkedPosts.map((post) => (
          <ReadingList key={post._id} post={post} />
        ))}
      </div>
    </Dashboard>
  );
}
ReadingListRoute.propTypes = {
  user: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps)(ReadingListRoute);
