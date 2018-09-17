import reducer, {
  FETCH_SUGGESTIONS_FAILURE,
  FETCH_SUGGESTIONS_REQUEST,
  FETCH_SUGGESTIONS_SUCCESS,
  getSuggestions,
  SET_ACTIVE_SUGGESTION,
  setActiveSuggestion
} from './auto-suggest';

const initialState = {
  count: 0,
  displayQuery: '',
  error: '',
  isLoading: false,
  suggestions: [],
  typedQuery: ''

};

describe('AutoSuggestReducer Reducer', () => {
  it('should load the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it(`should set the user data when ${FETCH_SUGGESTIONS_REQUEST} is dispatched`, () => {
    expect(reducer(initialState, {
      type: FETCH_SUGGESTIONS_REQUEST,
      query: 'query'
    })).toEqual({
      count: 0,
      displayQuery: 'query',
      error: '',
      isLoading: true,
      suggestions: [],
      typedQuery: 'query'
    });
  });

  it(`should set the user data when ${FETCH_SUGGESTIONS_SUCCESS} is dispatched`, () => {
    expect(reducer(initialState, {
      type: FETCH_SUGGESTIONS_SUCCESS,
      suggestions: {
        count: 1,
        data: { some: 'data' }
      }
    })).toEqual({
      count: 1,
      displayQuery: '',
      error: '',
      isLoading: false,
      suggestions: {
        some: 'data'
      },
      typedQuery: ''
    });
  });

  it(`should set the user data when ${SET_ACTIVE_SUGGESTION} is dispatched`, () => {
    expect(reducer(initialState, {
      type: SET_ACTIVE_SUGGESTION,
      suggestion: {
        label: 'label'
      }
    })).toEqual({
      activeSuggestion: { label: 'label' },
      count: 0,
      displayQuery: 'label',
      error: '',
      isLoading: false,
      suggestions: [],
      typedQuery: ''
    });
  });

  it(`should set error details when ${FETCH_SUGGESTIONS_FAILURE} is dispatched`, () => {
    expect(reducer(initialState, {
      type: FETCH_SUGGESTIONS_FAILURE,
      error: 'error'
    })).toEqual({
      ...initialState,
      error: 'error'
    });
  });
});

describe('authenticateUser method', () => {
  it('should return the right action', () => {
    expect(setActiveSuggestion('123', 'name', ['scope'])).toEqual({
      type: SET_ACTIVE_SUGGESTION,
      suggestion: '123'
    });
  });
});

describe('authenticateError method', () => {
  it('should return the right action', () => {
    expect(getSuggestions()).toEqual({
      query: '',
      type: FETCH_SUGGESTIONS_REQUEST
    });
  });
});