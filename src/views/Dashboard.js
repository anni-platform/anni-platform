import React, { Component } from 'react';
import { getFolder } from '../adapters';
// Import Components
import ProjectList from '../components/ProjectList';

class Dashboard extends Component {
  constructor(props) {
   super(props);
    this.state = {
      projects: []
    };
  }

  componentDidMount() {
    getFolder('')
      .then(({ entries }) => {
        this.setState({projects: entries})
      });
  }

  render() {
    return (
      <div className='Dashboard'>
        <h1>Your Projects</h1>
        <ProjectList projects={this.state.projects} />
      </div>
    );
  }
}


export default Dashboard;
