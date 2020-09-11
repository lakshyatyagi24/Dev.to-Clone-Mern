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
  EDIT_COMMENT,
  REPLY_COMMENT,
  REMOVE_REPLY_COMMENT,
  USER_DELETE_POST,
  USER_ADD_POST,
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
    await api.put(`/posts/like/${id}`);
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
    await api.put(`/posts/bookmarks/${id}`);
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
    await api.put(`/posts/bookmarks/${id}`);
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
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await api.delete(`/posts/${id}`);

      dispatch({
        type: DELETE_POST,
        payload: id,
      });
      dispatch({
        type: USER_DELETE_POST,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
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
    dispatch({
      type: USER_ADD_POST,
      payload: res.data,
    });
    toast.success('Publish post complete!');
    return true;
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    toast.error(err.response.data.msg);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
    }
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
      payload: { post, profile },
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
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
    }
  }
};

// Add comment
export const replyComment = (postId, commentId, formData) => async (
  dispatch
) => {
  try {
    const res = await api.post(
      `/posts/comment/${postId}/${commentId}`,
      formData
    );

    dispatch({
      type: REPLY_COMMENT,
      payload: {
        commentId,
        postId,
        data: res.data.reply,
        commentsCount: res.data.commentsCount,
      },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    toast.error(err.response.data.msg);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
    }
  }
};

// Edit comment
export const editComment = (postId, commentId, formData) => async (
  dispatch
) => {
  try {
    const res = await api.put(
      `/posts/comment/${postId}/${commentId}`,
      formData
    );

    dispatch({
      type: EDIT_COMMENT,
      payload: {
        id: postId,
        data: res.data,
      },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    toast.error(err.response.data.msg);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
    }
  }
};

// Edit reply comment
export const editReplyComment = (
  postId,
  commentId,
  comment_replyId,
  formData
) => async (dispatch) => {
  try {
    const res = await api.put(
      `/posts/comment-reply/${postId}/${commentId}/${comment_replyId}`,
      formData
    );

    dispatch({
      type: EDIT_COMMENT,
      payload: {
        id: postId,
        data: res.data,
      },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    toast.error(err.response.data.msg);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
    }
  }
};

// Delete comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
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
  }
};

// Delete reply comment
export const deleteReplyComment = (
  postId,
  commentId,
  comment_replyId
) => async (dispatch) => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      const res = await api.delete(
        `/posts/comment-reply/${postId}/${commentId}/${comment_replyId}`
      );

      dispatch({
        type: REMOVE_REPLY_COMMENT,
        payload: {
          commentId,
          postId,
          comment_replyId,
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
  }
};
