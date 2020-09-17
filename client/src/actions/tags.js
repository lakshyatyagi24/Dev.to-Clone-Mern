import api from '../utils/api';

import { GET_TAGS, TAGS_ERROR } from './types';

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
