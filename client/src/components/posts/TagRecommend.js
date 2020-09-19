import React from 'react';
import { Link } from 'react-router-dom';
import store from '../../store';

function TagRecommend({ tags }) {
  return (
    <div className='tag-recommend my-1'>
      <p className='p'>Popular tags</p>
      <div className='p tag-recommend__wrap'>
        {tags.map((tag) => (
          <Link
            onClick={() => store.dispatch({ type: 'CLEAR_TAG' })}
            key={tag._id}
            className='tag-recommend__link'
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

export default TagRecommend;
