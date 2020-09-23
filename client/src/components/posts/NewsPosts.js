import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getNewsPosts } from '../../actions/post';
import PropTypes from 'prop-types';
import store from '../../store';
function NewsPosts({ news_posts, getNewsPosts }) {
  useEffect(() => {
    getNewsPosts();
  }, [getNewsPosts]);
  return (
    <div className='post-side'>
      <div className='post-side__wrap'>
        <Link
          onClick={() => store.dispatch({ type: 'CLEAR_TAG' })}
          to='/tags/5f64174164d4d31b38cdef26/news'
          className='text-dark post-side__title p'
        >
          <span>#news</span>
        </Link>
        <div className='post-side__content'>
          {news_posts.map((post) => (
            <Link
              onClick={() => store.dispatch({ type: 'CLEAR_POST' })}
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
NewsPosts.propTypes = {
  news_posts: PropTypes.array.isRequired,
  getNewsPosts: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  news_posts: state.post.news_posts,
});
export default connect(mapStateToProps, { getNewsPosts })(NewsPosts);
