import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getDiscussPosts } from '../../actions/post';
import PropTypes from 'prop-types';

function DicussPosts({ discuss_posts, getDiscussPosts }) {
  useEffect(() => {
    getDiscussPosts();
  }, [getDiscussPosts]);
  return (
    <div className='post-side'>
      <div className='post-side__wrap'>
        <Link
          to='/tags/5f637b99ef33812ce08e32dd/discuss'
          className='text-dark post-side__title p-1'
        >
          <span>#discuss</span>
        </Link>
        <div className='post-side__content'>
          {discuss_posts.map((post) => (
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
DicussPosts.propTypes = {
  discuss_posts: PropTypes.array.isRequired,
  getDiscussPosts: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  discuss_posts: state.post.discuss_posts,
});
export default connect(mapStateToProps, { getDiscussPosts })(DicussPosts);
