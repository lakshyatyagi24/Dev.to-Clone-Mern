import {
  GET_POSTS,
  POST_ERROR,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
  UPDATE_BOOKMARKS,
  UPDATE_BOOKMARKS_INREADING,
  UPDATE_LIKES_INREADING,
} from '../actions/types';

const initialState = {
  posts: [],
  post: null,
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
        post: payload,
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
    case UPDATE_BOOKMARKS:
      let data;
      for (let i = 0; i < state.posts.length; ++i) {
        if (state.posts[i]._id === payload.id) {
          data = state.posts[i];
          break;
        }
      }

      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id
            ? { ...post, bookmarks: payload.bookmarks }
            : post
        ),
        post: {
          ...data,
          bookmarks: payload.bookmarks,
        },
        loading: false,
      };
    case UPDATE_LIKES_INREADING:
      return {
        ...state,
        post: { ...state.post, likes: payload.likes },
        posts: state.posts.map((post) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        loading: false,
      };
    case UPDATE_BOOKMARKS_INREADING:
      return {
        ...state,
        post: { ...state.post, bookmarks: payload.bookmarks },
        posts: state.posts.map((post) =>
          post._id === payload.id
            ? { ...post, bookmarks: payload.bookmarks }
            : post
        ),
        loading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: payload.data },
        posts: state.posts.map((post) =>
          post._id === payload.id ? { ...post, comments: payload.data } : post
        ),
        loading: false,
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            (comment) => comment._id !== payload.commentId
          ),
        },
        posts: state.posts.map((post) =>
          post._id === payload.postId
            ? {
                ...post,
                comments: post.comments.filter(
                  (comment) => comment._id !== payload.commentId
                ),
              }
            : post
        ),
        loading: false,
      };
    default:
      return state;
  }
}
