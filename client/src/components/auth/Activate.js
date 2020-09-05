import React, { Fragment, useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { activate } from '../../actions/auth';
import BeatLoader from 'react-spinners/BeatLoader';

const Activate = ({ activate, isAuthenticated, match }) => {
  const [formData, setFormData] = useState({
    name: '',
    token: '',
    isActived: false,
    isProcessing: false,
  });

  useEffect(() => {
    let token = match.params.token;
    let { name } = jwt.decode(token);

    if (token) {
      setFormData({ ...formData, name, token });
    }
  }, []);
  const { name, token, isActived, isProcessing } = formData;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      isProcessing: true,
    });
    const res = await activate({ token });
    if (res) {
      return setFormData({
        ...formData,
        isActived: true,
        isProcessing: false,
      });
    } else {
      return setFormData({
        ...formData,
        isProcessing: false,
      });
    }
  };
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <p className='lead'>Welcome {name}</p>
      <form className='form' onSubmit={handleSubmit}>
        {<BeatLoader size={15} color={'#3b49df'} loading={isProcessing} />}
        {!isProcessing && (
          <input type='submit' className='btn btn-primary' value='Active' />
        )}
      </form>
      {isActived && (
        <p className='my-1'>
          Your account is actived! Let <Link to='/login'>Sign In</Link> now
        </p>
      )}
    </Fragment>
  );
};

Activate.propTypes = {
  activate: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { activate })(Activate);
