import Dropbox from 'dropbox';
import env from '../.env.json';
import { parseQueryString } from './utils';

let client = null;

export function createClient(token) {
  client = new Dropbox({ accessToken: token });
}

export function login() {
  return new Promise((resolve, reject) => {
    resolve(getAccessTokenFromSessionStorage());
  });
}

export function logoutSession() {
  return sessionStorage.removeItem('DROPBOX_ACCESS_TOKEN');
}

export function getAccessTokenFromSessionStorage() {
  const token = sessionStorage.getItem('DROPBOX_ACCESS_TOKEN');
  if (token) {
    createClient(token);
    return token;
  }
}

export function storeSessionToken(token ) {
  createClient(token);
  return sessionStorage.setItem('DROPBOX_ACCESS_TOKEN', token);
}

export function getAccountInfo() {
  return client.usersGetAccount();
}

export function getAccessTokenFromUrl() {
  return parseQueryString(window.location.hash).access_token;
}

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

export function getAuthUrl() {
  var dbx = new Dropbox({ clientId: env.CLIENT_ID });
  return dbx.getAuthenticationUrl(`${window.location.origin}/auth`);
}

export function createProjectScaffold(path) {
  const mainFolderPath = `/${path}`;
  createFolder(mainFolderPath);
  ["References", "Storyboards", "Styleframes", "Videos", "Scripts"].map((name) => {
    return createFolder(`${`/${path}`}/${name}`)
  });
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
        Promise.all(getLinks).then(() => resolve(response.entries)).catch(reject);
      });
  });
}
