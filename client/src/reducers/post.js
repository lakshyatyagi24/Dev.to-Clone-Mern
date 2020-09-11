import {
  GET_POSTS,
  POST_ERROR,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
  // UPDATE_BOOKMARKS,
  // UPDATE_BOOKMARKS_INREADING,
  // UPDATE_LIKES_INREADING,
  EDIT_COMMENT,
  // FOLLOW,
  REPLY_COMMENT,
  REMOVE_REPLY_COMMENT,
} from '../actions/types';

const initialState = {
  posts: [],
  post: null,
  profile: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case GET_POST:
      return {
        ...state,
        post: payload.post,
        profile: payload.profile,
        loading: false,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: payload.data,
          commentsCount: payload.commentsCount,
        },
        loading: false,
      };
    case REPLY_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          commentsCount: payload.commentsCount,
          comments: state.post.comments.map((item) =>
            item._id === payload.commentId
              ? { ...item, reply: payload.data }
              : item
          ),
        },
        loading: false,
      };
    case EDIT_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: payload.data,
        },
        loading: false,
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          commentsCount: payload.commentsCount,
          comments: state.post.comments.filter(
            (item) => item._id !== payload.commentId
          ),
        },
        loading: false,
      };
    case REMOVE_REPLY_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          commentsCount: payload.commentsCount,
          comments: state.post.comments.map((item) =>
            item._id === payload.commentId
              ? {
                  ...item,
                  reply: item.reply.filter(
                    (rep) => rep._id !== payload.comment_replyId
                  ),
                }
              : item
          ),
        },

        loading: false,
      };
    default:
      return state;
  }
}
