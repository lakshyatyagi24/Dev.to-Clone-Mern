import React, { Fragment, useEffect, useState } from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostFeed from './PostFeed';
import { getPosts } from '../../actions/post';
import HashLoader from 'react-spinners/HashLoader';
import LoginPopUp from '../auth/LoginPopUp';
import {
  ReadingLists,
  DashBoard,
  Settings,
  Sign_in_out,
  Tags,
} from '../icons/icons';

const Posts = ({
  _auth,
  getPosts,
  post: { posts, loading },
  location,
  usersCount,
}) => {
  const [auth, setAuth] = useState(false);
  const [filterStatus, setFilterStatus] = useState('feed');
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
  return (
    <Fragment>
      {auth ? <LoginPopUp setAuth={setAuth} /> : null}

      <div className='post feed container'>
        <div className='my'>
          <div className='left-side-feed'>
            {_auth.isAuthenticated ? (
              <Fragment>
                {!_auth.user ? null : (
                  <div className='side-item'>
                    <Link to='/profile/me' className='user-feed__info'>
                      <img
                        alt=''
                        style={{ objectFit: 'cover', marginRight: '5px' }}
                        className='round-img-feed'
                        src={_auth.user.avatar}
                      />
                      <div>
                        <span
                          className='text-dark'
                          style={{ fontWeight: '600' }}
                        >
                          {`${_auth.user.name}`}{' '}
                        </span>
                        <p className='post-date'>
                          <span>Joined </span>
                          <Moment format='DD/MM/YYYY'>
                            {_auth.user.createdAt}
                          </Moment>
                        </p>
                      </div>
                    </Link>
                  </div>
                )}
                <div className='side-item'>
                  <Link className='user-feed__info' to='/dashboard'>
                    <DashBoard />
                    <span style={{ marginLeft: '8px' }}>Dashboard</span>
                  </Link>
                </div>
                <div className='side-item'>
                  <Link
                    className='user-feed__info'
                    to='/dashboard/reading-list'
                  >
                    <ReadingLists />
                    <span style={{ marginLeft: '8px' }}>Reading list</span>
                  </Link>
                </div>
                <div className='side-item'>
                  <Link
                    className='user-feed__info'
                    style={{ marginBottom: '0 ' }}
                    to='/settings'
                  >
                    <Settings />
                    <span style={{ marginLeft: '8px' }}>Settings</span>
                  </Link>
                </div>
                <div className='side-item'>
                  <Link
                    className='user-feed__info'
                    style={{ marginBottom: '0 ' }}
                    to='/tags'
                  >
                    <Tags />
                    <span style={{ marginLeft: '8px' }}>Tags</span>
                  </Link>
                </div>
              </Fragment>
            ) : (
              <Fragment>
                <div className='side-item'>
                  <Link
                    className='user-feed__info'
                    style={{ marginBottom: '0 ' }}
                    to='/login'
                  >
                    <Sign_in_out />
                    <span style={{ marginLeft: '8px', fontWeight: '600' }}>
                      Sign In/Up
                    </span>
                  </Link>
                </div>
                <div className='side-item'>
                  <Link
                    className='user-feed__info'
                    style={{ marginBottom: '0 ' }}
                    to='/tags'
                  >
                    <Tags />
                    <span style={{ marginLeft: '8px' }}>Tags</span>
                  </Link>
                </div>
              </Fragment>
            )}
          </div>
        </div>
        <div className='my'>
          <div className='top-feed'>
            <h4 className='text-dark'>Posts</h4>
            <div className='top-feed__filter'>
              <button
                style={{
                  color: filterStatus === 'feed' ? 'royalblue' : '',
                  borderBottom:
                    filterStatus === 'feed' ? '3px solid royalblue' : '',
                }}
                onClick={() => setFilterStatus('feed')}
                className='btn btn-light btn-hover'
              >
                Feed
              </button>
              <button
                style={{
                  color: filterStatus === 'date' ? 'royalblue' : '',
                  borderBottom:
                    filterStatus === 'date' ? '3px solid royalblue' : '',
                }}
                onClick={() => setFilterStatus('date')}
                className='btn btn-light btn-hover'
              >
                Date
              </button>
              <button
                style={{
                  color: filterStatus === 'month' ? 'royalblue' : '',
                  borderBottom:
                    filterStatus === 'month' ? '3px solid royalblue' : '',
                }}
                onClick={() => setFilterStatus('month')}
                className='btn btn-light btn-hover'
              >
                Month
              </button>
              <button
                style={{
                  color: filterStatus === 'year' ? 'royalblue' : '',
                  borderBottom:
                    filterStatus === 'year' ? '3px solid royalblue' : '',
                }}
                onClick={() => setFilterStatus('year')}
                className='btn btn-light btn-hover'
              >
                Year
              </button>
            </div>
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
