import React from 'react';
import PropTypes from 'prop-types';
import Dashboard from './Dashboard';
import { connect } from 'react-redux';
import Followers from './Followers';
function FollowersRoute({ user, location }) {
  return (
    <Dashboard checkPage={location.pathname}>
      <div className='followers__main'>
        {user.followers.map((follower) => (
          <Followers key={follower._id} follower={follower} />
        ))}
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
