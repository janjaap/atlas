describe('The dataSelectionApi factory', function () {
    let $rootScope,
        $q,
        dataSelectionApi,
        mockedApiPreviewResponse,
        mockedApiMarkersResponse,
        mockedConfig,
        TabHeader;

    const mockedApiService = {
        query: function () {
            const q = $q.defer();
            q.resolve(mockedApiPreviewResponse);

            return q.promise;
        },
        getMarkers: () => {
            const q = $q.defer();

            q.resolve(mockedApiMarkersResponse);

            return q.promise;
        }
    };

    beforeEach(function () {
        mockedConfig = {
            datasets: {
                zwembaden: {
                    ENDPOINT_MARKERS: 'zwembaden/markers/',
                    CUSTOM_API: 'mockedApiService',
                    SORT_FILTERS: true,
                    FILTERS: [
                        {
                            slug: 'type',
                            label: 'Type accomodatie'
                        }, {
                            slug: 'water',
                            label: 'Watersoort',
                            order: ['Verwarmd', 'Koud', 'Tropisch', 'Not present']
                        }
                    ],
                    CONTENT: {
                        TABLE: [
                            {
                                label: 'Adres',
                                variables: ['adres']
                            },
                            {
                                label: 'Openingstijden',
                                variables: ['openingstijden'],
                                formatter: 'openingstijdenFormatter'
                            },
                            {
                                label: 'KvK-nummer',
                                variables: ['kvk_nummer']
                            }
                        ],
                        LIST: [
                            {
                                variables: ['openbare_ruimte', 'huisnummer'],
                                formatter: 'adres'
                            }, {
                                variables: ['buurtnaam']
                            }
                        ],
                        CATALOG: [
                            {
                                variables: ['adres.openbare_ruimte', 'huisnummer'],
                                formatter: 'adres'
                            }, {
                                variables: ['buurtnaam']
                            }
                        ]
                    }
                }
            }
        };

        angular.mock.module(
            'dpDataSelection',
            { mockedApiService },
            function ($provide) {
                $provide.constant('DATA_SELECTION_CONFIG', mockedConfig);
            }
        );

        angular.mock.inject(function (_$rootScope_, _$q_, _dataSelectionApi_, _TabHeader_) {
            $rootScope = _$rootScope_;
            $q = _$q_;
            dataSelectionApi = _dataSelectionApi_;
            TabHeader = _TabHeader_;
        });

        spyOn(mockedApiService, 'query').and.callThrough();
        spyOn(mockedApiService, 'getMarkers').and.callThrough();
    });

    describe('query function', function () {
        beforeEach(function () {
            mockedApiPreviewResponse = {
                filters: {
                    water: {
                        numberOfOptions: 3,
                        options: [
                            {
                                count: 1,
                                label: 'Tropisch'
                            }, {
                                count: 4,
                                label: 'Verwarmd'
                            }, {
                                count: 1,
                                label: 'Koud'
                            }
                        ]
                    },
                    type: {
                        numberOfOptions: 2,
                        options: [
                            {
                                count: 2,
                                label: 'Overdekt'
                            },
                            {
                                count: 4,
                                label: 'Buitenbad'
                            },
                            {
                                count: 666,
                                label: 'Overdekt'
                            }
                        ]
                    }
                },
                data: [
                    {
                        _links: {
                            self: {
                                href: 'https://amsterdam.nl/api_endpoint/zwembaden/1/'
                            }
                        },
                        _openbare_ruimte_naam: 'Binnenkant',
                        huisletter: 'A',
                        huisnummer: '1',
                        huisnummer_toevoeging: '2',
                        ligplaats_id: '',
                        standplaats_id: '0123456',
                        kvk_nummer: '123',
                        openingstijden: 'Alleen op dinsdag',
                        adres: 'Sneeuwbalweg 24',
                        id: '1'
                    }, {
                        _links: {
                            self: {
                                href: 'https://amsterdam.nl/api_endpoint/zwembaden/2/'
                            }
                        },
                        _openbare_ruimte_naam: 'Binnenkant',
                        huisletter: 'B',
                        huisnummer: '1',
                        huisnummer_toevoeging: '',
                        ligplaats_id: '0123456',
                        standplaats_id: '',
                        hoofdadres: 'False',
                        status_id: '18',
                        kvk_nummer: '234',
                        adres: 'Marnixstraat 1',
                        openingstijden: 'Ligt er een beetje aan',
                        id: '2'
                    }, {
                        _links: {
                            self: {
                                href: 'https://amsterdam.nl/api_endpoint/zwembaden/3/'
                            }
                        },
                        _openbare_ruimte_naam: 'Binnenkant',
                        huisletter: 'C',
                        huisnummer: '1',
                        huisnummer_toevoeging: '2',
                        ligplaats_id: '',
                        standplaats_id: '0123456',
                        hoofdadres: 'True',
                        status_id: '16',
                        kvk_nummer: '345',
                        openingstijden: 'Hooguit op zondag',
                        adres: 'Snelle vaartstraat 42',
                        id: '1'
                    }
                ],
                numberOfPages: 2,
                numberOfRecords: 3
            };
        });

        it('can be initialised to register as a count provider for the tabheader', function () {
            spyOn(TabHeader, 'provideCounter');
            dataSelectionApi.initialize();
            expect(TabHeader.provideCounter).toHaveBeenCalled();
            const [action, getCount] = TabHeader.provideCounter.calls.argsFor(0);
            expect(action).toBe('FETCH_DATA_SELECTION');
            let count;
            getCount({
                dataset: 'zwembaden',
                view: 'TABLE',
                filters: {},
                page: 1,
                query: 'a query'
            }).then(n => count = n);
            $rootScope.$apply();
            expect(count).toBe(3);
        });

        it('calls the api factory with the configuration, (optional) active filters and page', function () {
            // Without active filters
            dataSelectionApi.query('zwembaden', 'TABLE', undefined, 1, [], {});
            expect(mockedApiService.query).toHaveBeenCalledWith(mockedConfig.datasets.zwembaden,
                'TABLE', {}, 1, [], {}, undefined);

            // With active filters
            mockedApiService.query.calls.reset();
            dataSelectionApi.query('zwembaden', 'TABLE', { water: 'Verwarmd' }, 1, 'searchText', [], {});
            expect(mockedApiService.query).toHaveBeenCalledWith(mockedConfig.datasets.zwembaden, 'TABLE', {
                water: 'Verwarmd'
            }, 1, 'searchText', [], {});
        });

        it('returns the total number of pages', function () {
            let output;

            dataSelectionApi.query('zwembaden', 'TABLE', {}, 1).then(function (_output_) {
                output = _output_;
            });
            $rootScope.$apply();

            expect(output.numberOfPages).toBe(2);
        });

        it('uses the recurent defined variables when these are provided', function () {
            let output;

            dataSelectionApi.query('zwembaden', 'LIST', {}, 1).then(function (_output_) {
                output = _output_;
            });
            $rootScope.$apply();
            expect(output.numberOfPages).toBe(2);

            mockedConfig.datasets.zwembaden.CONTENT.LIST = [
                {
                    variables: ['huisnummer']
                }
            ];
            mockedApiPreviewResponse.data[0].huisnummer = [1, 2];

            mockedApiService.query.calls.reset();
            dataSelectionApi.query('zwembaden', 'LIST', {}, 1).then(function (_output_) {
                output = _output_;
            });
            $rootScope.$apply();
            expect(output.data.body[0].content[0][0].value).toEqual('1 | 2');

            mockedConfig.datasets.zwembaden.CONTENT.LIST = [
                {
                    variables: ['huisnummer.adres']
                }
            ];
            mockedApiPreviewResponse.data[0].huisnummer = [1, 2];

            mockedApiService.query.calls.reset();
            dataSelectionApi.query('zwembaden', 'LIST', {}, 1).then(function (_output_) {
                output = _output_;
            });
            $rootScope.$apply();
            expect(output.numberOfPages).toBe(2);
        });

        describe('it returns all available filters', function () {
            it('orders the filters based on the configuration', function () {
                let output = {};
                mockedConfig.datasets.zwembaden.SORT_FILTERS = false;

                dataSelectionApi.query('zwembaden', 'TABLE', {}, 1).then(function (_output_) {
                    output = _output_;
                });
                $rootScope.$apply();

                expect(output.filters).toEqual([
                    {
                        slug: 'type',
                        label: 'Type accomodatie',
                        numberOfOptions: 2,
                        options: [
                            {
                                label: 'Overdekt',
                                count: 2
                            },
                            {
                                label: 'Buitenbad',
                                count: 4
                            },
                            {
                                label: 'Overdekt',
                                count: 666
                            }
                        ]
                    }, {
                        slug: 'water',
                        label: 'Watersoort',
                        numberOfOptions: 3,
                        options: [
                            {
                                label: 'Verwarmd',
                                count: 4
                            },
                            {
                                label: 'Koud',
                                count: 1
                            },
                            {
                                label: 'Tropisch',
                                count: 1
                            }
                        ]
                    }
                ]);
            });

            it('doesnt order the filters when configured', function () {
                let output = {};

                delete mockedConfig.datasets.zwembaden.SORT_FILTERS;

                dataSelectionApi.query('zwembaden', 'TABLE', {}, 1).then(function (_output_) {
                    output = _output_;
                });
                $rootScope.$apply();

                expect(output.filters).toEqual([
                    {
                        slug: 'type',
                        label: 'Type accomodatie',
                        numberOfOptions: 2,
                        options: [
                            {
                                label: 'Overdekt',
                                count: 2
                            },
                            {
                                label: 'Buitenbad',
                                count: 4
                            },
                            {
                                label: 'Overdekt',
                                count: 666
                            }
                        ]
                    }, {
                        slug: 'water',
                        label: 'Watersoort',
                        numberOfOptions: 3,
                        options: [
                            {
                                label: 'Verwarmd',
                                count: 4
                            }, {
                                label: 'Koud',
                                count: 1
                            }, {
                                label: 'Tropisch',
                                count: 1
                            }
                        ]
                    }
                ]);
            });

            it('won\'t return filters from the configuration that are not part of the API\'s response', function () {
                let output = {};

                // With only one filter in the API response
                delete mockedApiPreviewResponse.filters.type;

                dataSelectionApi.query('zwembaden', 'TABLE', {}, 1).then(function (_output_) {
                    output = _output_;
                });
                $rootScope.$apply();

                expect(output.filters).toEqual([
                    {
                        slug: 'water',
                        label: 'Watersoort',
                        numberOfOptions: 3,
                        options: [
                            {
                                count: 1,
                                label: 'Koud'
                            }, {
                                count: 1,
                                label: 'Tropisch'
                            }, {
                                count: 4,
                                label: 'Verwarmd'
                            }
                        ]
                    }
                ]);
            });

            it('returns the number of results per category (e.g. there a 12 buurten)', function () {
                let output = {};

                // With both filters in the response
                dataSelectionApi.query('zwembaden', 'TABLE', {}, 1).then(function (_output_) {
                    output = _output_;
                });
                $rootScope.$apply();

                expect(output.filters[0].slug).toBe('type');
                expect(output.filters[0].numberOfOptions).toBe(2);

                expect(output.filters[1].slug).toBe('water');
                expect(output.filters[1].numberOfOptions).toBe(3);
            });
        });

        describe('it returns the data', function () {
            it('has a single row for the head of the table based on the configuration', function () {
                let output;

                dataSelectionApi.query('zwembaden', 'TABLE', {}, 1).then(function (_output_) {
                    output = _output_;
                });
                $rootScope.$apply();

                expect(output.data.head).toEqual(['Adres', 'Openingstijden', 'KvK-nummer']);
            });

            it('reorders the results per row from the API to match the order of the configuration', function () {
                let output = {};

                dataSelectionApi.query('zwembaden', 'TABLE', {}, 1).then(function (_output_) {
                    output = _output_;
                });
                $rootScope.$apply();

                expect(output.data.body.length).toBe(3);
                expect(output.data.body[0]).toEqual({
                    detailEndpoint: 'https://amsterdam.nl/api_endpoint/zwembaden/1/',
                    content: [
                        [{
                            key: 'adres',
                            value: 'Sneeuwbalweg 24'
                        }], [{
                            key: 'openingstijden',
                            value: 'Alleen op dinsdag'
                        }], [{
                            key: 'kvk_nummer',
                            value: '123'
                        }]
                    ]
                });
                expect(output.data.body[1]).toEqual({
                    detailEndpoint: 'https://amsterdam.nl/api_endpoint/zwembaden/2/',
                    content: [
                        [{
                            key: 'adres',
                            value: 'Marnixstraat 1'
                        }], [{
                            key: 'openingstijden',
                            value: 'Ligt er een beetje aan'
                        }], [{
                            key: 'kvk_nummer',
                            value: '234'
                        }]
                    ]
                });
            });

            it('returns the formatters for each group of variables', function () {
                let output;

                dataSelectionApi.query('zwembaden', 'TABLE', {}, 1).then(function (_output_) {
                    output = _output_;
                });
                $rootScope.$apply();

                expect(output.data.formatters).toEqual([undefined, 'openingstijdenFormatter', undefined]);
            });

            it('uses different dataset configuration depending on the view', function () {
                let outputTable,
                    outputList;

                dataSelectionApi.query('zwembaden', 'TABLE', {}, 1).then(function (_output_) {
                    outputTable = _output_;
                });

                dataSelectionApi.query('zwembaden', 'LIST', {}, 1).then(function (_output_) {
                    outputList = _output_;
                });
                $rootScope.$apply();

                expect(outputTable).not.toEqual(outputList);
            });

            it('returns the result data unchanged for the CATALOG type view', function () {
                let outputCatalog;

                dataSelectionApi.query('zwembaden', 'CATALOG', {}, 1).then(function (_output_) {
                    outputCatalog = _output_;
                });

                $rootScope.$apply();
                expect(outputCatalog.data).toEqual(mockedApiPreviewResponse.data);
            });
        });
    });

    describe('the getMarkers function', function () {
        beforeEach(function () {
            mockedApiMarkersResponse = {
                clusterMarkers: [
                    [52.1, 4.1],
                    [52.2, 4.2],
                    [52.3, 4.3]
                ]
            };
        });

        it('calls the api factory with the active filters as searchParams', function () {
            // Without filters
            dataSelectionApi.getMarkers(
                'zwembaden',
                {},
                11,
                { bounding: 'box' }
            );
            $rootScope.$apply();

            expect(mockedApiService.getMarkers).toHaveBeenCalledWith(
                mockedConfig.datasets.zwembaden,
                {},
                11,
                { bounding: 'box' }
            );

            // With filters
            mockedApiService.getMarkers.calls.reset();
            dataSelectionApi.getMarkers(
                'zwembaden',
                { water: 'Verwarmd' },
                11,
                { bounding: 'box' }
            );

            expect(mockedApiService.getMarkers).toHaveBeenCalledWith(
                mockedConfig.datasets.zwembaden,
                { water: 'Verwarmd' },
                11,
                { bounding: 'box' }
            );
        });

        it('returns an array of locations [lat, lon]', function () {
            let output = {};

            dataSelectionApi.getMarkers('zwembaden', {}).then(function (_output_) {
                output = _output_;
            });
            $rootScope.$apply();

            expect(output).toEqual({
                clusterMarkers: [
                    [52.1, 4.1],
                    [52.2, 4.2],
                    [52.3, 4.3]
                ]
            });
        });
    });

    describe('only FILTERS that belong to a dataset may be part of the API call', function () {
        it('ignores unavailable filters when using the dataselectie API call', () => {
            dataSelectionApi.query(
                'zwembaden',
                'TABLE',
                {
                    water: 'Verwarmd',
                    fake_filter: 'lalala'
                },
                1,
                'searchText',
                [],
                {}
            );

            expect(mockedApiService.query).toHaveBeenCalledWith(
                mockedConfig.datasets.zwembaden,
                'TABLE',
                {
                    water: 'Verwarmd'
                    // Note that fake_filter is missing here
                },
                1,
                'searchText',
                [],
                {}
            );
        });

        it('ignores unavailable filters when using the geolocation (puntenwolk) API call', () => {
            dataSelectionApi.getMarkers(
                'zwembaden',
                {
                    water: 'Verwarmd'
                    // Note that fake_filter is missing here
                },
                11,
                { bounding: 'box' }
            );

            expect(mockedApiService.getMarkers).toHaveBeenCalledWith(
                mockedConfig.datasets.zwembaden,
                {
                    water: 'Verwarmd'
                    // Note that fake_filter isn't part of the api call
                },
                11,
                { bounding: 'box' }
            );
        });
    });
});
