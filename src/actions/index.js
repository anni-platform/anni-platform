import constants from 'constants';

const { ADD_PROJECT, REMOVE_PROJECT, UPDATE_PROJECT } = constants.project;
const { ADD_AUTH_TOKEN, ADD_USER_INFO, LOG_OUT } = constants.auth;
const { ADD_FILE, ADD_FILE_TO_COLLECTION } = constants.file;

// Project Actions
export const addProject = (project) => {
  return {
    type: ADD_PROJECT,
    project
  };
}
export const removeProject = (id, path) => {
  return {
    type: REMOVE_PROJECT,
    id,
    path
  };
}

export const updateProject = (project) => {
  return {
    type: UPDATE_PROJECT,
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

// File Actions
export const addFile = (file, path, collectionId) => {
  return {
    type: ADD_FILE,
    file,
    path,
    collectionId
  };
}
export const addFileToCollection = (id, path, collectionId) => {
  return {
    type: ADD_FILE_TO_COLLECTION,
    id,
    path,
    collectionId
  };
}
