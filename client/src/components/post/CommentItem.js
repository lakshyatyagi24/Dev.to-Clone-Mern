import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/post';
import { MarkdownPreview } from 'react-marked-markdown';
import CommentEdit from './CommentEdit';

const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth,
  deleteComment,
  userId,
}) => {
  const [edit, setEdit] = useState(false);
  return (
    <Fragment>
      {edit && (
        <CommentEdit
          comment={text}
          comtId={_id}
          postId={postId}
          setEdit={setEdit}
        />
      )}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <p className='post-date' style={{ alignSelf: 'flex-end' }}>
          Posted on <Moment format='DD/MM/YYYY'>{date}</Moment>
        </p>

        {auth.isAuthenticated && user === auth.user._id && (
          <div style={{ display: 'flex' }}>
            <button
              onClick={() => setEdit(true)}
              type='button'
              className='btn btn-light action-comt'
            >
              <i className='far fa-edit' />
            </button>
            <button
              onClick={() => deleteComment(postId, _id)}
              type='button'
              className='btn btn-danger  action-comt'
            >
              <i className='fas fa-times' />
            </button>
          </div>
        )}
      </div>
      <div className='comment-area'>
        <div className='comment-infor'>
          <Link
            style={{
              display: 'flex',
              wordBreak: 'break-word',
            }}
            to={`/profile/user/${user}`}
          >
            <img
              className='round-img'
              src={avatar}
              alt=''
              style={{ borderRadius: '50%' }}
            />
            <h5 className='text-dark'>{name}</h5>
            {userId === user && (
              <h5
                style={{
                  color: 'royalblue',
                  fontWeight: '700',
                  marginLeft: '4px',
                }}
              >
                @Author
              </h5>
            )}
          </Link>
        </div>
        <div className='comment-content'>
          <MarkdownPreview
            style={{ margin: '16px', wordWrap: 'break-word' }}
            value={text}
          />
        </div>
      </div>
    </Fragment>
  );
};

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
