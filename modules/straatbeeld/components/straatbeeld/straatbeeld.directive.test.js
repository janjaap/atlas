describe('The dp-straatbeeld directive', function () {
    var $compile,
        $rootScope,
        store,
        scope,
        ACTIONS,
        $q,
        marzipanoService,
        orientation,
        mockedMarzipanoViewer;

    beforeEach(function () {
        angular.mock.module('dpStraatbeeld', {
            store: {
                dispatch: function () { }
            },
            marzipanoService: {
                initialize: function () {
                    return mockedMarzipanoViewer;
                },
                loadScene: function () { }
            },
            orientation: {
                update: function () { }
            },
            straatbeeldApi: {
                getImageDataById: function () {
                    var q = $q.defer();
                    q.resolve({ foo: 'bar' });
                    return q.promise;
                },
                getImageDataByLocation: function () {
                    var q = $q.defer();
                    q.resolve({ foo: 'bar' });
                    return q.promise;
                }
            }
        });

        angular.mock.inject(function (
            _$compile_,
            _$rootScope_,
            _store_,
            _ACTIONS_,
            _$q_,
            _marzipanoService_,
            _orientation_
        ) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            store = _store_;
            ACTIONS = _ACTIONS_;
            $q = _$q_;
            marzipanoService = _marzipanoService_;
            orientation = _orientation_;
        });

        spyOn(store, 'dispatch');
        spyOn(marzipanoService, 'loadScene');
        spyOn(marzipanoService, 'initialize').and.callThrough();
        spyOn(orientation, 'update');

        mockedMarzipanoViewer = {
            updateSize: function () {}
        };
    });

    function triggerMousemove (element) {
        var event;

        event = angular.element.Event('mousemove');

        element.trigger(event);
    }

    function getDirective (state, resize) {
        var el = document.createElement('dp-straatbeeld');
        el.setAttribute('state', 'state');
        el.setAttribute('resize', 'resize');

        scope = $rootScope.$new();

        scope.state = state;
        scope.state.history = { year: 0 };
        scope.resize = resize;

        var directive = $compile(el)(scope);
        scope.$apply();

        return directive;
    }

    describe('there is a close icon', function () {
        it('that triggers HIDE_STRAATBEELD', function () {
            var directive = getDirective({}, false);

            directive.find('.c-straatbeeld__close').click();

            $rootScope.$apply();

            expect(store.dispatch).toHaveBeenCalledWith({
                type: ACTIONS.HIDE_STRAATBEELD
            });
        });
    });

    describe('Calls to SHOW_STRAATBEELD_INITIAL and SUBSEQUENT', function () {
        it('Does not call SHOW_STRAATBEELD_INITIAL Or SUBSEQUENT IF State.id is unknown', function () {
            var state = {};

            getDirective(state, false);

            expect(store.dispatch).not.toHaveBeenCalled();
        });

        it('Does call SHOW_STRAATBEELD_INITIAL', function () {
            var state = {
                id: 'ABC',
                isInitial: true
            };

            getDirective(state, false);

            expect(store.dispatch).toHaveBeenCalledWith({
                type: ACTIONS.SHOW_STRAATBEELD_INITIAL,
                payload: {
                    foo: 'bar'
                }
            });
        });

        it('Does call SHOW_STRAATBEELD_SUBSEQUENT', function () {
            var state = {
                id: 'ABC',
                isInitial: false
            };

            getDirective(state, false);

            expect(store.dispatch).toHaveBeenCalledWith({
                type: ACTIONS.SHOW_STRAATBEELD_SUBSEQUENT,
                payload: {
                    foo: 'bar'
                }
            });
        });

        it('Listens to changes on scope for id', function () {
            var directive = getDirective({}, false);
            expect(store.dispatch).not.toHaveBeenCalled();

            directive.isolateScope().state.id = 'ABC';
            directive.isolateScope().$apply();

            expect(store.dispatch).toHaveBeenCalledTimes(1);   // show pano

            directive.isolateScope().state.id = 'XYZ';
            directive.isolateScope().$apply();

            expect(store.dispatch).toHaveBeenCalledTimes(2);
        });

        it('Listens to resize changes', function () {
            spyOn(mockedMarzipanoViewer, 'updateSize');

            const resize = [true, true];

            getDirective({}, resize);
            scope.$apply(); // trigger digest to invoke upodateSize
            expect(mockedMarzipanoViewer.updateSize).toHaveBeenCalled();
            mockedMarzipanoViewer.updateSize.calls.reset();

            resize[0] = false;
            scope.$apply(); // trigger digest to invoke $watch
            scope.$apply(); // trigger digest to invoke upodateSize
            expect(mockedMarzipanoViewer.updateSize).toHaveBeenCalled();
            mockedMarzipanoViewer.updateSize.calls.reset();

            resize[1] = false;
            scope.$apply(); // trigger digest to invoke $watch
            scope.$apply(); // trigger digest to invoke upodateSize
            expect(mockedMarzipanoViewer.updateSize).toHaveBeenCalled();
        });

        it('Listens to changes on scope for location', function () {
            var directive = getDirective({ location: null }, false);
            expect(store.dispatch).not.toHaveBeenCalled();

            directive.isolateScope().state.location = [52, 4];
            directive.isolateScope().$apply();
            expect(store.dispatch).toHaveBeenCalledTimes(1);   // show pano

            directive.isolateScope().state.location = [52, 4];
            directive.isolateScope().$apply();

            expect(store.dispatch).toHaveBeenCalledTimes(1);
        });

        it('triggers show action', function () {
            var directive = getDirective({}, false);
            expect(store.dispatch).not.toHaveBeenCalled();

            directive.isolateScope().state.id = 'ABC';
            directive.isolateScope().$apply();

            expect(store.dispatch).toHaveBeenCalled();   // show pano
            expect(store.dispatch).toHaveBeenCalledWith({
                type: ACTIONS.SHOW_STRAATBEELD_SUBSEQUENT,
                payload: {
                    foo: 'bar'
                }
            });
        });
    });

    describe('image state change triggers', function () {
        it('Listens to changes on scope to trigger marzipanoService.loadscene', function () {
            var directive = getDirective({}, false);

            expect(marzipanoService.loadScene).not.toHaveBeenCalled();

            directive.isolateScope().state.image = {
                pattern: 'http://example.com/1/{a}/{b}/{c}.png',
                preview: 'http://example.com/1/preview.png'
            };
            directive.isolateScope().$apply();

            expect(marzipanoService.loadScene).toHaveBeenCalledTimes(1);

            directive.isolateScope().state.image.pattern = 'http://example.com/2/{a}/{b}/{c}.png';
            directive.isolateScope().state.image.preview = 'http://example.com/2/preview.png';
            directive.isolateScope().$apply();

            expect(marzipanoService.loadScene).toHaveBeenCalledTimes(2);
        });

        it('Does not call Marzipano.loadscene when state.image is null', function () {
            var state = {
                image: null
            };

            getDirective(state, false);

            expect(marzipanoService.loadScene).not.toHaveBeenCalled();
        });

        it('Does call Marzipano.loadscene when state.image exists', function () {
            var state = {
                image: {
                    pattern: 'http://example.com/example/{a}/{b}/{c}.png',
                    preview: 'http://example.com/example/preview.png'
                },
                heading: 179,
                pitch: 1,
                fov: 2,
                hotspots: ['a', 'b']
            };

            getDirective(state, false);

            expect(marzipanoService.loadScene).toHaveBeenCalledWith(
                {
                    pattern: 'http://example.com/example/{a}/{b}/{c}.png',
                    preview: 'http://example.com/example/preview.png'
                },
                179,
                1,
                2,
                ['a', 'b']
            );
        });
    });

    describe('Changing hotspots', function () {
        let directive;

        beforeEach(() => {
            directive = getDirective({
                image: {
                    pattern: 'http://example.com/example/{a}/{b}/{c}.png',
                    preview: 'http://example.com/example/preview.png'
                }
            }, false);
        });

        it('Triggers marzipano to load the scene', function () {
            marzipanoService.loadScene.calls.reset();

            directive.isolateScope().state.hotspots = [{
                id: 'TMX7316010203-000224_pano_0000_000852',
                year: 2020
            }, {
                id: 'TMX7316010203-000224_pano_0000_000853',
                year: 2020
            }];
            directive.isolateScope().$apply();

            expect(marzipanoService.loadScene).toHaveBeenCalledTimes(1);
            marzipanoService.loadScene.calls.reset();

            directive.isolateScope().state.hotspots[0].year = 2017;
            directive.isolateScope().state.hotspots[1].year = 2017;
            directive.isolateScope().$apply();

            expect(marzipanoService.loadScene).toHaveBeenCalledTimes(1);
        });

        it('Triggers load scene on entire new array', function () {
            marzipanoService.loadScene.calls.reset();

            directive.isolateScope().state.hotspots = [{
                id: 'TMX7316010203-000224_pano_0000_000852',
                year: 2020
            }, {
                id: 'TMX7316010203-000224_pano_0000_000853',
                year: 2020
            }];
            directive.isolateScope().$apply();

            expect(marzipanoService.loadScene).toHaveBeenCalledTimes(1);
            marzipanoService.loadScene.calls.reset();

            directive.isolateScope().state.hotspots = [{
                id: 'TMX7316010203-000224_pano_0000_000852',
                year: 2017
            }, {
                id: 'TMX7316010203-000224_pano_0000_000853',
                year: 2017
            }];
            directive.isolateScope().$apply();

            expect(marzipanoService.loadScene).toHaveBeenCalledTimes(1);
        });

        it('Does not trigger load scene on entire new array with the exact same data', function () {
            marzipanoService.loadScene.calls.reset();

            directive.isolateScope().state.hotspots = [{
                id: 'TMX7316010203-000224_pano_0000_000852',
                year: 2020
            }, {
                id: 'TMX7316010203-000224_pano_0000_000853',
                year: 2020
            }];
            directive.isolateScope().$apply();

            expect(marzipanoService.loadScene).toHaveBeenCalledTimes(1);
            marzipanoService.loadScene.calls.reset();

            directive.isolateScope().state.hotspots = [{
                id: 'TMX7316010203-000224_pano_0000_000852',
                year: 2020
            }, {
                id: 'TMX7316010203-000224_pano_0000_000853',
                year: 2020
            }];
            directive.isolateScope().$apply();

            expect(marzipanoService.loadScene).not.toHaveBeenCalled();
        });
    });

    describe('set orientation on mouse move', function () {
        it('calls the orientation factory on mousemove to keep the state in sync', function () {
            var directive;

            directive = getDirective({
                id: 123,
                location: [52, 4],
                heading: 275,
                pitch: 1,
                isLoading: false
            }, false);

            expect(orientation.update).not.toHaveBeenCalled();

            directive.isolateScope().startUpdating();
            directive.isolateScope().$apply();

            triggerMousemove(directive.find('.js-marzipano-viewer'));
            expect(orientation.update).toHaveBeenCalledWith(mockedMarzipanoViewer);

            directive.isolateScope().stopUpdating();
            directive.isolateScope().$apply();
        });

        it('doesn\'t call the orientation factory before the scene is done loading', function () {
            var directive,
                mockedState;

            mockedState = {
                id: 'ABC',
                isLoading: true
            };

            // When it is still loading
            directive = getDirective(mockedState, false);
            expect(orientation.update).not.toHaveBeenCalled();

            triggerMousemove(directive.find('.js-marzipano-viewer'));
            expect(orientation.update).not.toHaveBeenCalled();

            // When it is done loading
            mockedState.isLoading = false;

            directive.isolateScope().startUpdating();
            directive.isolateScope().$apply();

            triggerMousemove(directive.find('.js-marzipano-viewer'));
            expect(orientation.update).toHaveBeenCalled();

            directive.isolateScope().stopUpdating();
            directive.isolateScope().$apply();
        });
    });

    describe('Changing history selection', () => {
        it('doesnt dispatch an action without location state being an array', () => {
            const directive = getDirective({
                location: '1'
            }, false);

            store.dispatch.calls.reset();

            directive.isolateScope().state.history = 2020;
            directive.isolateScope().$apply();

            expect(store.dispatch).not.toHaveBeenCalled();
        });

        it('dispatches an action with new data', () => {
            const directive = getDirective({
                location: [52, 4]
            }, false);

            store.dispatch.calls.reset();

            directive.isolateScope().state.history = 2020;
            directive.isolateScope().$apply();

            expect(store.dispatch).toHaveBeenCalledTimes(1);
            expect(store.dispatch).toHaveBeenCalledWith({
                type: ACTIONS.SHOW_STRAATBEELD_SUBSEQUENT,
                payload: {
                    foo: 'bar'
                }
            });
        });
    });
});
