import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/index';
import Main from './main';

function mapStateToProps(state) {
  return {
    todays_news: state.todays_news,
    term_results: state.term_results,
    provider_news: state.provider_news,
    boolean: state.boolean,
    search_boolean: state.search_boolean
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const App = connect(mapStateToProps, mapDispatchToProps)(Main);

export default App;
