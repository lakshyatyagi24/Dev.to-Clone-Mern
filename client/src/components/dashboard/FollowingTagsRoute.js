import React from 'react';
import PropTypes from 'prop-types';

// redux
import { connect } from 'react-redux';

// component
import Dashboard from './Dashboard';
import TagCard from './TagCard';

// others
import PuffLoader from 'react-spinners/PuffLoader';
function FollowingTagsRoute({ user, location }) {
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
          user.followingTags.map((tag) => <TagCard key={tag._id} tag={tag} />)
        )}
      </div>
    </Dashboard>
  );
}
FollowingTagsRoute.propTypes = {
  user: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps)(FollowingTagsRoute);
