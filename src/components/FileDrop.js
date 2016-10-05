import React, { Component } from 'react';
import { NativeTypes } from 'react-dnd-html5-backend';
import { DropTarget } from 'react-dnd';
const DROPPED_FILES_EVENT = 'DROPPED_FILE';
const fileTarget = {
  drop(props, monitor) {
    window.dispatchEvent(new CustomEvent(DROPPED_FILES_EVENT, { 'files': monitor.getItem().files }));
  }
};

class FileDrop extends Component {
  constructor(props) {
   super(props);
    this.state = {
      path: this.props.path
    }
  }

  componentDidMount() {
    window.addEventListener(DROPPED_FILES_EVENT, (files) => {
      console.log("component received files", files);
    });
  }

  render() {
    const { connectDropTarget, isOver, canDrop } = this.props;
    return connectDropTarget(
      <div className='dropArea'>
        {!isOver && !canDrop && 'Drag files from the hard drive'}
        {!isOver && canDrop && 'Drag the files here'}
        {isOver && 'Drop the files'}
      </div>
    );
  }
}

export default DropTarget(NativeTypes.FILE, fileTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))(FileDrop);
