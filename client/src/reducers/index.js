import { combineReducers } from 'redux';
import auth from './auth';
import profile from './profile';
import post from './post';
import tags from './tags';

export default combineReducers({
  auth,
  profile,
  post,
  tags,
});
