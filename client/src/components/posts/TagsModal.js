import React, { useEffect, useState } from 'react';
import { TagsInput } from './TagsInput';
import { getTags } from '../../actions/tags';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
const TagsModal = ({ setTagsStatus, getTags, tags }) => {
  useEffect(() => {
    getTags();
  }, [getTags]);

  return (
    <div className='backdrop'>
      <div className='child tags-modal close-action'>
        <button
          onClick={() => setTagsStatus(false)}
          style={{ position: 'absolute', right: 0, top: 0, margin: '8px' }}
          className='btn btn-light btn-hover '
        >
          <i style={{ color: '#363c44' }} className='fas fa-times' />
        </button>
        <h2 className='text-dark'>You can add up to 4 tags</h2>
        <span>Tag must be lower case, no space and no special characters</span>
        {tags && <TagsInput _suggestions={tags} />}
      </div>
    </div>
  );
};
TagsModal.propTypes = {
  getTags: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  tags: state.tags.tags,
});
export default connect(mapStateToProps, { getTags })(TagsModal);
