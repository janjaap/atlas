/* eslint-disable max-len */
/**

 const mapLayers = [
 {
    (X) "id": {String} "Unique identifier for this layer, only required when other layers in group are NOT selectable",
    (X) "layers": {Array} "Layer names as defined in MapServer, only required layer has own MapServer definition",
    (X) "url": {String} "Url to MapServer",
    "params": {Object} "Object containing extra parameters that should be added to the url for MapServer",
    "external": {Boolean} "Should be set to TRUE when the url refers to an external source",
    (*) "title": {String} "Title for group in the MapPanel component",
    (*) "legendItems": [  // Used to define legenda layers that are eithers labels or specific layers with an own MapServer definition. Fields will overwrite the parent object.
      {
        (X) "id": {String} "Unique identifier for this layer, only required layer has own MapServer definition",
        (X) "layers": {Array} "Layer names as defined in MapServer, only required layer has own MapServer definition",
        (X) "url": {String} "Url to MapServer",
        "params": {Object} "Object containing extra parameters that should be added to the url for MapServer",
        "external": {Boolean} "Should be set to TRUE when the url refers to an external source",
        (*) "title": {String} "Title for layer to display, will also be used as label for MapServer",
        "imageRule": {String} "Overrides the label for MapServer",
        "detailUrl": {String} "Relative endpoint for GeoSearch",
        "detailItem": {String} "Identifier for GeoSearch",
        "detailIsShape": {Boolean} "True when GeoSearch is a GeoJSON and not a location point (Default: false)",
        "noDetail": {Boolean} "True when the GeoSearch result has no a Detail Page (Default: false)"
      }
    ],
    "disabled": {Boolean} "Hides the legenda for this layer when set to TRUE",
    "bounds": {Array} "Array of a GEO location, only use this when the bounds are predefined",
    "notClosable": {Boolean} "Hides the close button for this layer when set to TRUE",
    "minZoom": {Number} "Can be used to overwrite the default value for MIN_ZOOM in MAP_CONFIG",
    "maxZoom": {Number} "Can be used to overwrite the default value for MAX_ZOOM in MAP_CONFIG",
    "detailUrl": {String} "Relative endpoint for GeoSearch",
    "detailItem": {String} "Identifier for GeoSearch",
    "detailIsShape": {Boolean} "True when GeoSearch is a GeoJSON and not a location point (Default: false)",
    "noDetail": {Boolean} "True when the GeoSearch result has no a Detail Page (Default: false)"
  }
 ]

 (*) Are required fields
 (X) Are required fields for either the mapLayer objects or legendaItem objects

 */

import mapLayerTypes from './map-layer-types.config';
import MAP_CONFIG from '../map-config';

const THEMES = {
  PANORAMA: 'Panoramabeelden',
  GEOGRAPHY_ONR: 'Geografie: onroerende zaken',
  GEOGRAPHY_GEB: 'Geografie: gebieden',
  GEOGRAPHY_HEIGHT: 'Geografie: hoogte',
  ECONOMY_HARBOR: 'Economie en haven',
  HISTORY: 'Topografie: historisch',
  TRAFFIC: 'Verkeer en infrastructuur',
  SAFETY: 'Openbare orde en veiligheid',
  TOURISM: 'Toerisme en cultuur',
  MIL_GROUND: 'Milieu: bodem',
  MIL_SAFETY: 'Milieu: externe veiligheid',
  MIL_ZONES: 'Milieu: zones',
  URBAN: 'Stedelijke ontwikkeling'
};

const mapLayers = [
  {
    id: 'pano',
    layers: ['panorama_new'],
    legendItems: [
      { title: '2018' },
      { title: '2017' },
      { title: '2016' }
    ],
    minZoom: 11,
    notClosable: true,
    title: THEMES.PANORAMA,
    url: '/maps/panorama',
    params: {
      mission_type: 'bi'
    }
  },
  {
    id: 'pano2018bi',
    layers: ['panorama_new'],
    legendItems: [
      { title: '2018' }
    ],
    minZoom: 11,
    title: THEMES.PANORAMA,
    notClosable: true,
    url: '/maps/panorama',
    params: {
      mission_year: 2018,
      mission_type: 'bi'
    }
  },
  {
    id: 'pano2018woz',
    layers: ['panorama_new'],
    legendItems: [
      {
        imageRule: '2018',
        title: '2018 WOZ'
      }
    ],
    minZoom: 11,
    notClosable: true,
    title: THEMES.PANORAMA,
    url: '/maps/panorama',
    params: {
      mission_year: 2018,
      mission_type: 'woz'
    }
  },
  {
    id: 'pano2017bi',
    layers: ['panorama_new'],
    legendItems: [
      { title: '2017' }
    ],
    minZoom: 11,
    notClosable: true,
    title: THEMES.PANORAMA,
    url: '/maps/panorama',
    params: {
      mission_year: 2017,
      mission_type: 'bi'
    }
  },
  {
    id: 'pano2017woz',
    layers: ['panorama_new'],
    legendItems: [
      {
        imageRule: '2017',
        title: '2017 WOZ'
      }
    ],
    minZoom: 11,
    title: THEMES.PANORAMA,
    notClosable: true,
    url: '/maps/panorama',
    params: {
      mission_year: 2017,
      mission_type: 'woz'
    }
  },
  {
    id: 'pano2016bi',
    layers: ['panorama_new'],
    legendItems: [
      {
        title: '2016'
      }
    ],
    minZoom: 11,
    notClosable: true,
    title: THEMES.PANORAMA,
    url: '/maps/panorama',
    params: {
      mission_year: 2016,
      mission_type: 'bi'
    }
  },
  {
    category: THEMES.GEOGRAPHY_ONR,
    legendItems: [
      {
        id: 'bgem',
        title: 'Burgerlijke gemeente',
        layers: ['burgerlijke_gemeente', 'burgerlijke_gemeente_label'],
        noDetail: true
      },
      {
        id: 'kgem',
        title: 'Kadastrale gemeente',
        layers: ['kadastrale_gemeente', 'kadastrale_gemeente_label'],
        noDetail: true
      },
      {
        id: 'ksec',
        title: 'Kadastrale sectie',
        layers: ['kadastrale_sectie', 'kadastrale_sectie_label'],
        noDetail: true
      },
      {
        id: 'kot',
        title: 'Kadastraal object',
        layers: ['kadastraal_object', 'kadastraal_object_label'],
        detailUrl: 'geosearch/search/',
        detailItem: 'kadastraal_object',
        detailIsShape: true
      }
    ],
    title: 'Kadastrale perceelsgrenzen',
    url: '/maps/brk'
  },
  {
    category: THEMES.GEOGRAPHY_ONR,
    layers: ['eigendommen'],
    legendItems: [
      {
        id: 'egga',
        title: 'Gemeente Amsterdam',
        iconUrl: '/assets/images/map-legend/icon-egdm-cat-1.svg',
        params: {
          categorie: 1
        }
      },
      {
        id: 'egog',
        title: 'Overige gemeenten',
        iconUrl: '/assets/images/map-legend/icon-egdm-cat-2.svg',
        params: {
          categorie: 2
        }
      },
      {
        id: 'egst',
        title: 'Staat',
        iconUrl: '/assets/images/map-legend/icon-egdm-cat-3.svg',
        params: {
          categorie: 3
        }
      },
      {
        id: 'egpr',
        title: 'Provincies',
        iconUrl: '/assets/images/map-legend/icon-egdm-cat-4.svg',
        params: {
          categorie: 4
        }
      },
      {
        id: 'egwa',
        title: 'Waterschappen',
        iconUrl: '/assets/images/map-legend/icon-egdm-cat-5.svg',
        params: {
          categorie: 5
        }
      },
      {
        id: 'egwo',
        title: 'Woningbouwcorporaties',
        iconUrl: '/assets/images/map-legend/icon-egdm-cat-6.svg',
        params: {
          categorie: 6
        }
      },
      {
        id: 'egve',
        title: 'Verenigingen van eigenaren',
        iconUrl: '/assets/images/map-legend/icon-egdm-cat-7.svg',
        params: {
          categorie: 7
        }
      },
      {
        id: 'egsp',
        title: 'Spoorwegen/ProRail',
        iconUrl: '/assets/images/map-legend/icon-egdm-cat-8.svg',
        params: {
          categorie: 8
        }
      },
      {
        id: 'egnnp',
        title: 'Overige niet-natuurlijke personen',
        iconUrl: '/assets/images/map-legend/icon-egdm-cat-9.svg',
        params: {
          categorie: 9
        }
      },
      {
        id: 'egnp',
        title: 'Overige natuurlijke personen',
        iconUrl: '/assets/images/map-legend/icon-egdm-cat-10.svg',
        params: {
          categorie: 10
        }
      }
    ],
    title: 'Kadastrale eigenaren',
    url: '/maps/eigendommen',
    detailUrl: 'geosearch/search/',
    detailItem: 'kadastraal_object',
    detailIsShape: true
  },
  {
    category: THEMES.GEOGRAPHY_ONR,
    layers: ['erfpacht'],
    legendItems: [
      {
        id: 'efga',
        title: 'Gemeente Amsterdam',
        iconUrl: '/assets/images/map-legend/icon-erf-cat-1.svg',
        params: {
          categorie: 1
        }
      },
      {
        id: 'efov',
        title: 'Overig',
        iconUrl: '/assets/images/map-legend/icon-erf-cat-2.svg',
        params: {
          categorie: 2
        }
      }
    ],
    title: 'Kadastrale erfpachtuitgevers',
    url: '/maps/erfpacht',
    detailUrl: 'geosearch/search/',
    detailItem: 'kadastraal_object',
    detailIsShape: true
  },
  {
    category: THEMES.GEOGRAPHY_ONR,
    legendItems: [
      {
        id: 'gbvv',
        layers: ['beperking-VV'],
        title: '(voorlopige) aanwijzing WVG'
      },
      {
        id: 'gbkw',
        layers: ['beperking-KW'],
        title: 'Wet bodembescherming'
      },
      {
        id: 'gbwu',
        layers: ['beperking-WU'],
        title: 'Woningwet'
      },
      {
        id: 'gboh',
        layers: ['beperking-OH'],
        title: 'WABO bestuursdwang / dwangsom'
      },
      {
        id: 'gbos',
        layers: ['beperking-OS'],
        title: 'Sluiting o.b.v. Opiumwet'
      },
      {
        id: 'gbgs',
        layers: ['beperking-GS'],
        title: 'Sluiting v. woning/lokaal/erf'
      },
      {
        id: 'gbgg',
        layers: ['beperking-GG'],
        title: 'Gemeentelijk monument'
      },
      {
        id: 'gbep',
        layers: ['beperking-EP'],
        title: 'Exploitatieplan'
      },
      {
        id: 'gbhv',
        layers: ['beperking-HV'],
        title: 'Vordering tot woonruimte'
      }
    ],
    minZoom: 13,
    title: 'Gemeentelijke beperkingen (WKPB)',
    url: '/maps/wkpb'
  },
  {
    category: THEMES.GEOGRAPHY_GEB,
    legendItems: [
      {
        id: 'buurt',
        layers: ['buurt', 'buurt_label'],
        title: 'Buurt'
      },
      {
        id: 'bc',
        layers: ['buurtcombinatie', 'buurtcombinatie_label'],
        title: 'Wijk'
      },
      {
        id: 'sd',
        layers: ['stadsdeel', 'stadsdeel_label'],
        title: 'Stadsdeel'
      }
    ],
    title: 'Bestuurlijke gebieden',
    url: '/maps/gebieden'
  },
  {
    category: THEMES.GEOGRAPHY_GEB,
    id: 'bbn',
    layers: ['bouwblok', 'bouwblok_label'],
    legendItems: [
      {
        title: 'Bouwblok'
      }
    ],
    minZoom: 12,
    title: 'Bouwblokken',
    url: '/maps/gebieden',
    detailUrl: 'geosearch/search/',
    detailItem: 'bouwblok',
    detailIsShape: true
  },
  {
    category: THEMES.GEOGRAPHY_GEB,
    legendItems: [
      {
        id: 'ggwg',
        layers: ['gebiedsgerichtwerken', 'gebiedsgerichtwerken_label'],
        title: 'Gebiedsgerichtwerken-gebied'
      },
      {
        id: 'ggwpg',
        layers: [
          'gebiedsgerichtwerkenpraktijkgebieden',
          'gebiedsgerichtwerkenpraktijkgebieden_label'
        ],
        title: 'Gebiedsgerichtwerken-praktijkgebied',
        noDetail: true
      }
    ],
    minZoom: 6,
    title: 'Gebiedsgericht werken',
    url: '/maps/gebieden'
  },
  {
    category: THEMES.GEOGRAPHY_GEB,
    legendItems: [
      {
        id: 'ggra',
        layers: ['grootstedelijk_regio_amsterdam'],
        title: 'Regie Gemeente Amsterdam'
      },
      {
        id: 'ggro',
        layers: ['grootstedelijk_regio_omgevingsdienst'],
        title: 'Regie Omgevingsdienst'
      }
    ],
    title: 'Grootstedelijke gebieden, projecten en belangen',
    url: '/maps/gebieden'
  },
  {
    category: THEMES.GEOGRAPHY_GEB,
    id: 'unesco',
    layers: ['unesco', 'unesco_label'],
    legendItems: [
      { title: 'Kernzone' },
      { title: 'Bufferzone' }
    ],
    minZoom: 10,
    title: 'Unesco werelderfgoedzones',
    url: '/maps/gebieden'
  },
  {
    category: THEMES.GEOGRAPHY_HEIGHT,
    id: 'dtm',
    disabled: true,
    legendItems: [
      {
        iconUrl: '/assets/images/map-legend/icon-ahn-minus-10.svg',
        title: '-10 m tot -5 m'
      },
      {
        iconUrl: '/assets/images/map-legend/icon-ahn-minus-5.svg',
        title: '-5 m tot -2 m'
      },
      {
        iconUrl: '/assets/images/map-legend/icon-ahn-minus-2.svg',
        title: '-2 m tot -1 m'
      },
      {
        iconUrl: '/assets/images/map-legend/icon-ahn-minus-1.svg',
        title: '-1 m tot 0 m'
      },
      {
        iconUrl: '/assets/images/map-legend/icon-ahn-plus-0.svg',
        title: '0 m tot 1 m'
      },
      {
        iconUrl: '/assets/images/map-legend/icon-ahn-plus-1.svg',
        title: '1 m tot 2 m'
      },
      {
        iconUrl: '/assets/images/map-legend/icon-ahn-plus-2.svg',
        title: '2 m tot 5 m'
      },
      {
        iconUrl: '/assets/images/map-legend/icon-ahn-plus-5.svg',
        title: '5 m tot 10 m'
      },
      {
        iconUrl: '/assets/images/map-legend/icon-ahn-plus-10.svg',
        title: '10 m tot 20 m'
      },
      {
        iconUrl: '/assets/images/map-legend/icon-ahn-plus-20.svg',
        title: '20 m tot 30 m'
      },
      {
        iconUrl: '/assets/images/map-legend/icon-ahn-plus-30.svg',
        title: 'hoger dan 30 m'
      }
    ],
    minZoom: 10,
    title: 'Terreinmodel (DTM AHN)',
    type: mapLayerTypes.TMS,
    layers: ['ahn3_05m_dtm'],
    url: 'https://{s}.data.amsterdam.nl/ahn3/AHN3_Amsterdam_DTM/{z}/{x}/{y}.png',
    noDetail: true,
    external: true
  },
  {
    category: THEMES.GEOGRAPHY_HEIGHT,
    id: 'dsm',
    layers: ['ahn3_05m_dsm'],
    legendItems: [
      {
        iconUrl: '/assets/images/map-legend/icon-ahn-minus-10.svg',
        title: '-10 m tot -5 m'
      },
      {
        iconUrl: '/assets/images/map-legend/icon-ahn-minus-5.svg',
        title: '-5 m tot -2 m'
      },
      {
        iconUrl: '/assets/images/map-legend/icon-ahn-minus-2.svg',
        title: '-2 m tot -1 m'
      },
      {
        iconUrl: '/assets/images/map-legend/icon-ahn-minus-1.svg',
        title: '-1 m tot 0 m'
      },
      {
        iconUrl: '/assets/images/map-legend/icon-ahn-plus-0.svg',
        title: '0 m tot 1 m'
      },
      {
        iconUrl: '/assets/images/map-legend/icon-ahn-plus-1.svg',
        title: '1 m tot 2 m'
      },
      {
        iconUrl: '/assets/images/map-legend/icon-ahn-plus-2.svg',
        title: '2 m tot 5 m'
      },
      {
        iconUrl: '/assets/images/map-legend/icon-ahn-plus-5.svg',
        title: '5 m tot 10 m'
      },
      {
        iconUrl: '/assets/images/map-legend/icon-ahn-plus-10.svg',
        title: '10 m tot 20 m'
      },
      {
        iconUrl: '/assets/images/map-legend/icon-ahn-plus-20.svg',
        title: '20 m tot 30 m'
      },
      {
        iconUrl: '/assets/images/map-legend/icon-ahn-plus-30.svg',
        title: 'hoger dan 30 m'
      }
    ],
    minZoom: 10,
    title: 'Oppervlaktemodel (DSM AHN)',
    url: 'https://geodata.nationaalgeoregister.nl/ahn3/wms?',
    external: true,
    noDetail: true
  },
  {
    category: THEMES.GEOGRAPHY_HEIGHT,
    id: 'nap',
    layers: ['peilmerk_hoogte', 'peilmerk_label'],
    legendItems: [
      { title: 'lager dan -1,5 m' },
      { title: '-1,5 m tot -0,5 m' },
      { title: '-0,5 m tot 0 m' },
      { title: '0 m tot 1 m' },
      { title: '1 m tot 1,5 m' },
      { title: '1,5 m tot 2 m' },
      { title: '2 m tot 3,5 m' },
      { title: 'hoger dan 3,5 m' }
    ],
    minZoom: 10,
    title: 'Normaal Amsterdams Peil (NAP)',
    url: '/maps/nap',
    detailUrl: 'geosearch/search/',
    detailItem: 'peilmerk'
  },
  {
    category: THEMES.GEOGRAPHY_HEIGHT,
    id: 'mbs',
    layers: ['meetbouten_status', 'meetbouten_labels'],
    legendItems: [
      { title: 'Actueel' },
      { title: 'Vervallen' }
    ],
    minZoom: 12,
    title: 'Meetbouten - Status',
    url: '/maps/meetbouten',
    detailUrl: 'geosearch/search/',
    detailItem: 'meetbout'
  },
  {
    category: THEMES.GEOGRAPHY_HEIGHT,
    id: 'mbz',
    layers: ['meetbouten_zaksnelheid', 'meetbouten_labels'],
    legendItems: [
      { title: 'minder dan -1 mm/jaar' },
      { title: '-1 tot 0 mm/jaar' },
      { title: '0 tot 1 mm/jaar' },
      { title: '1 tot 1,5 mm/jaar' },
      { title: '1,5 tot 2 mm/jaar' },
      { title: '2 tot 2,5 mm/jaar' },
      { title: '2,5 tot 3 mm/jaar' },
      { title: '3 tot 4 mm/jaar' },
      { title: 'meer dan 4 mm/jaar' }
    ],
    minZoom: 12,
    title: 'Meetbouten - Zaksnelheid',
    url: '/maps/meetbouten',
    detailUrl: 'geosearch/search/',
    detailItem: 'meetbout'
  },
  {
    category: THEMES.GEOGRAPHY_HEIGHT,
    id: 'mbr',
    layers: ['referentiepunt', 'referentiepunten'],
    legendItems: [
      { title: 'Referentiepunt' }
    ],
    minZoom: 12,
    title: 'Meetbouten - Referentiepunten',
    url: '/maps/meetbouten',
    noDetail: true
  },
  {
    category: THEMES.HISTORY,
    id: 'pw1909',
    disabled: true,
    legendItems: [
      { title: '1909 (Dienst der Publieke Werken)' }
    ],
    title: '1909 (Dienst der Publieke Werken, 1:1000)',
    type: mapLayerTypes.TMS,
    layers: ['publieke-werken'],
    url: 'https://{s}.data.amsterdam.nl/publieke-werken-1909-rd/{z}/{x}/{y}.png',
    noDetail: true,
    external: true,
    bounds: [[52.3361, 4.84049], [52.4185, 4.96617]]
  },
  {
    category: THEMES.HISTORY,
    id: 'pw1943',
    disabled: true,
    legendItems: [
      { title: '1943 (Dienst der Publieke Werken, 1:1000)' }
    ],
    title: '1943 (Dienst der Publieke Werken, 1:1000)',
    type: mapLayerTypes.TMS,
    layers: ['publieke-werken'],
    url: 'https://{s}.data.amsterdam.nl/publieke-werken-1943-rd/{z}/{x}/{y}.png',
    noDetail: true,
    external: true,
    bounds: [[52.3292, 4.8382], [52.4173, 4.9646]]
  },
  {
    category: THEMES.HISTORY,
    id: 'pw1943-2500',
    disabled: true,
    legendItems: [
      { title: '1943 (Dienst der Publieke Werken, 1:2500)' }
    ],
    title: '1943 (Dienst der Publieke Werken, 1:2500)',
    type: mapLayerTypes.TMS,
    layers: ['publieke-werken'],
    url: 'https://{s}.data.amsterdam.nl/publieke-werken-1943-2500-rd/{z}/{x}/{y}.png',
    noDetail: true,
    external: true,
    bounds: [[52.2815, 4.7287], [52.4174, 4.9927]]
  },
  {
    category: THEMES.HISTORY,
    id: 'pw1985',
    disabled: true,
    legendItems: [
      { title: '1985 (Dienst der Publieke Werken)' }
    ],
    title: '1985 (Dienst der Publieke Werken, 1:1000)',
    type: mapLayerTypes.TMS,
    layers: ['publieke-werken'],
    url: 'https://{s}.data.amsterdam.nl/publieke-werken-1985-rd/{z}/{x}/{y}.png',
    noDetail: true,
    external: true,
    bounds: [[52.2756, 4.74026], [52.4374, 5.04781]]
  },
  {
    category: THEMES.TRAFFIC,
    legendItems: [
      {
        id: 'mtr',
        layers: ['metrolijnen'],
        title: 'Metrolijn'
      },
      {
        id: 'trm',
        layers: ['tramlijnen'],
        title: 'Tramlijn'
      }
    ],
    title: 'Metro en tram - Spoorlijnen',
    url: '/maps/trm',
    noDetail: true
  },
  {
    category: THEMES.TRAFFIC,
    id: 'mzb',
    layers: ['milieuzones'],
    legendItems: [
      {
        imageRule: 'Bestelauto',
        title: 'Milieuzone bestelauto'
      }
    ],
    title: 'Milieuzones - Bestelauto',
    url: '/maps/milieuzones',
    noDetail: true,
    params: {
      id: 63363
    }
  },
  {
    category: THEMES.TRAFFIC,
    id: 'mzbs',
    layers: ['milieuzones'],
    legendItems: [
      {
        imageRule: 'Brom- en snorfiets',
        title: 'Milieuzone brom- en snorfiets'
      }
    ],
    title: 'Milieuzones - Brom- en snorfiets',
    url: '/maps/milieuzones',
    noDetail: true,
    params: {
      id: 63324
    }
  },
  {
    category: THEMES.TRAFFIC,
    id: 'mzt',
    layers: ['milieuzones'],
    legendItems: [
      {
        imageRule: 'Taxi',
        title: 'Milieuzone taxi'
      }
    ],
    title: 'Milieuzones - Taxi',
    url: '/maps/milieuzones',
    noDetail: true,
    params: {
      id: 63360
    }
  },
  {
    category: THEMES.TRAFFIC,
    id: 'mztc',
    layers: ['milieuzones'],
    legendItems: [
      {
        imageRule: 'Touringcar',
        title: 'Milieuzone touringcar'
      }
    ],
    title: 'Milieuzones - Touringcar',
    url: '/maps/milieuzones',
    noDetail: true,
    params: {
      id: 63361
    }
  },
  {
    category: THEMES.TRAFFIC,
    id: 'mztc2020',
    layers: ['milieuzones'],
    legendItems: [
      {
        imageRule: 'Touringcar na 2020',
        title: 'Milieuzone touringcar (vanaf 1-1-2020)'
      }
    ],
    title: 'Milieuzones - Touringcar (vanaf 1-1-2020)',
    url: '/maps/milieuzones',
    noDetail: true,
    params: {
      id: 63316
    }
  },
  {
    category: THEMES.TRAFFIC,
    id: 'mzva',
    layers: ['milieuzones'],
    legendItems: [
      {
        imageRule: 'Vrachtauto',
        title: 'Milieuzone vrachtauto'
      }
    ],
    title: 'Milieuzones - Vrachtauto',
    url: '/maps/milieuzones',
    noDetail: true,
    params: {
      id: 63362
    }
  },
  {
    category: THEMES.TRAFFIC,
    legendItems: [
      {
        id: 'slpb',
        imageRule: 'Snel beschikbaar',
        layers: ['snel_beschikbaar'],
        title: 'Snellaadpunt (beschikbaar, ±15 min. geleden)'
      },
      {
        id: 'slpnb',
        imageRule: 'Snel niet beschikbaar',
        layers: ['snel_niet_beschikbaar'],
        title: 'Snellaadpunt (niet beschikbaar, ±15 min. geleden)'
      }
    ],
    title: 'Oplaadpunten - Snel laden',
    url: '/maps/oplaadpunten',
    detailUrl: 'geosearch/search/',
    detailItem: 'oplaadpunten'
  },
  {
    category: THEMES.TRAFFIC,
    legendItems: [
      {
        id: 'nlpb',
        imageRule: 'Normaal beschikbaar',
        layers: ['normaal_beschikbaar'],
        title: 'Gewoon laadpunt (beschikbaar, ±15 min. geleden)'
      },
      {
        id: 'nlpnb',
        imageRule: 'Normaal niet beschikbaar',
        layers: ['normaal_niet_beschikbaar'],
        title: 'Gewoon laadpunt (niet beschikbaar, ±15 min. geleden)'
      }
    ],
    title: 'Oplaadpunten - Gewoon laden',
    url: '/maps/oplaadpunten',
    detailUrl: 'geosearch/search/',
    detailItem: 'oplaadpunten'
  },
  {
    category: THEMES.TRAFFIC,
    id: 'pv',
    layers: ['alle_parkeervakken', 'parkeervakken_label'],
    legendItems: [
      {
        title: 'Fiscaal'
      },
      {
        title: 'Niet fiscaal'
      }
    ],
    title: 'Parkeervakken - Fiscale indeling',
    url: '/maps/parkeervakken',
    detailUrl: 'parkeervakken/geosearch/',
    detailItem: 'parkeervak',
    detailIsShape: true
  },
  {
    category: THEMES.TRAFFIC,
    id: 'pvb',
    layers: ['parkeervakken_bord'],
    legendItems: [
      {
        title: 'Bord'
      }
    ],
    minZoom: 11,
    title: 'Parkeervakken - Speciale bestemmingen',
    url: '/maps/parkeervakken',
    detailUrl: 'parkeervakken/geosearch/',
    detailItem: 'parkeervak',
    detailIsShape: true
  },
  {
    category: THEMES.TRAFFIC,
    legendItems: [
      {
        id: 'pvrts',
        layers: ['parkeervakken_reservering'],
        title: 'Taxistandplaats',
        params: {
          categorie: 'taxistandplaats'
        }
      },
      {
        id: 'pvrll',
        layers: ['parkeervakken_reservering'],
        title: 'Laden en lossen',
        imageRule: 'Laden lossen',
        params: {
          categorie: 'laden_lossen'
        }
      },
      {
        id: 'pvrpr',
        layers: ['parkeervakken_reservering'],
        title: 'Kiss & Ride',
        params: {
          categorie: 'kiss_ride'
        }
      }
    ],
    minZoom: 11,
    title: 'Parkeervakken - Gereserveerd (logistiek)',
    url: '/maps/parkeervakken',
    detailUrl: 'parkeervakken/geosearch/',
    detailItem: 'parkeervak',
    detailIsShape: true
  },
  {
    category: THEMES.TRAFFIC,
    layers: ['parkeervakken_reservering'],
    legendItems: [
      {
        id: 'pvrf',
        title: 'Fiscaal',
        params: {
          categorie: 'fiscaal'
        }
      },
      {
        id: 'pvrpv',
        title: 'Parkeerverbod',
        params: {
          categorie: 'parkeerverbod'
        }
      },
      {
        id: 'pvrga',
        title: 'Gehandicaptenplaats algemeen',
        params: {
          categorie: 'gehandicapten_algemeen'
        }
      },
      {
        id: 'pvrgk',
        title: 'Gehandicaptenplaats kenteken',
        params: {
          categorie: 'gehandicapten_kenteken'
        }
      },
      {
        id: 'pvrsv',
        title: 'Specifieke voertuigcategorie',
        params: {
          categorie: 'specifiek_voertuig'
        }
      },
      {
        id: 'pvrvh',
        title: 'Vergunninghouders',
        params: {
          categorie: 'vergunning_houders'
        }
      },
      {
        id: 'pvrbz',
        title: 'Blauwe zone',
        params: {
          categorie: 'blauwe_zone'
        }
      }
    ],
    minZoom: 11,
    title: 'Parkeervakken - Gereserveerd (overige)',
    url: '/maps/parkeervakken',
    detailUrl: 'parkeervakken/geosearch/',
    detailItem: 'parkeervak',
    detailIsShape: true
  },
  {
    category: THEMES.TRAFFIC,
    legendItems: [
      {
        id: 'bgt',
        imageRule: 'Busbaan geen taxi',
        layers: ['busbaan_geen_taxi'],
        title: 'Verbod lijnbusbaan'
      },
      {
        id: 'tar',
        imageRule: 'Taxiroutes',
        layers: ['taxiroutes'],
        title: 'Hoofdroutes taxi\'s'
      }
    ],
    title: 'Routes - Taxi',
    url: '/maps/hoofdroutes',
    noDetail: true
  },
  {
    category: THEMES.TRAFFIC,
    id: 'vrr',
    layers: ['vrachtroutes'],
    legendItems: [
      {
        imageRule: 'Vrachtroutes',
        title: 'Vrachtauto 7,5t-route'
      }
    ],
    title: 'Routes - Vrachtauto',
    url: '/maps/hoofdroutes',
    noDetail: true
  },
  {
    category: THEMES.TRAFFIC,
    id: 'vezips',
    layers: ['vezips'],
    legendItems: [
      {
        title: 'Verzinkbare palen'
      }
    ],
    title: 'Verzinkbare palen',
    url: '/maps/vezips',
    noDetail: true
  },
  {
    category: THEMES.SAFETY,
    legendItems: [
      {
        id: 'oovoalg',
        layers: ['algemeen_overlastgebied', 'algemeen_overlastgebied_label'],
        title: 'Algemeen overlastgebied'
      },
      {
        id: 'oovodlrs',
        layers: ['dealeroverlastgebied', 'dealeroverlastgebied_label'],
        title: 'Dealeroverlastgebied'
      },
      {
        id: 'oovouitg',
        layers: ['uitgaansoverlastgebied', 'uitgaansoverlastgebied_label'],
        title: 'Uitgaansoverlastgebied'
      }
    ],
    title: 'Overlastgebieden',
    url: '/maps/overlastgebieden',
    noDetail: true
  },
  {
    category: THEMES.SAFETY,
    id: 'oovctg',
    layers: ['cameratoezichtgebied', 'cameratoezichtgebied_label'],
    legendItems: [
      {
        title: 'Cameratoezichtgebied'
      }
    ],
    title: 'Cameratoezichtgebieden',
    url: '/maps/overlastgebieden',
    noDetail: true
  },
  {
    category: THEMES.SAFETY,
    id: 'oovoalco',
    layers: ['alcoholverbodsgebied', 'alcoholverbodsgebied_label'],
    legendItems: [
      {
        title: 'Alcoholverbodsgebied'
      }
    ],
    title: 'Alcoholverbodsgebieden',
    url: '/maps/overlastgebieden',
    noDetail: true
  },
  {
    category: THEMES.SAFETY,
    id: 'oovtig',
    layers: ['taxi-standplaatsgebied', 'taxi-standplaatsgebied_label'],
    legendItems: [
      {
        title: 'Omgeving taxi-standplaats',
        imageRule: 'Taxi-standplaatsgebied'
      }
    ],
    title: 'Omgeving taxi-standplaatsen',
    url: '/maps/overlastgebieden',
    noDetail: true
  },
  /* to revive end of 2019
  {
    category: THEMES.SAFETY,
    id: 'oovvz',
    layers: ['vuurwerkvrijezone', 'vuurwerkvrijezone_label'],
    legendItems: [
      {
        title: 'Vuurwerkvrije zone',
        imageRule: 'vuurwerkvrijezone'
      }
    ],
    title: 'Vuurwerkvrije zones',
    url: '/maps/overlastgebieden',
    noDetail: true
  }, */
  {
    category: THEMES.TOURISM,
    id: 'tcmnmt',
    layers: ['monument_coordinaten', 'monument_coordinaten_nopand'],
    legendItems: [
      {
        layers: ['monument_coordinaten'],
        title: 'Monument (pandgerelateerd)'
      },
      {
        layers: ['monument_coordinaten_nopand'],
        title: 'Monument (overige)'
      }
    ],
    minZoom: 12,
    title: 'Monumenten',
    url: '/maps/monumenten',
    detailUrl: 'geosearch/search/',
    detailItem: 'monument'
  },
  {
    category: THEMES.TOURISM,
    id: 'tcevt',
    layers: ['evenementen'],
    legendItems: [
      {
        title: 'Evenement',
        imageRule: 'Evenementen'
      }
    ],
    title: 'Evenementen',
    url: '/maps/evenementen',
    detailUrl: 'geosearch/evenementen/',
    detailItem: 'evenement'
  },
  {
    category: THEMES.MIL_GROUND,
    id: 'mbgm',
    layers: ['grondmonsters'],
    legendItems: [
      { title: 'Niet verontreinigd' },
      { title: 'Licht verontreinigd' },
      { title: 'Matig verontreinigd' },
      { title: 'Sterk verontreinigd' }
    ],
    minZoom: 11,
    title: 'Grondmonsters',
    url: '/maps/bodem',
    noDetail: true
  },
  {
    category: THEMES.MIL_GROUND,
    id: 'mbaig',
    layers: ['asbest'],
    legendItems: [
      { title: '-10 - 0 mg/kg' },
      { title: '0,1 - 10 mg/kg' },
      { title: '10,1 - 100 mg/kg' },
      { title: '> 100,1 mg/kg' }
    ],
    minZoom: 11,
    title: 'Grondmonsters asbest',
    url: '/maps/bodem',
    noDetail: true
  },
  {
    category: THEMES.MIL_GROUND,
    id: 'mbgwm',
    layers: ['grondwatermonsters'],
    legendItems: [
      { title: 'Niet verontreinigd' },
      { title: 'Licht verontreinigd' },
      { title: 'Matig verontreinigd' },
      { title: 'Sterk verontreinigd' }
    ],
    title: 'Grondwatermonsters',
    url: '/maps/bodem',
    noDetail: true
  },
  {
    category: THEMES.MIL_GROUND,
    id: 'exin',
    layers: ['inslagen'],
    legendItems: [
      { title: 'Blindganger' },
      { title: 'Crashlocatie' },
      { title: 'Gedetoneerde vernielingslading' },
      { title: 'Geruimd explosief' },
      { title: 'Niet gedetoneerde vernielingslading' },
      { title: 'Vermoedelijke bominslag(en)' }
    ],
    title: 'Explosieven - Inslagen',
    url: '/maps/bommenkaart',
    detailUrl: 'geosearch/search/',
    detailItem: 'bominslag'
  },
  {
    category: THEMES.MIL_GROUND,
    id: 'exvg',
    layers: ['verdachte_gebieden'],
    legendItems: [
      { title: 'Munities en granaten' },
      { title: 'Landmijnen' },
      { title: 'Vernielingsladingen' },
      { title: 'Afwerpmunitie' }
    ],
    title: 'Explosieven - Verdachte gebieden',
    url: '/maps/bommenkaart'
  },
  {
    category: THEMES.MIL_GROUND,
    id: 'exgg',
    layers: ['gevrijwaarde_gebieden'],
    legendItems: [
      { title: 'Gevrijwaarde gebieden' }
    ],
    title: 'Explosieven - Gevrijwaarde gebieden',
    url: '/maps/bommenkaart'
  },
  {
    category: THEMES.MIL_GROUND,
    id: 'exuo',
    layers: ['uitgevoerde_CE_onderzoeken'],
    legendItems: [
      { title: 'Detectieonderzoek' },
      { title: 'Projectgebonden risicoanalyse' },
      { title: 'Vooronderzoek' }
    ],
    title: 'Explosieven - Uitgevoerde CE-onderzoeken',
    url: '/maps/bommenkaart'
  },
  {
    category: THEMES.MIL_GROUND,
    id: 'bros',
    layers: ['cpt'],
    legendItems: [
      {
        title: 'Geotechnische sondering',
        iconUrl: '/assets/images/map-legend/icon-bro-sondering.png'
      }
    ],
    title: 'Geotechnische sonderingen (CPT BRO)',
    url: 'https://geodata.nationaalgeoregister.nl/brocpt/wms?',
    external: true,
    noDetail: true
  },
  {
    category: THEMES.MIL_SAFETY,
    id: 'mvlpgv',
    legendItems: [
      {
        layers: ['lpgvulpuntplaatsgebondenrisico105'],
        title: 'Plaatsgebonden risico 10-5'
      },
      {
        layers: ['lpgvulpuntplaatsgebondenrisico106'],
        title: 'Plaatsgebonden risico 10-6'
      },
      {
        layers: ['lpgvulpuntinvloedsgebied'],
        title: 'Invloedsgebied groepsrisico'
      }
    ],
    layers: [
      'lpgvulpuntinvloedsgebied',
      'lpgvulpuntplaatsgebondenrisico106',
      'lpgvulpuntplaatsgebondenrisico105',
      'lpgvulpuntlocaties'
    ],
    title: 'LPG-vulpunten - Risicozones',
    url: '/maps/externeveiligheid',
    noDetail: true
  },
  {
    category: THEMES.MIL_SAFETY,
    id: 'mvlpga',
    layers: ['milieu_veiligheid_lpg_afleverzuil'],
    legendItems: [
      {
        layers: ['lpgafleverzuillocaties'],
        title: 'Locatie LPG-afleverzuil'
      },
      {
        layers: ['lpgafleverzuilplaatsgebondenrisico'],
        title: 'Plaatsgebonden risico (15 m)'
      }
    ],
    title: 'LPG-afleverzuilen - Risicozones',
    url: '/maps/externeveiligheid',
    noDetail: true
  },
  {
    category: THEMES.MIL_SAFETY,
    id: 'mvlpgt',
    layers: ['milieu_veiligheid_lpg_tank'],
    legendItems: [
      {
        layers: ['lpgtankligging'],
        title: 'Ligging LPG-tank'
      },
      {
        layers: ['lpgtankplaatsgebondenrisico'],
        title: 'Plaatsgebondenrisico (25/120 m)'
      },
      {
        layers: ['lpgtankinvloedsgebied', 'lpgtankplaatsgebondenrisico', 'lpgtankligging'],
        title: 'Invloedsgebied groepsrisico'
      }
    ],
    title: 'LPG-tanks - Risicozones',
    url: '/maps/externeveiligheid',
    noDetail: true
  },
  {
    category: THEMES.MIL_SAFETY,
    id: 'mvlpgs',
    layers: ['milieu_veiligheid_lpg_station'],
    legendItems: [
      {
        layers: ['lpgstationslocaties'],
        title: 'Locatie LPG-station'
      },
      {
        layers: ['lpgstationcontouren', 'lpgstationslocaties'],
        title: 'Contouren LPG-station'
      }
    ],
    title: 'LPG-stations - Risicozones',
    url: '/maps/externeveiligheid',
    noDetail: true
  },
  {
    category: THEMES.MIL_SAFETY,
    id: 'mvbr',
    layers: ['overigerisicobedrijfplaatsgebondenrisico106', 'overigerisicobedrijfsbronnen'],
    legendItems: [
      {
        layers: ['overigerisicobedrijfplaatsgebondenrisico106'],
        title: 'Plaatsgebonden risico 10-6'
      },
      {
        layers: ['overigerisicobedrijfsbronnen'],
        title: 'Bron'
      }
    ],
    title: 'Bedrijven - Bronnen en risicozones',
    url: '/maps/externeveiligheid',
    noDetail: true
  },
  {
    authScope: 'HR/R',
    category: THEMES.MIL_SAFETY,
    id: 'mvi',
    layers: ['overigerisicobedrijfinvloedsgebied'],
    legendItems: [
      { title: 'Invloedsgebied' }
    ],
    title: 'Bedrijven - Invloedsgebieden',
    url: '/maps/externeveiligheid',
    noDetail: true
  },
  {
    category: THEMES.MIL_SAFETY,
    id: 'mvbd',
    layers: ['milieu_veiligheid_bedrijf'],
    legendItems: [
      {
        layers: ['overigerisicobedrijfslocaties'],
        title: 'Bedrijf'
      },
      {
        layers: ['overigerisicobedrijfscontouren'],
        title: 'Terrein'
      }
    ],
    title: 'Bedrijven - Terreingrenzen',
    url: '/maps/externeveiligheid',
    noDetail: true
  },
  {
    category: THEMES.MIL_SAFETY,
    id: 'mvabl',
    layers: ['milieu_veiligheid_aardgasbuisleidingen'],
    legendItems: [
      {
        layers: ['milieu_veiligheid_aardgasbuisleidingen_legenda'],
        title: 'Aardgasleiding'
      },
      {
        layers: ['risicozonesaardgaspr106'],
        title: 'Plaatsgebonden risico 10-6'
      },
      {
        layers: ['risicozonesaardgas100let'],
        title: '100% Letaliteitsafstand'
      },
      {
        layers: ['risicozonesaardgas1let'],
        title: '1% Letaliteitsafstand'
      },
      {
        layers: ['risicozonesbelemmeringenstrook'],
        title: 'Belemmeringenstrook'
      }
    ],
    title: 'Aardgasbuisleidingen - Risicozones',
    url: '/maps/externeveiligheid',
    noDetail: true
  },
  {
    category: THEMES.MIL_SAFETY,
    id: 'mvsw',
    layers: ['risicozonesspoorweg'],
    legendItems: [
      {
        title: 'Invloedsgebied spoorwegen'
      }
    ],
    title: 'Spoorwegen - Risicozones',
    url: '/maps/externeveiligheid',
    noDetail: true
  },
  {
    category: THEMES.MIL_SAFETY,
    id: 'mvvw',
    layers: ['risicozonesvaarweg'],
    legendItems: [
      { title: 'Invloedsgebied vaarwegen' }
    ],
    title: 'Vaarwegen - Risicozones',
    url: '/maps/externeveiligheid',
    noDetail: true
  },
  {
    category: THEMES.MIL_SAFETY,
    id: 'mvw',
    layers: ['risicozonesweg'],
    legendItems: [
      { title: 'Invloedsgebied wegen' }
    ],
    title: 'Wegen - Risicozones',
    url: '/maps/externeveiligheid',
    noDetail: true
  },
  {
    category: THEMES.MIL_SAFETY,
    legendItems: [
      {
        id: 'mvvo',
        layers: ['milieu_veiligheid_vuurwerk'],
        title: 'Vuurwerkopslag'
      },
      {
        id: 'mvmo',
        layers: ['milieu_veiligheid_munitie'],
        title: 'Munitieopslag'
      },
      {
        id: 'mvgms',
        layers: ['milieu_veiligheid_gasdrukregel_meetstation'],
        title: 'Gasdrukregel- en meetstation'
      },
      {
        id: 'mvsls',
        layers: ['milieu_veiligheid_sluis'],
        title: 'Sluis'
      },
      {
        id: 'mvwp',
        layers: ['milieu_veiligheid_wachtplaats'],
        title: 'Wachtplaats'
      },
      {
        id: 'mvbs',
        layers: ['milieu_veiligheid_bunkerschepen'],
        title: 'Bunkerschip'
      }
    ],
    title: 'Veiligheidsafstanden',
    url: '/maps/externeveiligheid',
    noDetail: true
  },
  {
    category: THEMES.MIL_ZONES,
    id: 'mgpind',
    legendItems: [
      {
        layers: ['gezoneerdindustrieterrein'],
        title: 'Gezoneerd industrieterrein'
      },
      {
        layers: ['geluidzoneindustrieterrein'],
        title: 'Geluidzone industrieterrein'
      }
    ],
    layers: [
      'geluidzoneindustrieterrein',
      'gezoneerdindustrieterrein'
    ],
    title: 'Industrie - Geluidszones',
    url: '/maps/planologischegeluidszones',
    noDetail: true
  },
  {
    category: THEMES.MIL_ZONES,
    id: 'mgsw',
    layers: ['spoorwegen'],
    legendItems: [
      { title: 'Geluidszone spoorwegen' }
    ],
    title: 'Spoorwegen - Geluidszones',
    url: '/maps/planologischegeluidszones',
    noDetail: true
  },
  {
    category: THEMES.MIL_ZONES,
    id: 'mgpm',
    layers: ['metro'],
    legendItems: [
      { title: 'Geluidszone metro' }
    ],
    title: 'Metro - Geluidszones',
    url: '/maps/planologischegeluidszones',
    noDetail: true
  },
  {
    category: THEMES.MIL_ZONES,
    id: 'mgpsh',
    layers: ['geluidszoneschiphol'],
    legendItems: [
      { title: 'Geluidzone Schiphol (nr. 4 \'beperking gebouwen\')' },
      { title: '20 Ke contour' }
    ],
    title: 'Schiphol - Ruimtelijke beperkingen',
    url: '/maps/planologischezonesschiphol',
    noDetail: true
  },
  {
    category: THEMES.MIL_ZONES,
    id: 'mgth',
    layers: ['maatgevendetoetshoogteschiphol'],
    legendItems: [
      { title: '-10 - 0m NAP' },
      { title: '0 - 20m NAP' },
      { title: '20 - 40m NAP' },
      { title: '40 - 60m NAP' },
      { title: '60 - 80m NAP' },
      { title: '80 - 100m NAP' },
      { title: '100 - 140m NAP' },
      { title: '140m NAP' },
      { title: 'Hoger dan 140m NAP' }
    ],
    title: 'Schiphol - Maatgevende toetshoogte',
    url: '/maps/planologischezonesschiphol',
    noDetail: true
  },
  {
    category: THEMES.MIL_ZONES,
    id: 'mthr',
    layers: ['toetshoogteradarschiphol'],
    legendItems: [
      { title: '-10 - 0m NAP' },
      { title: '0 - 20m NAP' },
      { title: '20 - 40m NAP' },
      { title: '40 - 60m NAP' },
      { title: '60 - 80m NAP' },
      { title: '80 - 100m NAP' },
      { title: '100 - 140m NAP' },
      { title: '140m NAP' },
      { title: 'Hoger dan 140m NAP' }
    ],
    title: 'Schiphol - Toetshoogte i.v.m. radar',
    url: '/maps/planologischezonesschiphol',
    noDetail: true
  },
  {
    category: THEMES.MIL_ZONES,
    id: 'mgvvgsh',
    layers: ['vogelvrijwaringsgebiedschiphol'],
    legendItems: [
      { title: 'Vogelvrijwaringsgebied' }
    ],
    title: 'Schiphol - Vogelvrijwaringsgebied',
    url: '/maps/planologischezonesschiphol',
    noDetail: true
  },
  {
    category: THEMES.ECONOMY_HARBOR,
    id: 'biz',
    layers: ['biz_polygons'],
    legendItems: [
      { title: 'Bedrijfsinvesteringszone' }
    ],
    title: 'Bedrijfsinvesteringszones',
    url: '/maps/biz',
    detailUrl: 'geosearch/biz/',
    detailItem: 'biz',
    detailIsShape: true
  },
  {
    category: THEMES.ECONOMY_HARBOR,
    id: 'winkgeb',
    layers: ['winkgeb'],
    legendItems: [
      { title: 'Kernwinkelgebied' },
      { title: 'Stadsdeelcentra' },
      { title: 'Wijkcentrum groot' },
      { title: 'Wijkcentrum klein' },
      { title: 'Buurtcentrum' },
      { title: 'Locatie voor perifere winkels' },
      { title: 'Trafficlocaties' }
    ],
    title: 'Winkelgebieden',
    url: '/maps/winkgeb',
    detailUrl: 'geosearch/winkgeb/',
    detailItem: 'winkgeb',
    detailIsShape: true
  },
  {
    authScope: 'HR/R',
    category: THEMES.ECONOMY_HARBOR,
    id: 'bouw',
    layers: ['bouw', 'bouw_label'],
    legendItems: [
      { title: 'Afwerking van gebouwen' },
      { title: 'Bouwinstallatie' },
      { title: 'Bouw/utiliteitsbouw algemeen / klusbedrijf' },
      { title: 'Dak- en overige gespecialiseerde bouw' },
      { title: 'Grond, water, wegenbouw' },
      { title: 'Overige bouw' },
      { title: '(Locatie geschat)' }
    ],
    minZoom: 11,
    title: 'Vestigingen - Bouw',
    url: '/maps/handelsregister',
    detailUrl: 'handelsregister/geosearch/',
    detailItem: 'bouw'
  },
  {
    authScope: 'HR/R',
    category: THEMES.ECONOMY_HARBOR,
    id: 'csr',
    layers: ['cultuur_sport_recreatie', 'cultuur_sport_recreatie_label'],
    legendItems: [
      { title: 'Kunst' },
      { title: 'Musea, bibliotheken, kunstuitleen' },
      { title: 'Recreatie' },
      { title: 'Sport' },
      { title: '(Locatie geschat)' }
    ],
    minZoom: 11,
    title: 'Vestigingen - Cultuur, sport, recreatie',
    url: '/maps/handelsregister',
    detailUrl: 'handelsregister/geosearch/',
    detailItem: 'cultuur_sport_recreatie'
  },
  {
    authScope: 'HR/R',
    category: THEMES.ECONOMY_HARBOR,
    id: 'fdvrog',
    layers: ['financiele_dienstverlening_verhuur', 'financiele_dienstverlening_verhuur_label'],
    legendItems: [
      { title: 'Financiële dienstverlening en verzekeringen' },
      { title: 'Holdings' },
      { title: 'Verhuur van- en beheer/handel in onroerend goed' },
      { title: 'Verhuur van roerende goederen' },
      { title: '(Locatie geschat)' }
    ],
    minZoom: 11,
    title: 'Vestigingen - Financiële dienstv., verhuur van (on)roerend goed',
    url: '/maps/handelsregister',
    detailUrl: 'handelsregister/geosearch/',
    detailItem: 'financiele_dienstverlening_verhuur'
  },
  {
    authScope: 'HR/R',
    category: THEMES.ECONOMY_HARBOR,
    id: 'hvo',
    layers: ['handel_vervoer_opslag', 'handel_vervoer_opslag_label'],
    legendItems: [
      { title: 'Detailhandel (verkoop aan consumenten, niet zelf vervaardigd)' },
      { title: 'Dienstverlening vervoer' },
      { title: 'Groothandel (verkoop aan andere ondernemingen, niet zelf vervaardigd)' },
      { title: 'Handel en reparatie van auto\'s' },
      { title: 'Handelsbemiddeling (tussenpersoon, verkoopt niet zelf)' },
      { title: 'Opslag' },
      { title: 'Vervoer' },
      { title: '(Locatie geschat)' }
    ],
    minZoom: 11,
    title: 'Vestigingen - Handel, vervoer, opslag',
    url: '/maps/handelsregister',
    detailUrl: 'handelsregister/geosearch/',
    detailItem: 'handel_vervoer_opslag'
  },
  {
    authScope: 'HR/R',
    category: THEMES.ECONOMY_HARBOR,
    id: 'hrc',
    layers: ['horeca', 'horeca_label'],
    legendItems: [
      { title: 'Café' },
      { title: 'Cafetaria, snackbar, ijssalon' },
      { title: 'Hotel, pension' },
      { title: 'Hotel-restaurant' },
      { title: 'Kantine, catering' },
      { title: 'Restaurant, café-restaurant' },
      { title: 'Overige horeca' },
      { title: '(Locatie geschat)' }
    ],
    minZoom: 11,
    title: 'Vestigingen - Horeca',
    url: '/maps/handelsregister',
    detailUrl: 'handelsregister/geosearch/',
    detailItem: 'horeca'
  },
  {
    authScope: 'HR/R',
    category: THEMES.ECONOMY_HARBOR,
    id: 'itc',
    layers: ['telecommunicatie', 'telecommunicatie_label'],
    legendItems: [
      { title: 'Activiteiten op gebied van film, tv, radio, audio' },
      { title: 'Activiteiten op het gebied van ict' },
      { title: 'Telecommunicatie' },
      { title: 'Uitgeverijen' },
      { title: '(Locatie geschat)' }
    ],
    minZoom: 11,
    title: 'Vestigingen - Informatie, telecommunicatie',
    url: '/maps/handelsregister',
    detailUrl: 'handelsregister/geosearch/',
    detailItem: 'informatie_telecommunicatie'
  },
  {
    authScope: 'HR/R',
    category: THEMES.ECONOMY_HARBOR,
    id: 'lb',
    layers: ['landbouw', 'landbouw_label'],
    legendItems: [
      { title: 'Dienstverlening voor de land/tuinbouw' },
      { title: 'Fokken, houden dieren' },
      { title: 'Gemengd bedrijf' },
      { title: 'Teelt eenjarige gewassen' },
      { title: 'Teelt meerjarige gewassen' },
      { title: 'Teelt sierplanten' },
      { title: '(Locatie geschat)' }
    ],
    minZoom: 11,
    title: 'Vestigingen - Landbouw',
    url: '/maps/handelsregister',
    detailUrl: 'handelsregister/geosearch/',
    detailItem: 'landbouw'
  },
  {
    authScope: 'HR/R',
    category: THEMES.ECONOMY_HARBOR,
    id: 'ooz',
    layers: ['overheid_onderwijs_zorg', 'overheid_onderwijs_zorg_label'],
    legendItems: [
      { title: 'Gezondheids- en welzijnszorg' },
      { title: 'Onderwijs' },
      { title: 'Overheid' },
      { title: '(Locatie geschat)' }
    ],
    minZoom: 11,
    title: 'Vestigingen - Overheid, onderwijs, zorg',
    url: '/maps/handelsregister',
    detailUrl: 'handelsregister/geosearch/',
    detailItem: 'overheid_onderwijs_zorg'
  },
  {
    authScope: 'HR/R',
    category: THEMES.ECONOMY_HARBOR,
    id: 'pd',
    layers: ['persoonlijke_dienstverlening', 'persoonlijke_dienstverlening_label'],
    legendItems: [
      { title: 'Kappers' },
      { title: 'Sauna, solaria' },
      { title: 'Schoonheidsverzorging' },
      { title: 'Uitvaart, crematoria' },
      { title: 'Overige dienstverlening' },
      { title: '(Locatie geschat)' }
    ],
    minZoom: 11,
    title: 'Vestigingen - Persoonlijke dienstverlening',
    url: '/maps/handelsregister',
    detailUrl: 'handelsregister/geosearch/',
    detailItem: 'persoonlijke_dienstverlening'
  },
  {
    authScope: 'HR/R',
    category: THEMES.ECONOMY_HARBOR,
    id: 'pir',
    layers: ['productie_installatie_reparatie', 'productie_installatie_reparatie_label'],
    legendItems: [
      { title: 'Installatie (geen bouw)' },
      { title: 'Productie' },
      { title: 'Reparatie (geen bouw)' },
      { title: '(Locatie geschat)' }
    ],
    minZoom: 11,
    title: 'Vestigingen - Productie, installatie, reparatie',
    url: '/maps/handelsregister',
    detailUrl: 'handelsregister/geosearch/',
    detailItem: 'productie_installatie_reparatie'
  },
  {
    authScope: 'HR/R',
    category: THEMES.ECONOMY_HARBOR,
    id: 'zd',
    layers: ['zakelijke_dienstverlening'],
    legendItems: [
      { title: 'Accountancy, administratie' },
      { title: 'Advocaten rechtskundige diensten, notarissen' },
      { title: 'Arbeidsbemiddeling, uitzendbureaus, uitleenbureaus' },
      { title: 'Architecten' },
      { title: 'Design' },
      { title: 'Interieurarchitecten' },
      { title: 'Managementadvies, economisch advies' },
      { title: 'Public relationsbureaus' },
      { title: 'Reclame en Marktonderzoek' },
      { title: 'Technisch ontwerp, advies, keuring/research' },
      { title: 'Overige zakelijke dienstverlening' },
      { title: '(Locatie geschat)' }
    ],
    minZoom: 11,
    title: 'Vestigingen - Zakelijke dienstverlening',
    url: '/maps/handelsregister',
    detailUrl: 'handelsregister/geosearch/',
    detailItem: 'zakelijke_dienstverlening'
  },
  {
    authScope: 'HR/R',
    category: THEMES.ECONOMY_HARBOR,
    id: 'ovrg',
    layers: ['overige', 'overige_label'],
    legendItems: [
      { title: 'Belangenorganisaties' },
      { title: 'Hobbyclubs' },
      { title: 'Ideële organisaties' },
      { title: 'Overige' },
      { title: '(Locatie geschat)' }
    ],
    minZoom: 11,
    title: 'Vestigingen - Overige',
    url: '/maps/handelsregister',
    detailUrl: 'handelsregister/geosearch/',
    detailItem: 'overige'
  },
  {
    authScope: 'GREX/R',
    id: 'grexProjecten',
    category: THEMES.URBAN,
    layers: ['grondexploitatie_polygons'],
    legendItems: [
      { title: 'Actueel' },
      { title: 'Toekomstig' }
    ],
    title: 'Grondexploitaties - Projecten',
    url: '/maps/grondexploitatie',
    detailUrl: 'geosearch/search/',
    detailItem: 'grondexploitatie',
    detailIsShape: true
  },
  {
    authScope: 'GREX/R',
    id: 'grexStadsdelen',
    category: THEMES.URBAN,
    layers: ['stadsdeel_polygons'],
    legendItems: [
      {
        title: 'Totale begroting baten',
        iconUrl: '/assets/images/map-legend/icon-grex-stadsdeel.svg'
      }
    ],
    title: 'Grondexploitaties - Stadsdelen',
    url: '/maps/grondexploitatie',
    detailUrl: 'geosearch/search/',
    detailItem: 'stadsdeel',
    detailIsShape: true
  }
];

export const mapPanelLayers = ([
  ...mapLayers.map(({
    authScope,
    category,
    disabled,
    id = false,
    layers = [],
    legendItems,
    maxZoom = MAP_CONFIG.MAX_ZOOM,
    minZoom = MAP_CONFIG.MIN_ZOOM,
    noDetail,
    title,
    url
  }) => ({
    authScope,
    category,
    disabled,
    id,
    layers,
    legendItems: [
      ...legendItems.map((legendItem) => ({
        ...legendItem,
        selectable: (!!legendItem.id),
        noDetail: (!!noDetail || !!legendItem.noDetail)
      }))
    ],
    maxZoom,
    minZoom,
    noDetail,
    title,
    url
  }))
]);

export default [
  ...mapLayers.map((mapLayer) => (Object.prototype.hasOwnProperty.call(mapLayer, 'id')
      ? mapLayer
      : mapLayer.legendItems.map((legendItem) => (Object.prototype.hasOwnProperty.call(legendItem, 'id')
          ? ({
            layers: mapLayer.layers,
            url: mapLayer.url,
            detailUrl: mapLayer.detailUrl,
            detailItem: mapLayer.detailItem,
            detailIsShape: mapLayer.detailIsShape,
            minZoom: mapLayer.minZoom,
            ...legendItem
          })
          : null
      ))
  ))
].reduce((acc, val) => acc.concat(val), []); // Alternative to .flat()
/* eslint-enable max-len */
