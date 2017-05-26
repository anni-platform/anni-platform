import pick from "lodash/pick";
import {
  getAccessTokenFromSessionStorage,
  hasClient,
  getFolder,
  downloadFile,
  createFolder,
  searchFiles,
  uploadFile
} from "adapters";
import { FILE_DATABASE_DIRECTORY } from "constants/file";
import constants from "constants";
const { DEFAULT_STATE } = constants;

export function stateToJsonFile(
  state,
  fileName = `state_${new Date().getTime()}.json`
) {
  return new File(
    [JSON.stringify(pick(state, ["projects", "files"]), null, 2)],
    fileName,
    { type: "text/json", lastModified: new Date().getTime() }
  );
}

const StaticJSONFileDatabase = {
  hydrateStoreFromFileDatabase() {
    getAccessTokenFromSessionStorage();
    return new Promise((resolve, reject) => {
      if (!hasClient()) {
        // user is not authenticated send default state
        resolve(DEFAULT_STATE);
      }
      const writeDefaultStateToJsonFile = () => {
        uploadFile(
          FILE_DATABASE_DIRECTORY,
          stateToJsonFile(JSON.stringify(DEFAULT_STATE, null, 2), "state.json")
        ).then(() => {
          resolve(DEFAULT_STATE);
        });
      };
      // first search for the file database directory
      searchFiles("", FILE_DATABASE_DIRECTORY).then(({ matches }) => {
        if (matches.length) {
          // file database is found so now search for the state.json file
          searchFiles(`/${FILE_DATABASE_DIRECTORY}/`, "state.json").then(({
            matches
          }) => {
            if (matches.length) {
              // state.json is found so let's get the json content
              this.fetchJSONFromFile(`/${FILE_DATABASE_DIRECTORY}/`)
                .then(data => {
                  resolve(data);
                })
                .catch(reject);
              return;
            } else {
              //state.json is not found so let's create it with default state and return that data
              writeDefaultStateToJsonFile();
            }
          });
        } else {
          // file database directory is not found so create it
          createFolder(`/${FILE_DATABASE_DIRECTORY}`).then(r => {
            // create json db file with default state and return that data
            writeDefaultStateToJsonFile();
          });
        }
      });
    });
  },
  fetchJSONFromFile(filePath) {
    return new Promise((resolve, reject) => {
      getFolder(filePath)
        .then(d => {
          downloadFile(d.entries[0].path_display)
            .then(r => {
              var fileReader = new FileReader();
              fileReader.onload = function() {
                resolve(JSON.parse(this.result));
              };
              fileReader.readAsText(r.fileBlob);
            })
            .catch(reject);
        })
        .catch(reject);
    });
  }
};

export default StaticJSONFileDatabase;
