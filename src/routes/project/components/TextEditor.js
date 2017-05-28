import React, { Component } from 'react';
import classNames from 'classnames';

import Editor from 'draft-js-plugins-editor';
import { EditorState, RichUtils, getVisibleSelectionRect, convertToRaw, convertFromRaw } from 'draft-js'
import createCounterPlugin from 'draft-js-counter-plugin';

const counterPlugin = createCounterPlugin();
const { CharCounter, WordCounter, CustomCounter } = counterPlugin;
const plugins = [counterPlugin];


class StyleButton extends Component {

  onToggle = (e) => {
    e.preventDefault();
    this.props.onToggle(this.props.style);
  };

  render() {
    const toolbarItem = classNames({
      'toolbarItem': true,
      'active': this.props.active
    });

    return (
      <div className={toolbarItem} onClick={this.onToggle}>
        {this.props.label}
      </div>
    );
  }
}

const styleTypes = [
  {initial: 'B', label: 'Bold', style: 'BOLD'},
  {initial: 'I', label: 'Italic', style: 'ITALIC'},
  {initial: 'U', label: 'Underline', style: 'UNDERLINE'},
  {initial: 'S', label: 'Strikethrough', style: 'STRIKETHROUGH'}
];

const InlineStyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();
  const { condensed } = props;

  return (
    <div className="InlineStyleControls">
      {styleTypes.map(type =>
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={condensed ? type.initial : type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};


export default class TextEditor extends Component {
  constructor(props) {
    super(props);

    const { content } = this.props;
    if(content === undefined) {
      this.state = { editorState: EditorState.createEmpty() };
    } else {
      const editorContent = convertFromRaw(content);
      this.state = { editorState: EditorState.createWithContent(editorContent) };
    }
  }

  focus = () => this.refs.editor.focus();

  onChange = (editorState) => {
    this.setState({ editorState });

    // export data to a raw format and save to database
    const contentState = editorState.getCurrentContent();
    const editorContentRaw = convertToRaw(contentState);
    this.props.save({ editorContent: editorContentRaw });
  }

  toggleBlockType = (blockType) => {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  toggleInlineStyle = (inlineStyle) => {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }

  handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  displayContextualMenu = () => {
    const selectedText = getVisibleSelectionRect(window);
    const toolbar = this.refs.toolbar.getBoundingClientRect()
    const toolbarParent = this.refs.toolbarParent.getBoundingClientRect()

    if (selectedText !== null && selectedText.width > 2) {
      this.setState({
        styles: {
          opacity: 1,
          left: selectedText.left -toolbarParent.left - toolbar['width']/2 + selectedText.width/2,
          top: selectedText.top - toolbarParent.top - toolbar['height']*1.25,
          visibility: 'visible'
        }
      });
    } else {
      this.hideContextualMenu();
    }
  }

  hideContextualMenu = () => {
    this.setState({ styles: { opacity: 0 , visibility: 'hidden'}})
  }

  averageReadingTime(str) {
    const wordArray = str.match(/\S+/g);  // matches words according to whitespace
    return wordArray ? (new Date((wordArray.length/3) * 1000)).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0] : "00:00:00"
  }

  render() {
    const { editorState, styles } = this.state;

    return (
      <div className='TextEditor' ref='toolbarParent'>
        <div className="ContextualToolbar" style={styles} ref='toolbar'>
          <InlineStyleControls
            condensed
            editorState={editorState}
            onToggle={this.toggleInlineStyle}
          />
        </div>
        <h1>Script</h1>
        <div className='content' onMouseUp={this.displayContextualMenu}>
          <div className='Editor' onClick={this.focus}>
            <Editor
              editorState={editorState}
              handleKeyCommand={this.handleKeyCommand}
              onChange={this.onChange}
              placeholder="Start writing here..."
              plugins={plugins}
              ref="editor"
              spellCheck={true}
            />
          </div>
          <div className="Toolbar">
            <InlineStyleControls
              editorState={editorState}
              onToggle={this.toggleInlineStyle}
            />
            <div className="stats">
              <div><CharCounter /> characters</div>
              <div><WordCounter /> words</div>
              <div>Reading time{" "}<CustomCounter countFunction={this.averageReadingTime} /></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
