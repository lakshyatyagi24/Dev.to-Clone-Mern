import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { getTags } from '../../actions/tags';

import TagCard from './TagCard';

import PuffLoader from 'react-spinners/PuffLoader';

function TagsDashBoard({ tags: { tags, loading }, getTags }) {
  useEffect(() => {
    getTags();
  }, [getTags]);
  return loading || !tags ? (
    <div
      style={{
        position: 'fixed',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <PuffLoader size={36} color={'#3b49df'} loading={true} />
    </div>
  ) : (
    <div className='container'>
      <h1 className='text-dark my-1'>Top tags</h1>
      <div className='tags-dashboard py'>
        {tags.map((tag) => (
          <TagCard key={tag._id} tag={tag} />
        ))}
      </div>
    </div>
  );
}
TagsDashBoard.propTypes = {
  tags: PropTypes.object.isRequired,
  getTags: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  tags: state.tags,
});
export default connect(mapStateToProps, { getTags })(TagsDashBoard);
