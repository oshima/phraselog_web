import { combineReducers } from 'redux';
import authReducer from '~/reducers/auth';
import homeReducer from '~/reducers/home';
import profileReducer from '~/reducers/profile';
import editorReducer from '~/reducers/editor';
import notificatorReducer from '~/reducers/notificator';

const rootReducer = combineReducers({
  auth: authReducer,
  home: homeReducer,
  profile: profileReducer,
  editor: editorReducer,
  notificator: notificatorReducer
});

export default rootReducer;
