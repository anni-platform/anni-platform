import React from 'react';
import ProjectListItem from './ProjectListItem'

const ProjectList = (props) => {
  const projectItems = props.projects.map((project) => {
    return <ProjectListItem key={project.name} project={project} />
  });

  return (
    <ul>
      {projectItems}
    </ul>
  );
}

export default ProjectList;
