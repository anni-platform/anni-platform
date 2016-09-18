import React from 'react';

const ProjectListItem = ({project, onProjectSelect}) => {
  return (
    <li onClick={() => onProjectSelect(project)}>{project.name}</li>
  );
}

export default ProjectListItem;
