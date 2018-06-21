import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateProject, requestFolderFiles } from 'actions';
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
  const { folders, animationFolder } = project;
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
              f => f.value === animationFolder
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

function mapStateToProps(state, props) {
  return {
    imageSequence: getAnimationFolderImages(state, props),
  };
}

function mapDispatchToProps(dispatch, { id }) {
  return {
    requestFolder: value => dispatch(requestFolderFiles({ path: value })),
    addFileToCollection: (file, projectPath, collectionKey) =>
      dispatch(addFile(file, projectPath, collectionKey)),
    updateProject: project => dispatch(updateProject(project)),
  };
}

export const Animation = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withState('fetchingFolder', 'setFetchingFolder', false),
  withProps(
    ({
      addFileToCollection,
      project,
      setFetchingFolder,
      updateProject,
      requestFolder,
    }) => ({
      onSelectFolder(folder) {
        const { id } = project;

        setFetchingFolder(true);
        updateProject({
          id,
          animationFolder: folder.value,
        });
        requestFolder(folder.value);
        // shareFilesInFolder(folder.value).then(files => {
        //   files.forEach(file =>
        //     addFileToCollection(file, project.path_display, folder.value)
        //   );
        //   setFetchingFolder(false);
        // });
      },
    })
  )
)(AnimationComponent);
