import constants from '../constants';
const { ADD_AUTH_TOKEN, LOG_OUT } = constants.auth;

const auth = (state = { authToken: '', isAuthenticated: false }, action) => {
  switch (action.type) {
    case ADD_AUTH_TOKEN:
      return { ...state, authToken : action.token, isAuthenticated: !!action.token };
    case LOG_OUT:
      return { ...state, authToken: '', isAuthenticated: false }
    default:
      return state
  }
}

export default auth;
