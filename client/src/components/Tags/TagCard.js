import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function TagCard({ tag }) {
  return (
    <div
      style={{ borderTop: `15px solid  ${tag.tagColor}` }}
      className='tag-card  bg-white '
    >
      <div className='tag-card__wrap p-1'>
        <Link className='tag-card__link' to={`/tags/${tag._id}/${tag.tagName}`}>
          <span className='text-dark tag-card__link-name'>{`#${tag.tagName}`}</span>
        </Link>
        <p className='tag-descriptions'></p>
      </div>
    </div>
  );
}
TagCard.propTypes = {
  tag: PropTypes.object.isRequired,
};

export default TagCard;
