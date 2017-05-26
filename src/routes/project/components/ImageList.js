import React from "react";

const ImageList = ({ content }) => {
  if (!content) {
    return null;
  }
  const folderItems = content.map(content => {
    const src = !content.url ? content.preview : content.url;
    return (
      <div className="ImageListItem" key={content.name}>
        <img src={src} alt={content.name} />
      </div>
    );
  });
  return (
    <ul className="ImageList">
      {folderItems}
    </ul>
  );
};

export default ImageList;
