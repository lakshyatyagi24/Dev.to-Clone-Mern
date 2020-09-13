import React, { Fragment, useState, useEffect } from 'react';

const ActionFollow = ({ setAuth, user, handleFollow, auth, isFollowing }) => {
  const [isFollowState, setIsFollowState] = useState(isFollowing);
  useEffect(() => {
    setIsFollowState(isFollowing);
  }, [isFollowing]);
  const handleFollowUser = () => {
    if (auth.isAuthenticated && localStorage.token) {
      if (isFollowState) {
        setIsFollowState(false);
        handleFollow();
      } else {
        setIsFollowState(true);
        handleFollow();
      }
    } else {
      return setAuth(true);
    }
  };
  return (
    <Fragment>
      {auth.isAuthenticated && isFollowState ? (
        <button
          onClick={handleFollowUser}
          style={{
            width: '100%',
            display:
              auth.isAuthenticated && auth.user._id === user._id ? 'none' : '',
          }}
          className='btn btn-light my'
        >
          Following
        </button>
      ) : (
        <button
          onClick={handleFollowUser}
          style={{
            backgroundColor: 'royalblue',
            width: '100%',
            display:
              auth.isAuthenticated && auth.user._id === user._id ? 'none' : '',
          }}
          className='btn btn-dark my'
        >
          Follow
        </button>
      )}
    </Fragment>
  );
};

export default React.memo(ActionFollow);
