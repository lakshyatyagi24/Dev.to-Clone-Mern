import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostFeed from './PostFeed';
import { getPosts } from '../../actions/post';
import PuffLoader from 'react-spinners/PuffLoader';
import LoginPopUp from '../auth/LoginPopUp';
import UserFeedSide from './UserFeedSide';
import TopFeedFilter from './TopFeedFilter';
import TagRecommend from './TagRecommend';
import Welcome from './Welcome';
import DicussPosts from './DicussPosts';
import NewsPosts from './NewsPosts';
import HelpPosts from './HelpPosts';
import { LeftSideFeed } from '../icons/icons';

const Posts = ({
  _auth,
  getPosts,
  post: { posts, loading },
  location,
  usersCount,
}) => {
  const [auth, setAuth] = useState(false);
  const [showRSide, setShowRSide] = useState(false);
  const [showLSide, setShowLSide] = useState(false);
  const [filterStatus, setFilterStatus] = useState('latest');
  useEffect(() => {
    getPosts();
  }, [getPosts]);

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
  const handleClickSide = (e) => {
    if (e.target.classList.contains('backdrop-side')) {
      setShowRSide(false);
      setShowLSide(false);
      document.body.style.overflow = '';
    }
  };
  return (
    <Fragment>
      {auth ? <LoginPopUp setAuth={setAuth} /> : null}

      <div
        style={{ marginTop: showLSide ? '4rem' : '' }}
        className='post feed container'
      >
        <div
          onClick={handleClickSide}
          className={!showLSide ? 'my' : 'my backdrop-side'}
        >
          <div className='left-side-feed__wrap'>
            <div className='left-side-feed'>
              <UserFeedSide _auth={_auth} />
              <TagRecommend />
            </div>
          </div>
        </div>
        <div className='my'>
          <div className='top-feed'>
            <div
              onClick={() => {
                document.body.style.overflow = 'hidden';
                setShowLSide(true);
              }}
              className='left-side-feed__icon'
            >
              <LeftSideFeed />
            </div>
            <h4 className='text-dark'>Posts</h4>
            <TopFeedFilter
              setShowRSide={setShowRSide}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
            />
          </div>
          {loading || !posts ? (
            <div style={{ position: 'fixed', right: '50%', bottom: '50%' }}>
              <PuffLoader size={46} color={'#3b49df'} loading={true} />
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
        <div
          onClick={handleClickSide}
          className={!showRSide ? 'my' : 'my backdrop-side'}
        >
          <div className='right-side-feed__wrap'>
            <div className='right-side-feed'>
              <Welcome _auth={_auth} usersCount={usersCount} />
              <DicussPosts />
              <NewsPosts />
              <HelpPosts />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  getPopularTags: PropTypes.func,
  post: PropTypes.object.isRequired,
  usersCount: PropTypes.number,
  _auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  usersCount: state.post.usersCount,
  _auth: state.auth,
});

export default connect(mapStateToProps, { getPosts })(Posts);
