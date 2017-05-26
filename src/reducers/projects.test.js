import reducer, { initialState } from './projects';
import constants from 'constants';
const { ADD_PROJECT, REMOVE_PROJECT, UPDATE_PROJECT } = constants.project;
const { LOG_OUT } = constants.auth;

describe('projects reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState);
  });

  let project = {
    id: "blah",
    description: "some text",
    images: []
  };

  it('should add project', () => {
      expect(
        reducer(initialState, {
          type: ADD_PROJECT,
          project
        }).get(project.id).toJS()
      ).toEqual(project);
  });

  const initialStateWithProject = Object.assign({}, initialState, { [project.id]: project });

  it('should update project', () => {
      const projectUpdate = {
        id: "blah",
        description: "some other text",
        images: []
      };
      expect(
        reducer(initialStateWithProject, {
          type: UPDATE_PROJECT,
          project: projectUpdate
        }).get(project.id).toJS()
      ).toEqual(projectUpdate);
  });

  it('should remove project', () => {
      expect(
        reducer(initialStateWithProject, {
          type: REMOVE_PROJECT,
          id: project.id
        }).toJS()
      ).toEqual(initialState);
  });
});