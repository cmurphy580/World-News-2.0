import { TERM_SEARCH } from '../actions';

export default function(state = null, action) {
  switch(action.type) {
    case TERM_SEARCH:
      //console.log({news: action.payload});
      const now = Math.floor(Date.now() / 1000),
            news = { news: action.payload.data.articles, timestamp: now };
      return news; 
      //return action.payload.data.articles;
    default:
      return state;
  }
}
