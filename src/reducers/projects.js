import constants from 'constants';
const { ADD_PROJECT, REMOVE_PROJECT, UPDATE_PROJECT } = constants.project;
const { LOG_OUT } = constants.auth;

const projects = (state = {}, action) => {
  const projects = Object.assign({}, state);
  const { project } = action;
  switch (action.type) {
    case ADD_PROJECT:
      if (!state[project.id]) {
        state[project.id] = project;
      }
      return state;
    case UPDATE_PROJECT:
      if (project) {
        return {...state, [project.id]: { ...state[project.id], ...project }};
      }
      return state;
    case REMOVE_PROJECT:
      delete projects[action.id];
      return Object.assign({}, projects);
    case LOG_OUT:
      return {};
    default:
      return state
  }
}



export default projects;
