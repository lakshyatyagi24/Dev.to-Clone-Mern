import React, { Fragment, useState, useEffect } from 'react';

const ActionFollow = ({ setAuth, handleFollow, auth, isFollowing }) => {
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
        <button onClick={handleFollowUser} className='btn btn-light'>
          Following
        </button>
      ) : (
        <button
          onClick={handleFollowUser}
          style={{
            backgroundColor: 'royalblue',
          }}
          className='btn btn-dark'
        >
          Follow
        </button>
      )}
    </Fragment>
  );
};

export default React.memo(ActionFollow);
