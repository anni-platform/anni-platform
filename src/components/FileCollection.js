import React, { Component } from "react";
import FileUploader from "components/FileUploader";
import FileManager from "containers/FileManager";
import Loader from "./Loader";
import { ImageList } from "./ImageList";

import { Content, Heading, Section, UploadArea } from "styled";

class Collection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  render() {
    const {
      collectionId,
      project,
      getCollectionFiles,
      projectPath,
      references,
      storyboards,
      styleframes,
      title
    } = this.props;

    const images = getCollectionFiles(this.collectionKeyOptions);

    const list = images && images.length
      ? <ImageList
          containerClass="ImageList"
          content={images}
          itemClass="ImageListItem"
          onReorder={this.saveOrder}
          references={references}
          storyboards={storyboards}
          styleframes={styleframes}
          updateCollectionItem={this.updateCollectionItem}
          removeCollectionItem={this.removeCollectionItem}
        />
      : null;

    return (
      <Section>
        <Content project>
          <UploadArea>
            <Heading mb={16}>{title}</Heading>
            <FileUploader path={projectPath} collection={collectionId}>
              {list}
              {!project && <Loader />}
            </FileUploader>
          </UploadArea>
        </Content>
      </Section>
    );
  }

  get collectionKeyOptions() {
    const { collectionId, projectPath } = this.props;
    return {
      path: projectPath,
      collectionId
    };
  }

  saveOrder = items => {
    this.props.reorderCollection(
      this.collectionKeyOptions,
      items.map(({ id, caption, aspectRatio }) => ({
        id,
        caption,
        aspectRatio
      }))
    );
  };

  updateCollectionItem = (index, caption) => {
    this.props.updateCollectionItem(this.collectionKeyOptions, index, caption);
  };

  removeCollectionItem = (index, fileName) => {
    this.props.removeCollectionItem(this.collectionKeyOptions, index, fileName);
  };
}

export const FileCollection = FileManager(Collection);
