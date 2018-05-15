import axios from 'axios';

export const FETCH_NEWS = 'FETCH_NEWS';
export const TERM_SEARCH = 'TERM_SEARCH';
export const PROVIDER_SEARCH = 'PROVIDER_SEARCH';
export const CHANGE_BOOLEAN = 'CHANGE_BOOLEAN';
export const SEARCH_BOOLEAN = 'SEARCH_BOOLEAN';
export const REFRESH_NEWS = 'REFRESH_NEWS';

const API_KEY = '&apiKey=3ff7d22ae888425aab3d1d350fb671c4',
      API_URL = 'https://newsapi.org/v2/top-headlines?',
      API_URL_SEARCH = 'https://newsapi.org/v2/everything?q=',
      API_URL_PROVIDER = 'https://newsapi.org/v2/top-headlines?sources=';

export function fetchNews() {

  const todays_news = axios.get(`${API_URL}country=us${API_KEY}`);

  return {
    type: FETCH_NEWS,
    payload: todays_news
  }
}

export function termSearch(term, date) {

  const term_results = axios.get(`${API_URL_SEARCH}${term}&from=${date}&to=${date}&sortBy=popularity${API_KEY}`);

  return {
    type: TERM_SEARCH,
    payload: term_results
  }
}

export function providerSearch(value) {

  const provider_news = axios.get(`${API_URL_PROVIDER}${value}${API_KEY}`);
  return {
    type: PROVIDER_SEARCH,
    payload: provider_news
  }
}

export function changeBoolean(boolean) {
  let changed_boolean = !boolean;
  return {
    type: CHANGE_BOOLEAN,
    payload: changed_boolean
  }
}

export function searchBoolean(boolean) {
  let search_boolean = !boolean;
  return {
    type: SEARCH_BOOLEAN,
    payload: search_boolean
  }
}

export function refreshNews(boolean) {
  let refresh_news_boolean = !boolean;
  return {
    type: REFRESH_NEWS,
    payload: refresh_news_boolean
  }
}
