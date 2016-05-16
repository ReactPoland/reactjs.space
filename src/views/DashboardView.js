"use strict";

import React from 'react';
import { Link } from 'react-router';
import Falcor from 'falcor';
import falcorModel from '../falcorModel.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const mapStateToProps = (state) => ({
	...state
});

const mapDispatchToProps = (dispatch) => ({

});


import { List, ListItem } from 'material-ui/lib/lists';
import Avatar from 'material-ui/lib/avatar';
import ActionInfo from 'material-ui/lib/svg-icons/action/info';
import FileFolder from 'material-ui/lib/svg-icons/file/folder';
import RaisedButton from 'material-ui/lib/raised-button';
import Divider from 'material-ui/lib/divider';


class DashboardView extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    
    let articlesJSX = [];
    this.props.article.forEach((articleDetails, articleKey) => {
      let currentArticleJSX = (
        <Link to={`/edit-article/${articleDetails['_id']}`}>
          <ListItem
            key={articleKey}
            leftAvatar={<img src="/static/placeholder.png" width="50" height="50" />}
            primaryText={articleDetails.articleTitle}
            secondaryText={articleDetails.articleContent}
          />
        </Link>
      );

      articlesJSX.push(currentArticleJSX);
    });

    return (
      <div style={{height: '100%', width: '75%', margin: 'auto'}}>
        <Link to='/add-article'>
          <RaisedButton 
            label="Create an article" 
            secondary={true} 
            style={{margin: '20px 20px 20px 20px'}} />
        </Link>

        <List>
          {articlesJSX}
        </List>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardView);