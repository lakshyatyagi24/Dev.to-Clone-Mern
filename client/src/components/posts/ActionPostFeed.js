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
    if (auth.isAuthenticated) {
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
      <button
        onClick={handleBookMark}
        style={{ marginRight: 0 }}
        className='btn btn-light btn-hover'
      >
        {auth.isAuthenticated && bookMarkedState ? (
          <i
            className='fas fa-bookmark'
            style={{ color: 'royalblue', fontSize: '1.2rem' }}
          />
        ) : (
          <i className='far fa-bookmark' style={{ fontSize: '1.2rem' }} />
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
