import constants from '../constants';
const { ADD_PROJECT } = constants.project;

export const addProject = (project) => {
  return {
    type: ADD_PROJECT,
    project
  };
}
