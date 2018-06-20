import React from 'react';
import { navigate } from '@reach/router';

import {
  ButtonGroup,
  Button,
  Card,
  CardDetails,
  CardControls,
  Grid,
  Image,
  Subheading,
  Paragraph,
} from 'styled';

import tempImage from 'media/placeholder.png';

import { removeProject, deleteFile } from 'actions';
import { removeFolder } from 'adapters';
import filter from 'lodash.filter';

export const ProjectList = ({ children }) => {
  return <Grid>{children}</Grid>;
};

export const ProjectListItem = ({ path, name, client, image, id, files }) => {
  // TODO: @hudakdidit
  // This needs work to get it to work
  function deleteProject() {
    const project = id;
    this.props.dispatch(removeProject(project.id, id));
    const collectionKeys = Object.keys(files.collections);
    // remove all unused files from store
    Object.keys(this.props.files.archive).forEach(file => {
      const fileUsed = collectionKeys.map(collection =>
        collection.indexOf(file)
      );
      if (!filter(fileUsed, i => i > -1).length) {
        this.props.dispatch(deleteFile(file));
      }
    });
    // this.props.router.push('/dashboard');
  }

  const projectLink = () => {
    navigate(`project/${name}`);
  };

  return (
    <Card active>
      <Image src={image ? image : tempImage} alt={name} onClick={projectLink} />
      <CardDetails onClick={projectLink}>
        <Paragraph strong>{name}</Paragraph>
        <Paragraph>{client ? client : 'Client Name'}</Paragraph>
      </CardDetails>
      <CardControls>
        <Subheading micro>Due May 21</Subheading>
        <ButtonGroup mr={-16}>
          <Button icon="share" noBorder fill full />
          <Button
            onClick={projectLink}
            full
            icon="view"
            strokeWidth={4}
            noBorder
          />
          <Button
            onClick={() => {
              removeFolder(path).then(deleteProject());
            }}
            full
            icon="delete"
            strokeWidth={4}
            noBorder
          />
        </ButtonGroup>
      </CardControls>
    </Card>
  );
};
