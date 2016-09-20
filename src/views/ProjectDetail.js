import React, { Component } from 'react';

// Import Components
import Headline from '../components/Headline'
import MoodboardViewer from '../components/MoodboardViewer'


class ProjectDetail extends Component {
  constructor(props) {
   super(props);
    this.state = {
      projectPath: this.props.selectedProject.path_display,
      projectName: this.props.selectedProject.name
    };
  }

  render() {
    return (
      <div>
        <Headline name={this.state.projectName} />
        <MoodboardViewer
          projectPath={this.state.projectPath}/>
      </div>
    );
  }
}

export default ProjectDetail;
