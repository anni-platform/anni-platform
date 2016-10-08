import constants from '../constants';
const { ADD_PROJECT } = constants.project;

const projects = (state = [], action) => {
  switch (action.type) {
    case ADD_PROJECT:
      return [...state, action.project];
    default:
      return state
  }
}

export default projects;
