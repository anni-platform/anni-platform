import constants from '../constants';
const { ADD_PROJECT } = constants.project;
const { ADD_AUTH_TOKEN, ADD_USER_INFO, LOG_OUT } = constants.auth;

// Project Actions
export const addProject = (project) => {
  return {
    type: ADD_PROJECT,
    project
  };
}

// Auth Actions
export const addAuthToken = (token) => {
  return {
    type: ADD_AUTH_TOKEN,
    token
  };
}

export const addUserInfo = (info) => {
  return {
    type: ADD_USER_INFO,
    info
  };
}

export const logout = () => {
  return {
    type: LOG_OUT
  };
}
