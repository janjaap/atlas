import React from 'react';
import PropTypes from 'prop-types';

import MapLegend from '../legend/MapLegend';
import AddIcon from '../../../../public/images/icon-plus.svg';
import RemoveIcon from '../../../../public/images/icon-cross.svg';

import './_map-layers.scss';

const getCategories = (layers) => (
  layers.filter((layer) => layer.category).map((layer) => layer.category)
);

const MapLayers = (props) => (
  <div className="map-layers">
    <h3 className="u-sr-only">Beschikbare kaartlagen</h3>
    <ul>
      {[...new Set(getCategories(props.layers))]
        .map((category) => (
          <li className="map-layers__category" key={category}>
            <h4 className="map-layers__category-text">{category}</h4>
            <ul>
              {props.layers
                .filter((layer) => layer.category === category)
                .map((layer) => (
                  <li
                    className={`
                      map-layers__title
                      map-layers__title--${props.activeMapLayers.some((mapLayer) => layer.title === mapLayer.title) ? 'active' : 'inactive'}
                    `}
                    key={layer.title}
                  >
                    <button onClick={() => {
                      MapLegend.mapLayersLegendItemsToIds(layer).forEach((mapLayerId) =>
                        props.onLayerToggle(mapLayerId));
                    }}
                    >
                      <span className="map-layers__toggle-title">
                        {layer.title}
                      </span>
                      <span className="map-layers__toggle map-layers__toggle--remove">
                        <RemoveIcon />
                      </span>
                      <span className="map-layers__toggle map-layers__toggle--add">
                        <AddIcon />
                      </span>
                    </button>
                  </li>
              ))}
            </ul>
          </li>
      ))}
    </ul>
  </div>
);

MapLayers.propTypes = {
  activeMapLayers: PropTypes.array, // eslint-disable-line
  layers: PropTypes.array, // eslint-disable-line
  onLayerToggle: PropTypes.func.isRequired // eslint-disable-line react/no-unused-prop-types
};

export default MapLayers;
