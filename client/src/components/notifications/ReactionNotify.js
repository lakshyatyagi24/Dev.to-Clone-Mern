import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { LikeFill, UnBookMark } from '../icons/icons';
import { timeSince } from '../../utils/timesince';
import store from '../../store';

function ReactionNotify({ data }) {
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
            <p className='reaction-notify__user-date'>{` (${timeSince(
              data.date
            )} ago)`}</p>
          </div>
        </Link>
        <div className='reaction-notify__message'>
          <span>
            reacted {data.type === 'like' ? <LikeFill /> : <UnBookMark />} to
            <Link
              onClick={() => store.dispatch({ type: 'CLEAR_POST' })}
              to={`/post/${data.post._id}`}
            >{` [${data.post.title}]`}</Link>{' '}
          </span>
        </div>
      </div>
    </div>
  );
}
ReactionNotify.propTypes = {
  data: PropTypes.object.isRequired,
};
export default ReactionNotify;
