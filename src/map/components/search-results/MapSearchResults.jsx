import React from 'react';
import PropTypes from 'prop-types';

import { wgs84ToRd } from '../../../shared/services/coordinate-reference-system';
import MapSearchResultsCategory from './map-search-results-category/MapSearchResultsCategory';
import Notification from '../../../shared/components/notification/Notification';
import MaximizeIcon from '../../../../public/images/icon-maximize.svg';

const MapSearchResults = ({
  resultLimit,
  location,
  missingLayers,
  onItemClick,
  panoUrl,
  results,
  onMaximize,
  onPanoPreviewClick
}) => {
  const rdCoordinates = wgs84ToRd(location);

  const limitResults = (categories) => categories.map((category) => ({
    ...category,
    results: category.results.slice(0, resultLimit),
    subCategories: limitResults(category.subCategories),
    showMore: category.results.length > resultLimit
  }));

  return (
    <section className="map-search-results">
      <header
        className={`
          map-search-results__header
          map-search-results__header--${panoUrl ? 'pano' : 'no-pano'}
        `}
      >
        <button
          className={`
            map-search-results__header-pano-button
            map-search-results__header-pano-button--${panoUrl ? 'enabled' : 'disabled'}
          `}
          disabled={!panoUrl}
          onClick={onPanoPreviewClick}
          title={panoUrl ? 'Bekijk Panorama view' : 'Geen Panoramabeeld beschikbaar'}
        >
          {panoUrl && (
            <img
              alt="Panoramabeeld"
              className="map-search-results__header-pano"
              height="292"
              src={panoUrl}
              width="438"
            />
          )}
          <div className="map-search-results__header-container">
            <h1 className="map-search-results__header-title">Resultaten</h1>
            <h2 className="map-search-results__header-subtitle">
              locatie {rdCoordinates.x.toFixed(2)}, {rdCoordinates.y.toFixed(2)}
            </h2>
          </div>
        </button>
      </header>
      <div className="map-search-results__scroll-wrapper">
        <ul className="map-search-results__list">
          {missingLayers && (
            <li>
              <Notification>Geen details beschikbaar van: {missingLayers}</Notification>
            </li>
          )}
          {
            limitResults(results).map((mainCategory) => (
              <MapSearchResultsCategory
                key={mainCategory.categoryLabel}
                category={mainCategory}
                onItemClick={onItemClick}
                onShowMoreClick={onMaximize}
              />
            ))
          }
        </ul>
        <footer className="map-search-results__footer">
          <button
            className="map-search-results__button"
            onClick={onMaximize}
            title="Volledig weergeven"
          >
            <MaximizeIcon className="map-search-results__button-icon" />
            Volledig weergeven
          </button>
        </footer>
      </div>
    </section>
  );
};

MapSearchResults.defaultProps = {
  resultLimit: 25
};

MapSearchResults.propTypes = {
  location: PropTypes.object, // eslint-disable-line
  missingLayers: PropTypes.string, // eslint-disable-line
  onItemClick: PropTypes.func.isRequired,
  onMaximize: PropTypes.func.isRequired,
  onPanoPreviewClick: PropTypes.func.isRequired,
  resultLimit: PropTypes.number,
  panoUrl: PropTypes.string, // eslint-disable-line
  results: PropTypes.array // eslint-disable-line
};

export default MapSearchResults;
