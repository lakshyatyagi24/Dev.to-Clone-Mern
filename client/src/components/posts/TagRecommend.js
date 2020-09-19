import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

function TagRecommend({ tag }) {
  return (
    <Fragment>
      <Link
        className='tag-recommend__link'
        to={`/tags/${tag._id}/${tag.tagName}`}
      >
        <span className='tag-recommend__item py-tags'>{`#${tag.tagName}`}</span>
      </Link>
    </Fragment>
  );
}

export default TagRecommend;
