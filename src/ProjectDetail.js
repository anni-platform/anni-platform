import React, { Component } from 'react';

// Import Components
import Headline from './components/Headline'


class ProjectDetail extends Component {
  constructor(props) {
   super(props);
    this.state = {
      projects: [],
      name: this.props.name
    };
  }

  render() {
    return (
      <div>
        <Headline name={this.state.name} />
      </div>
    );
  }
}


export default ProjectDetail;
