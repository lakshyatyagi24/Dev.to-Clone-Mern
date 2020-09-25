import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { markNotifications, getNotifications } from '../../actions/notify';
// import store from '../../store';
import PropTypes from 'prop-types';
import ReactionNotify from './ReactionNotify';
import CommentNotify from './CommentNotify';
import FollowNotify from './FollowNotify';
import PostNotify from './PostNotify';

function NotifyHome({ markNotifications, getNotifications, notifications }) {
  const [filterValue, setFilterValue] = useState('all');
  const filterData =
    filterValue === 'comment'
      ? notifications.filter(
          (item) => item.type === 'comment' || item.type === 'reply_comment'
        )
      : filterValue === 'post'
      ? notifications.filter((item) => item.type === 'post')
      : notifications;
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
          <button
            onClick={() => {
              setFilterValue('all');
            }}
            style={{
              textAlign: 'left',
              display: 'block',
              width: '100%',
              backgroundColor: filterValue === 'all' ? '#fff' : '#eef0f1',
              padding: '0.35rem',
            }}
            className='btn btn-light'
          >
            All
          </button>
          <button
            onClick={() => {
              setFilterValue('comment');
            }}
            style={{
              textAlign: 'left',
              display: 'block',
              width: '100%',
              backgroundColor: filterValue === 'comment' ? '#fff' : '#eef0f1',
              padding: '0.35rem',
            }}
            className='btn btn-light'
          >
            Comments
          </button>
          <button
            onClick={() => {
              setFilterValue('post');
            }}
            style={{
              textAlign: 'left',
              display: 'block',
              width: '100%',
              backgroundColor: filterValue === 'post' ? '#fff' : '#eef0f1',
              padding: '0.35rem',
            }}
            className='btn btn-light'
          >
            Posts
          </button>
        </div>

        <div className='notify-home__main'>
          {filterData.map((item) => {
            if (
              item.type === 'like' ||
              item.type === 'bookmark' ||
              item.type === 'like_bookmark'
            ) {
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
