import React, { Component } from 'react';
import { getFolder } from '../adapters';
// Import Components
import ProjectList from '../components/ProjectList';
import Headline from '../components/Headline';


class Dashboard extends Component {
  constructor(props) {
   super(props);
    this.state = {
      projects: [],
      name: 'Projects'
    };
  }

  componentDidMount() {
    getFolder('')
      .then(({ entries }) => {
        console.log(entries)
        this.setState({projects: entries})}
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
