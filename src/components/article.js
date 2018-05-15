import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import IconButton from 'material-ui/IconButton'
import Launch from 'material-ui/svg-icons/action/launch';
import KeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';

export default class Article extends Component {
  constructor(props) {
    super(props);

    this.backToList = this.backToList.bind(this);
    this.expandArticle = this.expandArticle.bind(this);
  }
  componentDidMount() {
    const article_wraps = document.querySelectorAll('.article_wrap');
    if (article_wraps) {
      article_wraps.forEach(wrap => wrap.addEventListener('mouseover', function() {
        this.style.boxShadow = '0px 0px 8px 0px rgba(0,0,0,0.12), 0px 8px 8px 0px rgba(0,0,0,0.24)';
      }));
      article_wraps.forEach(wrap => wrap.addEventListener('mouseleave', function() {
        this.style.boxShadow = '';
      }));
      window.addEventListener('scroll', function() {
        article_wraps.forEach(wrap => {
          const wrapCoords = wrap.getBoundingClientRect();
          //console.log({scroll: window.scrollY, top: wrapCoords.top, bottom: wrapCoords.bottom})
          wrapCoords.bottom < window.scrollY < wrapCoords.top ?
            wrap.style.boxShadow = '0px 0px 8px 0px rgba(0,0,0,0.12), 0px 8px 8px 0px rgba(0,0,0,0.24)'
            : wrap.style.boxShadow = '';
        });
      });
    }
  }
  componentDidUpdate() {
    const { search_boolean, i } = this.props;
    if (search_boolean) {
      this.backToList(event);
      this.props.searchBoolean(this.props.search_boolean);
      window.scrollTo(0, 0);
    }
  }
  backToList(event) { //import function
    const { article, i } = this.props;
    const news_header = document.querySelector('.news_header');
    const wraps = document.querySelectorAll('.article_wrap');
    const news_feed_wrap = document.querySelector('.news_feed');
    wraps.forEach(wrap => { wrap.style.animation = '' });
    wraps.forEach((wrap, idx) => {
      if (idx === i) {
        wrap.children[0].lastChild.style.display = 'none';
        wrap.children[0].lastChild.style.height = '0';
        wrap.children[0].firstChild.style.fontSize = '12px';
        wrap.style.margin = '';
        wrap.style.backgroundAttachment = '';
        wrap.style.height = '';
        wrap.style.width = '';
        wrap.style.transition = 'height 0.325s cubic-bezier(0.4, 0.0, 0.2, 1), width 0.275s cubic-bezier(0.4, 0.0, 0.2, 1) 0.06s, box-shadow 0.2s ease';
      } else {
        wrap.style.display = 'flex';
      }
    });
    news_feed_wrap.style.padding = '';
    document.querySelector('.logout_button').style.display = '';
    window.scrollTo(0, wraps[i].offsetTop - news_header.offsetHeight);
    event.stopPropagation();
  }
  expandArticle(event) { //import function
    const { article, i } = this.props;
    const wraps = document.querySelectorAll('.article_wrap');
    const news_feed_wrap = document.querySelector('.news_feed');
    news_feed_wrap.style.padding = '0 0 0 0';
    document.querySelector('.logout_button').style.display = 'none';
    wraps.forEach((wrap, idx) => {
      if (idx !== i) {
        wrap.style.display = 'none';
      } else {
        wrap.style.transition = 'width 0.275s cubic-bezier(0.4, 0.0, 0.2, 1), height 0.325s cubic-bezier(0.4, 0.0, 0.2, 1) 0.0375s'; ///
        wrap.style.width = '100vw';
        wrap.style.height = '140vh';
        wrap.style.backgroundAttachment = 'fixed';
        wrap.style.margin = '0 0 0 0';
      }
    });
    setTimeout(() => {
      wraps.forEach((wrap, idx) => {
        if (idx === i) {
          wrap.children[0].lastChild.style.display = 'inline';
          wrap.children[0].lastChild.style.height = 'auto';
          wrap.children[0].firstChild.style.fontSize = '16px';
        }
      });
    }, 475);
  }
  render() {
    const { article, i } = this.props;
    const styles = {
      icons: {
        cursor: 'pointer',
        fontSize: '35px !important'
      }
    };
    return (
     <div className="article_wrap" onClick={this.expandArticle} style={{ backgroundImage: `url(${article.urlToImage})`, animationDelay: `${0.2 * i}s`}} key={i}>
       <div className="title_wrap">
            <h1 className="title">{article.title}</h1>
            <div className="author_sub">
              {article.author}
            </div>
            <div className="description">
              <hr />
              <p className="content">{article.description}</p>
              <div className="article_icons">
                <MuiThemeProvider>
                  <IconButton onClick={(event) => this.backToList(event)} className="arrow_back" ><KeyboardArrowLeft style={styles.icons}/></IconButton>
                </MuiThemeProvider>
                <MuiThemeProvider>
                  <a className="launch" target="_blank" href={article.url}><IconButton><Launch style={styles.icons}/></IconButton></a>
                </MuiThemeProvider>
              </div>
            </div>
       </div>
     </div>
    );
  }
}
