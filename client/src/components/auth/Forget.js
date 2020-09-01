import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { forget } from '../../actions/auth';
import { toast } from 'react-toastify';

import BeatLoader from 'react-spinners/BeatLoader';

const Forget = ({ forget, isLoading }) => {
  const [formData, setFormData] = useState({
    email: '',
    isProcessing: false
  });

  const { email } = formData;

  const onChange = (e) => setFormData({ ...formData, email: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (email) {
      return forget({ email });
    } else {
      return toast.error('Please provide your email');
    }
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Forget Password</h1>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        {<BeatLoader size={15} color={'#17a2b8'} loading={isLoading} />}
        {!isLoading && (
          <input type="submit" className="btn btn-primary" value="Confirm" />
        )}
      </form>
    </Fragment>
  );
};

Forget.propTypes = {
  forget: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isLoading: state.auth.loading
});
export default connect(mapStateToProps, { forget })(Forget);
