import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import TodayReducer from './reducer_today';
import TermReducer from './reducer_term';
import ProviderReducer from './reducer_provider';
import BooleanReducer from './reducer_boolean';
import SearchBooleanReducer from './reducer_search_boolean';
import RefreshNewsReducer from './reducer_refresh_news'; 

const rootReducer = combineReducers({
  todays_news: TodayReducer,
  term_results: TermReducer,
  provider_news: ProviderReducer,
  boolean: BooleanReducer,
  search_boolean: SearchBooleanReducer,
  refresh_news_boolean: RefreshNewsReducer,
  routing: routerReducer
});

export default rootReducer;
