import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ActionPostFeed = ({
  auth,
  isBookMarked,
  setAuth,
  handleBookmarksAction,
  incBookMarks,
  decBookMarks,
}) => {
  const [bookMarkedState, setbookMarkedState] = useState(isBookMarked);

  useEffect(() => {
    setbookMarkedState(isBookMarked);
  }, [isBookMarked]);
  const handleBookMark = () => {
    if (auth.isAuthenticated && localStorage.token) {
      if (bookMarkedState) {
        setbookMarkedState(false);
        decBookMarks();
        handleBookmarksAction();
      } else {
        setbookMarkedState(true);
        incBookMarks();
        handleBookmarksAction();
      }
    } else {
      return setAuth(true);
    }
  };
  return (
    <div className='read-action'>
      <button onClick={handleBookMark} className='btn btn-light btn-hover'>
        {auth.isAuthenticated && bookMarkedState ? (
          <i
            className='fas fa-bookmark'
            style={{ color: 'royalblue', fontSize: '18px' }}
          />
        ) : (
          <i className='far fa-bookmark' style={{ fontSize: '18px' }} />
        )}
      </button>
    </div>
  );
};
ActionPostFeed.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(ActionPostFeed);
