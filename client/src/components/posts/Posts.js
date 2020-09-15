import React, { Fragment, useEffect, useState } from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostFeed from './PostFeed';
import { getPosts } from '../../actions/post';
import HashLoader from 'react-spinners/HashLoader';
import LoginPopUp from '../auth/LoginPopUp';
import { ReadingLists, DashBoard, Settings } from '../icons/icons';

const Posts = ({ _auth, getPosts, post: { posts, loading }, location }) => {
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return (
    <Fragment>
      {auth ? <LoginPopUp setAuth={setAuth} /> : null}

      <div className='post feed container'>
        <div className='my'>
          <div className='left-side-feed'>
            {_auth.isAuthenticated && localStorage.token ? (
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
              </Fragment>
            ) : null}
          </div>
        </div>
        <div className='my-1'>
          <h4 className='text-dark'>Posts</h4>
          {loading || posts === null ? (
            <div style={{ position: 'fixed', right: '50%', bottom: '50%' }}>
              <HashLoader size={36} color={'#3b49df'} loading={true} />
            </div>
          ) : (
            <Fragment>
              {posts.map((post, index) => (
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
        <div className=' my'>
          {/* <div className='right-side-feed p-1 bg-white'></div> */}
        </div>
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  _auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  _auth: state.auth,
});

export default connect(mapStateToProps, { getPosts })(Posts);
