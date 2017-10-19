import React, { Component } from "react";
import {
  Backdrop,
  Button,
  Dialog,
  Paragraph,
  Overlay,
  OverlayButton,
  OverlayToolbar
} from "styled";

export class ImageViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImage: props.content.indexOf(props.content[props.selection])
    };
  }

  // Mount and dismount the Event Listener for keyboard events
  componentWillMount() {
    window.addEventListener("keyup", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleKeyDown);
  }

  // Check for updates from parent component via props
  componentWillReceiveProps(nextProps) {
    const { selection, show } = this.state;

    if (nextProps.selection !== selection || nextProps.show !== show) {
      this.setState({ selection: nextProps.selection, show: nextProps.show });
    }
  }

  // Image Viewer controls
  nextImage = () => {
    const currentImage = this.state.currentImage < this.props.content.length - 1
      ? this.state.currentImage + 1
      : 0;
    this.setState({ currentImage });
  };

  prevImage = () => {
    const currentImage = this.state.currentImage > 0
      ? this.state.currentImage - 1
      : this.props.content.length - 1;
    this.setState({ currentImage });
  };

  handleKeyDown = e => {
    e.preventDefault();
    // TODO these should be keycodes
    // or at least use constants
    switch (e.key) {
      case "ArrowLeft":
        this.prevImage();
        break;

      case "ArrowRight":
        this.nextImage();
        break;

      case "Escape":
        this.closeViewer();
        break;

      default:
        break;
    }
  };

  closeViewer = () => {
    this.setState({ show: false }, this.props.onClose);
  };

  render() {
    const {
      content,
      show,
      children
    } = this.props;

    const {
      currentImage
    } = this.state;

    if (show) {
      return (
        <Overlay>
          <Backdrop onClick={this.closeViewer} />
          <Dialog>
            <img
              src={content[currentImage].url}
              alt={content[currentImage].name}
            />
          </Dialog>

          {/* This is an area for buttons and actions related to the specific item. */}
          <OverlayToolbar>
            {children}
          </OverlayToolbar>
          <OverlayButton right onClick={this.nextImage}>
            <Button noBorder> Next </Button>
            <Paragraph micro capitalize>right-arrow</Paragraph>
          </OverlayButton>
          <OverlayButton left onClick={this.prevImage}>
            <Button noBorder>Prev</Button>
            <Paragraph micro capitalize>left-arrow</Paragraph>
          </OverlayButton>
          <OverlayButton top onClick={this.closeViewer}>
            <Button noBorder>Close</Button>
            <Paragraph micro capitalize>esc</Paragraph>
          </OverlayButton>
        </Overlay>
      );
    } else {
      return null;
    }
  }
}
