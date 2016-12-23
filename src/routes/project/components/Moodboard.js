import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFilesInFolder } from 'adapters';
import constants from 'constants';
import { updateProject } from 'actions';
import { makeCancelable } from 'utils';
import FileUploader from 'components/FileUploader';
import Loader from 'components/Loader';
import ImageList from './ImageList'


const { MOODBOARD } = constants.content;

class MoodboardViewer extends Component {
  constructor(props) {
   super(props);
    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    const project = this.props.project;
    if (project) {
      this.getFiles = makeCancelable(new Promise(r => {
        getFilesInFolder(`/${this.props.projectPath}`)
        .then(moodboardItems => {
          this.getFiles.resolved = true;
          this.props.dispatch(updateProject({ id: project.id, images: moodboardItems }));
        });
      }));
      this.getFiles
      .promise
      .then(() => this.setState({ loading: false }));
    }
  }

  componentWillUnmount() {
    this.getFiles.cancel();
  }

  render() {
    const project = this.props.project;
    if (!project) {
      return null;
    }
    const { id } = project;
    // TODO: make helper for getting collection key
    const images = this.props.files.collections[`${this.props.projectPath}_${MOODBOARD}`];
    return (
      <div>
        <h1>Moodboard</h1>
        <FileUploader
          path={this.props.projectPath}
          collection="moodboard"
          onUpload={(images) => this.props.dispatch(updateProject({ id, images }))}>
          <ImageList content={(!images ? null : images)} />
          <Loader show={!project} />
        </FileUploader>
      </div>
    );
  }
}

const Board = connect((state) => state)(MoodboardViewer);
export default Board;
