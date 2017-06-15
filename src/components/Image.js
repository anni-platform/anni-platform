import React, { Component } from 'react';

export default class ImageItem extends Component {
  render() {
    const { url, preview, name } = this.props;
    const src = !url ? preview : url;
    return (
      <div className="ImageListItem" key={name}><img src={src} alt={name} /></div>
    )
  }
}
