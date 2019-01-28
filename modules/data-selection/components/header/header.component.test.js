describe('The dp-data-selection-header', () => {
    const anonymousUser = {
        authenticated: false,
        scopes: []
    };

    let $compile,
        $rootScope,
        store,
        ACTIONS,
        component,
        config,
        mockedViewInput,
        mockedInputTable,
        mockedInputTableAuth,
        mockedInputList,
        mockedInputCatalog;

    beforeEach(() => {
        config = {
            datasets: {
                bag: {
                    MAX_AVAILABLE_PAGES: 50,
                    TITLE: 'BAG Adressen',
                    TITLE_TAB: 'BAG Adressen',
                    SHOW_NUMBER_OF_RECORDS: true
                },
                brk: {
                    MAX_AVAILABLE_PAGES: 50,
                    TITLE: 'Kadastrale objecten',
                    TITLE_TAB: 'Kadastrale objecten'
                },
                hr: {
                    MAX_AVAILABLE_PAGES: 50,
                    TITLE: 'HR Vestigingen',
                    TITLE_TAB: 'HR Vestigingen'
                },
                dcatd: {
                    MAX_AVAILABLE_PAGES: 50,
                    TITLE: 'Datasets',
                    TITLE_TAB: 'Datasets'
                }
            }
        };

        angular.mock.module(
            'dpDataSelection',
            {
                store: {
                    dispatch: angular.noop
                }
            },
            function ($provide) {
                $provide.constant('DATA_SELECTION_CONFIG', config);

                $provide.factory('dpDataSelectionToggleViewButtonDirective', () => {
                    return {};
                });

                $provide.factory('dpDataSelectionDownloadButtonDirective', () => {
                    return {};
                });

                $provide.factory('dpDataSelectionActiveFiltersDirective', () => {
                    return {};
                });
            }
        );

        angular.mock.inject((_$compile_, _$rootScope_, _store_, _ACTIONS_) => {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            store = _store_;
            ACTIONS = _ACTIONS_;
        });

        mockedInputTable = {
            state: {
                dataset: 'bag',
                view: 'TABLE',
                geometryFilter: {
                    markers: [],
                    description: 'geometryFilter description'
                }
            },
            filters: {
                fake_filter: 'abc'
            },
            numberOfRecords: null,
            showHeader: true
        };

        mockedInputTableAuth = {
            ...mockedInputTable,
            user: {
                authenticated: true,
                scopes: ['HR/R']
            }
        };

        mockedInputList = {
            state: {
                dataset: 'hr',
                view: 'LIST',
                geometryFilter: {
                    markers: [],
                    description: 'geometryFilter description'
                }
            },
            filters: {
                fake_filter: 'abc'
            },
            numberOfRecords: null,
            showHeader: true
        };

        mockedInputCatalog = {
            state: {
                dataset: 'dcatd',
                view: 'CATALOG',
                geometryFilter: {
                    markers: [],
                    description: 'geometryFilter description'
                },
                page: 1
            },
            filters: {
                fake_filter: 'abc'
            },
            numberOfRecords: null,
            showHeader: true
        };

        spyOn(store, 'dispatch');
    });

    function getComponent (mockedInput) {
        const element = document.createElement('dp-data-selection-header');
        element.setAttribute('user', 'user');
        element.setAttribute('state', 'state');
        element.setAttribute('filters', 'filters');
        element.setAttribute('available-filters', 'availableFilters');
        element.setAttribute('number-of-records', 'numberOfRecords');
        element.setAttribute('show-header', 'showHeader');

        const scope = $rootScope.$new();
        scope.user = mockedInput.user || anonymousUser;
        scope.state = mockedInput.state;
        scope.filters = mockedInput.filters;
        scope.availableFilters = {};
        scope.numberOfRecords = mockedInput.numberOfRecords;
        scope.showHeader = mockedInput.showHeader;
        const compiledComponent = $compile(element)(scope);
        scope.$apply();

        return compiledComponent;
    }

    it('should not show the header if showHeader is not true', () => {
        mockedInputTable.showHeader = false;
        component = getComponent(mockedInputTable);
        expect(component.find('.qa-header').length).toBe(0);
    });

    describe('The buttons (download and toggle view)', () => {
        it('are available in the TABLE view', () => {
            component = getComponent(mockedInputTable);
            expect(component.find('.qa-buttons').length).toBe(1);
        });

        it('are available in the LIST view', () => {
            component = getComponent(mockedInputList);
            expect(component.find('.qa-buttons').length).toBe(1);
        });

        it('are never available in the CATALOG view', () => {
            component = getComponent(mockedInputCatalog);
            expect(component.find('.qa-buttons').length).toBe(0);
        });
    });

    describe('the download button', () => {
        it('is hidden when there are no results', () => {
            mockedInputTable.numberOfRecords = 1;
            component = getComponent(mockedInputTable);
            expect(component.find('.qa-download-button').length).toBe(1);

            mockedInputTable.numberOfRecords = 0;
            component = getComponent(mockedInputTable);
            expect(component.find('.qa-download-button').length).toBe(0);
        });

        it('is hidden when in LIST view', () => {
            mockedInputTable.numberOfRecords = 1;
            component = getComponent(mockedInputTable);
            expect(component.find('.qa-download-button').length).toBe(1);

            component = getComponent(mockedInputList);
            expect(component.find('.qa-download-button').length).toBe(0);
        });

        it('is hidden when the authentication level is not met', () => {
            // An authentication level is set
            config.datasets.bag.AUTH_SCOPE = 'HR/R';

            mockedInputTableAuth.numberOfRecords = 1;
            component = getComponent(mockedInputTableAuth);
            expect(component.find('.qa-download-button').length).toBe(1);

            // This time there are no records however
            mockedInputTableAuth.numberOfRecords = 0;
            component = getComponent(mockedInputTableAuth);
            expect(component.find('.qa-download-button').length).toBe(0);
        });
    });

    describe('the header title', function () {
        it('in TABLE view shows the name followed by the number of results', () => {
            mockedInputTable.numberOfRecords = 1234;
            component = getComponent(mockedInputTable);

            // Avec thousand separator
            expect(component.find('.qa-title').text()).toContain('BAG Adressen');
            expect(component.find('.qa-title').text()).toContain('(1.234)');
        });

        it('in TABLE view shows does not show the number of results when not available', () => {
            mockedInputTable.numberOfRecords = null;
            component = getComponent(mockedInputTable);

            expect(component.find('.qa-title').text().trim()).toBe('BAG Adressen');
        });

        it('in CATALOG view shows the number of results followed using \'Datasets(number)\'', () => {
            // Singular
            mockedInputCatalog.numberOfRecords = 10;
            component = getComponent(mockedInputCatalog);
            expect(component.find('.qa-title').text().trim()).toBe('Datasets (10)');

            // Plural, with thousand separator
            mockedInputCatalog.numberOfRecords = 1234;
            component = getComponent(mockedInputCatalog);
            expect(component.find('.qa-title').text().trim()).toBe('Datasets (1.234)');
        });

        it('in LIST view shows just the string \'Resultaten\'', () => {
            // No results
            mockedInputList.numberOfRecords = 0;
            component = getComponent(mockedInputList);
            expect(component.find('.qa-title').text().trim()).toBe('Resultaten');

            // 1 Result
            mockedInputList.numberOfRecords = 1;
            component = getComponent(mockedInputList);
            expect(component.find('.qa-title').text().trim()).toBe('Resultaten');

            // Multiple results
            mockedInputList.numberOfRecords = 1234;
            component = getComponent(mockedInputList);
            expect(component.find('.qa-title').text().trim()).toBe('Resultaten');
        });
    });

    ['TABLE', 'CATALOG'].forEach(viewName => {
        beforeEach(function () {
            mockedViewInput = viewName === 'TABLE' ? mockedInputTable : mockedInputCatalog;
        });

        describe(`in ${viewName} view`, () => {
            beforeEach(() => {
                mockedViewInput.numberOfRecords = 1234;
            });

            it('shows the title', () => {
                component = getComponent(mockedViewInput);

                expect(component.find('.qa-title').length).toBe(1);
            });

            it('potentially shows the no results found message', function () {
                // When there are results
                mockedViewInput.numberOfRecords = 1;
                component = getComponent(mockedViewInput);
                expect(component.find('.qa-no-results-found').length).toBe(0);

                // When there are no results
                mockedViewInput.numberOfRecords = 0;
                component = getComponent(mockedViewInput);
                expect(component.find('.qa-no-results-found').length).toBe(1);
            });

            it('doesn\'t show tabs', function () {
                component = getComponent(mockedViewInput);

                expect(component.find('.qa-tabs').length).toBe(0);
            });
        });
    });

    describe('in LIST view', () => {
        it('shows the buttons and title', () => {
            component = getComponent(mockedInputList);

            expect(component.find('.qa-buttons').length).toBe(1);
            expect(component.find('.qa-title').length).toBe(1);
        });

        it('shows the tabs', function () {
            component = getComponent(mockedInputList);

            expect(component.find('.qa-tabs').length).toBe(1);
        });

        it('potentially shows the no results found message', function () {
            // Don't show the message
            mockedInputList.numberOfRecords = 1234;
            component = getComponent(mockedInputList);
            expect(component.find('.qa-no-results-found').length).toBe(0);

            // Show the message
            mockedInputList.numberOfRecords = 0;
            component = getComponent(mockedInputList);
            expect(component.find('.qa-no-results-found').length).toBe(1);
            expect(component.find('.qa-no-results-found').text()).toContain('Tip: verwijder een of meer criteria');
        });
    });

    it('the active filters are only shown when at least one filter is active', () => {
        const mockedInput = {
            TABLE: mockedInputTable,
            LIST: mockedInputList,
            CATALOG: mockedInputCatalog
        };

        // With one active filter
        ['TABLE', 'LIST', 'CATALOG'].forEach(viewName => {
            component = getComponent(mockedInput[viewName]);
            expect(component.find('.qa-active-filters').length).toBe(1);
        });

        // Without any active filter
        mockedInput.TABLE.filters = {};
        mockedInput.LIST.filters = {};
        mockedInput.CATALOG.filters = {};

        ['TABLE', 'LIST', 'CATALOG'].forEach(viewName => {
            component = getComponent(mockedInput[viewName]);
            expect(component.find('.qa-active-filters').length).toBe(0);
        });
    });

    describe('the tabs in LIST view', () => {
        it('use the TITLE_TAB values from DATA_SELECTION_CONFIG', () => {
            component = getComponent(mockedInputList);

            expect(component.find('.qa-tabs li:nth-child(1)').text().trim()).toBe('BAG Adressen');
            expect(component.find('.qa-tabs li:nth-child(2)').text().trim()).toContain('HR Vestigingen');
        });

        it('inactive tabs are links to the first page of other datasets', () => {
            mockedInputList.state.dataset = 'hr';
            mockedInputList.state.page = 123;
            component = getComponent(mockedInputList);

            component.find('.qa-tabs li:nth-child(1) dp-link .o-tabs__tab--link').click();
            expect(store.dispatch).toHaveBeenCalledWith({
                type: ACTIONS.FETCH_DATA_SELECTION,
                payload: jasmine.objectContaining({
                    dataset: 'bag',
                    view: 'LIST',
                    page: 1
                })
            });
        });

        it('active tabs are just text (instead of a link)', () => {
            mockedInputList.state.dataset = 'hr';
            mockedInputList.state.page = 123;
            component = getComponent(mockedInputList);
            expect(store.dispatch).not.toHaveBeenCalled();

            expect(component.find('.qa-tabs li:nth-child(2) dp-link .o-tabs__tab--text').length).toBe(0);
            expect(component.find('.qa-tabs li:nth-child(2) .o-tabs__tab--active').length).toBe(1);
        });

        it('shows the number of results in the tab heading for the active dataset', () => {
            // It shows the number of results for the active tab only
            mockedInputList.numberOfRecords = 12345;
            component = getComponent(mockedInputList);

            expect(component.find('.qa-tabs li:nth-child(1)').text().trim()).toBe('BAG Adressen');
            expect(component.find('.qa-tabs li:nth-child(2)').text()).toContain('HR Vestigingen');
            expect(component.find('.qa-tabs li:nth-child(2)').text()).toContain(' (12.345)');

            // When BAG is active
            mockedInputList.state.dataset = 'bag';
            component = getComponent(mockedInputList);

            expect(component.find('.qa-tabs li:nth-child(1)').text()).toContain('BAG Adressen');
            expect(component.find('.qa-tabs li:nth-child(1)').text()).toContain(' (12.345)');
            expect(component.find('.qa-tabs li:nth-child(2)').text().trim()).toBe('HR Vestigingen');
        });

        it('it does not show the number of results in the tab heading when not available', () => {
            mockedInputList.numberOfRecords = null;
            component = getComponent(mockedInputList);

            expect(component.find('.qa-tabs li:nth-child(1)').text().trim()).toBe('BAG Adressen');
            expect(component.find('.qa-tabs li:nth-child(2)').text().trim()).toBe('HR Vestigingen');
        });
    });
});
