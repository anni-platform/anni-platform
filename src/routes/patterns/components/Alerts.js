import React, { Component } from 'react';

import { Card } from 'styled';

export default class Alerts extends Component {
  state = {
    isDefault: false,
    isDanger: false
  };

  showDefault = () => {
    this.setState({
      isDefault: !this.state.isDefault,
      isDanger: false
    });
  };

  showDanger = () => {
    this.setState({
      isDanger: !this.state.isDanger,
      isDefault: false
    });
  };

  closeAlert = () => {
    this.setState({
      isDefault: false,
      isDanger: false
    });
  };

  render() {
    const { isDefault, isDanger } = this.state;

    return (
      <Card>
        {isDefault &&
          <div>
            <div className='message'>
              <p>
                <strong>Success! Configuration complete. </strong>
                {' '}
                Do you want to process the file you used to create the configuration?
              </p>
            </div>
            <div className='controls'>
              <button className='link' onClick={this.closeAlert}>
                Dismiss
              </button>
              <button>Process file</button>
            </div>
          </div>}

        {isDanger &&
          <div danger>
            <div className='message'>
              <p>
                <strong>Upload failed!</strong>
                {' '}
                Want to try to upload again?
              </p>
            </div>
            <div className='controls'>
              <button className='link' onClick={this.closeAlert}>
                Dismiss
              </button>
              <button>Upload again</button>
            </div>
          </div>}

        <div>
          <button onClick={this.showDefault}>Show Default Alert</button>
          <button onClick={this.showDanger}>Show Danger Alert</button>
        </div>
      </Card>
    );
  }
}
