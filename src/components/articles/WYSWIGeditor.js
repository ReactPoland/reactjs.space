import React from 'react';
import {
  Editor, 
  EditorState, 
  ContentState, 
  RichUtils, 
  convertToRaw,
  convertFromRaw
} from 'draft-js';
import { BlockStyleControls, InlineStyleControls } from './wyswig/WYSWIGbuttons';

export default class  WYSWIGeditor extends React.Component {
  constructor(props) {
    super(props);

    let initialEditorFromProps;

    if(typeof props.initialValue === 'undefined' || typeof props.initialValue !== 'object') {
      initialEditorFromProps = EditorState.createWithContent(ContentState.createFromText(''));
    } else {
      let isInvalidObject = typeof props.initialValue.entityMap === 'undefined' || typeof props.initialValue.blocks === 'undefined';
      if(isInvalidObject) {
        alert(JSON.stringify(props.initialValue));
        alert('Error: Invalid article-edit object provided, exit');
        return;
      }
      let draftBlocks = convertFromRaw(props.initialValue);
      let contentToConsume = ContentState.createFromBlockArray(draftBlocks);
      initialEditorFromProps = EditorState.createWithContent(contentToConsume);
    }
     
    this.state = {
      editorState: initialEditorFromProps
    };

    this.focus = () => this.refs['WYSWIGeditor'].focus();
    this.onChange = (editorState) => { 
      var contentState = editorState.getCurrentContent();

      let contentJSON = convertToRaw(contentState);
      props.onChangeTextJSON(contentJSON, contentState);
      this.setState({editorState}) 
    };

    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
    this.toggleBlockType = (type) => this._toggleBlockType(type);
  }

  _handleKeyCommand(command) {
    const {editorState} = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }

  render() {
    const { editorState } = this.state;
    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();

    return (
      <div>
        <h4>{this.props.title}</h4>
        <div className="RichEditor-root">
          <BlockStyleControls
            editorState={editorState}
            onToggle={this.toggleBlockType} />
            
          <InlineStyleControls
            editorState={editorState}
            onToggle={this.toggleInlineStyle} />

          <div className={className} onClick={this.focus}>
            <Editor
              editorState={editorState}
              handleKeyCommand={this.handleKeyCommand}
              onChange={this.onChange}
              ref='WYSWIGeditor' />
          </div>
        </div>
      </div>
    );
  }
}





