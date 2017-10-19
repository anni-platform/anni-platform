import React, { Component } from "react";
import Dropzone from "react-dropzone";
import FileManager from "containers/FileManager";
import { Container, Content, Subheading, Paragraph } from "styled";

class FileDrop extends Component {
  onDrop(files) {
    this.props.uploadFiles(files, this.props.path, this.props.collection);
  }

  render() {
    return (
      <Dropzone
        onDrop={this.onDrop.bind(this)}
        className="FileUploader"
        activeClassName="active"
        disableClick={true}
      >
        {this.props.children}
        <Container>
          <Content>
            <Subheading color center>Drag and Drop</Subheading>
            <Paragraph strong center>Your images here or browse</Paragraph>
          </Content>
        </Container>
      </Dropzone>
    );
  }
}

export default FileManager(FileDrop);
