import React from 'react';
import { connect } from 'react-redux';
import PostItem from './PostItem';
import PropTypes from 'prop-types';

function Dashboard({ auth, user }) {
  return (
    <div className='dashboard my-1'>
      <div className='dashboard__wrap'>
        <h1 className='dashboard__title text-dark'>Dashboard</h1>
        <div className='dashboard__content my-1'>
          <aside className='dashboard__side'>
            <div className='dashboard__side-wrap'></div>
          </aside>
          <div className='dashboard__main'>
            <div className='dashboard__main-wrap'>
              <h3 className='text-dark'>Posts</h3>
              <div className='post-list'>
                {user.posts.map((post) => (
                  <PostItem key={post._id} post={post} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.auth.user,
});

export default connect(mapStateToProps)(Dashboard);
