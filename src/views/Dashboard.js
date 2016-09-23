import React, { Component } from 'react';
import Dropbox from 'dropbox';
let client = new Dropbox({ accessToken: 'cOE9hfHzuGYAAAAAAAAVgJXmZqSqDCE-1U-3NX7YxciSVg6gccmF1HVL93qXQXdA' });

// Import Components
import ProjectList from '../components/ProjectList'
import Headline from '../components/Headline'


class Dashboard extends Component {
  constructor(props) {
   super(props);
    this.state = {
      projects: [],
      name: 'Projects'
    };

    // Call Dropbox API for content and assign to state
    client.filesListFolder({path: '/projects'})
      .then(FolderContent => {
        this.setState({projects: FolderContent.entries})}
      );
  }

  render() {
    return (
      <div>
        <Headline name={this.state.name} />
        <ProjectList
          onProjectSelect={this.props.onProjectSelect}
          projects={this.state.projects} />
      </div>
    );
  }
}


export default Dashboard;
