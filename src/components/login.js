import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
//import Public from 'material-ui/svg-icons/social/public';
//import firebase from 'firebase';
import base from '../base';
import Auth_Login from './auth_login';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      uid: null,
      user: null,
      user_email: null
    }
    this.authenticate = this.authenticate.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.logout = this.logout.bind(this);
  }
  componentDidMount() {
    base.onAuth((user) => {
      if (user) {
        this.authHandler(null, { user });
      }
    });
  }
  authenticate(provider) {
    console.log(`Trying to log in with ${provider}`);
    base.authWithOAuthPopup(provider, this.authHandler);
  }
  authHandler(err, authData) {
    if (err) {
      console.log(err);
      return (
        <div>
          { err }
          <p>Refresh the browser.</p>
        </div>
      )
    }
    const userRef = base.database().ref(authData.user.uid);
    userRef.once('value', (snapshot) => {
      const data = snapshot.val() || {};
      //console.log(data);
      if (!data.user) {
        userRef.set({
          user: authData.user.uid,
          user_email: authData.user.email || 'N/A'
        });
      }
      this.setState({
        uid: authData.user.uid,
        user: data.user || authData.user.uid,
        user_email: authData.user.email
      });
    });
  }
  logout() {
    const { user } = this.state;
    base.unauth();
    this.setState({ uid: null });
    localStorage.clear();
    // this.props.history.push(`/`);
    this.context.router.push(`/`);
  }
  render() {
    const { uid, user } = this.state;
    const logout = <MuiThemeProvider><RaisedButton backgroundColor="white" padding="10px" className="logout_button" onClick={this.logout}>Logout</RaisedButton></MuiThemeProvider>;
    if (!uid) {
      return <Auth_Login authenticate={this.authenticate}/>
    }
    if (uid !== user) {
      return
      <div>
        Sorry you are already logged in with a different provider.
        {logout}
      </div>
    }
    // this.props.history.push(`/user/${user}`);
    this.context.router.push(`/user/${user}`);
    return (
      <div className="loading_page">
        <p>Loading...</p>
      </div>
    )
  }
}

Login.contextTypes = {
  router: React.PropTypes.object.isRequired
};
