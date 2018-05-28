export default [
  {
    id: 'biz',
    url: 'maps/biz',
    layers: ['biz_polygons'],
    detailUrl: 'geosearch/biz/', // Geosearch URL
    detailItem: 'biz', // Not needed for this API endpoint, but needed to trigger nearest detail on click...
    detailIsShape: true
  },
  {
    id: 'hvo',
    authScope: 'HR/R',
    url: 'maps/handelsregister',
    layers: ['handel_vervoer_opslag', 'handel_vervoer_opslag_label'],
    detailUrl: 'handelsregister/geosearch/',
    detailItem: 'handel_vervoer_opslag'
  },
  {
    id: 'pir',
    authScope: 'HR/R',
    url: 'maps/handelsregister',
    layers: ['productie_installatie_reparatie', 'productie_installatie_reparatie_label'],
    detailUrl: 'handelsregister/geosearch/',
    detailItem: 'productie_installatie_reparatie'
  },
  {
    id: 'bouw',
    authScope: 'HR/R',
    url: 'maps/handelsregister',
    layers: ['bouw', 'bouw_label'],
    detailUrl: 'handelsregister/geosearch/',
    detailItem: 'bouw'
  },
  {
    id: 'lb',
    authScope: 'HR/R',
    url: 'maps/handelsregister',
    layers: ['landbouw', 'landbouw_label'],
    detailUrl: 'handelsregister/geosearch/',
    detailItem: 'landbouw'
  },
  {
    id: 'hrc',
    authScope: 'HR/R',
    url: 'maps/handelsregister',
    layers: ['horeca', 'horeca_label'],
    detailUrl: 'handelsregister/geosearch/',
    detailItem: 'horeca'
  },
  {
    id: 'itc',
    authScope: 'HR/R',
    url: 'maps/handelsregister',
    layers: ['telecommunicatie', 'telecommunicatie_label'],
    detailUrl: 'handelsregister/geosearch/',
    detailItem: 'informatie_telecommunicatie'
  },
  {
    id: 'fdvrog',
    authScope: 'HR/R',
    url: 'maps/handelsregister',
    layers: ['financiele_dienstverlening_verhuur', 'financiele_dienstverlening_verhuur_label'],
    detailUrl: 'handelsregister/geosearch/',
    detailItem: 'financiele_dienstverlening_verhuur'
  },
  {
    id: 'zd',
    authScope: 'HR/R',
    url: 'maps/handelsregister',
    layers: ['zakelijke_dienstverlening', 'zakelijke_dienstverlening_label'],
    detailUrl: 'handelsregister/geosearch/',
    detailItem: 'zakelijke_dienstverlening'
  },
  {
    id: 'ooz',
    authScope: 'HR/R',
    url: 'maps/handelsregister',
    layers: ['overheid_onderwijs_zorg', 'overheid_onderwijs_zorg_label'],
    detailUrl: 'handelsregister/geosearch/',
    detailItem: 'overheid_onderwijs_zorg'
  },
  {
    id: 'csr',
    authScope: 'HR/R',
    url: 'maps/handelsregister',
    layers: ['cultuur_sport_recreatie', 'cultuur_sport_recreatie_label'],
    detailUrl: 'handelsregister/geosearch/',
    detailItem: 'cultuur_sport_recreatie'
  },
  {
    id: 'csr',
    authScope: 'HR/R',
    url: 'maps/handelsregister',
    layers: ['cultuur_sport_recreatie', 'cultuur_sport_recreatie_label'],
    detailUrl: 'handelsregister/geosearch/',
    detailItem: 'cultuur_sport_recreatie'
  },
  {
    id: 'pd',
    authScope: 'HR/R',
    url: 'maps/handelsregister',
    layers: ['persoonlijke_dienstverlening', 'persoonlijke_dienstverlening_label'],
    detailUrl: 'handelsregister/geosearch/',
    detailItem: 'persoonlijke_dienstverlening'
  },
  {
    id: 'ovrg',
    authScope: 'HR/R',
    url: 'maps/handelsregister',
    layers: ['overige', 'overige_label'],
    detailUrl: 'handelsregister/geosearch/',
    detailItem: 'overige'
  },
  {
    id: 'kadaster',
    url: 'maps/brk?service=wms',
    layers: ['kadaster']
  },
  {
    id: 'bgem',
    url: 'maps/brk?service=wms',
    layers: ['burgerlijke_gemeente', 'burgerlijke_gemeente_label'],
    noDetail: true
  },
  {
    id: 'kgem',
    url: 'maps/brk?service=wms',
    layers: ['kadastrale_gemeente', 'kadastrale_gemeente_label'],
    noDetail: true
  },
  {
    id: 'ksec',
    url: 'maps/brk?service=wms',
    layers: ['kadastrale_sectie', 'kadastrale_sectie_label'],
    noDetail: true
  },
  {
    id: 'kot',
    url: 'maps/brk?service=wms',
    layers: ['kadastraal_object', 'kadastraal_object_label'],
    detailUrl: 'geosearch/search/',
    detailItem: 'kadastraal_object',
    detailIsShape: true
  },
  {
    id: 'gbep',
    url: 'maps/wkpb',
    layers: ['wkpb']
  },
  // geografie: gebieden
  {
    id: 'gsg',
    url: 'maps/gebieden?service=wms',
    layers: ['grootstedelijkgebied', 'grootstedelijkgebied_label']
  },
  {
    id: 'unesco',
    url: 'maps/gebieden?service=wms',
    layers: ['unesco', 'unesco_label']
  },
  {
    id: 'sd',
    url: 'maps/gebieden?service=wms',
    layers: ['stadsdeel', 'stadsdeel_label']
  },
  {
    id: 'ggw',
    url: 'maps/gebieden?service=wms',
    layers: ['gebiedsgerichtwerken', 'gebiedsgerichtwerken_label']
  },
  {
    id: 'bc',
    url: 'maps/gebieden?service=wms',
    layers: ['buurtcombinatie', 'buurtcombinatie_label']
  },
  {
    id: 'buurt',
    url: 'maps/gebieden?service=wms',
    layers: ['buurt', 'buurt_label']
  },
  {
    id: 'grex',
    authScope: 'GREX/R',
    url: 'maps/grondexploitatie?service=wms',
    layers: ['grondexploitatie_polygons'],
    detailUrl: 'geosearch/search/', // Geosearch URL
    detailItem: 'grondexploitatie', // Geosearch name
    detailIsShape: true
  },
  {
    id: 'bbn',
    url: 'maps/gebieden?service=wms',
    layers: ['bouwblok', 'bouwblok_label'],
    detailUrl: 'geosearch/search/',
    detailItem: 'bouwblok',
    detailIsShape: true
  },
  // geografie: hoogte
  {
    id: 'dsm',
    url: 'https://geodata.nationaalgeoregister.nl/ahn3/wms?',
    layers: ['ahn3_05m_dsm'],
    external: true,
    noDetail: true
  },
  {
    id: 'dtm',
    url: 'https://geodata.nationaalgeoregister.nl/ahn3/wms?',
    layers: ['ahn3_05m_dtm'],
    external: true,
    noDetail: true
  },
  {
    id: 'nap',
    url: 'maps/nap',
    layers: ['peilmerk_hoogte', 'peilmerk_label'],
    detailUrl: 'geosearch/search/',
    detailItem: 'peilmerk'
  },
  {
    id: 'mbs',
    url: 'maps/meetbouten?service=wms',
    layers: ['meetbouten_status', 'meetbouten_labels'],
    detailUrl: 'geosearch/search/',
    detailItem: 'meetbout'
  },
  {
    id: 'mbz',
    url: 'maps/meetbouten?service=wms',
    layers: ['meetbouten_zaksnelheid', 'meetbouten_labels'],
    detailUrl: 'geosearch/search/',
    detailItem: 'meetbout'
  },
  {
    id: 'mbr',
    url: 'maps/meetbouten',
    layers: ['referentiepunten'],
    noDetail: true
  },

  // milieu bodem
  {
    id: 'mbgm',
    url: 'maps/bodem',
    layers: ['grondmonsters'],
    noDetail: true
  },
  {
    id: 'mbgwm',
    url: 'maps/bodem',
    layers: ['grondwatermonsters'],
    noDetail: true
  },
  {
    id: 'mbaig',
    url: 'maps/bodem',
    layers: ['asbest'],
    noDetail: true
  },
  {
    id: 'exin',
    url: 'maps/bommenkaart',
    layers: ['inslagen'],
    detailUrl: 'geosearch/search/',
    detailItem: 'bominslag'
  },
  {
    id: 'exvg',
    url: 'maps/bommenkaart',
    layers: ['verdachte_gebieden']
  },
  {
    id: 'exgg',
    url: 'maps/bommenkaart',
    layers: ['gevrijwaarde_gebieden']
  },
  {
    id: 'exuo',
    url: 'maps/bommenkaart',
    layers: ['uitgevoerde_CE_onderzoeken']
  },
  // milieu: veiligheid
  {
    id: 'mvlpgv',
    url: 'maps/externeveiligheid',
    layers: [
      'lpgvulpuntinvloedsgebied',
      'lpgvulpuntplaatsgebondenrisico106',
      'lpgvulpuntplaatsgebondenrisico105',
      'lpgvulpuntlocaties'
    ],
    noDetail: true
  },
  {
    id: 'mvlpga',
    url: 'maps/externeveiligheid',
    layers: ['milieu_veiligheid_lpg_afleverzuil'],
    noDetail: true
  },
  {
    id: 'mvlpgt',
    url: 'maps/externeveiligheid',
    layers: ['lpgtankinvloedsgebied', 'lpgtankplaatsgebondenrisico', 'lpgtankligging'],
    noDetail: true
  },
  {
    id: 'mvlpgs',
    url: 'maps/externeveiligheid',
    layers: ['lpgstationcontouren', 'lpgstationslocaties'],
    noDetail: true
  },
  {
    id: 'mvbr',
    url: 'maps/externeveiligheid',
    layers: ['overigerisicobedrijfsbronnen', 'overigerisicobedrijfplaatsgebondenrisico106'],
    noDetail: true
  },
  {
    id: 'mvi',
    authScope: 'HR/R',
    url: 'maps/externeveiligheid',
    layers: ['overigerisicobedrijfinvloedsgebied'],
    noDetail: true
  },
  {
    id: 'mvbd',
    url: 'maps/externeveiligheid',
    layers: ['milieu_veiligheid_bedrijf'],
    noDetail: true
  },
  {
    id: 'mvabl',
    url: 'maps/externeveiligheid',
    layers: ['milieu_veiligheid_aardgasbuisleidingen'],
    noDetail: true
  },
  {
    id: 'mvsw',
    url: 'maps/externeveiligheid',
    layers: ['risicozonesspoorweg'],
    noDetail: true
  },
  {
    id: 'mvvw',
    url: 'maps/externeveiligheid',
    layers: ['risicozonesvaarweg'],
    noDetail: true
  },
  {
    id: 'mvw',
    url: 'maps/externeveiligheid',
    layers: ['risicozonesweg'],
    noDetail: true
  },
  {
    id: 'mvvo',
    url: 'maps/externeveiligheid',
    layers: ['milieu_veiligheid_vuurwerk'],
    noDetail: true
  },
  {
    id: 'mvmo',
    url: 'maps/externeveiligheid',
    layers: ['milieu_veiligheid_munitie'],
    noDetail: true
  },
  {
    id: 'mvgms',
    url: 'maps/externeveiligheid',
    layers: ['milieu_veiligheid_gasdrukregel_meetstation'],
    noDetail: true
  },
  {
    id: 'mvsls',
    url: 'maps/externeveiligheid',
    layers: ['milieu_veiligheid_sluis'],
    noDetail: true
  },
  {
    id: 'mvwp',
    url: 'maps/externeveiligheid',
    layers: ['milieu_veiligheid_wachtplaats'],
    noDetail: true
  },
  {
    id: 'mvbs',
    url: 'maps/externeveiligheid',
    layers: ['milieu_veiligheid_bunkerschepen'],
    noDetail: true
  },
  // milieu zones
  {
    id: 'mgpind',
    url: 'maps/planologischegeluidszones',
    layers: [
      'geluidzoneindustrieterrein',
      'gezoneerdindustrieterrein'
    ],
    noDetail: true
  },
  {
    id: 'mgsw',
    url: 'maps/planologischegeluidszones',
    layers: ['spoorwegen'],
    noDetail: true
  },
  {
    id: 'mgpm',
    url: 'maps/planologischegeluidszones',
    layers: ['metro'],
    noDetail: true
  },
  {
    id: 'mgpsh',
    url: 'maps/planologischezonesschiphol',
    layers: ['geluidszoneschiphol'],
    noDetail: true
  },
  {
    id: 'mgth',
    url: 'maps/planologischezonesschiphol',
    layers: ['maatgevendetoetshoogteschiphol'],
    noDetail: true
  },
  {
    id: 'mthr',
    url: 'maps/planologischezonesschiphol',
    layers: ['toetshoogteradarschiphol'],
    noDetail: true
  },
  {
    id: 'mgvvgsh',
    url: 'maps/planologischezonesschiphol',
    layers: ['vogelvrijwaringsgebiedschiphol'],
    noDetail: true
  },
  // Openbare orde en veiligheid
  {
    id: 'oovoalg',
    url: 'maps/overlastgebieden',
    layers: ['algemeen_overlastgebied', 'algemeen_overlastgebied_label']
  },
  {
    id: 'oovodlrs',
    url: 'maps/overlastgebieden',
    layers: ['dealeroverlastgebied', 'dealeroverlastgebied_label']
  },
  {
    id: 'oovouitg',
    url: 'maps/overlastgebieden',
    layers: ['uitgaansoverlastgebied', 'uitgaansoverlastgebied_label']
  },
  {
    id: 'oovctg',
    url: 'maps/overlastgebieden',
    layers: ['cameratoezichtgebied', 'cameratoezichtgebied_label']
  },
  // Toerisme en cultuur
  {
    id: 'tcmnmt',
    url: 'maps/monumenten',
    layers: ['monumenten'],
    detailUrl: 'geosearch/search/',
    detailItem: 'monument'
  },
  // Verkeer
  {
    id: 'trm',
    url: 'maps/trm',
    layers: ['tramlijnen'],
    noDetail: true
  },
  {
    id: 'mtr',
    url: 'maps/trm',
    layers: ['metrolijnen'],
    noDetail: true
  },
  {
    id: 'pv',
    url: 'maps/parkeervakken',
    layers: ['alle_parkeervakken', 'parkeervakken_label'],
    noDetail: true
  },
  {
    id: 'pvb',
    url: 'maps/parkeervakken',
    layers: ['alle_parkeervakken', 'parkeervakken_bord'],
    noDetail: true
  },
  {
    id: 'pvr',
    url: 'maps/parkeervakken',
    layers: ['parkeervakken_reservering', 'parkeervakken_reservering_label'],
    noDetail: true
  },
  {
    id: 'pr',
    url: 'maps/reistijdenauto',
    layers: ['reistijdenauto'],
    noDetail: true
  },
  // Panoramabeelden
  {
    id: 'pano',
    url: 'maps/panorama',
    layers: ['panorama_recent']
  },
  {
    id: 'pano2016',
    url: 'maps/panorama',
    layers: ['panorama_recent_2016']
  },
  {
    id: 'pano2017',
    url: 'maps/panorama',
    layers: ['panorama_recent_2017']
  },
  {
    id: 'pano2018',
    url: 'maps/panorama',
    layers: ['panorama_recent_2018']
  },
  {
    id: 'pano2019',
    url: 'maps/panorama',
    layers: ['panorama_recent_2019']
  },
  {
    id: 'pano2020',
    url: 'maps/panorama',
    layers: ['panorama_recent_2020']
  }
];