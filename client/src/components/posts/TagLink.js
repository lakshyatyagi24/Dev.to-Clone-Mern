import React from 'react';
import { Link } from 'react-router-dom';

function TagLink({ tag }) {
  return (
    <Link className='tags-item' to={`/tags/${tag._id}/${tag.tagName}`}>
      <span>{`#${tag.tagName}`}</span>
    </Link>
  );
}

export default TagLink;
