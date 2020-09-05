import React from 'react';
import PropTypes from 'prop-types';

Setting.propTypes = {};

function Setting(props) {
  return (
    <div style={{ padding: '0 4rem' }} className='settings my-1'>
      <div className='side-setting bg-white'></div>
      <div className='main-setting bg-white'></div>
    </div>
  );
}

export default Setting;
