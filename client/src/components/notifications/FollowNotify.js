import React from 'react';
import { Follow } from '../icons/icons';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import store from '../../store';

function FollowNotify({ data }) {
  return (
    <div
      style={{ backgroundColor: !data.isSeen ? '#f3f5ff' : '#fff' }}
      className='reaction-notify'
    >
      <div className='reaction-notify__wrap'>
        <Link
          onClick={() => store.dispatch({ type: 'CLEAR_DATA' })}
          className='reaction-notify__user'
          to={`/profile/user/${data.someone._id}`}
        >
          <img
            src={data.someone.avatar}
            className='round-img reaction-notify__user-avatar'
            style={{ objectFit: 'cover' }}
            alt=''
          />
          <div className='reaction-notify__user-info'>
            <h4
              className='reaction-notify__user-name'
              style={{ color: 'royalblue' }}
            >
              {data.someone.name}
            </h4>
          </div>
        </Link>
        <div className='reaction-notify__message'>
          <span>
            followed <Follow /> you
          </span>
        </div>
      </div>
    </div>
  );
}
FollowNotify.propTypes = { data: PropTypes.object.isRequired };
export default FollowNotify;
