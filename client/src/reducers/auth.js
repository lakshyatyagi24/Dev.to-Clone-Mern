import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  ACCOUNT_DELETED,
  UPDATE_USER,
  FOLLOW,
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
    case FOLLOW:
      return {
        ...state,
        user: {
          ...state.user,
          following: payload.following,
          followingCount: payload.followingCount,
        },
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
    case AUTH_ERROR:
    case LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    // case UPDATE_LIKES_INREADING:
    //   let postsLengthLike = state.user.posts.length;
    //   for (i = 0; i < postsLengthLike; ++i) {
    //     if (state.user.posts[i]._id === payload.id) {
    //       data = state.user.posts[i];
    //       break;
    //     }
    //   }
    //   return {
    //     ...state,
    //     loading: false,
    //     user: {
    //       ...state.user,
    //       posts: [{ ...data, likesCount: payload.likesCount }],
    //     },
    //   };
    // case UPDATE_BOOKMARKS_INREADING:
    //   let postsLengthBM = state.user.posts.length;
    //   for (i = 0; i < postsLengthBM; ++i) {
    //     if (state.user.posts[i]._id === payload.id) {
    //       data = state.user.posts[i];
    //       break;
    //     }
    //   }
    //   return {
    //     ...state,
    //     loading: false,
    //     user: {
    //       ...state.user,
    //       posts: [{ ...data, bookmarksCount: payload.bookmarksCount }],
    //     },
    //   };
    default:
      return state;
  }
}
