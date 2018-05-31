const RESET_GLOBAL_ERROR = 'RESET_GLOBAL_ERROR';
const SET_GLOBAL_ERROR = 'SET_GLOBAL_ERROR';

export const ERROR_TYPES = {
  GENERAL_ERROR: 'GENERAL_ERROR',
  NOT_FOUND_ERROR: 'NOT_FOUND_ERROR',
  LOGIN_ERROR: 'LOGIN_ERROR'
};

const initialState = {
  hasErrors: false,
  types: {},
  suppressed: {}
};

export default function ErrorMessageReducer(state = initialState, action) {
  switch (action.type) {
    case RESET_GLOBAL_ERROR:
      return initialState;

    case SET_GLOBAL_ERROR:
      return {
        ...state,
        hasErrors: true,
        types: {
          ...state.types,
          [action.payload]: true
        }
      };
    default:
      return state;
  }
}

export const resetGlobalError = () => ({ type: RESET_GLOBAL_ERROR });
export const setGlobalError = (errorType) => ({ type: SET_GLOBAL_ERROR, payload: errorType });

window.reducers = window.reducers || {};
window.reducers.ErrorMessageReducer = ErrorMessageReducer;
