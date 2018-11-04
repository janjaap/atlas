import { getClusterMarkers, getDataSelection, getGeoJsons, getMarkers } from './data-selection';

describe('Data selection selectors', () => {
  const mockParameters = {
    dataSelection: {
      dataset: 'bag',
      markers: {
        clusterMarkers: [
          { position: [50000, 50000] },
          { position: [60000, 60000] },
          { position: [70000, 70000] }
        ],
        markers: [
          [50000, 50000],
          [60000, 60000]
        ],
        geoJsons: [
          [70000, 70000]
        ]
      },
      geometryFilter: {
        markers: [
          [50000, 50000],
          [60000, 60000]
        ]
      }
    }
  };

  describe('getDataSelection', () => {
    it('should return dataSelection', () => {
      const selected = getDataSelection(mockParameters);
      expect(selected).toBe(mockParameters.dataSelection);
    });

    it('should return undefined', () => {
      const selected = getDataSelection({});
      expect(selected).toBe();
    });
  });

  describe('getClusterMarkers', () => {
    it('should return an array with markers', () => {
      const selected = getClusterMarkers(mockParameters);
      expect(Array.isArray(selected)).toBe(true);
      selected.forEach((item, index) => {
        expect(item).toEqual(mockParameters.dataSelection.markers.clusterMarkers[index]);
      });
    });

    it('should return an array with markers', () => {
      const selected = getClusterMarkers({
        ...mockParameters,
        markers: []
      });
      expect(Array.isArray(selected)).toBe(true);
      expect(selected.length).toBe(3);
    });
  });

  describe('getGeoJsons', () => {
    it('should get geoJsons from markers in dataSelection', () => {
      expect(getGeoJsons(mockParameters)).toEqual([[70000, 70000]]);
    });
  });

  describe('getMarkers', () => {
    it('should get markers from markers in dataSelection', () => {
      expect(getMarkers(mockParameters)).toEqual([
        [50000, 50000],
        [60000, 60000]
      ]);
    });
  });
});
