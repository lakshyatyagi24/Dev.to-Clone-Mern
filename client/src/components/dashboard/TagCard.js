import React from 'react';
import PropTypes from 'prop-types';

// router/redux
import { Link } from 'react-router-dom';
import store from '../../store';

// others
import PuffLoader from 'react-spinners/PuffLoader';
function TagCard({ tag }) {
  return !tag ? (
    <div style={{ position: 'fixed', right: '50%', bottom: '50%' }}>
      <PuffLoader size={36} color={'#3b49df'} loading={true} />
    </div>
  ) : (
    <div
      style={{ borderTop: `8px solid  ${tag.tagColor}` }}
      className='followers__item  bg-white'
    >
      <Link
        onClick={() => store.dispatch({ type: 'CLEAR_TAG' })}
        to={`/tags/${tag._id}/${tag.tagName}`}
        className='followers__item-wrap'
      >
        <div className='follower-name tag'>{`#${tag.tagName}`}</div>
      </Link>
    </div>
  );
}
TagCard.propTypes = {
  tag: PropTypes.object.isRequired,
};
export default React.memo(TagCard);
