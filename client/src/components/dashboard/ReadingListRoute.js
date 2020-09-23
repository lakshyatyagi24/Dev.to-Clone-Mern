import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dashboard from './Dashboard';
import ReadingList from './ReadingList';
import PuffLoader from 'react-spinners/PuffLoader';
function ReadingListRoute({ user, location }) {
  return (
    <Dashboard checkPage={location.pathname}>
      <div className='reading-list__head'>
        <h3 className='text-dark'>Reading list</h3>
        <button className='btn btn-blue'>Test</button>
      </div>

      <div className='post-list my-1'>
        {!user ? (
          <div style={{ position: 'fixed', right: '50%', bottom: '50%' }}>
            <PuffLoader size={36} color={'#3b49df'} loading={true} />
          </div>
        ) : (
          user.bookMarkedPosts.map((post) => (
            <ReadingList key={post._id} post={post} />
          ))
        )}
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
