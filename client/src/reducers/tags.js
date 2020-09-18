import {
  GET_TAGS,
  GET_POPULAR_TAGS,
  GET_WRITE_TAGS,
  TAGS_ERROR,
} from '../actions/types';

const initialState = {
  tags: [],
  tags_write: [],
  tags_popular: [],
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
    case GET_POPULAR_TAGS:
      return {
        ...state,
        loading: false,
        tags_popular: payload,
      };
    case GET_WRITE_TAGS:
      return {
        ...state,
        loading: false,
        tags_write: payload,
      };
    case TAGS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        tags: [],
        tags_write: [],
        tags_popular: [],
      };
    default:
      return state;
  }
}
