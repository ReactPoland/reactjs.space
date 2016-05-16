"use strict"; 
  
import React from 'react';
import { Link } from 'react-router';

import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';

const muiTheme = getMuiTheme({ userAgent: 'all' });

import RaisedButton from 'material-ui/lib/raised-button';
import AppBar from 'material-ui/lib/app-bar';

import ActionHome from 'material-ui/lib/svg-icons/action/home';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import articleActions from '../actions/article.js';

const mapStateToProps = (state) => ({
  ...state
});

const mapDispatchToProps = (dispatch) => ({
  articleActions: bindActionCreators(articleActions, dispatch)
});

class CoreLayout extends React.Component {
  static propTypes = {
    children : React.PropTypes.element
  }

  constructor(props) {
    super(props);

  }

  componentWillMount() {
    if(typeof window !== 'undefined' && !this.props.article.get) {
      this.props.articleActions.articlesList(this.props.article);
    }
  }

  render () {
    const buttonStyle = {
      margin: 5
    };
    const homeIconStyle = {
      margin: 5,
      paddingTop: 5
    };
    
    let menuLinksJSX;
    let userIsLoggedIn = typeof localStorage !== 'undefined' && localStorage.token && this.props.routes[1].name !== 'logout';
    
    if(userIsLoggedIn) {
      menuLinksJSX = (<span>
          <Link to='/dashboard'><RaisedButton label="Dashboard" style={buttonStyle}  /></Link> 
          <Link to='/logout'><RaisedButton label="Logout" style={buttonStyle}  /></Link> 
        </span>);
    } else {
      menuLinksJSX = (<span>
          <Link to='/register'><RaisedButton label="Register" style={buttonStyle}  /></Link> 
          <Link to='/login'><RaisedButton label="Login" style={buttonStyle}  /></Link> 
        </span>);
    }

    let homePageButtonJSX = (<Link to='/'>
        <RaisedButton label={<ActionHome />} style={homeIconStyle}  />
      </Link>);

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <AppBar
            title='Publishing App'
            iconElementLeft={homePageButtonJSX}
            iconElementRight={menuLinksJSX} />
            <br/>
            {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout);