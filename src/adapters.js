import Dropbox from 'dropbox';
import env from 'app-config.json';
import { parseQueryString } from 'utils';
const DROPBOX_ACCESS_TOKEN = 'DROPBOX_ACCESS_TOKEN';

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

export function getSharedLinks(path) {
  return client.sharingGetSharedLinks({ path }).catch(e => console.error(e));
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
      path: '/' + path + '/' + file.name,
      contents: file,
      mode: 'overwrite',
    })
    .catch(e => console.log(e));
}

export function downloadFile(path) {
  return client.filesDownload({ path }).catch(e => console.log(e));
}

export function getFolder(path) {
  return client
    .filesListFolder({ path })
    .catch(e => console.log('getFolder', e));
}

export function getFolderMeta(files) {
  return client
    .sharingGetFileMetadataBatch({ files })
    .catch(e => console.error(e));
}

export function getLink(path) {
  return client.sharingCreateSharedLink({ path }).catch(e => console.log(e));
}

export async function shareFilesInFolder(path) {
  const filesResult = await getFolder(path);
  const files =
    filesResult.entries &&
    filesResult.entries.filter(f => f['.tag'] === 'file');
  const fileLinks = await Promise.all(files.map(f => getLink(f.path_display)));
  const filesWithLinks = files.map((f, i) => ({ ...f, ...fileLinks[i] }));
  console.log(fileLinks, 'filesWLinks', filesWithLinks);
  return filesWithLinks;
}

export function getFilesMeta(files) {
  return client
    .sharingGetFileMetadataBatch(files)
    .catch(e => console.log('error getFilesMeta', e));
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
  return dbx.getAuthenticationUrl(`${window.location.origin}/auth`);
}

export function createProjectScaffold(path) {
  const mainFolderPath = `/${path}`;
  createFolder(mainFolderPath);
  ['References', 'Storyboards', 'Styleframes', 'Videos', 'Scripts'].map(
    name => {
      return createFolder(`${`/${path}`}/${name}`).catch(e => console.log(e));
    }
  );
}

export function getFilesInFolder(path, filesCache) {
  if (!getAccessTokenFromSessionStorage()) {
    return;
  }
  return new Promise((resolve, reject) => {
    client.filesListFolder({ path }).then(response => {
      // client
      //   .sharingGetFileMetadataBatch({ files: response.entries.map(e => e.id) })
      //   .then(data => {
      //     console.log('sharingGetFileMetadataBatch', data);
      //     resolve(data);
      //   })
      //   .catch(e => console.error(e));
      const getLinks = response.entries.map(entry => {
        const { path_display } = entry;
        return new Promise((res, er) => {
          if (filesCache[path_display]) {
            entry.src = filesCache[path_display];
            console.log(filesCache[path_display]);
            res(entry);
          } else {
            getLink(path_display).then(metadata => {
              const src = metadata.url.replace(/.$/, '1');
              entry.src = src;
              res();
            });
          }
        });
      });
      Promise.all(getLinks)
        .then(() => resolve(response.entries))
        .catch(reject);
    });
  });
}

export async function getFolderFiles(path) {
  const folder = await client.filesListFolder({ path });
  const { has_more, cursor, entries } = folder;
  let files;
  if (has_more) {
    files = await client.filesListFolderContinue({ cursor });
  }

  let filesMeta;
  if (entries) {
    filesMeta = await client.filesAlphaGetMetadata({
      path: entries[0].path_display,
    });
  }

  const subFolders = entries.filter(e => e['.tag'] === 'folder');

  console.log('subFolders', subFolders, entries);

  const folderEntries = await Promise.all(
    subFolders.map(({ path_display }) => getFolderFiles(path_display))
  );

  return {
    folder: {
      ...folder,
      folderEntries,
    },
    files,
    filesMeta,
  };
}
