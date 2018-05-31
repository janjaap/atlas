describe('The geosearch factory', function () {
    var $q,
        $rootScope,
        geosearch,
        api,
        geosearchFormatter,
        searchFormatter,
        coordinateEndpoints,
        mockedSearchResultsWithRadius,
        mockedSearchResultsWithoutRadius,
        mockedEmptySearchResults,
        mockedPandSearchResult,
        mockedStandplaatsSearchResult,
        mockedFormattedSearchResults,
        mockedFormattedPandSearchResult,
        mockedFormattedStandplaatsSearchResult,
        mockedPandApiResults,
        mockedStandplaatsApiResults,
        mockedMonumentenApiResults,
        mockedNummeraanduidingApiResults,
        mockedFormattedNummeraanduidingenApiResults,
        mockedVestigingenApiResults,
        mockedFormattedVestigingenApiResults,
        store,
        mockedUser;

    const FAIL_ON_URI = 'FAIL_ON_URI';

    beforeEach(function () {
        coordinateEndpoints = [
            {
                uri: 'endpoint/with-radius/',
                radius: 50
            }, {
                uri: 'other/endpoint/',
                radius: null
            }, {
                uri: 'endpoint-with-no-results/',
                radius: null
            }
        ];

        angular.mock.module(
            'dpSearchResults',
            {
                api: {
                    getByUri: function (endpoint) {
                        var q = $q.defer();

                        if (endpoint === 'endpoint/with-radius/') {
                            q.resolve(mockedSearchResultsWithRadius);
                        } else if (endpoint === 'other/endpoint/') {
                            q.resolve(mockedSearchResultsWithoutRadius);
                        } else if (endpoint === 'handelsregister/vestiging/?pand=0456789' ||
                                endpoint === 'handelsregister/vestiging/?nummeraanduiding=0123456789') {
                            q.resolve(mockedVestigingenApiResults);
                        } else if (endpoint === FAIL_ON_URI) {
                            q.reject(FAIL_ON_URI);
                        } else {
                            q.resolve(mockedEmptySearchResults);
                        }

                        return q.promise;
                    },
                    getByUrl: function (endpoint) {
                        // Used to retrieve the pand data and related verblijfsobjecten
                        var q = $q.defer();

                        if (endpoint === 'https://api.data.amsterdam.nl/bag/pand/0456789/') {
                            q.resolve(mockedPandApiResults);
                        } else if (endpoint === 'https://api.data.amsterdam.nl/bag/standplaats/0456789/') {
                            q.resolve(mockedStandplaatsApiResults);
                        } else if (endpoint === 'https://api.data.amsterdam.nl/bag/nummeraanduiding/?pand=0456789') {
                            q.resolve(mockedNummeraanduidingApiResults);
                        } else if (endpoint === 'https://api.data.amsterdam.nl/foo/monumenten') {
                            q.resolve(mockedMonumentenApiResults);
                        }

                        return q.promise;
                    }
                },
                searchFormatter: {
                    formatCategory: category => {
                        if (category === 'adres') {
                            return mockedFormattedNummeraanduidingenApiResults;
                        } else if (category === 'vestiging') {
                            return mockedFormattedVestigingenApiResults;
                        }
                    }
                },
                store: {
                    getState: angular.noop
                }
            },
            function ($provide) {
                $provide.constant('SEARCH_CONFIG', {
                    COORDINATES_ENDPOINTS: coordinateEndpoints
                });
            }
        );

        angular.mock.inject(function (_$q_, _$rootScope_, _geosearch_, _api_, _geosearchFormatter_, _searchFormatter_,
                                      _store_) {
            $q = _$q_;
            $rootScope = _$rootScope_;
            geosearch = _geosearch_;
            api = _api_;
            geosearchFormatter = _geosearchFormatter_;
            searchFormatter = _searchFormatter_;
            store = _store_;
        });

        mockedEmptySearchResults = {
            type: 'FeatureCollection',
            features: []
        };

        mockedSearchResultsWithRadius = {
            type: 'FeatureCollection',
            features: [
                {
                    properties: {
                        display: '12981535',
                        id: '12981535',
                        type: 'meetbouten/meetbout',
                        uri: 'https://api.data.amsterdam.nl/meetbouten/meetbout/12981535/'
                    }
                }
            ]
        };

        mockedSearchResultsWithoutRadius = {
            type: 'FeatureCollection',
            features: [
                {
                    properties: {
                        display: 'De Pijp / Rivierenbuurt',
                        id: 'DX12',
                        type: 'gebieden/gebiedsgerichtwerken',
                        uri: 'https://api.data.amsterdam.nl/gebieden/gebiedsgerichtwerken/DX12/'
                    }
                }, {
                    properties: {
                        display: 'Nieuwe Pijp',
                        id: '3630012052060',
                        type: 'gebieden/buurtcombinatie',
                        uri: 'https://api.data.amsterdam.nl/gebieden/buurtcombinatie/3630012052060/'
                    }
                }, {
                    properties: {
                        display: 'Zuid',
                        id: '03630011872038',
                        type: 'gebieden/stadsdeel',
                        uri: 'https://api.data.amsterdam.nl/gebieden/stadsdeel/03630011872038/'
                    }
                }, {
                    properties: {
                        display: 'Willibrordusbuurt',
                        id: '03630000000788',
                        type: 'gebieden/buurt',
                        uri: 'https://api.data.amsterdam.nl/gebieden/buurt/03630000000788/'
                    }
                }, {
                    properties: {
                        display: 'Amstel',
                        id: '03630011950509',
                        opr_type: 'Water',
                        type: 'bag/openbareruimte',
                        uri: 'https://api.data.amsterdam.nl/bag/openbareruimte/03630011950509/'
                    }
                }, {
                    properties: {
                        display: 'ASD14R06669G0000',
                        id: 'NL.KAD.OnroerendeZaak.11550666970000',
                        type: 'kadaster/kadastraal_object',
                        uri: 'https://api.data.amsterdam.nl/brk/object/NL.KAD.OnroerendeZaak.11550666970000/'
                    }
                }
            ]
        };

        mockedFormattedSearchResults = [
            {
                slug: null,
                count: 2,
                results: [
                    {
                        endpoint: 'http://www.some-domain.com/path/to/1/',
                        label: 'Some label #1'
                    }, {
                        endpoint: 'http://www.some-domain.com/path/to/2/',
                        label: 'Some label #2'
                    }
                ]
            }, {
                slug: null,
                count: 1,
                results: [
                    {
                        endpoint: 'http://www.some-domain.com/path/to/3/',
                        label: 'Some label #3'
                    }
                ]
            }
        ];

        mockedPandSearchResult = {
            properties: {
                display: '0456789',
                id: '0456789',
                type: 'bag/pand',
                uri: 'https://api.data.amsterdam.nl/bag/pand/456789/'
            }
        };

        mockedFormattedPandSearchResult = {
            slug: 'pand',
            count: 1,
            results: [
                {
                    endpoint: 'https://api.data.amsterdam.nl/bag/pand/0456789/',
                    label: '0456789'
                }
            ]
        };

        mockedPandApiResults = {
            _links: {
                self: {
                    href: 'https://api.data.amsterdam.nl/bag/pand/0456789/'
                }
            },
            pandidentificatie: '0456789',
            _adressen: {
                href: 'https://api.data.amsterdam.nl/bag/nummeraanduiding/?pand=0456789'
            },
            _monumenten: {
                href: 'https://api.data.amsterdam.nl/foo/monumenten'
            }
        };

        mockedStandplaatsSearchResult = {
            properties: {
                display: '0456789',
                type: 'bag/standplaats',
                uri: 'https://api.data.amsterdam.nl/bag/standplaats/456789/'
            }
        };

        mockedFormattedStandplaatsSearchResult = {
            slug: 'standplaats',
            count: 1,
            results: [
                {
                    endpoint: 'https://api.data.amsterdam.nl/bag/standplaats/0456789/',
                    label: '0456789'
                }
            ]
        };

        mockedStandplaatsApiResults = {
            _links: {
                self: {
                    href: 'https://api.data.amsterdam.nl/bag/standplaats/0456789/'
                }
            },
            standplaatsidentificatie: '123456',
            hoofdadres: {
                landelijk_id: '0123456789'
            }
        };

        mockedNummeraanduidingApiResults = {
            count: 2,
            results: [{xyz: 'FAKE_VBO_RESULT_1'}, {xyz: 'FAKE_VBO_RESULT_2'}]
        };

        mockedMonumentenApiResults = {
            count: 0,
            results: []
        };

        mockedFormattedNummeraanduidingenApiResults = {
            label_singular: 'Adres',
            label_plural: 'Adressen',
            slug: 'adres',
            count: 4,
            results: [
                {
                    label: 'Amsteldijk 32-1',
                    endpoint: 'https://api.data.amsterdam.nl/bag/verblijfsobject/03630000567203/',
                    subtype: null
                },
                {
                    label: 'Amsteldijk 32-2',
                    endpoint: 'https://api.data.amsterdam.nl/bag/verblijfsobject/03630000567204/',
                    subtype: null
                },
                {
                    label: 'Amsteldijk 32-3',
                    endpoint: 'https://api.data.amsterdam.nl/bag/verblijfsobject/03630000567205/',
                    subtype: null
                },
                {
                    label: 'Ceintuurbaan 263',
                    endpoint: 'https://api.data.amsterdam.nl/bag/verblijfsobject/03630000602864/',
                    subtype: null
                }
            ],
            next: null
        };

        mockedVestigingenApiResults = {
            count: 2,
            results: ['FAKE_VESTIGING_RESULT_1', 'FAKE_VESTIGING_RESULT_2']
        };

        mockedFormattedVestigingenApiResults = {
            label_singular: 'Vestiging',
            label_plural: 'Vestigingen',
            slug: 'vestiging',
            count: 4,
            results: [
                {
                    label: 'Vestiging 1',
                    endpoint: 'https://api.data.amsterdam.nl/handelsregister/vestiging/03630000567203/',
                    subtype: null
                },
                {
                    label: 'Vestiging 2',
                    endpoint: 'https://api.data.amsterdam.nl/handelsregister/vestiging/03630000567204/',
                    subtype: null
                },
                {
                    label: 'Vestiging 3',
                    endpoint: 'https://api.data.amsterdam.nl/handelsregister/vestiging/03630000567205/',
                    subtype: null
                },
                {
                    label: 'Vestiging 4',
                    endpoint: 'https://api.data.amsterdam.nl/handelsregister/vestiging/03630000602864/',
                    subtype: null
                }
            ],
            next: null
        };

        mockedUser = {
            authenticated: true,
            scopes: ['HR/R'],
            name: ''
        };

        spyOn(store, 'getState').and.returnValue({ user: mockedUser });
        spyOn(api, 'getByUri').and.callThrough();
        spyOn(api, 'getByUrl').and.callThrough();
        spyOn(geosearchFormatter, 'format').and.returnValue(mockedFormattedSearchResults);
        spyOn(searchFormatter, 'formatCategory').and.callThrough();
    });

    it('retrieves formatted data based on a location', function () {
        var searchResults;

        geosearch.search([52.789, 4.987]).then(function (_searchResults_) {
            searchResults = _searchResults_;
        });

        $rootScope.$apply();

        expect(api.getByUri).toHaveBeenCalledTimes(3);

        expect(api.getByUri).toHaveBeenCalledWith('endpoint/with-radius/', { lat: 52.789, lon: 4.987, radius: 50 });
        expect(api.getByUri).toHaveBeenCalledWith('other/endpoint/', { lat: 52.789, lon: 4.987 });
        expect(api.getByUri).toHaveBeenCalledWith('endpoint-with-no-results/', { lat: 52.789, lon: 4.987 });

        expect(geosearchFormatter.format).toHaveBeenCalledWith([
            mockedSearchResultsWithRadius,
            mockedSearchResultsWithoutRadius,
            mockedEmptySearchResults
        ]);

        expect(searchResults).toEqual(mockedFormattedSearchResults);
    });

    it('retrieves formatted data based on a location, even if one or more queries fail', function () {
        coordinateEndpoints.push({
            uri: FAIL_ON_URI
        });

        var searchResults;

        geosearch.search([52.789, 4.987]).then(function (_searchResults_) {
            searchResults = _searchResults_;
        });

        $rootScope.$apply();

        expect(api.getByUri).toHaveBeenCalledTimes(4);

        expect(geosearchFormatter.format).toHaveBeenCalledWith([
            mockedSearchResultsWithRadius,
            mockedSearchResultsWithoutRadius,
            mockedEmptySearchResults,
            { features: [] }
        ]);

        expect(searchResults).toEqual(mockedFormattedSearchResults);
    });

    describe('when a pand has been found', () => {
        it('loads related verblijfsobjecten', function () {
            var searchResults,
                expectedSearchResults;

            mockedVestigingenApiResults = {
                count: 0,
                results: []
            };

            // Insert a pand into the mocked result set
            mockedSearchResultsWithoutRadius.features.splice(4, 0, mockedPandSearchResult);
            mockedFormattedSearchResults.splice(1, 0, mockedFormattedPandSearchResult);

            expectedSearchResults = angular.copy(mockedFormattedSearchResults);
            expectedSearchResults[1].subResults = [mockedFormattedNummeraanduidingenApiResults];

            geosearch.search([52.789, 4.987]).then(function (_searchResults_) {
                searchResults = _searchResults_;
            });

            $rootScope.$apply();

            expectedSearchResults[1].subResults[0].more = {
                label: 'Bekijk alle 2 adressen binnen dit pand',
                endpoint: 'https://api.data.amsterdam.nl/bag/pand/0456789/'
            };

            expect(api.getByUrl).toHaveBeenCalledTimes(3);
            expect(api.getByUrl)
                .toHaveBeenCalledWith('https://api.data.amsterdam.nl/bag/pand/0456789/');
            expect(api.getByUrl)
                .toHaveBeenCalledWith('https://api.data.amsterdam.nl/bag/nummeraanduiding/?pand=0456789');
            expect(api.getByUrl)
                .toHaveBeenCalledWith('https://api.data.amsterdam.nl/foo/monumenten');

            expect(searchFormatter.formatCategory).toHaveBeenCalledWith('adres', mockedNummeraanduidingApiResults);
            expect(searchResults).toEqual(expectedSearchResults);
        });

        it('loads related vestigingen', function () {
            var searchResults,
                expectedSearchResults;

            mockedNummeraanduidingApiResults = {
                count: 0,
                results: []
            };

            // Insert a pand into the mocked result set
            mockedSearchResultsWithoutRadius.features.splice(4, 0, mockedPandSearchResult);
            mockedFormattedSearchResults.splice(1, 0, mockedFormattedPandSearchResult);

            expectedSearchResults = angular.copy(mockedFormattedSearchResults);
            expectedSearchResults[1].subResults = [mockedFormattedVestigingenApiResults];

            geosearch.search([52.789, 4.987]).then(function (_searchResults_) {
                searchResults = _searchResults_;
            });

            $rootScope.$apply();

            expectedSearchResults[1].subResults[0].more = {
                label: 'Bekijk alle 2 vestigingen binnen dit pand',
                endpoint: 'https://api.data.amsterdam.nl/bag/pand/0456789/'
            };

            expect(api.getByUrl)
                .toHaveBeenCalledWith('https://api.data.amsterdam.nl/bag/pand/0456789/');
            expect(api.getByUrl)
                .toHaveBeenCalledWith('https://api.data.amsterdam.nl/foo/monumenten');
            expect(api.getByUri)
                .toHaveBeenCalledWith('handelsregister/vestiging/?pand=0456789');

            expect(searchFormatter.formatCategory).toHaveBeenCalledWith('vestiging', mockedVestigingenApiResults);
            expect(searchResults).toEqual(expectedSearchResults);
        });

        it('loads both related verblijfsobjecten and vestigingen', function () {
            var searchResults,
                expectedSearchResults;

            // Insert a pand into the mocked result set
            mockedSearchResultsWithoutRadius.features.splice(4, 0, mockedPandSearchResult);
            mockedFormattedSearchResults.splice(1, 0, mockedFormattedPandSearchResult);

            expectedSearchResults = angular.copy(mockedFormattedSearchResults);
            expectedSearchResults[1].subResults = [
                mockedFormattedNummeraanduidingenApiResults,
                mockedFormattedVestigingenApiResults
            ];

            geosearch.search([52.789, 4.987]).then(function (_searchResults_) {
                searchResults = _searchResults_;
            });

            $rootScope.$apply();

            expectedSearchResults[1].subResults[0].authLevel = 'EMPLOYEE';
            expectedSearchResults[1].subResults[0].more = {
                label: 'Bekijk alle 2 adressen binnen dit pand',
                endpoint: 'https://api.data.amsterdam.nl/bag/pand/0456789/'
            };

            expectedSearchResults[1].subResults[1].more = {
                label: 'Bekijk alle 2 vestigingen binnen dit pand',
                endpoint: 'https://api.data.amsterdam.nl/bag/pand/0456789/'
            };

            expect(api.getByUrl).toHaveBeenCalledTimes(3);
            expect(api.getByUrl)
                .toHaveBeenCalledWith('https://api.data.amsterdam.nl/bag/pand/0456789/');
            expect(api.getByUrl)
                .toHaveBeenCalledWith('https://api.data.amsterdam.nl/bag/nummeraanduiding/?pand=0456789');
            expect(api.getByUrl)
                .toHaveBeenCalledWith('https://api.data.amsterdam.nl/foo/monumenten');

            expect(api.getByUri)
                .toHaveBeenCalledWith('handelsregister/vestiging/?pand=0456789');

            expect(searchFormatter.formatCategory).toHaveBeenCalledWith('vestiging', mockedVestigingenApiResults);
            expect(searchResults).toEqual(expectedSearchResults);
        });

        it('loads just related verblijfsobjecten if unauthorized', function () {
            var searchResults,
                expectedSearchResults;

            mockedUser.scopes = [];

            // Insert a pand into the mocked result set
            mockedSearchResultsWithoutRadius.features.splice(4, 0, mockedPandSearchResult);
            mockedFormattedSearchResults.splice(1, 0, mockedFormattedPandSearchResult);

            expectedSearchResults = angular.copy(mockedFormattedSearchResults);
            expectedSearchResults[1].subResults = [mockedFormattedNummeraanduidingenApiResults];

            geosearch.search([52.789, 4.987]).then(function (_searchResults_) {
                searchResults = _searchResults_;
            });

            $rootScope.$apply();

            expectedSearchResults[1].subResults[0].more = {
                label: 'Bekijk alle 2 adressen binnen dit pand',
                endpoint: 'https://api.data.amsterdam.nl/bag/pand/0456789/'
            };

            expect(api.getByUri)
                .not.toHaveBeenCalledWith('handelsregister/vestiging/?pand=0456789');
            expect(searchResults).toEqual(expectedSearchResults);
        });

        it('sometimes has no related verblijfsobjecten nor vestigingen', function () {
            var searchResults;

            mockedNummeraanduidingApiResults = {
                count: 0,
                results: []
            };

            mockedVestigingenApiResults = {
                count: 0,
                results: []
            };

            // Insert a pand into the mocked result set
            mockedSearchResultsWithoutRadius.features.splice(4, 0, mockedPandSearchResult);
            mockedFormattedSearchResults.splice(1, 0, mockedFormattedPandSearchResult);

            geosearch.search([52.789, 4.987]).then(function (_searchResults_) {
                searchResults = _searchResults_;
            });

            $rootScope.$apply();

            expect(searchResults).toEqual(mockedFormattedSearchResults);
        });
    });

    describe('when a ligplaats/standplaats has been found', () => {
        it('loads related vestigingen', function () {
            var searchResults,
                expectedSearchResults;

            // Insert a standplaats into the mocked result set
            mockedSearchResultsWithoutRadius.features.splice(4, 0, mockedStandplaatsSearchResult);
            mockedFormattedSearchResults.splice(1, 0, mockedFormattedStandplaatsSearchResult);

            expectedSearchResults = angular.copy(mockedFormattedSearchResults);
            expectedSearchResults.splice(2, 0, mockedFormattedVestigingenApiResults);

            geosearch.search([52.789, 4.987]).then(function (_searchResults_) {
                searchResults = _searchResults_;
            });

            $rootScope.$apply();

            expectedSearchResults[2].more = {
                label: 'Bekijk alle 2 vestigingen binnen deze standplaats',
                endpoint: 'https://api.data.amsterdam.nl/bag/standplaats/0456789/'
            };

            expect(api.getByUrl).toHaveBeenCalledTimes(1);
            expect(api.getByUrl)
                .toHaveBeenCalledWith('https://api.data.amsterdam.nl/bag/standplaats/0456789/');

            expect(api.getByUri)
                .toHaveBeenCalledWith('handelsregister/vestiging/?nummeraanduiding=0123456789');

            expect(searchFormatter.formatCategory).toHaveBeenCalledWith('vestiging', mockedVestigingenApiResults);
            expect(searchResults).toEqual(expectedSearchResults);
        });

        it('does not load related vestigingen without required user scope', () => {
            var searchResults,
                expectedSearchResults;

            mockedUser.scopes = [];

            // Insert a standplaats into the mocked result set
            mockedSearchResultsWithoutRadius.features.splice(4, 0, mockedStandplaatsSearchResult);
            mockedFormattedSearchResults.splice(1, 0, mockedFormattedStandplaatsSearchResult);

            expectedSearchResults = mockedFormattedSearchResults;

            geosearch.search([52.789, 4.987]).then(function (_searchResults_) {
                searchResults = _searchResults_;
            });

            $rootScope.$apply();

            expect(api.getByUrl).not.toHaveBeenCalled();

            expect(api.getByUri)
                .not.toHaveBeenCalledWith('handelsregister/vestiging/?nummeraanduiding=0123456789');

            expect(searchFormatter.formatCategory).not.toHaveBeenCalledWith('vestiging', mockedVestigingenApiResults);
            expect(searchResults).toEqual(expectedSearchResults);
        });

        it('shows a different \'show more\' link based on type (standplaats, ligplaats)', function () {
            var searchResults,
                expectedSearchResults;

            mockedStandplaatsApiResults.ligplaatsidentificatie = mockedStandplaatsApiResults.standplaatsidentificatie;
            delete mockedStandplaatsApiResults.standplaatsidentificatie;

            // Insert a standplaats into the mocked result set
            mockedSearchResultsWithoutRadius.features.splice(4, 0, mockedStandplaatsSearchResult);
            mockedFormattedSearchResults.splice(1, 0, mockedFormattedStandplaatsSearchResult);

            expectedSearchResults = angular.copy(mockedFormattedSearchResults);
            expectedSearchResults.splice(2, 0, mockedFormattedVestigingenApiResults);

            geosearch.search([52.789, 4.987]).then(function (_searchResults_) {
                searchResults = _searchResults_;
            });

            $rootScope.$apply();

            expectedSearchResults[2].more = {
                label: 'Bekijk alle 2 vestigingen binnen deze ligplaats',
                endpoint: 'https://api.data.amsterdam.nl/bag/standplaats/0456789/'
            };

            expect(searchResults).toEqual(expectedSearchResults);
        });

        it('returns no vestigingen when api returns 0 vestigingen', function () {
            var searchResults;

            mockedVestigingenApiResults = {
                count: 0,
                results: []
            };

            // clear any lig/standplaats identificatie
            delete mockedStandplaatsApiResults.ligplaatsidentificatie;
            delete mockedStandplaatsApiResults.standplaatsidentificatie;

            // Insert a standplaats into the mocked result set
            mockedSearchResultsWithoutRadius.features.splice(4, 0, mockedStandplaatsSearchResult);
            mockedFormattedSearchResults.splice(1, 0, mockedFormattedStandplaatsSearchResult);

            geosearch.search([52.789, 4.987]).then(function (_searchResults_) {
                searchResults = _searchResults_;
            });

            $rootScope.$apply();

            expect(searchResults.length).toBe(3);
            expect(searchResults[0].slug).toBe(null);
            expect(searchResults[1].slug).toBe('standplaats');
            expect(searchResults[2].slug).toBe(null);
            expect(searchResults[0].label_singular).toBe(undefined);
            expect(searchResults[1].label_singular).toBe(undefined);
            expect(searchResults[2].label_singular).toBe(undefined);
        });
    });
});
