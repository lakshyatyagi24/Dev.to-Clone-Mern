import { GET_NOTIFICATIONS } from '../actions/types';

const initialState = {
  notifications: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_NOTIFICATIONS:
      return {
        ...state,
        loading: false,
        notifications: payload,
      };
    default:
      return state;
  }
}
