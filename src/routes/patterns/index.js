import React from 'react';
import Icon from './components/Icon'
import ProjectList from './components/ProjectList'

const Patterns = () => {
  return (
    <div className="Patterns">
      <div className='projectList'>
        <h3>Project List</h3>
        <ProjectList />
      </div>
      <div>
        <h3>Icons</h3>
        <Icon name='logo' width='48' height='48' className='svgOutline'/>
      </div>
    </div>
  );
}

export default Patterns;
