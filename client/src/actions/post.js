import api from '../utils/api';
import { toast } from 'react-toastify';
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
  GET_PROFILE,
} from './types';

// Get posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await api.get('/posts');

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add like
export const addLikeInReading = (id) => async (dispatch) => {
  try {
    const res = await api.put(`/posts/like/${id}`);
    dispatch({
      type: UPDATE_LIKES_INREADING,
      payload: { id, likes: res.data.likes, likesCount: res.data.likesCount },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    toast.error(err.response.data.msg);
  }
};

// Add book mark
export const addBookmarks = (id) => async (dispatch) => {
  try {
    const res = await api.put(`/posts/bookmarks/${id}`);
    dispatch({
      type: UPDATE_BOOKMARKS,
      payload: {
        id,
        bookmarks: res.data.bookmarks,
        bookmarksCount: res.data.bookmarksCount,
      },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });

    toast.error(err.response.data.msg);
  }
};

// Add book mark
export const addBookmarksInReading = (id) => async (dispatch) => {
  try {
    const res = await api.put(`/posts/bookmarks/${id}`);
    dispatch({
      type: UPDATE_BOOKMARKS_INREADING,
      payload: {
        id,
        bookmarks: res.data.bookmarks,
        bookmarksCount: res.data.bookmarksCount,
      },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    toast.error(err.response.data.msg);
  }
};

// Delete post
export const deletePost = (id) => async (dispatch) => {
  try {
    await api.delete(`/posts/${id}`);

    dispatch({
      type: DELETE_POST,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add post
export const addPost = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/posts', formData);

    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
    toast.success('Publish post complete!');
    return true;
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
    }
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    return false;
  }
};

// Get post
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/posts/${id}`);
    const { post, profile } = res.data;
    dispatch({
      type: GET_POST,
      payload: post,
    });
    dispatch({
      type: GET_PROFILE,
      payload: profile,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add comment
export const addComment = (postId, formData) => async (dispatch) => {
  try {
    const res = await api.post(`/posts/comment/${postId}`, formData);

    dispatch({
      type: ADD_COMMENT,
      payload: {
        id: postId,
        data: res.data.comments,
        commentsCount: res.data.commentsCount,
      },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    toast.error(err.response.data.msg);
  }
};

// Delete comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    const res = await api.delete(`/posts/comment/${postId}/${commentId}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: { commentId, postId, commentsCount: res.data.commentsCount },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    toast.error(err.response.data.msg);
  }
};
