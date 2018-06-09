import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { getFilesInFolder } from 'adapters';
import { updateProject } from 'actions';
import { Select } from 'components';
import CanvasImageScrubber from 'lib/canvas-image-scrubber';
import { Content, Heading, Section } from 'styled';

import {
  getProject,
  getProjectFolders,
  getImageSequence,
  getSelectedFolder,
} from 'selectors/project';

class AnimationComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      fetchingFolder: false,
      folders: props.folders || [],
      selectedFolder: props.selectedFolder,
      imageSequence: props.imageSequence || [],
    };
  }
  getProjectFolder(path, selectedFolder) {
    const { files, updateProject, project } = this.props;
    const { id } = project;

    console.log('project', project);

    this.setState({ fetchingFolder: true }, () => {
      getFilesInFolder(path, files.toJS().shareLinks).then(response => {
        if (!response) return;
        const imageSequence = response.map(i => i.src);
        console.log(imageSequence);
        updateProject({ imageSequence, selectedFolder, id });
        this.setState({ selectedFolder, imageSequence, fetchingFolder: false });
      });
    });
  }

  componentWillReceiveProps({ folders }) {
    if (
      Array.isArray(folders) &&
      folders.length &&
      folders !== this.state.folders
    ) {
      this.setState({ folders });
    }
  }
  onSelectFolder = folder => {
    const { project }  = this.props;
    this.getProjectFolder(folder, project.name);
  };
  render() {
    const { folders, imageSequence, selectedFolder, fetchingFolder } = this.state;

    return (
      <Section>
        <Content>
          <Heading>Animation</Heading>
          {(folders && folders.length) ? (
              <Select
                defaultSelectedItem={selectedFolder}
                items={folders.map(f => f.path_display)}
                onChange={this.onSelectFolder}
              />
            ) : 'no folders to select'}
          {fetchingFolder && 'Fetching folder....'}
          {imageSequence.length > 0 && (
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
}

AnimationComponent.propTypes = {
  folders: PropTypes.arrayOf(PropTypes.object),
  imageSequence: PropTypes.arrayOf(PropTypes.string),
};

const getProps = createSelector(
  getProject,
  getProjectFolders,
  getImageSequence,
  getSelectedFolder,
  state => state.files,
  (project, folders, imageSequence, selectedFolder, files) => {
    return ({
      project,
      folders,
      imageSequence,
      selectedFolder,
      files,
    });
  }
);

const mapStateToProps = (state, { params }) => {
  return getProps(state, { id: params.id });
};

function mapDispatchToProps(dispatch) {
  return {
    updateProject: project => dispatch(updateProject(project)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnimationComponent);
