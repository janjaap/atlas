describe('The highlight factory', function () {
    var highlight,
        L,
        $rootScope,
        crsService,
        crsConverter,
        geojson,
        store,
        ACTIONS,
        mockedLeafletMap,
        mockedWmsLayer,
        mockedWmsLayers,
        mockedLatLngBounds,
        mockedItems = {
            item_multipolygon: {
                id: 'item_multipolygon',
                geometry: {
                    type: 'MultiPolygon',
                    coordinates: [
                        [[[102.0, 2.0], [103.0, 2.0], [103.0, 3.0], [102.0, 3.0], [102.0, 2.0]]],
                        [[[100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0]],
                        [[100.2, 0.2], [100.8, 0.2], [100.8, 0.8], [100.2, 0.8], [100.2, 0.2]]]
                    ]
                },
                useAutoFocus: true
            },
            item_polygon: {
                id: 'item_polygon',
                geometry: {
                    type: 'Polygon',
                    coordinates: [
                        [
                            [100.0, 0.0], [102.0, 0.0], [102.0, 10.0], [100.0, 10.0], [100.0, 0.0]
                        ]
                    ]
                },
                useAutoFocus: true
            },
            item_point: {
                id: 'item_point',
                geometry: {
                    type: 'Point',
                    coordinates: [100.0, 0.0]
                },
                useAutoFocus: true
            },
            item_marker: {
                id: 'item_marker',
                geometry: {
                    type: 'Point',
                    coordinates: [100.0, 0.0]
                },
                useAutoFocus: false
            },
            item_rotated_marker: {
                id: 'item_rotated_marker',
                geometry: {
                    type: 'Point',
                    coordinates: [100.0, 0.0]
                },
                orientation: 145,
                useAutoFocus: false
            }
        },
        mockedLayer = {
            getBounds: function () {
                return 'FAKE_LAYER_BOUNDS';
            }
        },
        mockedClusteredLayer = {
            addLayer: angular.noop,
            getBounds: function () {
                return 'FAKE_CLUSTERED_LAYER_BOUNDS';
            }
        },
        areAllClusteredMarkersInViewport,
        projGeoJsonArguments;

    beforeEach(function () {
        angular.mock.module(
            'dpMap',
            {
                mapConfig: {
                    DEFAULT_ZOOM_HIGHLIGHT: 14
                },
                crsConverter: {
                    rdToWgs84: function (location) {
                        if (location === 'FAKE_POINT_CENTER_RD') {
                            return 'FAKE_POINT_CENTER_WGS84';
                        } else if (location === 'FAKE_POLYGON_CENTER_RD') {
                            return 'FAKE_POLYGON_CENTER_WGS84';
                        } else if (location === 'FAKE_MULTIPOLYGON_CENTER_RD') {
                            return 'FAKE_MULTIPOLYGON_CENTER_WGS84';
                        }
                    }
                },
                geojson: {
                    getCenter: function (geometry) {
                        if (geometry.type === 'Point') {
                            return 'FAKE_POINT_CENTER_RD';
                        } else if (geometry.type === 'Polygon') {
                            return 'FAKE_POLYGON_CENTER_RD';
                        } else if (geometry.type === 'MultiPolygon') {
                            return 'FAKE_MULTIPOLYGON_CENTER_RD';
                        }
                    }
                },
                panning: {
                    getCurrentLocation: function () {
                        return 'FAKE_LOCATION_CENTER';
                    }
                },
                store: {
                    dispatch: angular.noop,
                    getState: angular.noop
                },
                clusteredMarkersConfig: {
                    looksGoodToMe: true,
                    optimizationLevel: 999
                }
            },
            function ($provide) {
                $provide.constant('ICON_CONFIG', {
                    item_multipolygon: {
                        foo: 'a'
                    },
                    item_polygon: {
                        foo: 'b'
                    },
                    item_point: {
                        foo: 'b'
                    },
                    item_marker: {
                        foo: 'c'
                    },
                    item_rotated_marker: {
                        foo: 'd'
                    },
                    detail: {
                        foo: 'e'
                    }
                });
            }
        );

        angular.mock.inject(function (_highlight_, _L_, _$rootScope_, _crsService_, _crsConverter_, _geojson_, _store_,
                                      _ACTIONS_) {
            highlight = _highlight_;
            L = _L_;
            $rootScope = _$rootScope_;
            crsService = _crsService_;
            crsConverter = _crsConverter_;
            geojson = _geojson_;
            store = _store_;
            ACTIONS = _ACTIONS_;
        });

        mockedWmsLayer = {
            addTo: angular.noop,
            removeFrom: angular.noop,
            getElement: angular.noop,
            setOpacity: angular.noop
        };

        spyOn(mockedWmsLayer, 'addTo');
        spyOn(mockedWmsLayer, 'removeFrom');
        spyOn(mockedWmsLayer, 'setOpacity');

        mockedWmsLayers = [
            {
                // layer without options object
            }, {
                ...mockedWmsLayer,
                options: {
                    layers: ['meetbouten']
                }
            }, {
                ...mockedWmsLayer,
                options: {
                    layers: ['monumenten']
                }
            }
        ];

        mockedLeafletMap = {
            addLayer: angular.noop,
            removeLayer: angular.noop,
            eachLayer: callback => {
                mockedWmsLayers.forEach(wmsLayer => {
                    callback.call({}, wmsLayer);
                });
            },
            fitBounds: angular.noop,
            getBounds: function () {
                return mockedLatLngBounds;
            },
            getBoundsZoom: angular.noop,
            getCenter: function () {
                return {
                    lat: 'FAKE_LATITUDE',
                    lng: 'FAKE_LONGITUDE'
                };
            },
            getZoom: angular.noop,
            on: angular.noop,
            off: angular.noop
        };

        mockedLatLngBounds = {
            contains: function () {
                return areAllClusteredMarkersInViewport;
            }
        };

        areAllClusteredMarkersInViewport = true;

        spyOn(mockedLeafletMap, 'addLayer');
        spyOn(mockedLeafletMap, 'removeLayer');
        spyOn(mockedLeafletMap, 'eachLayer').and.callThrough();
        spyOn(mockedLeafletMap, 'fitBounds').and.callThrough();

        L.Proj.geoJson = function () {
            projGeoJsonArguments = arguments;

            return mockedLayer;
        };

        spyOn(L.Proj, 'geoJson').and.callThrough();
        spyOn(L, 'icon').and.returnValue('FAKE_ICON');
        spyOn(L, 'marker').and.returnValue('FAKE_MARKER');

        spyOn(L.DomUtil, 'getStyle');

        spyOn(L, 'markerClusterGroup').and.returnValue(mockedClusteredLayer);
        spyOn(mockedClusteredLayer, 'addLayer');
        spyOn(crsService, 'getRdObject').and.returnValue('FAKE_RD_OBJECT');

        spyOn(crsConverter, 'rdToWgs84').and.callThrough();
        spyOn(geojson, 'getCenter').and.callThrough();

        spyOn(store, 'dispatch');
        spyOn(store, 'getState').and.returnValue({
            map: {
                highlight: true
            }
        });

        spyOn(mockedLatLngBounds, 'contains').and.callThrough();
    });

    afterEach(function () {
        projGeoJsonArguments = undefined;
    });

    it('has an initialize function to set the Leaflet image path for icons to \'assets\'', function () {
        expect(L.Icon.Default.imagePath).not.toBe('assets');

        highlight.initialize();
        expect(L.Icon.Default.imagePath).toBe('assets');
    });

    it('can add a MultiPolygons to the map', function () {
        var item = {
            id: 'item_multipolygon',
            geometry: {
                type: 'MultiPolygon',
                coordinates: [
                    [[[102.0, 2.0], [103.0, 2.0], [103.0, 3.0], [102.0, 3.0], [102.0, 2.0]]],
                    [[[100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0]],
                    [[100.2, 0.2], [100.8, 0.2], [100.8, 0.8], [100.2, 0.8], [100.2, 0.2]]]
                ]
            }
        };

        highlight.addMarker(mockedLeafletMap, item);

        expect(L.Proj.geoJson).toHaveBeenCalledWith(jasmine.objectContaining(item.geometry), jasmine.any(Object));
        expect(mockedLeafletMap.addLayer).toHaveBeenCalledWith(mockedLayer);
    });

    it('has custom styling for MultiPolygons', function () {
        highlight.addMarker(mockedLeafletMap, mockedItems.item_multipolygon);

        // In the real world Leaflet calls the style function
        expect(projGeoJsonArguments[1].style()).toEqual({
            color: 'red',
            fillColor: 'red',
            weight: 2,
            opacity: 1.6,
            fillOpacity: 0.2
        });
    });

    it('can add markers with custom icons to the map', function () {
        var item = {
            id: 'item_marker',
            geometry: {
                type: 'Point',
                coordinates: [100.0, 0.0]
            }
        };

        highlight.addMarker(mockedLeafletMap, mockedItems.item_marker);

        expect(L.Proj.geoJson).toHaveBeenCalledWith(jasmine.objectContaining(item.geometry), jasmine.any(Object));
        projGeoJsonArguments[1].pointToLayer(null, 'FAKE_LATLNG'); // In the real world Leaflet calls this function

        expect(L.icon).toHaveBeenCalledWith({
            foo: 'c'
        });

        expect(L.marker).toHaveBeenCalledWith('FAKE_LATLNG', jasmine.objectContaining({
            icon: 'FAKE_ICON'
        }));

        expect(mockedLeafletMap.addLayer).toHaveBeenCalledWith(mockedLayer);
    });

    it('can add rotated markers to the map', function () {
        highlight.addMarker(mockedLeafletMap, mockedItems.item_rotated_marker);
        projGeoJsonArguments[1].pointToLayer(null, 'FAKE_LATLNG'); // In the real world Leaflet calls this function

        expect(L.marker).toHaveBeenCalledWith('FAKE_LATLNG', {
            icon: 'FAKE_ICON',
            alt: 'Marker op de kaart',
            rotationAngle: 145
        });
    });

    it('sets the CRS to RD', function () {
        ['item_multipolygon', 'item_marker', 'item_rotated_marker'].forEach(function (item) {
            highlight.addMarker(mockedLeafletMap, mockedItems[item]);

            expect(L.Proj.geoJson).toHaveBeenCalledWith(
                angular.merge(
                    mockedItems[item].geometry,
                    {
                        crs: 'FAKE_RD_OBJECT'
                    }
                ),
                jasmine.any(Object)
            );
        });
    });

    it('can remove highlighted markers from the map', function () {
        ['item_multipolygon', 'item_marker', 'item_rotated_marker'].forEach(function (item) {
            highlight.addMarker(mockedLeafletMap, mockedItems[item]);
            highlight.removeMarker(mockedLeafletMap, mockedItems[item]);

            expect(mockedLeafletMap.removeLayer).toHaveBeenCalledWith(mockedLayer);
        });
    });

    it('can add clustered markers to the map', function () {
        spyOn(mockedLeafletMap, 'getZoom').and.returnValue(13);

        highlight.setCluster(mockedLeafletMap, [
            [52.1, 4.0],
            [52.2, 4.0],
            [52.3, 4.1]
        ]);

        // Making sure the configuration is used
        expect(L.markerClusterGroup).toHaveBeenCalledWith({
            looksGoodToMe: true,
            optimizationLevel: 999
        });

        // Three icons are created (one for each marker) that share the icon config of a 'detail geometry'
        expect(L.icon).toHaveBeenCalledTimes(3);
        expect(L.icon).toHaveBeenCalledWith({foo: 'e'});

        // Three markers are created with those icons associated to them
        expect(L.marker).toHaveBeenCalledTimes(3);
        expect(L.marker).toHaveBeenCalledWith(
            [52.1, 4.0],
            {
                icon: 'FAKE_ICON'
            }
        );
        expect(L.marker).toHaveBeenCalledWith(
            [52.2, 4.0],
            {
                icon: 'FAKE_ICON'
            }
        );

        expect(L.marker).toHaveBeenCalledWith(
            [52.3, 4.1],
            {
                icon: 'FAKE_ICON'
            }
        );

        // And those three markers are added to a single layer
        expect(mockedClusteredLayer.addLayer).toHaveBeenCalledTimes(3);
        expect(mockedClusteredLayer.addLayer).toHaveBeenCalledWith('FAKE_MARKER');

        // The new clusteredLayer is then added to the map
        expect(mockedLeafletMap.addLayer).toHaveBeenCalledWith(mockedClusteredLayer);
    });

    it('doesn\'t pan and zoom to the clustered markers if all markers are already in the viewport', () => {
        areAllClusteredMarkersInViewport = true;

        highlight.setCluster(mockedLeafletMap, [
            [52.1, 4.0],
            [52.2, 4.0],
            [52.3, 4.1]
        ]);

        expect(mockedLatLngBounds.contains).toHaveBeenCalledWith('FAKE_CLUSTERED_LAYER_BOUNDS');
        expect(store.dispatch).not.toHaveBeenCalledWith(jasmine.objectContaining({type: ACTIONS.MAP_ZOOM}));
    });

    it('pans and zooms to the clustered markers if one or more are outside the viewport', () => {
        areAllClusteredMarkersInViewport = false;

        highlight.setCluster(mockedLeafletMap, [
            [52.1, 4.0],
            [52.2, 4.0],
            [52.3, 4.1]
        ]);

        expect(mockedLatLngBounds.contains).toHaveBeenCalledWith('FAKE_CLUSTERED_LAYER_BOUNDS');
        expect(store.dispatch).toHaveBeenCalledWith(jasmine.objectContaining({type: ACTIONS.MAP_ZOOM}));
    });

    it('can remove clustered markers from the map', function () {
        spyOn(mockedLeafletMap, 'getZoom').and.returnValue(13);

        // When there is nothing to delete, nothing happens
        highlight.clearCluster(mockedLeafletMap);
        expect(mockedLeafletMap.removeLayer).not.toHaveBeenCalled();

        // First make sure there is something to delete
        highlight.setCluster(mockedLeafletMap, [
            [52.1, 4.0],
            [52.2, 4.0],
            [52.3, 4.1]
        ]);
        expect(mockedLeafletMap.removeLayer).not.toHaveBeenCalled();

        // Then delete it
        highlight.clearCluster(mockedLeafletMap);
        expect(mockedLeafletMap.removeLayer).toHaveBeenCalledWith(mockedClusteredLayer);
    });

    it('can add a new cluster to the map after clearing the old cluster', function () {
        spyOn(mockedLeafletMap, 'getZoom').and.returnValue(13);

        expect(mockedLeafletMap.addLayer).not.toHaveBeenCalled();
        expect(mockedLeafletMap.removeLayer).not.toHaveBeenCalled();

        // Set a cluster
        highlight.setCluster(mockedLeafletMap, [
            [52.1, 4.0],
            [52.2, 4.0],
            [52.3, 4.1]
        ]);

        expect(mockedLeafletMap.addLayer).toHaveBeenCalledTimes(1);
        expect(mockedLeafletMap.removeLayer).not.toHaveBeenCalled();
        expect(mockedClusteredLayer.addLayer).toHaveBeenCalledTimes(3); // Once for each marker

        mockedLeafletMap.addLayer.calls.reset();
        mockedClusteredLayer.addLayer.calls.reset();

        // Clear the cluster
        highlight.clearCluster(mockedLeafletMap);

        expect(mockedLeafletMap.addLayer).not.toHaveBeenCalled();
        expect(mockedLeafletMap.removeLayer).toHaveBeenCalledTimes(1);

        mockedLeafletMap.removeLayer.calls.reset();

        // Set another cluster
        highlight.setCluster(mockedLeafletMap, [
            [52.1, 4.1],
            [52.2, 4.1]
        ]);
        expect(mockedLeafletMap.addLayer).toHaveBeenCalledTimes(1);
        expect(mockedLeafletMap.removeLayer).not.toHaveBeenCalled();
        expect(mockedClusteredLayer.addLayer).toHaveBeenCalledTimes(2);
    });

    describe('triggers MAP_ZOOM when geometry has been found (center and zoom)', function () {
        it('Points do center automatically but use a default zoom level', function () {
            spyOn(mockedLeafletMap, 'getBoundsZoom').and.returnValue(NaN);
            spyOn(mockedLeafletMap, 'getZoom').and.returnValue(13);

            highlight.addMarker(mockedLeafletMap, mockedItems.item_point);
            expect(mockedLeafletMap.fitBounds).not.toHaveBeenCalled();

            // 14 is the fallback zoom level defined in mapConfig.DEFAULT_ZOOM_HIGHLIGHT
            expect(store.dispatch).toHaveBeenCalledWith({
                type: ACTIONS.MAP_ZOOM,
                payload: {
                    viewCenter: 'FAKE_POINT_CENTER_WGS84',
                    zoom: 14
                }
            });

            $rootScope.$apply();
            expect(mockedLeafletMap.eachLayer).toHaveBeenCalledTimes(1);

            expect(L.DomUtil.getStyle).toHaveBeenCalledTimes(2);
            expect(mockedWmsLayer.addTo).toHaveBeenCalledTimes(2);
            expect(mockedWmsLayer.removeFrom).toHaveBeenCalledTimes(2);
            expect(mockedWmsLayer.setOpacity).toHaveBeenCalledTimes(2);
        });

        it('Points will not zoom out when viewing with a zoom level larger than 14', function () {
            spyOn(mockedLeafletMap, 'getBoundsZoom').and.returnValue(NaN);
            spyOn(mockedLeafletMap, 'getZoom').and.returnValue(15);

            highlight.addMarker(mockedLeafletMap, mockedItems.item_point);
            expect(mockedLeafletMap.fitBounds).not.toHaveBeenCalled();

            // 14 is the fallback zoom level defined in mapConfig.DEFAULT_ZOOM_HIGHLIGHT
            expect(store.dispatch).toHaveBeenCalledWith({
                type: ACTIONS.MAP_ZOOM,
                payload: {
                    viewCenter: 'FAKE_POINT_CENTER_WGS84',
                    zoom: 15
                }
            });
        });

        it('Polygons support autozoom and auto center (without animation)', function () {
            spyOn(mockedLeafletMap, 'getBoundsZoom').and.returnValue(10);

            highlight.addMarker(mockedLeafletMap, mockedItems.item_polygon);

            expect(mockedLeafletMap.fitBounds).toHaveBeenCalledWith('FAKE_LAYER_BOUNDS', {animate: false});
            expect(store.dispatch).toHaveBeenCalledWith({
                type: ACTIONS.MAP_ZOOM,
                payload: {
                    viewCenter: 'FAKE_LOCATION_CENTER',
                    zoom: 10
                }
            });
        });

        it('MultiPolygons support autozoom and auto center (without animation)', function () {
            spyOn(mockedLeafletMap, 'getBoundsZoom').and.returnValue(10);

            highlight.addMarker(mockedLeafletMap, mockedItems.item_multipolygon);

            expect(mockedLeafletMap.fitBounds).toHaveBeenCalledWith('FAKE_LAYER_BOUNDS', {animate: false});
            expect(store.dispatch).toHaveBeenCalledWith({
                type: ACTIONS.MAP_ZOOM,
                payload: {
                    viewCenter: 'FAKE_LOCATION_CENTER',
                    zoom: 10
                }
            });
        });
    });

    it('doesn\'t pan and zoom to the marker if highight is off', () => {
        store.getState.and.returnValue({
            map: {
                highlight: false
            }
        });

        highlight.addMarker(mockedLeafletMap, mockedItems.item_point);

        expect(store.dispatch).toHaveBeenCalledWith(jasmine.objectContaining({type: ACTIONS.MAP_HIGHLIGHT}));
    });
});
