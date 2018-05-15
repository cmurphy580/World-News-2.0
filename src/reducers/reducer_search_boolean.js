import { SEARCH_BOOLEAN } from '../actions';

export default function(state = null, action) {
  switch(action.type) {
    case SEARCH_BOOLEAN:
      return action.payload;
    default:
      return state;
  }
}
