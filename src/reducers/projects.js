import constants from '../constants';
import Immutable, { Map } from 'immutable';

const { ADD_PROJECT, REMOVE_PROJECT, UPDATE_PROJECT } = constants.project;

export const initialState = Map({});

const project = (state = Map(), action) => {
  if (!state.isMap || !state.isMap()) {
    state = Immutable.fromJS(state);
  }
  switch (action.type) {
    case UPDATE_PROJECT:
      return state.merge(action.project);
    default:
      return state;
  }
};

const projects = (state = initialState, action) => {
  if (!state.isMap || !state.isMap()) {
    state = Immutable.fromJS(state);
  }

  switch (action.type) {
    case ADD_PROJECT:
      console.log('action', action);
      if (!state.has(action.project.id)) {
        return state.set(action.project.id, project(action.project, action));
      }
      return state;
    case UPDATE_PROJECT:
      console.log(action);
      return state.set(
        action.project.id,
        project(state.get(action.project.id), action)
      );
    case REMOVE_PROJECT:
      return state.delete(action.id);
    default:
      return state;
  }
};

export default projects;
