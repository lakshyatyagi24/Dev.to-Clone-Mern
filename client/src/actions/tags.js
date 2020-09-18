import api from '../utils/api';

import {
  GET_TAGS,
  GET_POPULAR_TAGS,
  GET_WRITE_TAGS,
  TAGS_ERROR,
} from './types';

// get all tags
export const getTags = () => async (dispatch) => {
  try {
    const res = await api.get('/tags');

    dispatch({
      type: GET_TAGS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TAGS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// get popular tags
export const getPopularTags = () => async (dispatch) => {
  try {
    const res = await api.get('/tags/popular-tags');

    dispatch({
      type: GET_POPULAR_TAGS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TAGS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// get write tags
export const getWriteTags = () => async (dispatch) => {
  try {
    const res = await api.get('/tags/write-tags');

    dispatch({
      type: GET_WRITE_TAGS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TAGS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
