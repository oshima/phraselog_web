import {
  SET_USER,
  SET_USER_PHRASES,
  SET_USER_LIKED_PHRASES,
  SET_ACTIVE_TAB,
  RESET_PROFILE
} from '~/actions/profile';

const initialState = {
  user: null,
  userPhrases: [],
  userLikedPhrases: [],
  activeTab: 0
};

export default function profileReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload.user };
    case SET_USER_PHRASES:
      return { ...state, userPhrases: action.payload.phrases };
    case SET_USER_LIKED_PHRASES:
      return { ...state, userLikedPhrases: action.payload.phrases };
    case SET_ACTIVE_TAB:
      return { ...state, activeTab: action.payload.number };
    case RESET_PROFILE:
      return initialState;
    default:
      return state;
  }
}
