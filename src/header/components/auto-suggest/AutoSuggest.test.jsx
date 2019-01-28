import React from 'react';
import { mount, shallow } from 'enzyme';

import AutoSuggest from './AutoSuggest';
import { MORE_RESULTS_INDEX } from './AutoSuggestCategory';

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
      label: 'Straatnamen',
      total_results: 6
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
      label: 'Monumenten',
      total_results: 5
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
  describe('static getSuggestionByIndex method', () => {
    it('should return content based on the index', () => {
      const searchResults = [
        {
          label: 'Straatnamen',
          content: [
            {
              category: 'Straatnamen',
              index: 0,
              label: 'Diemerparklaan',
              uri: 'bag/openbareruimte/03630000001004/'
            },
            {
              category: 'Straatnamen',
              index: 1,
              label: 'Diemerzeedijk',
              uri: 'bag/openbareruimte/03630000003253/'
            },
            {
              category: 'Straatnamen',
              index: 2,
              label: 'Van Diemenkade',
              uri: 'bag/openbareruimte/03630000001210/'
            }
          ]
        },
        {
          label: 'Gebieden',
          content: [
            {
              category: 'Gebieden',
              index: 3,
              label: 'Nieuwe Diep/Diemerpark (buurt)',
              uri: 'gebieden/buurt/03630000000596/'
            }
          ]
        },
        {
          label: 'Monumenten',
          content: [
            {
              category: 'Monumenten',
              index: 4,
              label: 'Van Diemenstraat 200',
              uri: 'monumenten/monumenten/92e7f312-35d9-43a0-b0b8-d5c6671d7910/'
            },
            {
              category: 'Monumenten',
              index: 5,
              label: 'Van Diemenstraat 206',
              uri: 'monumenten/monumenten/7b892a93-37c6-402c-b009-43b021af92bc/'
            },
            {
              category: 'Monumenten',
              index: 6,
              label: 'Van Diemenstraat 412',
              uri: 'monumenten/monumenten/4f75caea-d198-4e9b-a962-7eb7f1bae4d7/'
            }
          ]
        },
        {
          label: 'Datasets',
          content: [
            {
              category: 'Datasets',
              index: 7,
              label: 'Registratie actueel hoogtebestand Nederland (AHN)',
              uri: 'dcatd/datasets/registratie-actueel-hoogtebestand-nederland-ahn'
            },
            {
              category: 'Datasets',
              index: 8,
              label: 'Registratie luchtfoto\'s',
              uri: 'dcatd/datasets/registratie-luchtfoto-s'
            },
            {
              category: 'Datasets',
              index: 9,
              label: 'Werk en inkomen (Vervoerregio Amsterdam)',
              uri: 'dcatd/datasets/ois-34103'
            }
          ]
        }
      ];
      expect(AutoSuggest.getSuggestionByIndex(searchResults, 5)).toEqual({
        category: 'Monumenten',
        index: 5,
        label: 'Van Diemenstraat 206',
        uri: 'monumenten/monumenten/7b892a93-37c6-402c-b009-43b021af92bc/'
      });
    });
  });

  it('shows a legend if a title is provided', () => {
    const legendTitle = 'title';
    const autoSuggestComponent = mount(<AutoSuggest
      activeSuggestion={{ index: -1 }}
      onSubmit={onSubmit}
      onSuggestionActivate={onSuggestionActivate}
      onSuggestionSelection={onSuggestionSelection}
      onTextInput={onTextInput}
      legendTitle={legendTitle}
    />);
    const legend = autoSuggestComponent.find('legend');
    expect(legend.text()).toBe(legendTitle);
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

  it('should call the prop function "onTextInput" on text input', () => {
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

  it('should trigger the onTextInput prop on focus when there is a query but no suggestions', () => {
    const autoSuggestComponent = mount(<AutoSuggest
      activeSuggestion={{ index: -1 }}
      onSubmit={onSubmit}
      onSuggestionActivate={onSuggestionActivate}
      onSuggestionSelection={onSuggestionSelection}
      onTextInput={onTextInput}
      suggestions={[]}
    />, { disableLifecycleMethods: false });

    // trigger the componentDidUpdate method
    autoSuggestComponent.setProps({ query: mockFilledState.typedQuery });
    autoSuggestComponent.update();

    const inputField = autoSuggestComponent.find('input#auto-suggest__input');
    autoSuggestComponent.update();
    inputField.simulate('focus');
    expect(onTextInput).toHaveBeenCalled();
  });

  describe('onFormSubmit', () => {
    it('should be triggered if form is submitted', () => {
      // Without a query
      const autoSuggestComponent = shallow(<AutoSuggest
        activeSuggestion={mockFilledState.activeSuggestion}
        onSubmit={onSubmit}
        onSuggestionActivate={onSuggestionActivate}
        onSuggestionSelection={onSuggestionSelection}
        onTextInput={onTextInput}
      />);

      const form = autoSuggestComponent.find('form').first();
      form.simulate('submit', {
        preventDefault: () => {
        },
        stopPropagation: () => {
        }
      });

      expect(onSubmit).toHaveBeenCalled();
    });

    it('should be triggered when an ellipsis list item is selected', () => {
      const autoSuggestComponent = shallow(<AutoSuggest
        activeSuggestion={mockFilledState.activeSuggestion}
        onSubmit={onSubmit}
        onSuggestionActivate={onSuggestionActivate}
        onSuggestionSelection={onSuggestionSelection}
        onTextInput={onTextInput}
      />);

      const suggestion = { index: MORE_RESULTS_INDEX };
      const event = {
        preventDefault: jest.fn(),
        stopPropagation: jest.fn()
      };
      autoSuggestComponent.instance().onFormSubmit = jest.fn();
      autoSuggestComponent.instance().onSuggestionSelection(suggestion, event);
      expect(autoSuggestComponent.instance().onFormSubmit).toHaveBeenCalledWith(event);
    });
  });

  describe('resetActiveSuggestion', () => {
    it('should be triggered if user is typing and there is a suggestion available', () => {
      // Without a query
      const autoSuggestComponent = mount(<AutoSuggest
        activeSuggestion={mockFilledState.activeSuggestion}
        onSubmit={onSubmit}
        onSuggestionActivate={onSuggestionActivate}
        onSuggestionSelection={onSuggestionSelection}
        onTextInput={onTextInput}
      />);

      autoSuggestComponent.instance().resetActiveSuggestion = jest.fn();

      const inputField = autoSuggestComponent.find('input#auto-suggest__input');
      inputField.simulate('change', { target: { value: 'd' } });

      expect(autoSuggestComponent.instance().resetActiveSuggestion).toHaveBeenCalled();
    });
  });

  describe('when selecting a suggestion', () => {
    const autoSuggestComponent = mount(<AutoSuggest
      activeSuggestion={{ index: 0 }}
      onSubmit={onSubmit}
      onSuggestionActivate={onSuggestionActivate}
      onSuggestionSelection={onSuggestionSelection}
      onTextInput={onTextInput}
      numberOfSuggestions={1}
    />);

    beforeEach(() => {
    });

    it('should request to open in new window when CTRL key is pressed.', () => {
      const mockEvent = {
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
        ctrlKey: true,
        metaKey: false
      };

      autoSuggestComponent.find('input#auto-suggest__input').simulate('focus');
      autoSuggestComponent.find('input#auto-suggest__input').type('Dam');
      autoSuggestComponent.setProps({ suggestions: mockFilledState.suggestions });
      autoSuggestComponent.setState({ showSuggestions: true });
      autoSuggestComponent.update();
      autoSuggestComponent.find('.auto-suggest__dropdown-item').at(2).simulate('click', mockEvent);
      expect(onSuggestionSelection).toHaveBeenCalledWith(selectedSuggestion, true);
    });

    it('should not request to open in new window when no CTRL key is pressed.', () => {
      const mockEvent = {
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
        ctrlKey: false,
        metaKey: false
      };

      autoSuggestComponent.find('input#auto-suggest__input').simulate('focus');
      autoSuggestComponent.find('input#auto-suggest__input').type('Dam');
      autoSuggestComponent.setProps({ suggestions: mockFilledState.suggestions });
      autoSuggestComponent.setState({ showSuggestions: true });
      autoSuggestComponent.update();
      autoSuggestComponent.find('.auto-suggest__dropdown-item').at(2).simulate('click', mockEvent);
      expect(onSuggestionSelection).toHaveBeenCalledWith(selectedSuggestion, false);
    });
  });

  describe('navigateSuggestions keydown events', () => {
    let autoSuggestComponent;

    beforeEach(() => {
      autoSuggestComponent = mount(<AutoSuggest
        activeSuggestion={{ index: 0 }}
        onSubmit={onSubmit}
        onSuggestionActivate={onSuggestionActivate}
        onSuggestionSelection={onSuggestionSelection}
        onTextInput={onTextInput}
        numberOfSuggestions={1}
      />);

      onSuggestionActivate.mockClear();
      autoSuggestComponent.instance().resetActiveSuggestion = jest.fn();
      autoSuggestComponent.instance().onSuggestionSelection = jest.fn();
    });

    it('should handle arrow up key', () => {
      const preventDefaultMock = jest.fn();
      autoSuggestComponent.instance().navigateSuggestions({
        keyCode: 38,
        preventDefault: preventDefaultMock
      });

      expect(preventDefaultMock).toHaveBeenCalled();
      expect(onSuggestionActivate).not.toHaveBeenCalled();

      autoSuggestComponent.setState({ showSuggestions: true });

      autoSuggestComponent.instance().navigateSuggestions({
        keyCode: 38,
        preventDefault: preventDefaultMock
      });

      expect(onSuggestionActivate).toHaveBeenCalled();
      onSuggestionActivate.mockRestore();
    });

    it('should handle down up key', () => {
      const preventDefaultMock = jest.fn();
      autoSuggestComponent.instance().navigateSuggestions({
        keyCode: 40,
        preventDefault: preventDefaultMock
      });

      expect(preventDefaultMock).not.toHaveBeenCalled();
      expect(onSuggestionActivate).not.toHaveBeenCalled();

      autoSuggestComponent.setState({ showSuggestions: true });
      autoSuggestComponent.instance().navigateSuggestions({
        keyCode: 40,
        preventDefault: preventDefaultMock
      });

      expect(onSuggestionActivate).toHaveBeenCalled();
    });

    it('should handle escape key', () => {
      const preventDefaultMock = jest.fn();
      autoSuggestComponent.instance().navigateSuggestions({
        keyCode: 27,
        preventDefault: preventDefaultMock
      });

      expect(preventDefaultMock).not.toHaveBeenCalled();
      expect(autoSuggestComponent.instance().resetActiveSuggestion).toHaveBeenCalled();
    });

    it('should handle enter key', () => {
      const preventDefaultMock = jest.fn();
      autoSuggestComponent.instance().navigateSuggestions({
        keyCode: 13,
        preventDefault: preventDefaultMock
      });

      expect(preventDefaultMock).not.toHaveBeenCalled();
      expect(autoSuggestComponent.instance().onSuggestionSelection).toHaveBeenCalled();
    });

    it('should not handle enter key when index for suggestions is below 0', () => {
      const preventDefaultMock = jest.fn();
      autoSuggestComponent.setProps({ activeSuggestion: { index: -1 } });
      autoSuggestComponent.instance().navigateSuggestions({
        keyCode: 13,
        preventDefault: preventDefaultMock
      });

      expect(preventDefaultMock).not.toHaveBeenCalled();
      expect(autoSuggestComponent.instance().onSuggestionSelection).not.toHaveBeenCalled();
    });

    it('should handle any other key and do nothing', () => {
      const preventDefaultMock = jest.fn();
      autoSuggestComponent.instance().navigateSuggestions({
        keyCode: 44,
        preventDefault: preventDefaultMock
      });

      expect(preventDefaultMock).not.toHaveBeenCalled();
    });
  });
});
