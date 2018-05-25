import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { getFilesInFolder } from "adapters";
import { updateProject } from "actions";
import { Select } from "components";
import CanvasImageScrubber from "canvas-image-scrubber";
import { Content, Heading, Section } from "styled";

class AnimationComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      folders: props.folders || [],
      selectedFolder: props.selectedFolder,
      imageSequence: props.imageSequence || [],
    };
  }
  getProjectFolder(path, selectedFolder) {
    const { projectPath: id, updateProject } = this.props;
    return getFilesInFolder(path).then((response) => {
      if (!response) return;
      const imageSequence = response.map(i => i.src);
      updateProject({ imageSequence, selectedFolder, id });
      this.setState({ selectedFolder, imageSequence });
    });
  }
  componentWillReceiveProps({ folders }) {
    if (Array.isArray(folders)
      && folders.length
      && folders !== this.state.folders) {
        this.setState({ folders });
    }
  }
  onSelectFolder = folder => {
    const { folders } = this.state;
    const project = folders.find(f => f.name === folder);
    if (!project) return;
    this.getProjectFolder(project.path_lower, folder);
  };
  render() {
    const { folders, imageSequence, selectedFolder } = this.state;
    console.log(imageSequence);
    return (
      <Section>
        <Content>
          <Heading>Animation</Heading>
          {folders && folders.length && (
            <Select
              defaultSelectedItem={selectedFolder}
              items={folders.map(f => f.name)}
              onChange={this.onSelectFolder}
            />
          )}
          {imageSequence.length && (
            <CanvasImageScrubber
              frames={imageSequence}
              render={({ renderViewer }) => {
                return (
                  <div>
                    {renderViewer}
                  </div>
                )
              }}
            />
          )}
        </Content>
      </Section>
    )
  }
  
}

AnimationComponent.propTypes = {
  folders: PropTypes.arrayOf(PropTypes.object),
  imageSequence: PropTypes.arrayOf(PropTypes.string),
};


const getProject = createSelector(
  (state, { id }) => id,
  state => state.projects.toJS(),
  (id, projects) => {
    return (projects && projects[id]);
  },
);

const getProjectFiles = createSelector(
  getProject,
  project => {
    return (project && project.entries && project.entries) || [];
  }
)

const getImageSequence = createSelector(
  getProject,
  project => {
    if (Array.isArray(project.imageSequence)) {
      return project.imageSequence;
    }
    return [];
  }
)

const getProjectFolders = createSelector(
  getProjectFiles,
  files => files.filter(f => f['.tag'] === 'folder'),
)

const getSelectedFolder = createSelector(
  getProject,
  project => project.selectedFolder,
);

const getProps = createSelector(
  getProject,
  getProjectFolders,
  getImageSequence,
  getSelectedFolder,
  (project, folders, imageSequence, selectedFolder) => ({
    project,
    folders,
    imageSequence,
    selectedFolder,
  }),
);

const mapStateToProps = (state, { projectPath }) => {
  return getProps(state, { id: projectPath });
};

function mapDispatchToProps(dispatch) {
  return {
    updateProject: project => dispatch(updateProject(project)),
  };
}

export const Animation = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AnimationComponent);

