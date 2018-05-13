import { SET_RECENT_PHRASES, SET_POPULAR_PHRASES } from '~/actions/home';

const initialState = {
  recentPhrases: [],
  popularPhrases: []
};

export default function homeReducer(state = initialState, action) {
  switch (action.type) {
    case SET_RECENT_PHRASES:
      return { ...state, recentPhrases: action.payload.phrases };
    case SET_POPULAR_PHRASES:
      return { ...state, popularPhrases: action.payload.phrases };
    default:
      return state;
  }
}
