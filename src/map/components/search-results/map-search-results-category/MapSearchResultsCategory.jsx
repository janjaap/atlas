import React from 'react';
import PropTypes from 'prop-types';

import MapSearchResultsItem from '../map-search-results-item/MapSearchResultsItem';

import categoryLabelsByType from '../../../services/map-search/category-labels-by-type';

const getStatusLabel = (result) => (
  result.statusLabel && result.statusLabel.length > 0 ? `(${result.statusLabel})` : '');

const getPluralLabel = (result) => categoryLabelsByType[result.type].plural;

const MapSearchResultsCategory = ({ category, onItemClick, onShowMoreClick, isSubcategory }) => (
  <li className={
      `map-search-results-category
      ${isSubcategory ? 'map-search-results-category--subcategory' : ''}`}
  >
    <h4 className="map-search-results-category__header">
      {
        category.results.length > 1 ?
        `${getPluralLabel(category)}` : `${category.categoryLabel}`
      }
    </h4>
    <ul className="map-search-results-category__list">
      {
        category.results.map((result) => (
          <MapSearchResultsItem
            key={result.uri}
            label={result.label}
            statusLabel={getStatusLabel(result)}
            onClick={/* istanbul ignore next */ () => {
              onItemClick(result.uri);
            }}
          />
        ))
      }
      {
        category.showMore && (
          <li className="map-search-results-category__showmore">
            <button
              className="map-search-results-item__button"
              onClick={onShowMoreClick}
              title="Volledig weergeven"
            >
              ...
            </button>
          </li>
        )
      }
      {
        category.subCategories && category.subCategories.length ?
        category.subCategories.map((subCategory) => (
          <MapSearchResultsCategory
            key={subCategory.categoryLabel}
            category={subCategory}
            isSubcategory
            onItemClick={onItemClick}
            onShowMoreClick={onShowMoreClick}
          />
        )) : ''
      }
    </ul>
  </li>
);

MapSearchResultsCategory.defaultProps = {
  isSubcategory: false
};

MapSearchResultsCategory.propTypes = {
  category: PropTypes.shape({
    categoryLabel: PropTypes.string.isRequired,
    results: PropTypes.array.isRequired,
    subCategories: PropTypes.isRequired,
    type: PropTypes.string.isRequired,
    uri: PropTypes.string
  }).isRequired,
  isSubcategory: PropTypes.bool,
  onItemClick: PropTypes.func.isRequired,
  onShowMoreClick: PropTypes.func.isRequired
};

export default MapSearchResultsCategory;
