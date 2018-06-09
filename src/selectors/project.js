import { createSelector } from 'reselect';

export const getProject = createSelector(
  (state, { id }) => id,
  state => state.projects.toJS(),
  (id, projects) => {
    return projects && Object.values(projects).find(p => p.name === id);
  }
);

export const getProjectFolders = createSelector(
  getProject,
  state => state.files.get('projects').toJS(),
  (project, files) => {
    const projectPath = project.path_display;
    const projectFiles = files[projectPath];
    return projectFiles.entries.filter(e => e['.tag'] === 'folder');
});

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