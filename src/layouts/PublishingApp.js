"use strict";

import React from 'react';
import Falcor from 'falcor';
import falcorModel from '../falcorModel.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import articleActions from '../actions/article.js';
import ArticleCard from '../components/ArticleCard';

const mapStateToProps = (state) => ({
	...state
});

const mapDispatchToProps = (dispatch) => ({
  articleActions: bindActionCreators(articleActions, dispatch)
});

class PublishingApp extends React.Component {
  constructor(props) {
    super(props);
  }
  
  componentWillMount() {
    if(typeof window !== 'undefined') {
      this._fetch(); // we are server side rendering, no fetching
    }
  }

  async _fetch() {
    let articlesLength = await falcorModel.
      getValue("articles.length").
      then(function(length) {  
        return length;
      });

    let articles = await falcorModel.
      get(['articles', {from: 0, to: articlesLength-1}, ['_id','articleTitle', 'articleContent', 'articleContentJSON']]). 
      then(function(articlesResponse) {  
        return articlesResponse.json.articles;
      });

    console.debug('articles');
    console.debug(JSON.stringify(articles));
    console.debug(typeof articles[0].articleContentJSON.entityMap);

    this.props.articleActions.articlesList(articles);
  }

  render () {

    let articlesJSX = [];

    this.props.article.forEach((articleDetails, articleKey) => {
      let currentArticleJSX = (
        <div key={articleKey}>
          <ArticleCard 
            title={articleDetails.articleTitle}
            content={articleDetails.articleContent} />
        </div>
      );

      articlesJSX.push(currentArticleJSX);
    });

    return (
      <div style={{height: '100%', width: '75%', margin: 'auto'}}>
          {articlesJSX}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PublishingApp);