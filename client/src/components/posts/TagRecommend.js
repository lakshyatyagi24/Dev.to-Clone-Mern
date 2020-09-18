import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function TagRecommend({ tags }) {
  return (
    <div className='tag-recommend my-1'>
      <p className='p'>Popular tags</p>
      <div className='p tag-recommend__wrap'>
        {tags.map((tag) => (
          <Link
            className='tag-recommend__link'
            key={tag._id}
            to={`/tags/${tag._id}/${tag.tagName}`}
          >
            <span
              key={tag._id}
              className='tag-recommend__item py-tags'
            >{`#${tag.tagName}`}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
TagRecommend.propTypes = {
  tags: PropTypes.array.isRequired,
};

export default TagRecommend;
