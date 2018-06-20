import React from 'react';
import { Link } from '@reach/router';

import classNames from 'classnames';
import { Content, Label, ProjectNav, ProjectNavId, Radio } from 'styled';

export const ProjectControls = ({ children }) => {
  return (
    <ProjectNav>
      <Content full>{children}</Content>
    </ProjectNav>
  );
};

export const ProjectSectionNavItem = ({
  name,
  onClick,
  projectPath,
  to,
  location,
}) => (
  <Link
    to={to}
    getProps={({ isCurrent }) => ({
      children: (
        <Label
          className={classNames({ checked: isCurrent })}
          capitalize
          micro
          hide
        >
          {name}
          <ProjectNavId checked={isCurrent} />
          <Radio checked={isCurrent} readOnly value={name} hidden ml={8} />
        </Label>
      ),
    })}
  />
);
