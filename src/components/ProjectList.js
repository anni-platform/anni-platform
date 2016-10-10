import React from 'react';
import { Link } from 'react-router';
import constants from '../constants';

const ProjectList = ({projects, onProjectSelect}) => {

  const newProjectLink = <Link to={`/edit/projects/${constants.project.newProject}`}>Create a Project</Link>;
  const projectItems = projects.map((project) => {
    return(
      <li key={`linkto${project.name}`}><Link to={`/project/${project.name}`}>{project.name}</Link></li>
    );
  });

  const projectsList = (
    <ul>
      {projectItems}
      <li>{newProjectLink}</li>
    </ul>
  );

  const empty = (
    <div>
      <strong>No Projects..</strong>
      {newProjectLink}
    </div>
  )

  return projects.length ? projectsList : empty;
}

export default ProjectList;
