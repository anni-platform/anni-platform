import constants from '../constants';

export const addProject = (project) => {
  return {
    type: constants.project.ADD_PROJECT,
    project
  };
}
