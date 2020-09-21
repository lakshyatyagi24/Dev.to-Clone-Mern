import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getNotifications } from '../../actions/notify';
import PropTypes from 'prop-types';
import ReactionNotify from './ReactionNotify';

function NotifyHome({ getNotifications, notifications }) {
  useEffect(() => {
    getNotifications();
  }, [getNotifications]);
  return (
    <div className='container'>
      <div style={{ padding: '0 6rem' }} className='notify-home my-1'>
        <div className='notify-home__side'>
          <Link
            style={{
              display: 'block',
              width: '100%',
              backgroundColor: '#fff',
              padding: '0.35rem',
            }}
            to='/settings/user/profile'
            className='btn btn-light'
          >
            All
          </Link>
        </div>
        <div className='notify-home__main'>
          {notifications.map((item) => (
            <ReactionNotify key={item._id} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
NotifyHome.propTypes = {
  getNotifications: PropTypes.func.isRequired,
  notifications: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => ({
  notifications: state.notify.notifications,
});
export default connect(mapStateToProps, { getNotifications })(NotifyHome);
