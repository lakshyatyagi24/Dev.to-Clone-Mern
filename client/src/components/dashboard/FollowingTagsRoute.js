import React from 'react';
import PropTypes from 'prop-types';
import Dashboard from './Dashboard';
import { connect } from 'react-redux';
import TagCard from './TagCard';
function FollowingTagsRoute({ user, location }) {
  return (
    <Dashboard checkPage={location.pathname}>
      <div className='followers__main'>
        {user.followingTags.map((tag) => (
          <TagCard key={tag._id} tag={tag} />
        ))}
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
