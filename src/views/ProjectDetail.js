import React, { Component } from 'react';
import MoodboardViewer from '../components/MoodboardViewer'


class ProjectDetail extends Component {
  render() {
    const { id } = this.props.params;
    return (
      <div>
        <MoodboardViewer
          projectPath={id}/>
      </div>
    );
  }
}

export default ProjectDetail;
