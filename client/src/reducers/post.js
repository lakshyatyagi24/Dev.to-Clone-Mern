import {
  GET_POSTS,
  GET_DISCUSS_POSTS,
  GET_NEWS_POSTS,
  GET_HELP_POSTS,
  POST_ERROR,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
  EDIT_COMMENT,
  REPLY_COMMENT,
  REMOVE_REPLY_COMMENT,
  SET_LOADING,
  CLEAR_POST,
  CLEAR_POSTS,
} from '../actions/types';

const initialState = {
  posts: [],
  post: null,
  discuss_posts: [],
  help_posts: [],
  news_posts: [],
  profile: null,
  loading: true,
  usersCount: 0,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CLEAR_POST:
      return {
        ...state,
        post: null,
        profile: null,
      };
    case CLEAR_POSTS:
      return {
        ...state,
        posts: null,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: payload,
      };
    case GET_POSTS:
      return {
        ...state,
        posts: payload.posts,
        usersCount: payload.usersCount,
        loading: false,
      };
    case GET_DISCUSS_POSTS:
      return {
        ...state,
        discuss_posts: payload,
        loading: false,
      };
    case GET_HELP_POSTS:
      return {
        ...state,
        help_posts: payload,
        loading: false,
      };
    case GET_NEWS_POSTS:
      return {
        ...state,
        news_posts: payload,
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
