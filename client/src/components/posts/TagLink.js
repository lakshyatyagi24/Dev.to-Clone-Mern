import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

function TagLink({ tag }) {
  return (
    <Fragment>
      <Link className='tags-item' to={`/tags/${tag._id}/${tag.tagName}`}>
        <span>{`#${tag.tagName}`}</span>
      </Link>
    </Fragment>
  );
}

export default TagLink;
