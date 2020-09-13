import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteReplyComment } from '../../actions/post';
import { MarkdownPreview } from 'react-marked-markdown';
import CommentReply from './CommentReply';
import CommentEditReply from './CommentEditReply';

const CommentReplyItem = ({
  postId,
  comtId,
  replyData: {
    _id,
    text_reply,
    name_reply,
    avatar_reply,
    user_reply,
    date_reply,
  },
  auth,
  deleteReplyComment,
  userId,
}) => {
  const [edit, setEdit] = useState(false);
  const [reply, setReply] = useState(false);
  return (
    <div className='reply-item'>
      {edit && (
        <CommentEditReply
          comment={text_reply}
          comtId={comtId}
          postId={postId}
          setEdit={setEdit}
          replyId={_id}
        />
      )}
      {reply && (
        <CommentReply
          tagName={name_reply}
          comtId={comtId}
          postId={postId}
          setReply={setReply}
        />
      )}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <p className='post-date' style={{ alignSelf: 'flex-end' }}>
          Posted on <Moment format='DD/MM/YY'>{date_reply}</Moment>
        </p>
        {auth.isAuthenticated && auth.user._id !== user_reply && (
          <button
            onClick={() => setReply(true)}
            type='button'
            className='btn btn-light action-comt'
          >
            <i className='fas fa-reply' />
          </button>
        )}

        {auth.isAuthenticated && user_reply === auth.user._id && (
          <div style={{ display: 'flex' }}>
            <button
              onClick={() => setReply(true)}
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
              onClick={() => deleteReplyComment(postId, comtId, _id)}
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
            to={`/profile/user/${user_reply}`}
          >
            <img
              className='round-img'
              src={avatar_reply}
              alt=''
              style={{ borderRadius: '50%' }}
            />
            <h5 className='text-dark'>{name_reply}</h5>
            {userId === user_reply && (
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
            value={text_reply}
          />
        </div>
      </div>
    </div>
  );
};

CommentReplyItem.propTypes = {
  postId: PropTypes.string.isRequired,
  replyData: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteReplyComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteReplyComment })(
  CommentReplyItem
);
