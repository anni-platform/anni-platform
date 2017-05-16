import pick from 'lodash/pick';
import { getAccessTokenFromSessionStorage, getClient, getFolder, downloadFile, createFolder, searchFiles } from 'adapters';
import { FILE_DATABASE_DIRECTORY } from 'constants/file';

export function stateToJsonFile(state, fileName = `state_${new Date().getTime()}.json`) {
  return new File([JSON.stringify(pick(state, [
    'projects',
    'files'
  ]), null, 2)], fileName, {type: "text/json", lastModified: new Date().getTime() });
}

const StaticJSONFileDatabase = {
    hydrateStoreFromFileDatabase() {
      getAccessTokenFromSessionStorage();
      return new Promise((resolve, reject) => {
        if (!getClient()) {
          resolve({ auth: {}, projects: {}, files: {} });
        }
        const fetchJSON = () => {
          this.fetchJSONFromFile(`/${FILE_DATABASE_DIRECTORY}/`).then(data => {
            resolve(data);
          }).catch(reject);
        }
        searchFiles('', FILE_DATABASE_DIRECTORY).then(({ matches }) => {
          if (matches.length) {
            fetchJSON();
          } else {
            createFolder(`/${FILE_DATABASE_DIRECTORY}`)
            .then((r) => {
              fetchJSON();
            });
          }
        });
      });
    },
    fetchJSONFromFile(filePath) {
      return new Promise((resolve, reject) => {
        getFolder(filePath).then(d => {
          downloadFile(d.entries[0].path_display).then(r => {
            var fileReader = new FileReader();
            fileReader.onload = function() {
                resolve(JSON.parse(this.result));
            };
            fileReader.readAsText(r.fileBlob);
          }).catch(reject);
        }).catch(reject);
      });
    }
}

export default StaticJSONFileDatabase;
