import React from 'react';
import Dropbox from 'dropbox';
const dbx = new Dropbox({ accessToken: 'cOE9hfHzuGYAAAAAAAAVgJXmZqSqDCE-1U-3NX7YxciSVg6gccmF1HVL93qXQXdA' });


const DropboxAuth = (props) => {
  dbx.filesListFolder({path: '/Projects'})
    .then(projects => {
      projects = projects.entries;
      this.props.onUpdate(projects);
    });

  return (
    <ul>
    </ul>
  );
}


export default DropboxAuth;
