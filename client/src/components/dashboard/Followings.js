import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import store from '../../store';
import PuffLoader from 'react-spinners/PuffLoader';
function Followings({ following }) {
  return !following ? (
    <div style={{ position: 'fixed', right: '50%', bottom: '50%' }}>
      <PuffLoader size={36} color={'#3b49df'} loading={true} />
    </div>
  ) : (
    <div className='followers__item bg-white'>
      <Link
        onClick={() => store.dispatch({ type: 'CLEAR_DATA' })}
        to={`/profile/user/${following._id}`}
        className='followers__item-wrap'
      >
        <img
          style={{ objectFit: 'cover' }}
          className='round-img-dashboard'
          alt='alt'
          src={following.avatar}
        />
        <div className='follower-name'>{'@' + following.name}</div>
      </Link>
    </div>
  );
}
Followings.propTypes = {
  following: PropTypes.object.isRequired,
};
export default React.memo(Followings);
