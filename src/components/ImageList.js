import React from 'react';
import Dropbox from 'dropbox';
const client = new Dropbox({ accessToken: 'cOE9hfHzuGYAAAAAAAAVgJXmZqSqDCE-1U-3NX7YxciSVg6gccmF1HVL93qXQXdA' });


const ImageList = ({content}) => {
  const folderItems = content.map((content) => {
    return(
      client.filesGetThumbnail({path: content.id})
        .then(thumb => {
          console.log(thumb)
        }
      )
    )
  });

  return (
    <div>
      {folderItems}
    </div>
  );
}

export default ImageList;
