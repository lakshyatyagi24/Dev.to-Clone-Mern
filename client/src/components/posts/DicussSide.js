import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

function DicussSide(props) {
  useEffect(() => {}, []);
  return (
    <div className='discuss-side p-1'>
      <div className='discuss-side__wrap '>
        <h4 className='text-dark discuss-side__title'>#discuss</h4>
      </div>
    </div>
  );
}
DicussSide.propTypes = {};
export default DicussSide;
