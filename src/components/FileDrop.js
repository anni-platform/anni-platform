import React, { Component } from 'react';
import { NativeTypes } from 'react-dnd-html5-backend';
import { DropTarget } from 'react-dnd';

const fileUpload = {
  drop(props, monitor) {
    console.log(monitor.getItem().files);
  }
}

class FileDrop extends Component {
  constructor(props) {
   super(props);
    this.state = {
      path: this.props.path
    }
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

export default DropTarget(NativeTypes.FILE, fileUpload, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))(FileDrop);
