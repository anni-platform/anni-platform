import React from 'react';

const ImageList = ({content}) => {
  const folderItems = content.map((content) => {
    return(
      <img src={(content.src ? content.src : content.link)} alt={content.name} key={content.name} />
    )
  });

  return (
    <ul className='ImageList'>
      {folderItems}
    </ul>
  );
}

export default ImageList;
