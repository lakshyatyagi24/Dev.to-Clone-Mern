import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/post';

const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth,
  deleteComment,
}) => (
  <Fragment>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <p className='post-date' style={{ alignSelf: 'flex-end' }}>
        Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
      </p>

      {auth.isAuthenticated && user === auth.user._id && (
        <button
          style={{ margin: '0 0 8px 0' }}
          onClick={() => deleteComment(postId, _id)}
          type='button'
          className='btn btn-danger'
        >
          <i className='fas fa-times' />
        </button>
      )}
    </div>
    <div
      style={{
        padding: '20px',
        border: '1px solid rgba(8, 9, 10, 0.1)',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
      }}
    >
      <Link
        style={{ display: 'flex', margin: '16px' }}
        to={`/profile/user/${user}`}
      >
        <img className='round-img' src={avatar} alt='' />
        <h6 style={{ marginLeft: '5px' }}>{name}</h6>
      </Link>
      <p style={{ margin: '16px', wordWrap: 'break-word' }}>{text}</p>
    </div>
  </Fragment>
);

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
