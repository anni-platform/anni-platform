import React, { Component } from 'react';

class ProjectList extends Component {
  render() {
    return (
    <div>
      <h1>Projects</h1>
      <ul>
        <li><a href="/project/Fractal Craze">Fractal Craze</a></li><li><a href="/edit/projects/new">Create a Project</a></li>
      </ul>
    </div>
    )
  }
}

export default ProjectList;
