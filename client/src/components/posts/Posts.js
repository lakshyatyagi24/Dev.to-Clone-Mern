import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostFeed from './PostFeed';
import { getPosts } from '../../actions/post';
import { getPopularTags } from '../../actions/tags';
import PuffLoader from 'react-spinners/PuffLoader';
import LoginPopUp from '../auth/LoginPopUp';
import UserFeedSide from './UserFeedSide';
import TopFeedFilter from './TopFeedFilter';
import TagRecommend from './TagRecommend';
import Welcome from './Welcome';
import DicussSide from './DicussSide';

const Posts = ({
  _auth,
  getPosts,
  getPopularTags,
  tags,
  post: { posts, loading },
  location,
  usersCount,
}) => {
  const [auth, setAuth] = useState(false);
  const [filterStatus, setFilterStatus] = useState('feed');
  useEffect(() => {
    getPosts();
    getPopularTags();
  }, [getPosts, getPopularTags]);

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

      <div className='post feed container'>
        <div className='my'>
          <div className='left-side-feed'>
            <UserFeedSide _auth={_auth} />
            <TagRecommend tags={tags} />
          </div>
        </div>
        <div className='my'>
          <div className='top-feed'>
            <h4 className='text-dark'>Posts</h4>
            <TopFeedFilter
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
            />
          </div>
          {loading || !posts ? (
            <div style={{ position: 'fixed', right: '50%', bottom: '50%' }}>
              <PuffLoader size={36} color={'#3b49df'} loading={true} />
            </div>
          ) : (
            <Fragment>
              {dataFilter.map((post, index) => (
                <PostFeed
                  index={index}
                  path={location.pathname}
                  key={post._id}
                  post={post}
                  setAuth={setAuth}
                />
              ))}
            </Fragment>
          )}
        </div>
        <div className='my'>
          <div className='right-side-feed'>
            <Welcome _auth={_auth} usersCount={usersCount} />
            <DicussSide />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  getPopularTags: PropTypes.func,
  tags: PropTypes.array,
  post: PropTypes.object.isRequired,
  usersCount: PropTypes.number,
  _auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  usersCount: state.post.usersCount,
  _auth: state.auth,
  tags: state.tags.tags_popular,
});

export default connect(mapStateToProps, { getPosts, getPopularTags })(Posts);
