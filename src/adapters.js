import client from './Client';

export function uploadFile(path, file) {
  return client.filesUpload({ path: '/' + path + '/' + file.name, contents: file });
}

export function getFolder(path) {
  return client.filesListFolder({ path });
}

export function getLink(path) {
  return client.sharingCreateSharedLink({ path });
}

export function createFolder(path) {
  return client.filesCreateFolder({ path });
}

export function getFilesInFolder(path) {
  return new Promise((resolve, reject) => {
    client.filesListFolder({ path })
      .then(response => {
        const getLinks = response.entries.map(entry => {
          return new Promise((res, er) => {
            getLink(entry.path_display)
              .then((metadata) => {
                const src = metadata.url.replace(/.$/,"1");
                entry.src = src;
                res();
              });
          });
        });
        console.log(getLinks);
        Promise.all(getLinks).then(() => resolve(response.entries)).catch(reject);
      });
  });
}
