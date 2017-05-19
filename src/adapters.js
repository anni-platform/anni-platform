import Dropbox from "dropbox";
import env from "../.env.json";
import { parseQueryString } from "utils";
import { homepage } from "../package.json";
const DROPBOX_ACCESS_TOKEN = "DROPBOX_ACCESS_TOKEN";

let client = null;
let _token = null;

export function createClient(token = _token) {
  client = new Dropbox({ accessToken: token });
}

export function hasClient() {
  return !!client;
}

export function login() {
  return new Promise((resolve, reject) => {
    const token = getAccessTokenFromSessionStorage();
    if (token) {
      resolve(token);
    } else {
      reject();
    }
  });
}

export function logoutSession() {
  if (!localStorage) {
    return;
  }
  return localStorage.removeItem(DROPBOX_ACCESS_TOKEN);
}

export function getAccessTokenFromSessionStorage() {
  if (!localStorage) {
    return null;
  }
  const token = localStorage.getItem(DROPBOX_ACCESS_TOKEN);
  if (token) {
    createClient(token);
    return token;
  }
}

export function storeSessionToken(token) {
  createClient(token);
  if (!localStorage) {
    return;
  }
  return localStorage.setItem(DROPBOX_ACCESS_TOKEN, token);
}

export function getAccountInfo() {
  return client.usersGetCurrentAccount();
}

export function searchFiles(path, query) {
  return client.filesSearch({ path, query }).catch(e => console.log(e));
}

export function getAccessTokenFromUrl() {
  return parseQueryString(window.location.hash).access_token;
}

export function uploadFile(path, file) {
  return client
    .filesUpload({
      path: "/" + path + "/" + file.name,
      contents: file,
      mode: "overwrite"
    })
    .catch(e => console.log(e));
}

export function downloadFile(path) {
  return client.filesDownload({ path }).catch(e => console.log(e));
}

export function getFolder(path) {
  return client.filesListFolder({ path }).catch(e => console.log(e));
}

export function getLink(path) {
  return client.sharingCreateSharedLink({ path }).catch(e => console.log(e));
}

export function createFolder(path) {
  return client
    .filesCreateFolder({ path, autorename: true })
    .catch(e => console.log(e));
}

export function removeFolder(path) {
  return client.filesDelete({ path }).catch(e => console.log(e));
}

export function getAuthUrl() {
  var dbx = new Dropbox({ clientId: env.CLIENT_ID });
  let authUrl = `${window.location.origin}/auth`;
  if (process.env.NODE_ENV === "production") {
    authUrl = `${homepage}/auth`;
  }
  return dbx.getAuthenticationUrl(authUrl);
}

export function createProjectScaffold(path) {
  const mainFolderPath = `/${path}`;
  createFolder(mainFolderPath);
  [
    "References",
    "Storyboards",
    "Styleframes",
    "Videos",
    "Scripts"
  ].map(name => {
    return createFolder(`${`/${path}`}/${name}`).catch(e => console.log(e));
  });
}

export function getFilesInFolder(path) {
  if (!getAccessTokenFromSessionStorage()) {
    return;
  }
  return new Promise((resolve, reject) => {
    client.filesListFolder({ path }).then(response => {
      const getLinks = response.entries.map(entry => {
        return new Promise((res, er) => {
          getLink(entry.path_display).then(metadata => {
            const src = metadata.url.replace(/.$/, "1");
            entry.src = src;
            res();
          });
        });
      });
      Promise.all(getLinks).then(() => resolve(response.entries)).catch(reject);
    });
  });
}
