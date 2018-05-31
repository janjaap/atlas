import React from 'react';
import PropTypes from 'prop-types';
import AutoSuggestCategory from './AutoSuggestCategory';
import SearchIcon from '../../../../public/images/icon-search.svg';
import ClearIcon from '../../../../public/images/icon-clear.svg';

import './_auto-suggest.scss';

class AutoSuggest extends React.Component {
  static getSuggestionByIndex(searchResults, suggestionIndex) {
    return searchResults
      .reduce((flatResults, category) =>
        [...flatResults, ...category.content], [])
      .find((flatSuggestion) =>
        flatSuggestion.index === suggestionIndex
      );
  }

  constructor(props) {
    super(props);
    this.clearQuery = this.clearQuery.bind(this);
    this.navigateSuggestions = this.navigateSuggestions.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onInput = this.onInput.bind(this);
    this.onSuggestionSelection = this.onSuggestionSelection.bind(this);
    this.state = {
      originalQuery: '',
      showSuggestions: false
    };
  }

  onBlur() {
    setTimeout(() => {
      this.setState({
        showSuggestions: false
      });
    }, 200);
  }

  onInput(event) {
    const {
      onTextInput,
      activeSuggestion
    } = this.props;

    event.persist();
    if (activeSuggestion.index > -1) {
      this.resetActiveSuggestion();
    }
    onTextInput(event.target.value);

    this.setState({
      showSuggestions: true
    });
  }

  onFocus() {
    const {
      onTextInput,
      suggestions,
      query
    } = this.props;

    this.setState({
      showSuggestions: true
    });
    if (query.length && !suggestions.length) {
      onTextInput(query);
    }
  }

  onSuggestionSelection(suggestion, event) {
    const {
      onSuggestionSelection
    } = this.props;

    event.preventDefault();
    event.stopPropagation();
    const shouldOpenInNewWindow = event.ctrlKey || event.metaKey;

    onSuggestionSelection(suggestion, shouldOpenInNewWindow);

    if (!shouldOpenInNewWindow) {
      this.clearQuery();
      this.textInput.blur();
    }
  }

  onFormSubmit(event) {
    const {
      onSubmit
    } = this.props;

    event.preventDefault();
    event.stopPropagation();

    this.setState({
      showSuggestions: false
    }, () => {
      this.resetActiveSuggestion();
      onSubmit();
    });
  }

  navigateSuggestions(event) {
    const {
      activeSuggestion,
      numberOfSuggestions,
      onSuggestionActivate,
      suggestions
    } = this.props;

    const { showSuggestions } = this.state;

    switch (event.keyCode) {
      // Arrow up
      case 38:
        // By default the up arrow puts the cursor at the
        // beginning of the input, we don't want that!
        event.preventDefault();
        if (!showSuggestions || !numberOfSuggestions) {
          return;
        }

        onSuggestionActivate(
          AutoSuggest.getSuggestionByIndex(
            suggestions,
            Math.max(activeSuggestion.index - 1, -1)
          )
        );
        break;
      // Arrow down
      case 40:
        if (!showSuggestions || !numberOfSuggestions) {
          return;
        }
        onSuggestionActivate(
          AutoSuggest.getSuggestionByIndex(
            suggestions,
            Math.min(activeSuggestion.index + 1, numberOfSuggestions - 1)
          )
        );
        break;
      // Escape
      case 27:
        this.resetActiveSuggestion();
        this.setState({
          showSuggestions: false
        });
        this.textInput.blur();
        break;
      // Enter
      case 13:
        if (activeSuggestion.index > -1) {
          this.onSuggestionSelection(activeSuggestion, event);
        }
        break;
      default:
        break;
    }
  }

  clearQuery(shouldFocus = true) {
    const {
      onTextInput
    } = this.props;

    if (shouldFocus) {
      this.textInput.focus();
    }
    this.resetActiveSuggestion();
    this.setState({
      showSuggestions: false
    });
    onTextInput();
  }

  resetActiveSuggestion() {
    // wrapper function to improve readability
    const {
      onSuggestionActivate
    } = this.props;

    onSuggestionActivate({ index: -1 });
  }

  render() {
    const {
      activeSuggestion,
      highlightQuery,
      legendTitle,
      placeHolder,
      query,
      suggestions
    } = this.props;
    const {
      showSuggestions
    } = this.state;

    return (
      <form
        onSubmit={this.onFormSubmit}
        className={
          `auto-suggest
          ${showSuggestions && suggestions.length ? 'auto-suggest__backdrop' : ''}`
        }
      >
        <fieldset>
          {legendTitle && <legend className="u-sr-only">legendTitle</legend>}
          <div className="auto-suggest-container">
            <label htmlFor="auto-suggest__input" className="u-sr-only">zoektekst</label>
            <input
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              className="auto-suggest__input"
              id="auto-suggest__input"
              onBlur={this.onBlur}
              onFocus={this.onFocus}
              onChange={this.onInput}
              onKeyDown={this.navigateSuggestions}
              placeholder={placeHolder}
              ref={(input) => { this.textInput = input; }}
              spellCheck="false"
              type="text"
              value={query || ''}
            />

            {query &&
              <button
                type="button"
                className="qa-search-form__clear auto-suggest__clear"
                onClick={this.clearQuery}
                title="Wis zoektekst"
              >
                <ClearIcon />
                <span className="u-sr-only">Wis zoektekst</span>
              </button>
            }
          </div>
          {suggestions.length > 0 && showSuggestions &&
            <div className="auto-suggest__dropdown">
              <h3 className="auto-suggest__tip">Enkele suggesties</h3>
              {suggestions.map((category) => (
                <AutoSuggestCategory
                  activeSuggestion={activeSuggestion}
                  category={category}
                  key={category.label}
                  onSuggestionSelection={this.onSuggestionSelection}
                  query={highlightQuery}
                />
              ))}
            </div>
          }
          <button
            className="auto-suggest__submit qa-search-form-submit"
            disabled={!query}
            title="Zoeken"
            type="submit"
          >
            <SearchIcon />
            <span className="u-sr-only">Zoeken</span>
          </button>
        </fieldset>
      </form>
    );
  }
}

AutoSuggest.propTypes = {
  activeSuggestion: PropTypes.shape({
    category: PropTypes.string,
    index: PropTypes.number,
    label: PropTypes.string,
    uri: PropTypes.string
  }).isRequired,
  highlightQuery: PropTypes.string,
  legendTitle: PropTypes.string,
  numberOfSuggestions: PropTypes.number,
  onSubmit: PropTypes.func.isRequired,
  onSuggestionActivate: PropTypes.func.isRequired,
  onSuggestionSelection: PropTypes.func.isRequired,
  onTextInput: PropTypes.func.isRequired,
  placeHolder: PropTypes.string,
  query: PropTypes.string,
  suggestions: PropTypes.arrayOf(PropTypes.object)
};

AutoSuggest.defaultProps = {
  highlightQuery: '',
  legendTitle: '',
  numberOfSuggestions: 0,
  placeHolder: '',
  query: '',
  queryFromUrl: '',
  suggestions: []
};

export default AutoSuggest;
