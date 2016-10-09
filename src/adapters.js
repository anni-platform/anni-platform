import client from './Client';

export function uploadFile(path, file) {
  return client.filesUpload({path: path + '/' + file.name, contents: file});
}

export function getFolder(path) {
  return client.filesListFolder({ path });
}

export function getLink(path) {
  return client.sharingCreateSharedLink({ path });
}
