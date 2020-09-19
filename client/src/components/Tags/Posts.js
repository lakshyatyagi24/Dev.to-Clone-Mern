import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import PostFeed from '../posts/PostFeed';
import LoginPopUp from '../auth/LoginPopUp';
import TopFeedFilter from '../posts/TopFeedFilter';

const Posts = ({ posts }) => {
  const [auth, setAuth] = useState(false);
  const [filterStatus, setFilterStatus] = useState('feed');
  // get d/m/y from data
  const getMonthValue = (value) => {
    const res = new Date(value);
    return res.getMonth() + 1;
  };
  const getDateValue = (value) => {
    const res = new Date(value);
    return res.getDate();
  };
  const getYearValue = (value) => {
    const res = new Date(value);
    return res.getFullYear();
  };

  // get d/m/y now
  const Year = () => {
    const year = new Date();
    return year.getFullYear();
  };
  const Dates = () => {
    const date = new Date();
    return date.getDate();
  };
  const Month = () => {
    const month = new Date();
    return month.getMonth() + 1;
  };
  const dataFilter =
    filterStatus === 'date'
      ? posts.filter((post) => getDateValue(post.date) === Dates())
      : filterStatus === 'month'
      ? posts.filter((post) => getMonthValue(post.date) === Month())
      : filterStatus === 'year'
      ? posts.filter((post) => getYearValue(post.date) === Year())
      : posts;
  return (
    <Fragment>
      {auth ? <LoginPopUp setAuth={setAuth} /> : null}

      <div className='post feed-profile post-profile my-2'>
        <div>
          {/* <div className='left-side-feed p-1 my'>
            <div style={{ borderBottom: '1px solid #aaa' }}>
              <h5>Skills/languages</h5>
              <div className='my-2'>{profile_data.skills}</div>
            </div>
            <div className='my-2'>
              <div>{posts.length} posts published</div>
            </div>
          </div> */}
        </div>
        <div>
          <div className='top-feed'>
            <h4 className='text-dark'>Posts</h4>
            <TopFeedFilter
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
            />
          </div>
          <Fragment>
            {dataFilter.map((post) => (
              <PostFeed key={post._id} post={post} setAuth={setAuth} />
            ))}
          </Fragment>
        </div>
        <div>
          {/* <div className='right-side-feed p-1 my-1 bg-white'></div> */}
        </div>
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default Posts;
