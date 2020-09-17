import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dashboard from './Dashboard';
import PostItem from './PostItem';
function PostItemRoute({ user, location }) {
  const [value, setValue] = useState('recently-published');
  const date = new Date(user.posts[0].date);
  console.log(date.getDate());
  const filterData =
    value === 'most-comments'
      ? user.posts.sort((u, i) => i.commentsCount - u.commentsCount)
      : value === 'most-actions'
      ? user.posts.sort((u, i) => i.likesCount - u.likesCount)
      : user.posts.sort((u, i) => new Date(i.date) - new Date(u.date));
  return (
    <Dashboard checkPage={location.pathname}>
      <div className='post-dashboard__head'>
        <h3 className='text-dark'>Posts</h3>
        <select
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className='select'
        >
          <option value='recently-published'>Recently published</option>
          <option value='most-comments'>Most comments</option>
          <option value='most-actions'>Most actions</option>
        </select>
      </div>

      <div className='post-list my-1'>
        {filterData.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </Dashboard>
  );
}
PostItemRoute.propTypes = {
  user: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps)(PostItemRoute);
