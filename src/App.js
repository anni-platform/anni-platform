import React, { Component } from 'react';

// Import Components
import Dashboard from './views/Dashboard'
import ProjectDetail from './views/ProjectDetail'

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
      <div>
        <ProjectDetail selectedProject={this.state.selectedProject} />
      </div>
    );
  }
}


export default App;
