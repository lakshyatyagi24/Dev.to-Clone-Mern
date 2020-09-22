import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function PostNotify({ data }) {
  return (
    <div
      style={{ backgroundColor: !data.isSeen ? '#f3f5ff' : '#fff' }}
      className='reaction-notify'
    >
      <div className='reaction-notify__wrap'>
        <Link
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
            make a new post, check it{' '}
            <Link
              style={{ color: 'royalblue', textDecoration: 'underline' }}
              to={`/post/${data.post._id}`}
            >
              here
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
PostNotify.propTypes = {
  data: PropTypes.object.isRequired,
};
export default PostNotify;
