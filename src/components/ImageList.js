import React from 'react';

const ImageList = ({content}) => {
  const folderItems = content.map((content) => {
    return(
      <li key={content.name} ><img src={content.link} alt={content.name} /></li>
    )
  });

  return (
    <ul className='ImageList'>
      {folderItems}
    </ul>
  );
}

export default ImageList;
