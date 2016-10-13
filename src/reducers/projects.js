import constants from '../constants';


const projects = (state = [], action) => {
  switch (action.type) {
    case constants.project.ADD_PROJECT:
      return [...state, action.project];
    default:
      return state
  }
}

export default projects;
