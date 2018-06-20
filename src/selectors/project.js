import { createSelector } from 'reselect';
import pick from 'lodash/pick';

export const getFolders = createSelector(
  state => state.files.toJS().projects,
  (state, { projectId }) => projectId,
  (files, id) => {
    console.log(files, id);
    return {};
  }
);

export const getProject = createSelector(
  (state, { projectId }) => projectId,
  state => state.projects.toJS(),
  state => state.files.toJS().projects,
  (id, projects, projectFiles) => {
    const project =
      projects && Object.values(projects).find(p => p.name === id);
    const files = projectFiles[project.path_display];
    const folders = files
      ? files.entries.filter(e => e['.tag'] === 'folder')
      : [];
    return {
      ...project,
      folders,
    };
  }
);

export const getProjectFolders = createSelector(
  getProject,
  state => state.files.get('projects').toJS(),
  (project, files) => {
    const projectPath = project.path_display;
    const projectFiles = files[projectPath];
    return projectFiles.entries.filter(e => e['.tag'] === 'folder');
  }
);

export const getCollectionIds = createSelector(
  (state, { project }) =>
    project &&
    project.animationFolder &&
    state.files.toJS().collections[project.animationFolder],
  collectionItems => collectionItems.map(({ id }) => id).filter(id => !!id)
);

export const getAnimationFolderImages = createSelector(
  getCollectionIds,
  state => state.files.toJS().archive,
  (ids, archive) =>
    ids && Object.values(pick(archive, ids)).map(({ url }) => url)
);

export const getImageSequence = createSelector(getProject, project => {
  if (project && Array.isArray(project.imageSequence)) {
    return project.imageSequence;
  }
  return [];
});

export const getSelectedFolder = createSelector(
  getProject,
  project => project && project.selectedFolder
);
