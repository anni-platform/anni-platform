import constants from 'constants';
const { ADD_AUTH_TOKEN, LOG_OUT, ADD_USER_INFO } = constants.auth;
import Immutable, { Map } from 'immutable';

export const initialState = Map({ 
  authToken: null, 
  isAuthenticated: false,
  userInfo: null
});

const auth = (state = initialState, action) => {
  if (!state.isMap || !state.isMap()) {
    state = Immutable.fromJS(state);
  }
  switch (action.type) {
    case ADD_AUTH_TOKEN:
      const tokenSeemsValid = !!action.token && typeof action.token === 'string';
      return state
      .set('authToken', action.token)
      .set('isAuthenticated', tokenSeemsValid)
    case ADD_USER_INFO:
      return state
      .set("userInfo", action.info);
    case LOG_OUT:
      return state
      .set("authToken", initialState.get('authToken'))
      .set('isAuthenticated', false);
    default:
      return state
  }
}

export default auth;
