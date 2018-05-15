import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import items from '../helpers/menu_items';
import { orange500, grey300 } from 'material-ui/styles/colors';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      term: '',
      value: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }
  handleChange = (event, index, value) => {
    this.setState({value});
    this.props.providerSearch(value);
    this.props.changeBoolean(this.props.boolean);
    this.props.searchBoolean(this.props.search_boolean);
    //console.log(this.props.search_boolean);
    //this.backToList(event);
    window.scrollTo(0, 0);
  };
  onInputChange = (event, value) => { this.setState({ term: event.target.value })};
  onFormSubmit = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      let today = new Date(),
          year = today.getFullYear(),
          month = today.getMonth() + 1 < 10 ? `0${today.getMonth() + 1}` : `${today.getMonth() + 1}`,
          day = today.getDate() < 10 ? `0${today.getDate()}` : `${today.getDate()}`,
          date = `${year}-${month}-${day}`;
      console.log(date);
      this.props.termSearch(this.state.term, date);
      this.props.changeBoolean(this.props.boolean);
      this.props.searchBoolean(this.props.search_boolean);
      this.setState({
        term: null,
        value: null
      });
      window.scrollTo(0, 0);
    }
  }
  render() {
    const styles = {
      searchBar: {
        top: this.props.boolean ? '65px' : '-100%',
        transition: 'top 0.5s ease-out',
        backgroundColor: grey300,
        boxShadow: 'inset 0px 2px 10px 0px rgba(0,0,0,0.15), 0px 1px 10px 0px rgba(0,0,0,0.15)',
        position: 'fixed',
        zIndex: '3'
      },
      underlineStyle: {
        borderColor: orange500
      },
      selectedStyle: {
        color: orange500
      }
    }
    return (
      <MuiThemeProvider>
        <AppBar
          style={styles.searchBar}
          className="search_bar"
          iconClassNameLeft="none"
          >
          <SelectField
            value={this.state.value}
            onChange={this.handleChange}
            selectedMenuItemStyle={styles.selectedStyle}
            floatingLabelText="News Provider"
          >
            {items}
          </SelectField>
          <TextField
            underlineFocusStyle={styles.underlineStyle}
            hintText="Search News"
            value={this.state.term}
            onChange={event => this.onInputChange(event)}
            onKeyDown={event => this.onFormSubmit(event)}
          />
        </AppBar>
      </MuiThemeProvider>
    );
  }
}
