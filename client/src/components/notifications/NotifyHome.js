import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { markNotifications, getNotifications } from '../../actions/notify';
// import store from '../../store';
import PropTypes from 'prop-types';
import ReactionNotify from './ReactionNotify';
import CommentNotify from './CommentNotify';
import FollowNotify from './FollowNotify';
import PostNotify from './PostNotify';

function NotifyHome({ markNotifications, getNotifications, notifications }) {
  useEffect(() => {
    async function loadData() {
      await getNotifications();
      await markNotifications();
    }
    loadData();
  }, [markNotifications, getNotifications]);
  return (
    <div className='container'>
      <div style={{ padding: '0 6rem' }} className='notify-home my-1'>
        <div className='notify-home__side'>
          <Link
            onClick={() => getNotifications()}
            style={{
              display: 'block',
              width: '100%',
              backgroundColor: '#fff',
              padding: '0.35rem',
            }}
            to='/notifications'
            className='btn btn-light'
          >
            All
          </Link>
        </div>

        <div className='notify-home__main'>
          <div className='notify-home__main-actions'>
            <button className='btn btn-light'>
              Clear <i className='fas fa-trash-alt'></i>
            </button>
          </div>

          {notifications.map((item) => {
            if (item.type === 'like' || item.type === 'bookmark') {
              return <ReactionNotify key={item._id} data={item} />;
            } else if (
              item.type === 'comment' ||
              item.type === 'reply_comment'
            ) {
              return <CommentNotify key={item._id} data={item} />;
            } else if (item.type === 'follow') {
              return <FollowNotify key={item._id} data={item} />;
            } else {
              return <PostNotify key={item._id} data={item} />;
            }
          })}
        </div>
      </div>
    </div>
  );
}
NotifyHome.propTypes = {
  markNotifications: PropTypes.func.isRequired,
  getNotifications: PropTypes.func.isRequired,
  notifications: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => ({
  notifications: state.notify.notifications,
});
export default connect(mapStateToProps, {
  markNotifications,
  getNotifications,
})(NotifyHome);
