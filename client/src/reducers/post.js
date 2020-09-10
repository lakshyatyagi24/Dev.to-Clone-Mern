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
  EDIT_COMMENT,
  FOLLOW,
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
  let i;
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
      let postLengths = state.posts.length;
      for (i = 0; i < postLengths; ++i) {
        if (state.posts[i]._id === payload) {
          state.posts.splice(i, 1);
          break;
        }
      }
      return {
        ...state,
        posts: [...state.posts],
        loading: false,
      };
    case FOLLOW:
      return {
        ...state,
        loading: false,
        post: {
          ...state.post,
          user: {
            ...state.post.user,
            followers: payload.followers,
            followersCount: payload.followersCount,
          },
        },
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPDATE_BOOKMARKS:
      let data;
      let postLength = state.posts.length;
      for (i = 0; i < postLength; ++i) {
        if (state.posts[i]._id === payload.id) {
          data = state.posts[i];
          break;
        }
      }
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id
            ? {
                ...post,
                bookmarks: payload.bookmarks,
                bookmarksCount: payload.bookmarksCount,
              }
            : post
        ),
        post: {
          ...data,
          bookmarks: payload.bookmarks,
          bookmarksCount: payload.bookmarksCount,
        },
        loading: false,
      };
    case UPDATE_LIKES_INREADING:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id
            ? { ...post, likes: payload.likes, likesCount: payload.likesCount }
            : post
        ),
        post: {
          ...state.post,
          likes: payload.likes,
          likesCount: payload.likesCount,
        },
        loading: false,
      };
    case UPDATE_BOOKMARKS_INREADING:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id
            ? {
                ...post,
                bookmarks: payload.bookmarks,
                bookmarksCount: payload.bookmarksCount,
              }
            : post
        ),
        post: {
          ...state.post,
          bookmarks: payload.bookmarks,
          bookmarksCount: payload.bookmarksCount,
        },
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
        posts: state.posts.map((post) =>
          post._id === payload.id
            ? {
                ...post,
                comments: payload.data,
                commentsCount: payload.commentsCount,
              }
            : post
        ),
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
      let comtLength = state.post.comments.length;
      for (i = 0; i < comtLength; ++i) {
        if (state.post.comments[i]._id === payload.commentId) {
          state.post.comments.splice(i, 1);
          break;
        }
      }
      return {
        ...state,
        post: {
          ...state.post,
          commentsCount: payload.commentsCount,
        },
        posts: state.posts.map((post) =>
          post._id === payload.postId
            ? {
                ...post,
                comments: [...state.post.comments],
                commentsCount: payload.commentsCount,
              }
            : post
        ),
        loading: false,
      };
    default:
      return state;
  }
}
