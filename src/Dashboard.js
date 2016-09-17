import React, { Component } from 'react';
import Dropbox from 'dropbox';
const client = new Dropbox({ accessToken: 'cOE9hfHzuGYAAAAAAAAVgJXmZqSqDCE-1U-3NX7YxciSVg6gccmF1HVL93qXQXdA' });

// Import Components
import SearchBar from './components/SearchBar'
import ProjectList from './components/ProjectList'

const test = '/projects';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { projects: [] };

    // Load Dropbox API Content
    client.filesListFolder({path: test})
      .then(projects => {
        projects = projects.entries;
        this.setState({projects});
      }
    );
  }

  render() {
    return (
        <div>
          <SearchBar />
          <ProjectList projects={this.state.projects} />
        </div>
    );
  }
}


export default App;
