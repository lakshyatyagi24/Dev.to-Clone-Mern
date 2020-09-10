import React, { Fragment, useState, useEffect } from 'react';

const ActionFollow = ({ setAuth, user, handleFollow, auth, isFollowing }) => {
  const [isFollowState, setIsFollowState] = useState(isFollowing);
  useEffect(() => {
    setIsFollowState(isFollowing);
  }, [isFollowing]);
  const handleFollowUser = () => {
    if (auth.isAuthenticated && localStorage.token) {
      if (isFollowing) {
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
            height: '40px',
            width: '100%',
            margin: '20px 0 0 0',
            display:
              auth.isAuthenticated && auth.user._id === user._id ? 'none' : '',
          }}
          className='btn btn-light'
        >
          Following
        </button>
      ) : (
        <button
          onClick={handleFollowUser}
          style={{
            backgroundColor: 'royalblue',
            height: '40px',
            width: '100%',
            margin: '20px 0 0 0',
            display:
              auth.isAuthenticated && auth.user._id === user._id ? 'none' : '',
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
