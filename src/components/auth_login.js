import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import Public from 'material-ui/svg-icons/social/public';

export default class Auth_Login extends Component {
  render() {
    const styles = {
      world: {
        color: 'white',
        height: '75px',
        width: 'auto',
        margin: '10px 0 10px 0'
      },
      button: {
        width: '20vw',
        margin: '10px 0 10px 0',
        boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.12), 0px 2px 2px 0px rgba(0,0,0,0.24)'
      }
    }
    return (
      <nav className="login_page">
        <h2>World News</h2>
        <MuiThemeProvider>
          <Public className="world" style={styles.world} />
        </MuiThemeProvider>
        <p>Login in here</p>
        <MuiThemeProvider><RaisedButton className="login_button" backgroundColor="white" style={styles.button} onClick={()=> this.props.authenticate('google')}>Gmail</RaisedButton></MuiThemeProvider>
        <MuiThemeProvider><RaisedButton className="login_button" backgroundColor="#82d465" style={styles.button} onClick={()=> this.props.authenticate('github')}>Github</RaisedButton></MuiThemeProvider>
        <MuiThemeProvider><RaisedButton className="login_button" backgroundColor="#5ea9dd" style={styles.button} onClick={()=> this.props.authenticate('twitter')}>Twitter</RaisedButton></MuiThemeProvider>
      </nav>
    )
  }
}
