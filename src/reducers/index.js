import { combineReducers } from 'redux';
import authReducer from '~/reducers/auth';
import homeReducer from '~/reducers/home';
import profileReducer from '~/reducers/profile';
import playerReducer from '~/reducers/player';
import editorReducer from '~/reducers/editor';
import notificatorReducer from '~/reducers/notificator';

const rootReducer = combineReducers({
  auth: authReducer,
  home: homeReducer,
  profile: profileReducer,
  player: playerReducer,
  editor: editorReducer,
  notificator: notificatorReducer
});

export default rootReducer;
