import DRAW_TOOL_CONFIG from '../../../../src/map/services/draw-tool/draw-tool-config';

describe('The state url conversion factory', function () {
    let stateUrlConverter;

    describe('The default state', function () {
        beforeEach(function () {
            angular.mock.module('atlas');

            angular.mock.inject(function (_stateUrlConverter_) {
                stateUrlConverter = _stateUrlConverter_;
            });
        });

        it('is exported as DEFAULT_STATE', function () {
            const DEFAULT_STATE = stateUrlConverter.getDefaultState();

            expect(DEFAULT_STATE).toEqual({
                map: {
                    baseLayer: 'topografie',
                    overlays: [],
                    viewCenter: [52.3731081, 4.8932945],
                    zoom: 11,
                    isLoading: false,
                    drawingMode: DRAW_TOOL_CONFIG.DRAWING_MODE.NONE,
                    highlight: true,
                    shapeMarkers: 0,
                    shapeDistanceTxt: '',
                    shapeAreaTxt: ''

                },
                mapBaseLayers: {},
                user: {
                    authenticated: false,
                    accessToken: '',
                    scopes: [],
                    name: '',
                    error: false
                },
                mapLayers: [],
                mapSearchResults: [],
                mapSearchResultsByLocation: {},
                mapDetail: {
                    isLoading: false,
                    currentEndpoint: '',
                    byEndpoint: {}
                },
                mapClickLocation: {},
                ui: {
                    isEmbed: false,
                    isEmbedPreview: false,
                    isMapFullscreen: false,
                    isMapPanelVisible: false,
                    isMapLayersVisible: true,
                    isMapPanelHandleVisible: true,
                    isPrintMode: false
                },
                isMapPreviewPanelVisible: false,
                filters: {},
                search: null,
                page: {
                    name: 'home'
                },
                detail: null,
                straatbeeld: null,
                dataSelection: null
            });
        });
    });

    describe('the translation methods', function () {
        let mockedStateUrlConversion;

        beforeEach(function () {
            mockedStateUrlConversion = {
                onCreate: {},
                post: {},
                initialValues: {},
                stateVariables: {
                    s: {
                        name: 's',
                        type: 'string'
                    },
                    b: {
                        name: 'x.b',
                        type: 'boolean'
                    },
                    n: {
                        name: 'x.y.n',
                        type: 'number'
                    },
                    n1: {
                        name: 'x.y.n1',
                        type: 'number',
                        precision: 1
                    },
                    b62: {
                        name: 'x.y.z.b62',
                        type: 'base62',
                        precision: 1
                    },
                    as: {
                        name: 'as',
                        type: 'string[]'
                    },
                    aab: {
                        name: 'aab',
                        type: 'boolean[][]'
                    },
                    aaan: {
                        name: 'aaan',
                        type: 'number[][][]'
                    },
                    kv: {
                        name: 'kv',
                        type: 'keyvalues'
                    },
                    dsf: {
                        name: 'filters',
                        type: 'keyvalues'
                    },
                    osb: {
                        name: 'osb',
                        type: 'object(id:string,isVisible:boolean)'
                    },
                    oss: {
                        name: 'oss',
                        type: 'object(id:string,value:string)'
                    },
                    v: {
                        name: 'v',
                        type: 'string',
                        getValue: v => 'getValue.' + v,
                        setValue: v => 'setValue.' + v
                    },
                    dte: {
                        name: 'detail.endpoint',
                        type: 'string'
                    }
                }
            };

            angular.mock.module('atlas',
                function ($provide) {
                    $provide.constant('stateUrlConversion', mockedStateUrlConversion);
                }
            );

            angular.mock.inject(function (_stateUrlConverter_) {
                stateUrlConverter = _stateUrlConverter_;
            });
        });

        describe('The state to params translation', function () {
            it('translates an empty state to empty params', function () {
                const params = stateUrlConverter.state2params({});
                expect(params).toEqual({});
            });

            it('translates a state to the corresponding params', function () {
                const params = stateUrlConverter.state2params({
                    s: 'aap',
                    x: {
                        b: true,
                        y: {
                            n: 10,
                            n1: 1.234,
                            z: {
                                b62: 62
                            }
                        }
                    },
                    as: ['aap', 'noot', 'mies'],
                    aab: [[true, false], [false, true]],
                    aaan: [[[1, 2], [3, 4]], [[5, 6], [7, 8]]],
                    kv: { aap: 'noot', mies: 'teun' },
                    osb: { id: 'aap', isVisible: true },
                    v: 'v'
                });

                expect(params).toEqual({
                    s: 'aap',
                    b: 'T',
                    n: '10',
                    n1: '1.2',
                    b62: 'A0',
                    as: 'aap:noot:mies',
                    aab: 'T::F:F::T',
                    aaan: '1:::2::3:::4:5:::6::7:::8',
                    kv: 'aap::noot:mies::teun',
                    osb: 'aap:T',
                    v: 'getValue.v'
                });
            });

            it('translates a state with an empty filter to the corresponding params', function () {
                const params = stateUrlConverter.state2params({
                    s: 'aap',
                    x: {
                        b: true,
                        y: {
                            n: 10,
                            n1: 1.234,
                            z: {
                                b62: 62
                            }
                        }
                    },
                    as: ['aap', 'noot', 'mies'],
                    aab: [[true, false], [false, true]],
                    aaan: [[[1, 2], [3, 4]], [[5, 6], [7, 8]]],
                    kv: { aap: 'noot', mies: 'teun' },
                    filters: { aap: 'noot', postcode: '', mies: 'teun' },
                    osb: { id: 'aap', isVisible: true },
                    v: 'v'
                });

                expect(params).toEqual({
                    s: 'aap',
                    b: 'T',
                    n: '10',
                    n1: '1.2',
                    b62: 'A0',
                    as: 'aap:noot:mies',
                    aab: 'T::F:F::T',
                    aaan: '1:::2::3:::4:5:::6::7:::8',
                    kv: 'aap::noot:mies::teun',
                    dsf: 'aap::noot:postcode::xxxx:mies::teun',
                    osb: 'aap:T',
                    v: 'getValue.v'
                });
            });

            it('skips empty values for strings and arrays', function () {
                const params = stateUrlConverter.state2params({
                    s: '',
                    as: []
                });

                expect(params).toEqual({});
            });

            it('can handle key values with empty values', function () {
                const params = stateUrlConverter.state2params({
                    kv: { aap: '' }
                });
                expect(params).toEqual({kv: 'aap::'});
            });

            it('skips values of unknown type', function () {
                mockedStateUrlConversion.stateVariables.s.type = 'string1';
                const params = stateUrlConverter.state2params({
                    s: 'aap'
                });

                expect(params).toEqual({});
            });
        });

        describe('The state to url string', function () {
            it('returns a url string for the converted state', function () {
                const mockedState = {
                    s: 'aap',
                    x: {
                        b: true
                    }
                };
                const link = stateUrlConverter.state2url(mockedState);
                expect(link).toEqual('#?s=aap&b=T');
            });

            it('skips any null values in the state', function () {
                const mockedState = {
                    s: null,
                    x: {
                        b: true
                    }
                };
                const link = stateUrlConverter.state2url(mockedState);
                expect(link).toEqual('#?b=T');
            });
        });

        describe('The params to state translation', function () {
            it('translates empty params to an empty state', function () {
                const state = stateUrlConverter.params2state({}, {});
                expect(state).toEqual({});
            });

            it('translates params to the corresponding state', function () {
                const state = stateUrlConverter.params2state({}, {
                    s: 'aap',
                    b: 'T',
                    n: '10',
                    n1: '1.2',
                    b62: 'A0',
                    as: 'aap:noot:mies',
                    aab: 'T::F:F::T',
                    aaan: '1:::2::3:::4:5:::6::7:::8',
                    kv: 'aap::noot:mies::teun',
                    osb: 'aap:T',
                    v: 'v'
                });

                expect(state).toEqual({
                    s: 'aap',
                    x: {
                        b: true,
                        y: {
                            n: 10,
                            n1: 1.2,
                            z: {
                                b62: 62
                            }
                        }
                    },
                    as: ['aap', 'noot', 'mies'],
                    aab: [[true, false], [false, true]],
                    aaan: [[[1, 2], [3, 4]], [[5, 6], [7, 8]]],
                    kv: { aap: 'noot', mies: 'teun' },
                    osb: { id: 'aap', isVisible: true },
                    v: 'setValue.v'
                });
            });

            it('translates the NO_VALUE param to an empty string', function () {
                const state = stateUrlConverter.params2state({}, {
                    s: 'aap',
                    b: 'T',
                    n: '10',
                    n1: '1.2',
                    b62: 'A0',
                    as: 'aap:noot:mies',
                    aab: 'T::F:F::T',
                    aaan: '1:::2::3:::4:5:::6::7:::8',
                    kv: 'aap::noot:mies::teun',
                    dsf: 'aap::noot:postcode::xxxx:mies::teun',
                    osb: 'aap:T',
                    v: 'v'
                });

                expect(state).toEqual({
                    s: 'aap',
                    x: {
                        b: true,
                        y: {
                            n: 10,
                            n1: 1.2,
                            z: {
                                b62: 62
                            }
                        }
                    },
                    as: ['aap', 'noot', 'mies'],
                    aab: [[true, false], [false, true]],
                    aaan: [[[1, 2], [3, 4]], [[5, 6], [7, 8]]],
                    kv: { aap: 'noot', mies: 'teun' },
                    filters: { aap: 'noot', mies: 'teun', postcode: '' },
                    osb: { id: 'aap', isVisible: true },
                    v: 'setValue.v'
                });
            });

            it('can translate keyvalues with empty values', function () {
                const state = stateUrlConverter.params2state({}, {
                    kv: 'aap::'
                });

                expect(state).toEqual({
                    kv: { aap: '' }
                });
            });

            it('can use initialValues to initialize a state object', function () {
                mockedStateUrlConversion.initialValues = {
                    x: {
                        aap: 'noot'
                    }
                };

                const state = stateUrlConverter.params2state({}, {b: 'T'});
                expect(state).toEqual({
                    x: {
                        aap: 'noot',
                        b: true
                    }
                });
            });

            it('uses DEFAULT initialValues to denote the main part of the state object', function () {
                mockedStateUrlConversion.initialValues = {
                    DEFAULT: {
                        aap: 'noot'
                    }
                };

                const state = stateUrlConverter.params2state({}, {});
                expect(state).toEqual({
                    aap: 'noot'
                });
            });

            it('initializes non-used initialValues to null', function () {
                mockedStateUrlConversion.initialValues = {
                    xyz: {
                        mies: 'teun'
                    }
                };

                const state = stateUrlConverter.params2state({}, {});
                expect(state).toEqual({
                    xyz: null
                });
            });

            it('can use a onCreate method to inialize a state object', function () {
                mockedStateUrlConversion.onCreate = {
                    x: (oldState, newState) => {
                        newState.mies = oldState.aap + ', ' + newState.aap;
                        return newState;
                    }
                };

                mockedStateUrlConversion.initialValues = {
                    x: {
                        aap: 'new noot'
                    }
                };

                const state = stateUrlConverter.params2state({
                    x: {
                        aap: 'old noot'
                    }
                }, {b: 'T'});
                expect(state).toEqual({
                    x: {
                        aap: 'new noot',
                        mies: 'old noot, new noot',
                        b: true
                    }
                });
            });

            it('supplies the payload to a onCreate method for the main state object', function () {
                mockedStateUrlConversion.onCreate = {
                    DEFAULT: (oldState, newState, params) => {
                        newState.mies = oldState.aap + ', ' + newState.aap + ', ' + params.s;
                        return newState;
                    }
                };
                mockedStateUrlConversion.initialValues = {
                    DEFAULT: {
                        aap: 'new noot'
                    }
                };

                const state = stateUrlConverter.params2state({
                    aap: 'old noot'
                }, {s: 'mies'});
                expect(state).toEqual({
                    aap: 'new noot',
                    mies: 'old noot, new noot, mies',
                    s: 'mies'
                });
            });

            it('can use a post method to post process a state when all conversion has finished', function () {
                let onlyPostForStates = true;
                mockedStateUrlConversion.post = {
                    x: (oldState, newState) => {
                        newState.mies = oldState.aap + ', ' + newState.aap + ', ' + newState.b;
                        return newState;
                    },
                    y: () => {
                        onlyPostForStates = false;
                    }
                };

                mockedStateUrlConversion.initialValues = {
                    x: {
                        aap: 'new noot'
                    }
                };

                const state = stateUrlConverter.params2state({
                    x: {
                        aap: 'old noot'
                    }
                }, {b: 'T'});
                expect(state).toEqual({
                    x: {
                        aap: 'new noot',
                        mies: 'old noot, new noot, true',
                        b: true
                    }
                });
                expect(onlyPostForStates).toBe(true);
            });

            it('skips values of unknown type', function () {
                mockedStateUrlConversion.stateVariables.s.type = 'string1';
                const state = stateUrlConverter.params2state({}, {s: 'mies'});
                expect(state).toEqual({});
            });

            it('restores empty values for multidimensional arrays', function () {
                const state = stateUrlConverter.params2state({}, {
                    aab: 'T::F'
                });
                expect(state).toEqual({
                    aab: [[true, false]]
                });
            });
        });
    });
});
