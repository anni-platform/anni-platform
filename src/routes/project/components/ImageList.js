import React from 'react';

const ImageList = ({content}) => {
  if (!content) {
    return null;
  }
  const folderItems = content.map((content) => {
    return(
      <div className="ImageListItem" key={content.id}><img src={content.url} alt={content.name} /></div>
    )
  });
  return (
    <ul className="ImageList">
      {folderItems}
    </ul>
  );
}

export default ImageList;
