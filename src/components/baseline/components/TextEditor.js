import React, { Component } from 'react';
import ContentEditable from 'react-contenteditable';
import { stripTags } from 'utils';
import { Button } from 'components/baseline';

export class TextEditor extends Component {
  constructor(props) {
    super();
    this.state = {
      html: props.html,
      originalHTML: props.html
    }
  }
  handleChange(e) {
    this.setState({ html: e.target.value });
  }
  save() {
    const html = this.state.html;
    this.props.save({
      text: stripTags(html),
      html
    });
    this.setState({ originalHTML: html });
  }
  render() {
    const editing = stripTags(this.state.originalHTML) !== stripTags(this.state.html);
    const saveButton = editing ? <Button onClick={this.save.bind(this)}>Save</Button> : null;
    return (<div>
              <ContentEditable
                html={this.state.html}
                disabled={false}       // use true to disable editing
                onChange={this.handleChange.bind(this)}
              />
              {saveButton}
            </div>);
    
  }
}
