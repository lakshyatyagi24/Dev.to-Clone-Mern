import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/post';
import { MarkdownPreview } from 'react-marked-markdown';
import CommentEdit from './CommentEdit';
import CommentReply from './CommentReply';
import CommentReplyItem from './CommentReplyItem';

const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date, reply },
  auth,
  deleteComment,
  userId,
}) => {
  const [showReply, setShowReply] = useState(true);
  const [edit, setEdit] = useState(false);
  const [replyState, setReplyState] = useState(false);
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
      {replyState && (
        <CommentReply
          tagName={name}
          comtId={_id}
          postId={postId}
          setReply={setReplyState}
        />
      )}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <p className='post-date' style={{ alignSelf: 'flex-end' }}>
          Posted on <Moment format='DD/MM/YY'>{date}</Moment>
        </p>
        {auth.isAuthenticated && auth.user._id !== user && (
          <button
            onClick={() => setReplyState(true)}
            type='button'
            className='btn btn-light action-comt'
          >
            <i className='fas fa-reply' />
          </button>
        )}

        {auth.isAuthenticated && user === auth.user._id && (
          <div style={{ display: 'flex' }}>
            <button
              onClick={() => setReplyState(true)}
              type='button'
              className='btn btn-light action-comt'
            >
              <i className='fas fa-reply' />
            </button>
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
              className='btn btn-light action-comt'
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
            to={
              auth.user && auth.user._id === user
                ? `/profile/me`
                : `/profile/user/${user}`
            }
          >
            <img
              className='round-img'
              src={avatar}
              alt=''
              style={{ borderRadius: '50%', objectFit: 'cover' }}
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
      <div style={{ display: 'flex' }}>
        {reply.length > 0 && (
          <button
            onClick={() => setShowReply(!showReply)}
            type='button'
            className='btn btn-light action-comt show-reply'
          >
            {showReply ? (
              <i className='fas fa-caret-down' />
            ) : (
              <i className='fas fa-caret-up' />
            )}
          </button>
        )}
        {reply.length > 0 && !showReply && (
          <i
            style={{
              margin: '-15px 0 0 8px',
              color: '#aaa',
              fontSize: '0.9rem',
            }}
          >
            replies({reply.length})
          </i>
        )}
      </div>
      {showReply && (
        <div
          style={{ marginTop: reply.length > 0 ? '-35px' : '' }}
          className='reply-area'
        >
          {reply.map((rep) => (
            <CommentReplyItem
              key={rep._id}
              replyData={rep}
              postId={postId}
              userId={userId}
              setReply={setReplyState}
              comtId={_id}
            />
          ))}
        </div>
      )}
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
