import React from 'react';

const ProjectList = ({projects, onProjectSelect}) => {
  const projectItems = projects.map((project) => {
    return(
      <li key={project.name} onClick={() => onProjectSelect(project)}>{project.name}</li>
      );
  });

  return (
    <ul>
      {projectItems}
    </ul>
  );
}

export default ProjectList;
