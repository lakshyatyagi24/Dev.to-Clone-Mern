import { combineReducers } from 'redux';
import auth from './auth';
import profile from './profile';
import post from './post';
import tags from './tags';
import notify from './notify';

export default combineReducers({
  auth,
  profile,
  post,
  tags,
  notify,
});
