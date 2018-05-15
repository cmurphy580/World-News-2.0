import { PROVIDER_SEARCH } from '../actions';

export default function(state = null, action) {
  switch(action.type) {
    case PROVIDER_SEARCH:
      const now = Math.floor(Date.now() / 1000),
            news = { news: action.payload.data.articles, timestamp: now };
      //return action.payload.data.articles;
      return news;
    default:
      return state;
  }
}
