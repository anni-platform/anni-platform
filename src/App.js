import React, { Component } from 'react';

// Import Components
import Dashboard from './Dashboard'
import ProjectDetail from './ProjectDetail'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {selectedProject: null};
  }

  render() {
    //Load Dashboard by checking selectedProject state
    if(!this.state.selectedProject){
      return (
          <div>
            <Dashboard onProjectSelect={selectedProject => this.setState({selectedProject}) } />
          </div>
      );
    }
    // Load Project
    return (
        <ProjectDetail name={this.state.selectedProject.name} />
    );
  }
}


export default App;
