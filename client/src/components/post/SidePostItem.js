import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SidePostItem = ({ user }) => {
  return (
    <div>
      <div className='side-post-item'>
        <div className='top-bar'></div>
        <div className='bg-white box'>
          <div className='user-info'>
            <Link
              style={{
                display: 'flex',
                position: 'absolute',
                top: '-30px',
              }}
              to={`/profile/user/${user._id}`}
            >
              <img className='round-img' src={user.avatar} alt='' />
              <h5 style={{ marginLeft: '5px', alignSelf: 'flex-end' }}>
                {user.name}
              </h5>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
SidePostItem.propTypes = {};
export default React.memo(SidePostItem);
