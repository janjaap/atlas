export const SET_ACTIVE_SUGGESTION = 'SET_ACTIVE_SUGGESTION';
export const FETCH_SUGGESTIONS_REQUEST = 'FETCH_SUGGESTIONS_REQUEST';
export const FETCH_SUGGESTIONS_SUCCESS = 'FETCH_SUGGESTIONS_SUCCESS';
export const FETCH_SUGGESTIONS_FAILURE = 'FETCH_SUGGESTIONS_FAILURE';

const initialState = {
  count: 0,
  displayQuery: '',
  error: '',
  isLoading: false,
  suggestions: [],
  typedQuery: ''
};

export default function AutoSuggestReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SUGGESTIONS_REQUEST:
      return {
        ...state,
        count: 0,
        displayQuery: action.query,
        error: '',
        isLoading: true,
        typedQuery: action.query
      };
    case FETCH_SUGGESTIONS_SUCCESS:
      return {
        ...state,
        count: action.suggestions.count,
        isLoading: false,
        suggestions: action.suggestions.data
      };
    case FETCH_SUGGESTIONS_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false,
        suggestions: []
      };
    case SET_ACTIVE_SUGGESTION:
      return {
        ...state,
        activeSuggestion: action.suggestion,
        displayQuery: action.suggestion.label
      };

    default:
      return state;
  }
}

export const setActiveSuggestionAction = (suggestion = { index: -1 }) =>
  ({ type: SET_ACTIVE_SUGGESTION, suggestion });

export const getSuggestionsAction = (query = '') =>
  ({ type: FETCH_SUGGESTIONS_REQUEST, query });
