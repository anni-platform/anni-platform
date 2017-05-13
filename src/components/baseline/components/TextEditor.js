import React, { Component } from 'react';
import ContentEditable from 'react-contenteditable';
import { stripTags } from 'utils';

export class TextEditor extends Component {
  constructor(props) {
    super();
    this.state = {
      html: props.html
    }
  }
  handleChange(e) {
    this.setState({ html: e.target.value });
  }
  save() {
    this.props.save(this.state.html);
  }
  render() {
    const content = (disable = false) => 
              <ContentEditable
                html={this.state.html}
                disabled={disable}       // use true to disable editing
                onChange={this.handleChange.bind(this)}
              />;
    const saveButton = <button onClick={this.save.bind(this)}>Save</button>;
    const editing = stripTags(this.props.html) !== stripTags(this.state.html);
    const editState = <div>{content()}{saveButton}</div>;
    return editing ? editState : content();
  }
}
