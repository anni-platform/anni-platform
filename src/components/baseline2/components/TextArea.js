import React, { Component } from 'react';
import classNames from 'classnames';
import ContentEditable from 'react-contenteditable';
import { stripTags } from 'utils';

export class TextArea extends Component {
  constructor(props) {
    super();
    this.state = {
      html: props.html,
      originalHTML: props.html,
      isFocused: false
    }
  }

  handleChange = (e) => {
    this.setState({ html: e.target.value });
  }

  focus = () => {
    this.setState({ isFocused: true });
  }

  blur = () => {
    this.setState({ isFocused: false });
  }

  save = () => {
    const html = this.state.html;
    this.props.save({
      text: stripTags(html),
      html
    });
    this.setState({ originalHTML: html, isFocused: false });
  }

  cancel = () => {
    this.setState({ html: this.props.html, isFocused: false });
  }

  render() {
    let editing = stripTags(this.state.originalHTML) !== stripTags(this.state.html);


    const styles = classNames({
      'TextArea': true,
      active: editing || this.state.isFocused
    });

    return(
      <div className={styles}>
        <ContentEditable
          disabled={false}
          html={this.state.html}
          onChange={this.handleChange}
          onFocus={this.focus}
          onBlur={this.blur}
        />
      </div>
    );
  }
}
