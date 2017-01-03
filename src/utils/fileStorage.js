import pick from 'lodash/pick';
export function stateToJsonFile(state, fileName) {
  return new File([JSON.stringify(pick(state, [
    'projects',
    'files'
  ]))], fileName ? fileName : `state_${new Date().getTime()}.json`, {type: "text/json", lastModified: new Date().getTime() });
}
