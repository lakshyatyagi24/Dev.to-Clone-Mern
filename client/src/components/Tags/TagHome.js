import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getTagById, getPostsByTagId } from '../../actions/tags';
import Posts from './Posts';
import PuffLoader from 'react-spinners/PuffLoader';
import PropTypes from 'prop-types';

function TagHome({
  match,
  tag: { tag, posts, loading },
  getTagById,
  getPostsByTagId,
}) {
  useEffect(() => {
    getTagById(match.params.id);
    getPostsByTagId(match.params.id);
  }, [getTagById, getPostsByTagId, match.params.id]);
  return loading || !tag || !posts ? (
    <div style={{ position: 'fixed', right: '50%', bottom: '50%' }}>
      <PuffLoader size={36} color={'#3b49df'} loading={true} />
    </div>
  ) : (
    <div className='container'>
      <div className='tag-home my-1 py'>
        <div
          style={{
            boxShadow: `3px 5px 1px 1px ${tag.tagColor}`,
            border: `1px solid ${tag.tagColor}`,
          }}
          className='tag-home__header'
        >
          <h1 className='x-large text-dark tag-home__title'>{`#${tag.tagName}`}</h1>
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              padding: '12px',
            }}
          >
            <button
              style={{
                backgroundColor: `${tag.tagColor}`,
                margin: 0,
              }}
              className='btn btn-dark'
            >
              Follow
            </button>
          </div>
        </div>

        <Posts posts={posts} />
      </div>
    </div>
  );
}
TagHome.propTypes = {
  tag: PropTypes.object.isRequired,
  getTagById: PropTypes.func.isRequired,
  getPostsByTagId: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  tag: state.tags,
});
export default connect(mapStateToProps, { getTagById, getPostsByTagId })(
  TagHome
);
