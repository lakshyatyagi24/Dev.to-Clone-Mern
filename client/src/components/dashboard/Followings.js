import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Followings({ following }) {
  return (
    <div className='followers__item bg-white'>
      <Link
        to={`/profile/user/${following._id}`}
        className='followers__item-wrap'
      >
        <img className='round-img-dashboard' alt='alt' src={following.avatar} />
        <div className='follower-name'>{'@' + following.name}</div>
      </Link>
    </div>
  );
}
Followings.propTypes = {
  following: PropTypes.object.isRequired,
};
export default React.memo(Followings);
