import { CHANGE_BOOLEAN } from '../actions';

export default function(state = null, action) {
  switch(action.type) {
    case CHANGE_BOOLEAN:
      return action.payload;
    default:
      return state;
  }
}
