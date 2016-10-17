import constants from '../constants';
const { ADD_PROJECT } = constants.project;
const { LOG_OUT } = constants.auth;

const projects = (state = [], action) => {
  switch (action.type) {
    case ADD_PROJECT:
      return [...state, action.project];
    case LOG_OUT:
      return [];
    default:
      return state
  }
}

export default projects;
