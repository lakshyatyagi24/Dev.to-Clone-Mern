import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getHelpPosts } from '../../actions/post';
import PropTypes from 'prop-types';

function HelpPosts({ help_posts, getHelpPosts }) {
  useEffect(() => {
    getHelpPosts();
  }, [getHelpPosts]);
  return (
    <div className='post-side'>
      <div className='post-side__wrap'>
        <Link
          to='/tags/5f64172e64d4d31b38cdef25/help'
          className='text-dark post-side__title p'
        >
          <span>#help</span>
        </Link>
        <div className='post-side__content'>
          {help_posts.map((post) => (
            <Link
              key={post._id}
              to={`/post/${post._id}`}
              className='post-side__item p-1'
            >
              <div className='text-dark post-side__item-title'>
                {post.title}
              </div>
              <div className='post-side__item-comt'>{`Comments ${post.commentsCount}`}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
HelpPosts.propTypes = {
  help_posts: PropTypes.array.isRequired,
  getHelpPosts: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  help_posts: state.post.help_posts,
});
export default connect(mapStateToProps, { getHelpPosts })(HelpPosts);
