import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostFeed from './PostFeed';
import { getPosts } from '../../actions/post';
import { getTags } from '../../actions/tags';
import HashLoader from 'react-spinners/HashLoader';
import LoginPopUp from '../auth/LoginPopUp';
import UserFeedSide from './UserFeedSide';
import TopFeedFilter from './TopFeedFilter';

const Posts = ({
  _auth,
  getPosts,
  getTags,
  post: { posts, loading },
  location,
  usersCount,
}) => {
  const [auth, setAuth] = useState(false);
  const [filterStatus, setFilterStatus] = useState('feed');
  useEffect(() => {
    getPosts();
    getTags();
  }, [getPosts, getTags]);

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
              <HashLoader size={36} color={'#3b49df'} loading={true} />
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
            <div className='guest-welcome  p-1'>
              <img
                className='dev-image-welcome'
                alt=''
                height='48'
                width='48'
                src='https://res.cloudinary.com/practicaldev/image/fetch/s--g3JdSGe6--/c_limit,f_auto,fl_progressive,q_80,w_190/https://practicaldev-herokuapp-com.freetls.fastly.net/assets/rainbowdev.svg'
              />
              <h3 className='text-dark'>
                <Link to='/' style={{ color: 'royalblue' }}>
                  DEV{' '}
                </Link>
                is a community of {usersCount} amazing developers
              </h3>
              <p className='text-dark'>
                We're a place where coders share, stay up-to-date and grow their
                careers.
              </p>
              {!_auth.isAuthenticated ? (
                <Fragment>
                  <Link
                    to='/register'
                    style={{
                      textAlign: 'center',
                      backgroundColor: 'royalblue',
                      margin: '10px 0',
                      width: '100%',
                    }}
                    className='btn btn-dark'
                  >
                    Create an account
                  </Link>
                  <Link
                    to='/login'
                    style={{
                      color: 'royalblue',
                      textAlign: 'center',
                      margin: '0',
                      width: '100%',
                      backgroundColor: '#eee',
                    }}
                    className='btn btn-light'
                  >
                    Login
                  </Link>
                </Fragment>
              ) : (
                <Link
                  to='/write-post'
                  style={{
                    textAlign: 'center',
                    backgroundColor: 'royalblue',
                    margin: '10px 0',
                    width: '100%',
                  }}
                  className='btn btn-dark'
                >
                  Let's started
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  getTags: PropTypes.func,
  post: PropTypes.object.isRequired,
  usersCount: PropTypes.number,
  _auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  usersCount: state.post.usersCount,
  _auth: state.auth,
});

export default connect(mapStateToProps, { getPosts, getTags })(Posts);
