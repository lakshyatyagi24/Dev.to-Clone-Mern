import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  ACCOUNT_DELETED,
  UPDATE_USER,
  USER_DELETE_POST,
  USER_ADD_POST,
  USER_BOOKMARK,
  USER_UNBOOKMARK,
} from '../actions/types';
import { pad } from 'lodash';

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
      const {
        date,
        title,
        likesCount,
        bookmarksCount,
        commentsCount,
        _id,
        content,
      } = payload;
      return {
        ...state,
        user: {
          ...state.user,
          posts: [
            {
              date,
              title,
              content,
              likesCount,
              bookmarksCount,
              commentsCount,
              _id,
            },
            ...state.user.posts,
          ],
          postCount: state.user.postCount + 1,
        },
        loading: false,
      };
    case USER_BOOKMARK:
      const { name, avatar, id } = payload.data;
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          bookMarkedPostsCount: state.user.bookMarkedPostsCount + 1,
          bookMarkedPosts: [
            {
              user: {
                name,
                avatar,
              },
              _id: id,
              date: payload.data.date,
              title: payload.data.title,
            },
            ...state.user.bookMarkedPosts,
          ],
        },
      };
    case USER_UNBOOKMARK:
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          bookMarkedPostsCount: state.user.bookMarkedPostsCount - 1,
          bookMarkedPosts: state.user.bookMarkedPosts.filter(
            (item) => item._id !== payload.data.id
          ),
        },
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
