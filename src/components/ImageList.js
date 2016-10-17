import React from 'react';

const ImageList = ({content}) => {
  const folderItems = content.map((content) => {
    return(
      <div className="ImageList__Item" key={content.name}><img src={(content.src ? content.src : content.link)} alt={content.name} /></div>
    )
  });

  return (
    <ul className="ImageList">
      {folderItems}
    </ul>
  );
}

export default ImageList;
