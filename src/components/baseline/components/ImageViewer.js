import React, { Component } from "react";
import classNames from "classnames";
import { Button } from "./Button";

export class ImageViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImage: props.content.indexOf(props.content[props.selection])
    }
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
      className, 
      content,
      show, 
      children 
    } = this.props;

    const {
      currentImage
    } = this.state;

    const styles = classNames({
      ImageViewer: true,
      className
    });

    const nextArrow = (
      <div className="nextImage" onClick={this.nextImage}>
          <Button link> Next </Button>
          <p className="hint">right-arrow</p>
      </div>
    );

    const prevArrow = (
      <div className="previousImage" onClick={this.prevImage}>
        <Button link>Prev</Button>
        <p className="hint">left-arrow</p>
      </div>
    );

    if (show) {
      return (
        <div className={styles}>
          <div className="ImageViewer-backdrop" onClick={this.closeViewer} />
          <div className="container">
            <img src={content[currentImage].url} alt={content[currentImage].name} />
          </div>
          <div className="toolbar">
            {children}
          </div>
          <div className="controls">
            {nextArrow}
            {prevArrow}
            <div className="close" onClick={this.closeViewer}>
              <Button link>Close</Button>
              <p className="hint">esc</p>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}
