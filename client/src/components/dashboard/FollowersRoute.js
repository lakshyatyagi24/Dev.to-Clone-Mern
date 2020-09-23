import React from 'react';
import PropTypes from 'prop-types';
import Dashboard from './Dashboard';
import { connect } from 'react-redux';
import Followers from './Followers';
import PuffLoader from 'react-spinners/PuffLoader';
function FollowersRoute({ user, location }) {
  return (
    <Dashboard checkPage={location.pathname}>
      <div className='followers__main'>
        {!user ? (
          <div style={{ position: 'fixed', right: '50%', bottom: '50%' }}>
            <PuffLoader size={36} color={'#3b49df'} loading={true} />
          </div>
        ) : (
          user.followers.map((follower) => (
            <Followers key={follower._id} follower={follower} />
          ))
        )}
      </div>
    </Dashboard>
  );
}
FollowersRoute.propTypes = {
  user: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps)(FollowersRoute);
