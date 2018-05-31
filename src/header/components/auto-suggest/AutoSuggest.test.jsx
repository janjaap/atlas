import React from 'react';
import { mount } from 'enzyme';

import AutoSuggest from './AutoSuggest';

const mockFilledState = {
  suggestions: [
    {
      content: [
        {
          uri: 'bag/openbareruimte/03630000003186/',
          label: 'Dam',
          index: 0,
          category: 'Straatnamen'
        },
        {
          uri: 'bag/openbareruimte/03630000001038/',
          label: 'Damloperspad',
          index: 1,
          category: 'Straatnamen'
        },
        {
          uri: 'bag/openbareruimte/03630000003187/',
          label: 'Damrak',
          index: 2,
          category: 'Straatnamen'
        }
      ],
      label: 'Straatnamen'
    },
    {
      content: [
        {
          uri: 'monumenten/monumenten/8e8ae1dd-78a2-4a5f-841d-1870631b7e33/',
          label: 'Damrak 1',
          index: 3,
          category: 'Monumenten'
        },
        {
          uri: 'monumenten/monumenten/aa3f9081-2ac4-49ea-95d2-0aad7aecd883/',
          label: 'Dam 10',
          index: 4,
          category: 'Monumenten'
        },
        {
          uri: 'monumenten/monumenten/f93e31ba-89eb-4784-87e1-d32c33b5236d/',
          label: 'Damrak 15',
          index: 5,
          category: 'Monumenten'
        }
      ],
      label: 'Monumenten'
    }
  ],
  typedQuery: 'dam',
  numberOfSuggestions: 6,
  isDatasetView: false,
  activeSuggestion: {
    uri: 'monumenten/monumenten/8e8ae1dd-78a2-4a5f-841d-1870631b7e33/',
    label: 'Damrak 1',
    index: 3,
    category: 'Monumenten'
  }
};

const selectedSuggestion = {
  uri: 'bag/openbareruimte/03630000003187/',
  label: 'Damrak',
  index: 2,
  category: 'Straatnamen'
};

const onSubmit = jest.fn();
const onSuggestionActivate = jest.fn();
const onSuggestionSelection = jest.fn();
const onTextInput = jest.fn();

describe('The AutoSuggest component', () => {
  beforeEach(() => {
  });

  afterEach(() => {
  });

  it('optionally fills the searchbox with a query', () => {
    // Without a query
    const autoSuggestComponent = mount(<AutoSuggest
      activeSuggestion={{ index: -1 }}
      onSubmit={onSubmit}
      onSuggestionActivate={onSuggestionActivate}
      onSuggestionSelection={onSuggestionSelection}
      onTextInput={onTextInput}
    />);
    expect(autoSuggestComponent.instance().textInput.value).toBe('');

    // With a query
    const prefilledAutoSuggestComponent = mount(<AutoSuggest
      activeSuggestion={{ index: -1 }}
      onSubmit={onSubmit}
      onSuggestionActivate={onSuggestionActivate}
      onSuggestionSelection={onSuggestionSelection}
      onTextInput={onTextInput}
    />, { disableLifecycleMethods: false });

    // trigger the componentDidUpdate method
    prefilledAutoSuggestComponent.setProps({ query: mockFilledState.typedQuery });
    prefilledAutoSuggestComponent.update();

    expect(prefilledAutoSuggestComponent.instance().textInput.value).toBe('dam');
  });

  it('calls the prop function "onTextInput" on text input', () => {
    const autoSuggestComponent = mount(<AutoSuggest
      activeSuggestion={{ index: -1 }}
      onSubmit={onSubmit}
      onSuggestionActivate={onSuggestionActivate}
      onSuggestionSelection={onSuggestionSelection}
      onTextInput={onTextInput}
    />);

    // trigger the componentDidUpdate method

    const inputField = autoSuggestComponent.find('input#auto-suggest__input');
    inputField.simulate('change', { target: { value: 'd' } });
    inputField.simulate('change', { target: { value: 'a' } });
    inputField.simulate('change', { target: { value: 'm' } });

    expect(onTextInput).toHaveBeenCalledTimes(3);
  });

  it('should toggle the "showsuggestions" state on focus and blur of the input field', () => {
    jest.useFakeTimers();
    const autoSuggestComponent = mount(<AutoSuggest
      activeSuggestion={{ index: -1 }}
      onSubmit={onSubmit}
      onSuggestionActivate={onSuggestionActivate}
      onSuggestionSelection={onSuggestionSelection}
      onTextInput={onTextInput}
      suggestions={mockFilledState.suggestions}
    />, { disableLifecycleMethods: false });

    // trigger the componentDidUpdate method
    autoSuggestComponent.setProps({ query: mockFilledState.typedQuery });
    autoSuggestComponent.update();

    const inputField = autoSuggestComponent.find('input#auto-suggest__input');

    expect(autoSuggestComponent).toMatchSnapshot();
    inputField.simulate('focus');
    autoSuggestComponent.update();
    expect(autoSuggestComponent).toMatchSnapshot();
    inputField.simulate('blur');
    autoSuggestComponent.update();
    jest.runAllTimers();
    autoSuggestComponent.update();
    expect(autoSuggestComponent).toMatchSnapshot();
  });

  it('should allow the user to navigate with the keyboard', () => {
    /*
        TODO: move to integration test
        as the activesuggestion is set in the redux store
     */
    const autoSuggestComponent = mount(<AutoSuggest
      activeSuggestion={{ index: -1 }}
      onSubmit={onSubmit}
      onSuggestionActivate={onSuggestionActivate}
      onSuggestionSelection={onSuggestionSelection}
      onTextInput={onTextInput}
      suggestions={mockFilledState.suggestions}
      query={mockFilledState.typedQuery}
      numberOfSuggestions={mockFilledState.numberOfSuggestions}
    />);

    const inputField = autoSuggestComponent.find('input#auto-suggest__input');
    inputField.simulate('focus');
    expect(autoSuggestComponent).toMatchSnapshot();
    inputField.simulate('keydown', {
      target: {
        keyCode: 40,
        which: 40,
        key: 'down arrow',
        metaKey: false,
        ctrlKey: false,
        altKey: false
      }
    });
    autoSuggestComponent.setProps({
      activeSuggestion: mockFilledState.activeSuggestion,
      highlightQuery: mockFilledState.typedQuery
    });
    autoSuggestComponent.update();
    expect(autoSuggestComponent).toMatchSnapshot();
  });

  describe('when selecting a suggestion', () => {
    it('should request to open in new window when CTRL key is pressed.', () => {
      const autoSuggestComponent = mount(<AutoSuggest
        activeSuggestion={{ index: -1 }}
        onSubmit={onSubmit}
        onSuggestionActivate={onSuggestionActivate}
        onSuggestionSelection={onSuggestionSelection}
        onTextInput={onTextInput}
      />);

      const mockEvent = {
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
        ctrlKey: true,
        metaKey: false
      };

      autoSuggestComponent.find('input#auto-suggest__input').simulate('focus');
      autoSuggestComponent.find('input#auto-suggest__input').type('Dam');
      autoSuggestComponent.setProps({ suggestions: mockFilledState.suggestions });
      autoSuggestComponent.update();
      autoSuggestComponent.find('.auto-suggest__dropdown-item').at(2).simulate('click', mockEvent);
      expect(onSuggestionSelection).toHaveBeenCalledWith(selectedSuggestion, true);
    });


    it('should not request to open in new window when no CTRL key is pressed.', () => {
      const autoSuggestComponent = mount(<AutoSuggest
        activeSuggestion={{ index: -1 }}
        onSubmit={onSubmit}
        onSuggestionActivate={onSuggestionActivate}
        onSuggestionSelection={onSuggestionSelection}
        onTextInput={onTextInput}
      />);

      const mockEvent = {
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
        ctrlKey: false,
        metaKey: false
      };

      autoSuggestComponent.find('input#auto-suggest__input').simulate('focus');
      autoSuggestComponent.find('input#auto-suggest__input').type('Dam');
      autoSuggestComponent.setProps({ suggestions: mockFilledState.suggestions });
      autoSuggestComponent.update();
      autoSuggestComponent.find('.auto-suggest__dropdown-item').at(2).simulate('click', mockEvent);
      expect(onSuggestionSelection).toHaveBeenCalledWith(selectedSuggestion, false);
    });
  });
});
