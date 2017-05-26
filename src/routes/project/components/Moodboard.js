import React, { Component } from "react";
import constants from "constants";
import { updateProject } from "actions";
import FileUploader from "components/FileUploader";
import Loader from "components/Loader";
import ImageList from "./ImageList";
import FileManager from "containers/FileManager";

const { MOODBOARD } = constants.content;

class MoodboardViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  render() {
    const project = this.props.project;
    if (!project) {
      return null;
    }
    const { id } = project;
    const path = this.props.projectPath;
    const collectionId = MOODBOARD;
    const images = this.props.getCollectionFiles({ path, collectionId });
    const list = images && images.length
      ? <ImageList content={images} />
      : null;
    return (
      <div className="Moodboard">
        <div className="content">
          <h1>Moodboard</h1>
          <FileUploader
            path={this.props.projectPath}
            collection="moodboard"
            onUpload={images =>
              this.props.dispatch(updateProject({ id, images }))}
          >
            {list}
            <Loader show={!project} />
          </FileUploader>
        </div>
      </div>
    );
  }
}

export default FileManager(MoodboardViewer);
