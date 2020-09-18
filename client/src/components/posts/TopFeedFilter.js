import React from 'react';
import PropTypes from 'prop-types';

function TopFeedFilter({ filterStatus, setFilterStatus }) {
  return (
    <div className='top-feed__filter'>
      <button
        style={{
          color: filterStatus === 'feed' ? 'royalblue' : '',
          borderBottom: filterStatus === 'feed' ? '3px solid royalblue' : '',
        }}
        onClick={() => setFilterStatus('feed')}
        className='btn btn-light btn-hover'
      >
        Feed
      </button>
      <button
        style={{
          color: filterStatus === 'date' ? 'royalblue' : '',
          borderBottom: filterStatus === 'date' ? '3px solid royalblue' : '',
        }}
        onClick={() => setFilterStatus('date')}
        className='btn btn-light btn-hover'
      >
        Date
      </button>
      <button
        style={{
          color: filterStatus === 'month' ? 'royalblue' : '',
          borderBottom: filterStatus === 'month' ? '3px solid royalblue' : '',
        }}
        onClick={() => setFilterStatus('month')}
        className='btn btn-light btn-hover'
      >
        Month
      </button>
      <button
        style={{
          color: filterStatus === 'year' ? 'royalblue' : '',
          borderBottom: filterStatus === 'year' ? '3px solid royalblue' : '',
        }}
        onClick={() => setFilterStatus('year')}
        className='btn btn-light btn-hover'
      >
        Year
      </button>
    </div>
  );
}
TopFeedFilter.propTypes = {
  filterStatus: PropTypes.string.isRequired,
  setFilterStatus: PropTypes.func.isRequired,
};

export default TopFeedFilter;
