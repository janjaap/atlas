import React from 'react';
import PropTypes from 'prop-types';
import { getPageActionEndpoint } from '../../../store/redux-first-router';
import SearchListItem from '../SearchListItem/SearchListItem';

const SearchList = ({ categoryResults, limit, hasLoadMore, fetchMoreResults }) => {
  const results = (categoryResults && categoryResults.results) ?
    categoryResults.results.map((result) => ({
      ...result,
      linkTo: getPageActionEndpoint(result.endpoint)
    })) : [];
  return (
    <div className="qa-search-results-list">
      <ul className="o-list">
        {results.slice(0, limit).map((result, i) => (
          <SearchListItem
            key={`${result.label}-${i}`} // eslint-disable-line react/no-array-index-key
            {...{
              category: categoryResults,
              result
            }}
          />
        ))}
      </ul>
      {hasLoadMore &&
      <button
        type="button"
        className="c-show-more c-show-more--gray qa-show-more"
        onClick={fetchMoreResults}
        tabIndex="0"
      >
        Toon meer
      </button>
      }
    </div>
  );
};

SearchList.defaultProps = {
  hasLoadMore: false,
  limit: undefined
};

SearchList.propTypes = {
  categoryResults: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  hasLoadMore: PropTypes.bool,
  fetchMoreResults: PropTypes.func.isRequired,
  limit: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
};

export default SearchList;