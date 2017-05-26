import reducer, { initialState } from './auth';
import constants from 'constants';
const { ADD_AUTH_TOKEN, LOG_OUT } = constants.auth;

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState);
  });

  it('should add auth token', () => {
    const token = "123";
    expect(
        reducer(initialState, {
            type: ADD_AUTH_TOKEN,
            token
        }).get('authToken')
    ).toEqual(token)
  });

  it('should remove auth token on log out', () => {
    const token = "123";
    expect(
        reducer(initialState, {
            type: LOG_OUT
        }).get("authToken")
    ).toEqual(initialState.get("authToken"))
  });
});