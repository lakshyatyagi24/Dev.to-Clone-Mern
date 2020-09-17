import { GET_TAGS, TAGS_ERROR } from '../actions/types';

const initialState = {
  tags: [],
  loading: true,
  error: {},
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_TAGS:
      return {
        ...state,
        loading: false,
        tags: payload,
      };
    case TAGS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        tags: [],
      };
    default:
      return state;
  }
}
