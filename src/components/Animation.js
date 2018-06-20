import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { shareFilesInFolder } from 'adapters';
import { updateProject } from 'actions';
import { Select } from 'components';
import { addFile } from 'actions';
import CanvasImageScrubber from 'lib/canvas-image-scrubber';
import { Content, Heading, Section } from 'styled';
import { compose, withState, withProps } from 'recompose';
import { getAnimationFolderImages } from 'selectors/project';

function AnimationComponent({
  fetchingFolder,
  onSelectFolder,
  project,
  imageSequence,
}) {
  const { folders, selectedFolder } = project;
  const folderSelectItems = folders.map(f => ({
    value: f.path_display,
    label: f.name,
  }));

  return (
    <Section project center>
      <Content>
        <Heading>Animation</Heading>
        {folders && folders.length ? (
          <Select
            defaultSelectedItem={folderSelectItems.find(
              f => f.value === selectedFolder
            )}
            items={folderSelectItems}
            onChange={onSelectFolder}
          />
        ) : (
          'no folders to select'
        )}

        {fetchingFolder && 'Fetching folder....'}
        {imageSequence &&
          imageSequence.length > 0 && (
            <CanvasImageScrubber
              frames={imageSequence}
              render={({ renderViewer }) => {
                return <div>{renderViewer}</div>;
              }}
            />
          )}
      </Content>
    </Section>
  );
}

AnimationComponent.propTypes = {
  folders: PropTypes.arrayOf(PropTypes.object),
  imageSequence: PropTypes.arrayOf(PropTypes.string),
};

export const Animation = compose(
  connect(
    (state, props) => ({
      imageSequence: getAnimationFolderImages(state, props),
    }),
    (dispatch, { id }) => ({
      addFileToCollection: (file, projectPath, collectionKey) =>
        dispatch(addFile(file, projectPath, collectionKey)),
      updateProject: project => dispatch(updateProject(project)),
    })
  ),
  withState('fetchingFolder', 'setFetchingFolder', false),
  withProps(
    ({ addFileToCollection, project, setFetchingFolder, updateProject }) => ({
      onSelectFolder(folder) {
        const { id } = project;

        setFetchingFolder(true);
        updateProject({
          id,
          animationFolder: folder.value,
        });
        shareFilesInFolder(folder.value).then(files => {
          files.forEach(file =>
            addFileToCollection(file, project.path_display, folder.value)
          );
          setFetchingFolder(false);
        });
      },
    })
  )
)(AnimationComponent);
