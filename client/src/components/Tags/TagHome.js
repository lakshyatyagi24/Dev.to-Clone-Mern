import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getTagById, getPostsByTagId } from '../../actions/tags';
import { followTags } from '../../actions/auth';
import ActionFollow from './ActionFollow';
import LoginPopUp from '../auth/LoginPopUp';
import Posts from './Posts';
import PuffLoader from 'react-spinners/PuffLoader';
import PropTypes from 'prop-types';

function TagHome({
  match,
  tag: { tag, posts, loading },
  getTagById,
  getPostsByTagId,
  followTags,
  location,
  _auth,
}) {
  const [auth, setAuth] = useState(false);
  const handleFollow = () => {
    if (_auth.isAuthenticated) {
      followTags(tag._id);
      return setAuth(false);
    } else {
      return setAuth(true);
    }
  };
  useEffect(() => {
    getTagById(match.params.id);
    getPostsByTagId(match.params.id);
  }, [getTagById, getPostsByTagId, match.params.id]);
  return loading || !tag || !posts ? (
    <div style={{ position: 'fixed', right: '50%', bottom: '50%' }}>
      <PuffLoader size={36} color={'#3b49df'} loading={true} />
    </div>
  ) : (
    <div className='container'>
      {auth ? <LoginPopUp setAuth={setAuth} /> : null}
      <div className='tag-home my-1 py'>
        <div
          style={{
            boxShadow: `3px 5px 1px 1px ${tag.tagColor}`,
            border: `1px solid ${tag.tagColor}`,
          }}
          className='tag-home__header'
        >
          <h1 className='x-large text-dark tag-home__title'>{`#${tag.tagName}`}</h1>
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              padding: '12px',
            }}
          >
            <ActionFollow
              path={location.pathname}
              setAuth={setAuth}
              handleFollow={handleFollow}
              _auth={_auth}
              isFollowing={
                !_auth.user
                  ? null
                  : _auth.user.followingTags.some(
                      (item) => item._id === tag._id
                    )
              }
            />
          </div>
        </div>

        <Posts posts={posts} />
      </div>
    </div>
  );
}
TagHome.propTypes = {
  tag: PropTypes.object.isRequired,
  getTagById: PropTypes.func.isRequired,
  getPostsByTagId: PropTypes.func.isRequired,
  _auth: PropTypes.object.isRequired,
  followTags: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  tag: state.tags,
  _auth: state.auth,
});
export default connect(mapStateToProps, {
  getTagById,
  getPostsByTagId,
  followTags,
})(TagHome);
