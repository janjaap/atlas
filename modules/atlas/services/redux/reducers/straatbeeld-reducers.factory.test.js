describe('Straatbeeld reducers factory', function () {
    var straatbeeldReducers,
        inputState,
        ACTIONS;

    beforeEach(function () {
        const DEFAULT_STATE = {
            map: {
                baseLayer: 'topografie',
                overlays: [],
                viewCenter: [52.3719, 4.9012],
                zoom: 9,
                isLoading: false
            },
            search: null,
            page: {
                name: 'home'
            },
            detail: null,
            straatbeeld: null,
            dataSelection: null,
            ui: {
                isMapFullscreen: false,
                isMapPanelVisible: false,
                isPrintMode: false
            }
        };

        angular.mock.module(
            'atlas',
            function ($provide) {
                $provide.constant('STRAATBEELD_CONFIG', {
                    DEFAULT_FOV: 79
                });
            }
        );

        angular.mock.inject(function (_straatbeeldReducers_, _ACTIONS_) {
            straatbeeldReducers = _straatbeeldReducers_;
            inputState = angular.copy(DEFAULT_STATE);
            ACTIONS = _ACTIONS_;
        });
    });

    describe('FETCH_STRAATBEELD_BY_ID', function () {
        var payload;

        beforeEach(function () {
            payload = {
                'id': 'ABC',
                'heading': 123,
                'isInitial': true
            };
        });

        it('when heading is not in payload, use oldstate heading', function () {
            delete payload.heading;

            inputState.straatbeeld = {
                'fov': 1,
                'pitch': 2,
                'date': 'today',
                'heading': 179,
                'hotspots': ['a', 'b'],
                'location': ['lat', 'lon'],
                'image': 'http://example.com/example.png'
            };

            var newState = straatbeeldReducers[ACTIONS.FETCH_STRAATBEELD_BY_ID.id](inputState, payload);
            expect(newState.straatbeeld.heading).toBe(179);
        });

        it('when heading is in payload, use the payload heading', function () {
            var newState = straatbeeldReducers[ACTIONS.FETCH_STRAATBEELD_BY_ID.id](inputState, payload);
            expect(newState.straatbeeld.heading).toBe(123);
        });

        it('Set INITIAL id, heading, isInitial', function () {
            inputState.straatbeeld = null;
            var newState = straatbeeldReducers[ACTIONS.FETCH_STRAATBEELD_BY_ID.id](inputState, payload);
            expect(newState.straatbeeld).toEqual(jasmine.objectContaining(payload));
        });

        it('Sets loading indication for map and straatbeeld', function () {
            var newState = straatbeeldReducers[ACTIONS.FETCH_STRAATBEELD_BY_ID.id](inputState, payload);
            expect(newState.straatbeeld.isLoading).toBe(true);
            expect(newState.map.isLoading).toBe(true);
        });

        it('resets previous straatbeeld variables', function () {
            inputState.straatbeeld = {
                'fov': 1,
                'pitch': 2,
                'date': 'today',
                'hotspots': ['a', 'b'],
                'location': ['lat', 'lon'],
                'image': 'http://example.com/example.png'
            };

            var newState = straatbeeldReducers[ACTIONS.FETCH_STRAATBEELD_BY_ID.id](inputState, payload);

            expect(newState.straatbeeld.fov).toBeNull();
            expect(newState.straatbeeld.pitch).toBeNull();
            expect(newState.straatbeeld.date).toBeNull();
            expect(newState.straatbeeld.hotspots).toEqual([]);
            expect(newState.straatbeeld.location).toBeNull();
            expect(newState.straatbeeld.image).toBeNull();
        });

        it('resets search results', function () {
            inputState.search = {
                query: 'linnaeus'
            };

            var newState = straatbeeldReducers[ACTIONS.FETCH_STRAATBEELD_BY_ID.id](inputState, payload);
            expect(newState.search).toBeNull();
        });

        it('has a default heading of 0', function () {
            inputState.search = {
                query: 'linnaeus'
            };
            inputState.straatbeeld = null;
            payload.heading = null;

            var newState = straatbeeldReducers[ACTIONS.FETCH_STRAATBEELD_BY_ID.id](inputState, payload);
            expect(newState.straatbeeld.heading).toBe(0);
        });

        it('optionally sets straatbeeld to fullscreen', function () {
            inputState.detail = {
                endpoint: 'bag/verblijfsobject/123/',
                geometry: 'aap',
                isLoading: false
            };

            let newState = straatbeeldReducers[ACTIONS.FETCH_STRAATBEELD_BY_ID.id](inputState, payload);
            expect(newState.straatbeeld.isFullscreen).toBeUndefined();

            payload.isFullscreen = true;
            newState = straatbeeldReducers[ACTIONS.FETCH_STRAATBEELD_BY_ID.id](newState, payload);
            expect(newState.straatbeeld.isFullscreen).toBe(true);

            delete payload.isFullscreen;
            newState = straatbeeldReducers[ACTIONS.FETCH_STRAATBEELD_BY_ID.id](newState, payload);
            expect(newState.straatbeeld.isFullscreen).toBe(true);

            payload.isFullscreen = false;
            newState = straatbeeldReducers[ACTIONS.FETCH_STRAATBEELD_BY_ID.id](newState, payload);
            expect(newState.straatbeeld.isFullscreen).toBe(false);

            delete payload.isFullscreen;
            newState = straatbeeldReducers[ACTIONS.FETCH_STRAATBEELD_BY_ID.id](newState, payload);
            expect(newState.straatbeeld.isFullscreen).toBeUndefined();
        });

        it('when map is not an object', function () {
            inputState.map = null;

            const output = straatbeeldReducers[ACTIONS.FETCH_STRAATBEELD_BY_ID.id](inputState, payload);
            expect(output.map).toBeNull();
        });
    });

    describe('STRAATBEELD_FULLSCREEN', () => {
        let payload;

        beforeEach(function () {
            inputState.straatbeeld = {};
        });

        it('can set straatbeeld explicitly to fullscreen', function () {
            let newState = straatbeeldReducers[ACTIONS.STRAATBEELD_FULLSCREEN.id](inputState);
            expect(newState.straatbeeld.isFullscreen).toBeUndefined();

            payload = true;
            newState = straatbeeldReducers[ACTIONS.STRAATBEELD_FULLSCREEN.id](newState, payload);
            expect(newState.straatbeeld.isFullscreen).toBe(true);
            newState = straatbeeldReducers[ACTIONS.STRAATBEELD_FULLSCREEN.id](newState);
            expect(newState.straatbeeld.isFullscreen).toBe(true);

            payload = false;
            newState = straatbeeldReducers[ACTIONS.STRAATBEELD_FULLSCREEN.id](newState, payload);
            expect(newState.straatbeeld.isFullscreen).toBe(false);
            newState = straatbeeldReducers[ACTIONS.STRAATBEELD_FULLSCREEN.id](newState);
            expect(newState.straatbeeld.isFullscreen).toBe(false);
        });

        it('when straatbeeld is not an object', function () {
            inputState.straatbeeld = null;

            const output = straatbeeldReducers[ACTIONS.STRAATBEELD_FULLSCREEN.id](inputState, payload);
            expect(output.straatbeeld).toBeNull();
        });
    });

    describe('SHOW_STRAATBEELD', function () {
        var payload = {
            date: new Date('2016-05-19T13:04:15.341110Z'),
            hotspots: [{
                id: 'ABC',
                heading: 179,
                distance: 3
            }],
            location: [52, 4],
            image: {
                pattern: 'http://example.com/example/{this}/{that}/{whatever}.png',
                preview: 'http://example.com/example/preview.png'
            }
        };

        beforeEach(function () {
            inputState.straatbeeld = {
                isLoading: true,
                id: 'ABC',
                heading: 123,
                isInitial: true
            };

            inputState.detail = null;
        });

        it('Adds the payload to the state', function () {
            var newState = straatbeeldReducers[ACTIONS.SHOW_STRAATBEELD_INITIAL.id](inputState, payload);

            expect(newState.straatbeeld).toEqual(jasmine.objectContaining(payload));
        });

        it('set defaults for pitch, fov when oldstate is unknown', function () {
            var newState = straatbeeldReducers[ACTIONS.SHOW_STRAATBEELD_INITIAL.id](inputState, payload);
            expect(newState.straatbeeld.pitch).toBe(0);
            expect(newState.straatbeeld.fov).toBe(79);
        });

        it('set Pitch and fov to newState when oldstate is known', function () {
            inputState.straatbeeld.pitch = 1;
            inputState.straatbeeld.fov = 2;

            var newState = straatbeeldReducers[ACTIONS.SHOW_STRAATBEELD_INITIAL.id](inputState, payload);
            expect(newState.straatbeeld.pitch).toBe(1);
            expect(newState.straatbeeld.fov).toBe(2);
        });

        it('sets viewcenter when no heading is known', function () {
            inputState.straatbeeld.heading = null;
            inputState.map = {};

            var newState = straatbeeldReducers[ACTIONS.SHOW_STRAATBEELD_INITIAL.id](inputState, payload);
            expect(newState.map.viewCenter).toEqual(payload.location);
        });

        it('do not overwrite isLoading, id, heading, isInitial', function () {
            var newState = straatbeeldReducers[ACTIONS.SHOW_STRAATBEELD_INITIAL.id](inputState, payload);

            expect(newState.straatbeeld).toEqual(jasmine.objectContaining({
                isLoading: false,
                id: 'ABC',
                heading: 123,
                isInitial: true
            }));
        });

        it('can set the straatbeeld to the new location', function () {
            var state = { straatbeeld: {}, ui: {} },
                output;

            const location = [52.001, 4.002];
            output = straatbeeldReducers[ACTIONS.FETCH_STRAATBEELD_BY_LOCATION.id](state, location);

            expect(output.straatbeeld.id).toBeNull();
            expect(output.straatbeeld.isLoading).toBe(true);
            expect(output.straatbeeld.location).toEqual(location);
            expect(output.straatbeeld.targetLocation).toEqual(location);
        });

        it('centers the map when fullscreen map is active', function () {
            const state = {
                page: {},
                map: {},
                ui: {
                    isMapPanelVisible: false,
                    isMapFullscreen: true
                }
            };
            const location = [52.001, 4.002];

            var newState = straatbeeldReducers[ACTIONS.FETCH_STRAATBEELD_BY_LOCATION.id](state, location);
            expect(newState.map.viewCenter).toEqual(location);
        });

        it('can set the straatbeeld to the new location from scratch', function () {
            var state = { ui: null },
                output;

            const location = [52.001, 4.002];
            output = straatbeeldReducers[ACTIONS.FETCH_STRAATBEELD_BY_LOCATION.id](state, location);

            expect(output.straatbeeld.id).toBeNull();
            expect(output.straatbeeld.isLoading).toBe(true);
            expect(output.straatbeeld.location).toEqual(location);
            expect(output.straatbeeld.targetLocation).toEqual(location);
        });

        it('removes a drawn line from the map', function () {
            const state = { map: {}, ui: {} },
                location = [52.001, 4.002],
                output = straatbeeldReducers[ACTIONS.FETCH_STRAATBEELD_BY_LOCATION.id](state, location);

            expect(output.map.geometry).toEqual([]);
        });

        it('heads towards a targetlocation when straatbeeld is loaded by location', function () {
            let newState;

            [
                {target: [52, 4], heading: 0},
                {target: [52, 5], heading: 90},
                {target: [52, 3], heading: -90},
                {target: [53, 5], heading: 45},
                {target: [51, 3], heading: -135},
                {target: [51, 5], heading: 135}
            ].forEach(({target, heading}) => {
                inputState.straatbeeld.targetLocation = target;
                inputState.straatbeeld.location = inputState.straatbeeld.targetLocation;
                newState = straatbeeldReducers[ACTIONS.SHOW_STRAATBEELD_INITIAL.id](inputState, payload);
                expect(newState.straatbeeld).toEqual(jasmine.objectContaining({
                    heading
                }));
            });
        });

        it('does not head towards a targetlocation when straatbeeld by location is reloaded', function () {
            // When a straatbeeld is reloaded, there is no target location available
            // There is however a location available to denote that the straatbeeld origins from a location
            // The heading has already been calculated and saved on the first show of the straatbeeld
            // and should not be repeated
            inputState.straatbeeld.location = [1, 2];
            delete inputState.straatbeeld.targetLocation;   // not saved in state, so not present on reload
            inputState.straatbeeld.heading = 'aap';
            const newState = straatbeeldReducers[ACTIONS.SHOW_STRAATBEELD_INITIAL.id](inputState, payload);
            expect(newState.straatbeeld).toEqual(jasmine.objectContaining({
                heading: inputState.straatbeeld.heading // keep original heading
            }));
        });

        it('Sets the map viewCenter when straatbeeld is loaded by id', function () {
            // When a straatbeeld is loaded by id the map should be centered on the location
            // Load by id is indicated by the absence of a location
            // The map center should not be set when the straatbeeld is loaded by location
            let newState;

            delete inputState.straatbeeld.location;
            delete inputState.straatbeeld.targetLocation;
            inputState.map.viewCenter = 'aap';
            newState = straatbeeldReducers[ACTIONS.SHOW_STRAATBEELD_INITIAL.id](inputState, payload);
            expect(newState.map).toEqual(jasmine.objectContaining({
                viewCenter: payload.location    // center map on payload location
            }));

            delete inputState.straatbeeld.location;
            inputState.straatbeeld.targetLocation = [1, 2];
            inputState.map.viewCenter = 'aap';
            newState = straatbeeldReducers[ACTIONS.SHOW_STRAATBEELD_INITIAL.id](inputState, payload);
            expect(newState.map).toEqual(jasmine.objectContaining({
                viewCenter: payload.location    // center map on payload location
            }));

            inputState.straatbeeld.location = [1, 2];
            delete inputState.straatbeeld.targetLocation;
            inputState.map.viewCenter = 'aap';
            newState = straatbeeldReducers[ACTIONS.SHOW_STRAATBEELD_INITIAL.id](inputState, payload);
            expect(newState.map).toEqual(jasmine.objectContaining({
                viewCenter: inputState.map.viewCenter   // keep original map viewCenter
            }));
        });

        it('Sets loading to false', function () {
            var newState = straatbeeldReducers[ACTIONS.SHOW_STRAATBEELD_INITIAL.id](inputState, payload);
            expect(newState.straatbeeld.isLoading).toBe(false);
            expect(newState.map.isLoading).toBe(false);
        });

        it('does nothing when straatbeeld is null', function () {
            inputState.straatbeeld = null;
            var newState = straatbeeldReducers[ACTIONS.SHOW_STRAATBEELD_INITIAL.id](inputState, payload);

            expect(newState.straatbeeld).toBeNull();
        });

        it('sets the map viewcenter on first and every subsequent straatbeeld', function () {
            inputState.map.viewCenter = null;
            let newState;

            payload.location = [5, 6];
            newState = straatbeeldReducers[ACTIONS.SHOW_STRAATBEELD_INITIAL.id](inputState, payload);
            expect(newState.map.viewCenter).toEqual([5, 6]);

            payload.location = [3, 4];
            newState = straatbeeldReducers[ACTIONS.SHOW_STRAATBEELD_SUBSEQUENT.id](inputState, payload);
            expect(newState.map.viewCenter).toEqual([3, 4]);
        });

        it('only sets the map viewcenter on a subsequent straatbeeld when straatbeeld active', function () {
            inputState.straatbeeld = null;  // no straatbeeld is active
            var location = inputState.map.viewCenter;   // save location
            payload.location = [location[0] + 1, location[1] + 1];  // try to set to other location
            var newState = straatbeeldReducers[ACTIONS.SHOW_STRAATBEELD_SUBSEQUENT.id](inputState, payload);
            expect(newState.map.viewCenter).toEqual(location);  // location is not changed; equal to old location
        });

        it('when map and straatbeeld are not an object', function () {
            inputState.map = null;
            inputState.straatbeeld = null;

            const output = straatbeeldReducers[ACTIONS.SHOW_STRAATBEELD_SUBSEQUENT.id](inputState);
            expect(output.map).toBeNull();
            expect(output.straatbeeld).toBeNull();
        });
    });

    describe('setOrientationReducer', function () {
        it('updates the orientation with pitch and fov', function () {
            inputState.straatbeeld = {};

            inputState.straatbeeld.pitch = 1;
            inputState.straatbeeld.fov = 2;

            var payload = {
                    heading: 91,
                    pitch: 1,
                    fov: 2
                },
                output;

            output = straatbeeldReducers.SET_STRAATBEELD_ORIENTATION(inputState, payload);

            expect(output.straatbeeld.pitch).toEqual(payload.pitch);
            expect(output.straatbeeld.fov).toEqual(payload.fov);
        });

        it('when straatbeeld is not an object', function () {
            inputState.straatbeeld = null;

            const output = straatbeeldReducers.SET_STRAATBEELD_ORIENTATION(inputState);
            expect(output.straatbeeld).toBeNull();
        });
    });

    describe('setStraatbeeldHistoryReducer', function () {
        it('sets the straatbeeld history selection', function () {
            inputState.straatbeeld = {};

            const payload = 2020;
            const output = straatbeeldReducers.SET_STRAATBEELD_HISTORY(inputState, payload);

            expect(output.straatbeeld.history).toEqual(payload);
        });

        it('updates the straatbeeld history selection', function () {
            inputState.straatbeeld = {};

            inputState.straatbeeld.history = 0;

            const payload = 2020;
            const output = straatbeeldReducers.SET_STRAATBEELD_HISTORY(inputState, payload);

            expect(output.straatbeeld.history).toEqual(payload);
        });

        it('can set the history selection to zero', function () {
            inputState.straatbeeld = {};

            inputState.straatbeeld.history = 2020;

            const payload = 0;
            const output = straatbeeldReducers.SET_STRAATBEELD_HISTORY(inputState, payload);

            expect(output.straatbeeld.history).toEqual(payload);
        });

        it('when straatbeeld is not an object', function () {
            inputState.straatbeeld = null;

            const payload = 2020;
            const output = straatbeeldReducers.SET_STRAATBEELD_HISTORY(inputState, payload);
            expect(output.straatbeeld).toBeNull();
        });
    });
});
