import PAGES from '../../../src/app/pages';
import { FETCH_SEARCH_RESULTS_BY_QUERY } from '../../../src/shared/ducks/data-search/data-search';
import { FETCH_DATA_SELECTION } from '../../../src/header/ducks/search/search';
import { ROUTER_NAMESPACE } from '../../../src/app/routes';
import * as routerSelectors from '../../../src/store/redux-first-router';
import * as dataSelection from '../../../src/shared/ducks/data-selection/data-selection';

describe('The header controller', function () {
    var $controller,
        $rootScope,
        store,
        mockedState;

    beforeEach(function () {
        angular.mock.module(
            'atlas',
            {
                store: {
                    subscribe: function (callbackFn) {
                        callbackFn();
                    },
                    getState: function () {
                        return mockedState;
                    }
                }
            }
        );

        angular.mock.inject(function (_$controller_, _$rootScope_, _store_) {
            $controller = _$controller_;
            $rootScope = _$rootScope_;
            store = _store_;
        });

        mockedState = {
            location: {
                type: `${ROUTER_NAMESPACE}/${PAGES.PANORAMA}`
            },
            search: {
                query: 'i am a search query'
            }
        };

        routerSelectors.isDataSelectionPage = () => true;
        routerSelectors.isDatasetPage = () => true;
        routerSelectors.isHomepage = () => true;
        routerSelectors.isMapActive = () => true;
        dataSelection.isListView = () => true;
    });

    function getController () {
        const scope = $rootScope.$new();

        const controller = $controller('HeaderController', {
            $scope: scope
        });

        scope.$apply();

        return controller;
    }

    it('subscribes to the store to listen for changes', function () {
        spyOn(store, 'subscribe').and.callThrough();

        getController();

        expect(store.subscribe).toHaveBeenCalledWith(jasmine.any(Function));
    });

    it('sets the search query and action when search is active', function () {
        routerSelectors.isDatasetPage = () => false;
        spyOn(store, 'getState').and.returnValue({
            search: {
                query: 'search query'
            }
        });

        const controller = getController();

        expect(controller.query).toBe('search query');
        expect(controller.searchAction).toEqual(FETCH_SEARCH_RESULTS_BY_QUERY);
    });

    it('sets the dataSelection query and action when datasets are active', function () {
        spyOn(store, 'getState').and.returnValue({
            dataSelection: {
                view: 'CATALOG',
                query: 'dataSelection query'
            }
        });

        const controller = getController();

        expect(controller.query).toBe('dataSelection query');
        expect(controller.searchAction).toEqual(FETCH_DATA_SELECTION);
    });

    it('sets the dataSelection query and action when catalog detail API view is active', function () {
        spyOn(store, 'getState').and.returnValue({
            dataSelection: {
                view: 'CATALOG'
            },
            detail: {
                endpoint: 'somewhere://abc/dcatd/datasets/xyz'
            }
        });

        const controller = getController();

        expect(controller.query).toBeUndefined();
        expect(controller.searchAction).toEqual(FETCH_DATA_SELECTION);
    });

    it('default sets the search query and search action', function () {
        routerSelectors.isDatasetPage = () => false;
        spyOn(store, 'getState').and.returnValue({});

        const controller = getController();

        expect(controller.query).toBeUndefined();
        expect(controller.searchAction).toEqual(FETCH_SEARCH_RESULTS_BY_QUERY);
    });

    it('doesn\'t break when search is null', function () {
        routerSelectors.isDatasetPage = () => false;
        mockedState = {
            search: null
        };

        spyOn(store, 'getState').and.returnValue(mockedState);

        const controller = getController();

        expect(controller.query).toBeNull();
    });

    describe('not all states have a print version', function () {
        it('there is no print button when dataSelection is active', function () {
            mockedState.dataSelection = {};

            spyOn(store, 'getState').and.returnValue(mockedState);
            const controller = getController();

            expect(controller.hasPrintButton).toBe(false);
        });

        it('there is no print button on the homepage', () => {
            const controller = getController();

            expect(controller.hasPrintButton).toBe(false);
        });

        it('all other pages and non dataSelection content has a printButton', function () {
            routerSelectors.isDataSelectionPage = () => false;
            routerSelectors.isHomepage = () => false;

            const controller = getController();

            expect(controller.hasPrintButton).toBe(true);
        });
    });

    describe('not all states have an embed version', function () {
        it('only in fullscreen map there is an embed button', function () {
            const controller = getController();

            expect(controller.hasEmbedButton).toBe(true);
        });

        it('should not show when map page is not active', function () {
            routerSelectors.isMapActive = () => false;
            const controller = getController();

            expect(controller.hasEmbedButton).toBe(false);
        });
    });
});
