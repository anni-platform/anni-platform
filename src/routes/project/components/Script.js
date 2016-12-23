import React, { Component } from 'react';
import ReactQuill from 'react-quill-v2';

class Script extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  render() {
    return (
      <div className='script'>
        <div>
          <h1>Script</h1>
          <ReactQuill theme="snow"
                  value={this.state.text}
                  onChange={this.onTextChange} />
          <div className='border' />
        </div>
      </div>
    )
  }
}

export default Script;
