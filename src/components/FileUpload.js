import React from 'react';

const FileUpload = ({content}) => {
  const folderItems = content.map((content) => {
    return(
      <img src={content.link} alt={content.name} key={content.name} />
    )
  });

  return (
    <div>
      {folderItems}
    </div>
  );
}

export default ImageList;
