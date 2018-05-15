import { FETCH_NEWS } from '../actions';

export default function(state=null, action) {
  switch(action.type) {
    case FETCH_NEWS:
    const now = Math.floor(Date.now() / 1000),
          news = { news: action.payload.data.articles, timestamp: now };
      //console.log({news: action.payload.data.articles});
      //return action.payload.data.articles;
      return news;
    default:
      return state;
  }
}
