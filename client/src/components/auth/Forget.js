import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { forget } from '../../actions/auth';
import { toast } from 'react-toastify';

import BeatLoader from 'react-spinners/BeatLoader';

const Forget = ({ forget }) => {
  const [formData, setFormData] = useState({
    email: '',
    isCompleted: false,
  });

  const { email, isCompleted } = formData;

  const onChange = (e) => setFormData({ ...formData, email: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (email) {
      setFormData({
        ...formData,
        isCompleted: true,
      });
      const res = await forget({ email });
      if (res) {
        return setFormData({
          ...formData,
          isCompleted: false,
        });
      } else {
        return setFormData({
          ...formData,
          isCompleted: false,
        });
      }
    } else {
      return toast.error('Please provide your email');
    }
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Forget Password</h1>
      <form className='form' onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={onChange}
            required
          />
        </div>
        {<BeatLoader size={15} color={'#17a2b8'} loading={isCompleted} />}
        {!isCompleted && (
          <input type='submit' className='btn btn-primary' value='Confirm' />
        )}
      </form>
    </Fragment>
  );
};

Forget.propTypes = {
  forget: PropTypes.func.isRequired,
};

export default connect(null, { forget })(Forget);
