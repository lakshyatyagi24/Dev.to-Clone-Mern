import React from 'react';
import PropTypes from 'prop-types';

// redux
import { connect } from 'react-redux';

// component
import Dashboard from './Dashboard';
import Followers from './Followers';

// others
import PuffLoader from 'react-spinners/PuffLoader';
function FollowersRoute({ user, location }) {
  return (
    <Dashboard checkPage={location.pathname}>
      <div className='followers__main'>
        {!user ? (
          <div
            style={{
              position: 'fixed',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
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
