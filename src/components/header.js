import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import IconButton from 'material-ui/IconButton';
import KeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import Public from 'material-ui/svg-icons/social/public';
import SearchBar from './search_bar';
import { orange500, blue900 } from 'material-ui/styles/colors';
import base from '../base';

export default class Header extends Component {
  refreshPage() {
    window.scrollTo(0, 0);
    this.props.fetchNews();
    window.location.reload();
  }
  displaySearch(event) {
    this.props.changeBoolean(this.props.boolean);
    console.log('search');
  }
  render() {
    const styles = {
      headerStyle: {
        backgroundColor: blue900,
        position: 'fixed',
        zIndex: '4'
      },
      public: {
        color: 'white',
        cursor: 'pointer',
        height: '35px',
        width: 'auto'
      },
      arrow: {
        cursor: 'pointer'
      }
    };
    return (
      <section>
        <MuiThemeProvider>
          <AppBar
            title="World News"
            className="news_header"
            style={styles.headerStyle}
            iconElementLeft={<Public onClick={ (event) => this.refreshPage(event) } className="public" style={styles.public} hoverColor={orange500}/> }
            iconElementRight={<IconButton onClick={ (event) => this.displaySearch(event) } className="arrow_button" style={styles.button}><KeyboardArrowDown className="arrow" style={styles.arrow} /></IconButton>}
            >
            {/*<p>News from newsapi.org</p>*/}
          </AppBar>
        </MuiThemeProvider>
        <SearchBar {...this.props} />
      </section>
    );
  }
}
