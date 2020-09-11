import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Followers({ follower }) {
  return (
    <div className='followers__item bg-white'>
      <Link to={`/profile/${follower._id}`} className='followers__item-wrap'>
        <img className='round-img-dashboard' alt='alt' src={follower.avatar} />
        <div className='follower-name'>{'@' + follower.name}</div>
      </Link>
    </div>
  );
}
Followers.propTypes = {
  follower: PropTypes.object.isRequired,
};
export default React.memo(Followers);
