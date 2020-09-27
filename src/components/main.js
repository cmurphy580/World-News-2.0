import React, { Component } from 'react';

import Header from './header';
//import SelectMenu from './selectmenu';
//import Bookmarked from './bookedmarked'
//import AccountInfo from './accountInfo'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import Public from 'material-ui/svg-icons/social/public';
import base from '../base';

export default class Main extends Component {
  constructor() {
    super();

    this.logout = this.logout.bind(this);
  }
  componentWillMount() {
    this.props.fetchNews();
  }
  logout() {
    base.unauth();
    this.props.history.push(`/`);
  }
  render() {
    const logout = <MuiThemeProvider><RaisedButton backgroundColor="white" className="logout_button" onClick={this.logout}>Logout</RaisedButton></MuiThemeProvider>;
    const { todays_news } = this.props;
    if (!todays_news) {
      return <div>Loading...</div>
    }
    return (
      <div>
        <Header {...this.props} />
        { React.cloneElement(this.props.children, this.props) }
        { logout }
      </div>
    );
  }
}

Main.contextTypes = {
  router: React.PropTypes.object.isRequired
};
