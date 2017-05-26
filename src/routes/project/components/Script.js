import React, { Component } from "react";
import ReactQuill from "react-quill-v2";

class Script extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
  }

  render() {
    return (
      <div className="Script">
        <div className="content">
          <h1>Script</h1>
          <ReactQuill
            theme="snow"
            value={this.state.text}
            onChange={this.onTextChange}
          />
        </div>
      </div>
    );
  }
}

export default Script;
