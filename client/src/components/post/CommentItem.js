import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/post';
import { MarkdownPreview } from 'react-marked-markdown';

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
        <div style={{ display: 'flex' }}>
          <button
            style={{
              margin: '0 8px 8px 0',
              height: '30px',
              width: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={() => deleteComment(postId, _id)}
            type='button'
            className='btn btn-light'
          >
            <i className='far fa-edit' />
          </button>
          <button
            style={{
              margin: '0 0 8px 0',
              height: '30px',
              width: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={() => deleteComment(postId, _id)}
            type='button'
            className='btn btn-danger'
          >
            <i className='fas fa-times' />
          </button>
        </div>
      )}
    </div>
    <div
      style={{
        padding: '20px',
        border: '1px solid rgba(8, 9, 10, 0.1)',
        display: 'grid',
        gridTemplateColumns: '1fr 4fr',
        marginBottom: '20px',
      }}
    >
      <div>
        <Link
          style={{ display: 'flex', margin: '16px' }}
          to={`/profile/user/${user}`}
        >
          <img
            className='round-img'
            src={avatar}
            alt=''
            style={{ borderRadius: '50%' }}
          />
          <h6 style={{ marginLeft: '5px' }}>{name}</h6>
        </Link>
      </div>
      <div>
        <MarkdownPreview
          style={{ margin: '16px', wordWrap: 'break-word' }}
          value={text}
        />
      </div>
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
