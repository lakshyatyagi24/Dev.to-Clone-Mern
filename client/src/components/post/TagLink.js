import React from 'react';
import { Link } from 'react-router-dom';

function TagLink({ tag, hexToRGB }) {
  return (
    <Link
      style={{
        height: '30px',
        width: 'auto',
        backgroundColor: hexToRGB(tag.tagColor),
        color: '#fff',
        padding: '4px',
        marginRight: '8px',
        fontSize: '0.85rem',
        borderRadius: '5px',
      }}
      to={`/tags/${tag._id}/${tag.tagName}`}
    >
      {`#${tag.tagName}`}
    </Link>
  );
}

export default TagLink;
