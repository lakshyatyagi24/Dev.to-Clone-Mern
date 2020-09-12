import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import { Link } from 'react-router-dom';
const ActionFeed = ({ isAuthenticated, logout, user }) => {
  return (
    <div className='action-feed'>
      {isAuthenticated ? (
        <div className='action-feed__wrap'>
          <ul className='action-feed__user'>
            <li>
              <Link
                style={{ color: 'royalblue', fontWeight: '600' }}
                className='action-feed_s'
                to='/profile/me'
              >
                {'@' + user.name}
              </Link>
            </li>
            <div className='separate'></div>
            <li>
              <Link className='action-feed_s' to='/dashboard'>
                Dash board
              </Link>
            </li>
            <li>
              <Link className='action-feed_s' to='/write-post'>
                Write a post
              </Link>
            </li>
            <li>
              <Link className='action-feed_s' to='/dashboard/reading-list'>
                Reading list
              </Link>
            </li>

            <li>
              <Link className='action-feed_s' to='/settings'>
                Setting
              </Link>
            </li>
            <div className='separate'></div>
            <li>
              <a className='action-feed_s' onClick={logout} href='#!'>
                <span className='hide-sm'>Logout</span>
              </a>
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  );
};

ActionFeed.propTypes = {
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(ActionFeed);
