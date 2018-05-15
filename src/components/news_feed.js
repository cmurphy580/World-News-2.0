import React, { Component } from 'react';

import Article from './article';
import base from '../base';

export default class NewsFeed extends Component {
  state = {
    news: []
  }
  componentWillMount() {
    const { todays_news } = this.props;
    const { userID } = this.props.params;
    const userRef = base.database().ref(`${userID}/news`);
    userRef.on('value', (snapshot) => {
      //console.log('snapshot', snapshot.val());
      const data = snapshot.val();
      if (data) {
        this.setState({
          news: data
        });
      } else {
        this.setState({
          news: todays_news.news
        });
      }
    });
  }
  componentDidMount() {
    const { todays_news } = this.props;
    const { news } = this.state;
    const { userID } = this.props.params;
    this.ref = base.syncState(`${userID}/news`,
      {
        context: this,
        state: 'news'
      });
    //console.log('news', news);
  }
  componentDidUpdate() {
    const { todays_news, provider_news, term_results } = this.props;
    const { news } = this.state;
    const now = Math.floor(Date.now() / 1000);
    const { refresh_news_boolean } = this.props

    const active_articles = !provider_news && !term_results && !news || todays_news.timestamp === now ?
                            todays_news.news :
                            provider_news && !term_results ?
                            provider_news.news :
                            !provider_news && term_results ?
                            term_results.news :
                            provider_news && term_results &&
                            term_results.timestamp > provider_news.timestamp ?
                            term_results.news :
                            provider_news && term_results &&
                            provider_news.timestamp > term_results.timestamp ?
                            provider_news.news :
                            news;

    //console.log('active', active_articles);
    this.setState({ news: active_articles });
  }
  componentWillUnmount() {
    console.log('umnout')
    base.removeBinding(this.ref);
  }
  render() {
    const { news } = this.state;
    const { todays_news } = this.props;
    let articles = !todays_news.news ? [] : [...news];
    console.log('char', articles, news);
    if (articles.length === 0) {
      return <div>Loading...</div>
    }
    return (
      <section className="news_feed">
        { news.map((article, i) => <Article key={i} i={i} article={article} {...this.props} />) }
      </section>
    );
  }
}
