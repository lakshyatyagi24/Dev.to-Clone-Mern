import React from 'react';
import PropTypes from 'prop-types';
import Dashboard from './Dashboard';
import { connect } from 'react-redux';
import Followings from './Followings';
function FollowingsRoute({ user, location }) {
  return (
    <Dashboard checkPage={location.pathname}>
      <div className='followers__main'>
        {user.following.map((following) => (
          <Followings key={following._id} following={following} />
        ))}
      </div>
    </Dashboard>
  );
}
FollowingsRoute.propTypes = {
  user: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps)(FollowingsRoute);
