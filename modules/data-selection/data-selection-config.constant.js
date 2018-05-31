(function () {
    'use strict';

    angular
        .module('dpDataSelection')
        .constant('DATA_SELECTION_CONFIG', {
            options: {
                MAX_NUMBER_OF_CLUSTERED_MARKERS: 10000
            },
            datasets: {
                bag: {
                    CUSTOM_API: 'dataSelectionApiDataSelection',
                    MAX_AVAILABLE_PAGES: 100,
                    ENDPOINT_PREVIEW: 'dataselectie/bag/',
                    ENDPOINT_MARKERS: 'dataselectie/bag/geolocation/',
                    ENDPOINT_EXPORT: 'dataselectie/bag/export/',
                    ENDPOINT_DETAIL: 'bag/nummeraanduiding/',
                    PRIMARY_KEY: 'nummeraanduiding_id',
                    TITLE: 'Adressen',
                    SORT_FILTERS: false,
                    FILTERS: [
                        {
                            slug: 'stadsdeel_naam',
                            label: 'Stadsdeel'
                        }, {
                            slug: 'ggw_naam',
                            label: 'GGW-gebied'
                        }, {
                            slug: 'buurtcombinatie_naam',
                            label: 'Wijk'
                        }, {
                            slug: 'buurt_naam',
                            label: 'Buurt'
                        }, {
                            slug: 'openbare_ruimte',
                            label: 'Openbare ruimte'
                        }, {
                            slug: 'postcode',
                            label: 'Postcode'
                        }
                    ],
                    CONTENT: {
                        TABLE: [
                            {
                                label: 'Naam openbare ruimte',
                                variables: ['_openbare_ruimte_naam']
                            },
                            {
                                label: 'Num.',
                                variables: ['huisnummer']
                            },
                            {
                                label: 'Let.',
                                variables: ['huisletter']
                            },
                            {
                                label: 'Toev.',
                                variables: ['huisnummer_toevoeging']
                            },
                            {
                                label: 'Postcode',
                                variables: ['postcode']
                            },
                            {
                                label: 'Stadsdeel',
                                variables: ['stadsdeel_naam']
                            },
                            {
                                label: '-code',
                                variables: ['stadsdeel_code']
                            },
                            {
                                label: 'GGW-gebied',
                                variables: ['ggw_naam']
                            },
                            {
                                label: '-code',
                                variables: ['ggw_code']
                            },
                            {
                                label: 'Wijk',
                                variables: ['buurtcombinatie_naam']
                            },
                            {
                                label: '-code',
                                variables: ['buurtcombinatie_code']
                            },
                            {
                                label: 'Buurt',
                                variables: ['buurt_naam']
                            },
                            {
                                label: '-code',
                                variables: ['buurt_code']
                            }
                        ],
                        LIST: [
                            {
                                variables: [
                                    '_openbare_ruimte_naam',
                                    'huisnummer',
                                    'huisletter',
                                    'huisnummer_toevoeging'
                                ],
                                formatter: 'bagAddress'
                            },
                            {
                                variables: [
                                    'ligplaats_id',
                                    'standplaats_id'
                                ],
                                formatter: 'nummeraanduidingType'
                            },
                            {
                                variables: [
                                    'hoofdadres'
                                ],
                                formatter: 'nevenadres'
                            },
                            {
                                variables: [
                                    'status_id'
                                ],
                                formatter: 'verblijfsobjectGevormd'
                            }
                        ]
                    }
                },
                hr: {
                    CUSTOM_API: 'dataSelectionApiDataSelection',
                    AUTH_SCOPE: 'HR/R',
                    MAX_AVAILABLE_PAGES: 100,
                    ENDPOINT_PREVIEW: 'dataselectie/hr/',
                    ENDPOINT_MARKERS: 'dataselectie/hr/geolocation/',
                    ENDPOINT_EXPORT: 'dataselectie/hr/export/',
                    ENDPOINT_EXPORT_PARAM: 'dataset=ves',
                    ENDPOINT_DETAIL: 'handelsregister/vestiging/',
                    PRIMARY_KEY: 'vestiging_id',
                    TITLE: 'Vestigingen',
                    SORT_FILTERS: false,
                    FILTERS: [
                        {
                            slug: 'sbi_code',
                            label: 'SBI-code'
                        }, {
                            slug: 'sbi_l2',
                            label: 'SBI-L2'
                        }, {
                            slug: 'sbi_l3',
                            label: 'SBI-L3'
                        }, {
                            slug: 'sbi_l4',
                            label: 'SBI-L4'
                        }, {
                            slug: 'sbi_l5',
                            label: 'SBI-L5'
                        }, {
                            slug: 'bijzondere_rechtstoestand',
                            label: 'Bijzondere rechtstoestand'
                        }, {
                            slug: 'stadsdeel_naam',
                            label: 'Stadsdeel'
                        }, {
                            slug: 'ggw_naam',
                            label: 'GGW-gebied'
                        }, {
                            slug: 'buurtcombinatie_naam',
                            label: 'Wijk'
                        }, {
                            slug: 'buurt_naam',
                            label: 'Buurt'
                        }, {
                            slug: 'openbare_ruimte',
                            label: 'Openbare ruimte'
                        }, {
                            slug: 'postcode',
                            label: 'Postcode'
                        }
                    ],
                    CONTENT: {
                        TABLE: [
                            {
                                label: 'KvK-num.',
                                variables: ['kvk_nummer']
                            },
                            {
                                label: 'Handelsnaam',
                                variables: ['handelsnaam', 'bijzondere_rechtstoestand'],
                                template: 'handelsnaam'
                            },
                            {
                                label: 'SBI-code',
                                variables: ['sbi_code']
                            },
                            {
                                label: 'SBI-omschrijving',
                                variables: ['sbi_omschrijving'],
                                template: 'sbi-omschrijving'
                            },
                            {
                                label: 'Bezoekadres',
                                variables: ['bezoekadres_volledig_adres', 'non_mailing'],
                                formatter: 'hrBezoekadres',
                                template: 'bezoekadres'
                            }
                        ],
                        LIST: [
                            {
                                variables: ['handelsnaam']
                            }
                        ]
                    }
                },
                dcatd: {
                    MAX_ITEMS_PER_PAGE: 100,
                    CUSTOM_API: 'dataSelectionApiDcatd',
                    ENDPOINT_METADATA: 'dcatd/openapi',
                    ENDPOINT_PREVIEW: 'dcatd/datasets',
                    ENDPOINT_DETAIL: 'dcatd/datasets',
                    TITLE: 'Catalogus',
                    PRIMARY_KEY: 'dct:identifier',
                    SHOW_FILTER_OPTION_COUNTS: false,
                    SORT_FILTERS: true,
                    FILTERS: [
                        {
                            slug: 'groups',
                            label: 'Thema\'s'
                        }, {
                            slug: 'owners',
                            label: 'Eigenaar'
                        }, {
                            slug: 'distributionTypes',
                            label: 'Verschijningsvorm'
                        }, {
                            slug: 'serviceTypes',
                            label: 'API/Service formaten'
                        }, {
                            slug: 'formats',
                            label: 'Bestandsformaten',
                            formatter: 'lowercase'
                        }
                    ],
                    CONTENT: {
                        CATALOG: []
                    }
                }
            }
        });
})();
