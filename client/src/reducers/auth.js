import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  ACCOUNT_DELETED,
  UPDATE_USER,
  USER_DELETE_POST,
  USER_ADD_POST,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_USER:
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case ACCOUNT_DELETED:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    case USER_DELETE_POST:
      return {
        ...state,
        user: {
          ...state.user,
          posts: state.user.posts.filter((post) => post._id !== payload),
          postCount: state.user.postCount - 1,
        },

        loading: false,
      };
    case USER_ADD_POST:
      return {
        ...state,
        user: {
          ...state.user,
          posts: [
            {
              date: payload.date,
              title: payload.title,
              likesCount: payload.likesCount,
              bookmarksCount: payload.bookmarksCount,
              commentsCount: payload.commentsCount,
              _id: payload._id,
            },
            ...state.user.posts,
          ],
          postCount: state.user.postCount + 1,
        },
        loading: false,
      };
    case AUTH_ERROR:
    case LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };

    default:
      return state;
  }
}
