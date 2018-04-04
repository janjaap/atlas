import React from 'react';
import PropTypes from 'prop-types';
import escapeStringRegexp from 'escape-string-regexp';
import ArrowRightIcon from '../../../../public/images/icon-arrow-right.svg';

const AutoSuggestItem = (props) => {
  const { isActive, onSuggestionSelection, query, content } = props;
  const highlightedSuggestion = content.replace(
    new RegExp(`(${escapeStringRegexp(query)})`, 'gi'),
    '<span class="c-auto-suggest__highlight">$1</span>'
  );

  return (
    <li>
      <button
        type="button"
        className={`c-auto-suggest-item ${isActive ? 'c-auto-suggest-item--active' : ''}`}
        onClick={onSuggestionSelection}
      >
        <span className="icon">
          <ArrowRightIcon />
        </span>
        <span
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: highlightedSuggestion
          }}
        />
      </button>
    </li>
  );
};

AutoSuggestItem.defaultProps = {
  isActive: false
};

AutoSuggestItem.propTypes = {
  content: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  onSuggestionSelection: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired
};

export default AutoSuggestItem;
