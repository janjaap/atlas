const SOURCES = {
  // overige niet gebruikt op dit moment
  bpl: {
    label_short: 'Bestemmingsplannen',
    label_long: 'Bestemmingsplannen',
    url: 'http://afnemers.ruimtelijkeplannen.nl/afnemers/services',
    layers: ['BP:HuidigeBestemming'],
    minZoom: 8,
    maxZoom: 16,
    legend: 'http://www.ruimtelijkeplannen.nl/web-theme2.0/images/mapviewer/legend.png',
    external: true
  },
  pan2012: {
    url: 'maps/panorama',
    label_short: 'Straatbeeld rijlijnen 2012',
    label_long: 'Straatbeeld rijlijnen 2012',
    layers: ['panorama'],
    minZoom: 11,
    maxZoom: 16,
    legend: 'maps/panorama?version=1.3.0&service=WMS&request=GetLe' +
    'gendGraphic&sld_version=1.1.0&layer=panorama_punt&format=image/png&STYLE=default'
  },

  // economie
  biz: {
    url: 'maps/biz',
    label_short: 'Bedrijfsinvesteringszones',
    label_long: 'Bedrijfsinvesteringszones',
    layers: ['biz_polygons'],
    minZoom: 8,
    maxZoom: 16,
    legend: 'maps/biz?version=1.3.0&service=WMS&request=GetLegend' +
    'Graphic&sld_version=1.1.0&layer=biz_polygons&format=image/png&STYLE=default',
    detailUrl: 'geosearch/biz/', // Geosearch URL
    detailItem: 'biz', // Not needed for this API endpoint,
                       // but needed to trigger nearest detail on click...
    detailIsShape: true
  },
  hvo: {
    authScope: 'HR/R',
    url: 'maps/handelsregister',
    label_short: 'Handel, vervoer, opslag',
    label_long: 'Handel, vervoer, opslag',
    layers: ['handel_vervoer_opslag', 'handel_vervoer_opslag_label'],
    minZoom: 11,
    maxZoom: 16,
    legend: 'maps/handelsregister?version=1.3.0&service=WMS&request=GetLe' +
    'gendGraphic&sld_version=1.1.0&layer=handel_vervoer_opslag&format=image/png&STYLE=default',
    detailUrl: 'handelsregister/geosearch/',
    detailItem: 'handel_vervoer_opslag'
  },
  pir: {
    authScope: 'HR/R',
    url: 'maps/handelsregister',
    label_short: 'Productie, installatie, reparatie',
    label_long: 'Productie, installatie, reparatie',
    layers: ['productie_installatie_reparatie', 'productie_installatie_reparatie_label'],
    minZoom: 11,
    maxZoom: 16,
    legend: 'maps/handelsregister?version=1.3.0&service=WMS&request=GetLe' +
    'gendGraphic&sld_version=1.1.0&' +
    'layer=productie_installatie_reparatie&format=image/png&STYLE=default',
    detailUrl: 'handelsregister/geosearch/',
    detailItem: 'productie_installatie_reparatie'
  },
  bouw: {
    authScope: 'HR/R',
    url: 'maps/handelsregister',
    label_short: 'Bouw',
    label_long: 'Bouw',
    layers: ['bouw', 'bouw_label'],
    minZoom: 11,
    maxZoom: 16,
    legend: 'maps/handelsregister?version=1.3.0&service=WMS&request=GetLe' +
    'gendGraphic&sld_version=1.1.0&layer=bouw&format=image/png&STYLE=default',
    detailUrl: 'handelsregister/geosearch/',
    detailItem: 'bouw'
  },
  lb: {
    authScope: 'HR/R',
    url: 'maps/handelsregister',
    label_short: 'Landbouw',
    label_long: 'Landbouw',
    layers: ['landbouw', 'landbouw_label'],
    minZoom: 11,
    maxZoom: 16,
    legend: 'maps/handelsregister?version=1.3.0&service=WMS&request=GetLe' +
    'gendGraphic&sld_version=1.1.0&layer=landbouw&format=image/png&STYLE=default',
    detailUrl: 'handelsregister/geosearch/',
    detailItem: 'landbouw'
  },
  hrc: {
    authScope: 'HR/R',
    url: 'maps/handelsregister',
    label_short: 'Horeca',
    label_long: 'Horeca',
    layers: ['horeca', 'horeca_label'],
    minZoom: 11,
    maxZoom: 16,
    legend: 'maps/handelsregister?version=1.3.0&service=WMS&request=GetLe' +
    'gendGraphic&sld_version=1.1.0&layer=horeca&format=image/png&STYLE=default',
    detailUrl: 'handelsregister/geosearch/',
    detailItem: 'horeca'
  },
  itc: {
    authScope: 'HR/R',
    url: 'maps/handelsregister',
    label_short: 'Informatie, telecommunicatie',
    label_long: 'Informatie, telecommunicatie',
    layers: ['telecommunicatie', 'telecommunicatie_label'],
    minZoom: 11,
    maxZoom: 16,
    legend: 'maps/handelsregister?version=1.3.0&service=WMS&request=GetLe' +
    'gendGraphic&sld_version=1.1.0&layer=telecommunicatie&format=image/png&STYLE=default',
    detailUrl: 'handelsregister/geosearch/',
    detailItem: 'informatie_telecommunicatie'
  },
  fdvrog: {
    authScope: 'HR/R',
    url: 'maps/handelsregister',
    label_short: 'Financiële dienstverl., verhuur',
    label_long: 'Financiële dienstverlening, verhuur van roerend en onroerend goed',
    layers: ['financiele_dienstverlening_verhuur', 'financiele_dienstverlening_verhuur_label'],
    minZoom: 11,
    maxZoom: 16,
    legend: 'maps/handelsregister?version=1.3.0&service=WMS&request=GetLe' +
    'gendGraphic&sld_version=1.1.0&' +
    'layer=financiele_dienstverlening_verhuur' +
    '&format=image/png&STYLE=default',
    detailUrl: 'handelsregister/geosearch/',
    detailItem: 'financiele_dienstverlening_verhuur'
  },
  zd: {
    authScope: 'HR/R',
    url: 'maps/handelsregister',
    label_short: 'Zakelijke dienstverlening',
    label_long: 'Zakelijke dienstverlening',
    layers: ['zakelijke_dienstverlening', 'zakelijke_dienstverlening_label'],
    minZoom: 11,
    maxZoom: 16,
    legend: 'maps/handelsregister?version=1.3.0&service=WMS&request=GetLe' +
    'gendGraphic&sld_version=1.1.0&layer=zakelijke_dienstverlening&format=image/png&STYLE=default',
    detailUrl: 'handelsregister/geosearch/',
    detailItem: 'zakelijke_dienstverlening'
  },
  ooz: {
    authScope: 'HR/R',
    url: 'maps/handelsregister',
    label_short: 'Overheid, onderwijs, zorg',
    label_long: 'Overheid, onderwijs, zorg',
    layers: ['overheid_onderwijs_zorg', 'overheid_onderwijs_zorg_label'],
    minZoom: 11,
    maxZoom: 16,
    legend: 'maps/handelsregister?version=1.3.0&service=WMS&request=GetLe' +
    'gendGraphic&sld_version=1.1.0&layer=overheid_onderwijs_zorg&format=image/png&STYLE=default',
    detailUrl: 'handelsregister/geosearch/',
    detailItem: 'overheid_onderwijs_zorg'
  },
  csr: {
    authScope: 'HR/R',
    url: 'maps/handelsregister',
    label_short: 'Cultuur, sport, recreatie',
    label_long: 'Cultuur, sport, recreatie',
    layers: ['cultuur_sport_recreatie', 'cultuur_sport_recreatie_label'],
    minZoom: 11,
    maxZoom: 16,
    legend: 'maps/handelsregister?version=1.3.0&service=WMS&request=GetLe' +
    'gendGraphic&sld_version=1.1.0&layer=cultuur_sport_recreatie&format=image/png&STYLE=default',
    detailUrl: 'handelsregister/geosearch/',
    detailItem: 'cultuur_sport_recreatie'
  },
  pd: {
    authScope: 'HR/R',
    url: 'maps/handelsregister',
    label_short: 'Persoonlijke dienstverlening',
    label_long: 'Persoonlijke dienstverlening',
    layers: ['persoonlijke_dienstverlening', 'persoonlijke_dienstverlening_label'],
    minZoom: 11,
    maxZoom: 16,
    legend: 'maps/handelsregister?version=1.3.0&service=WMS&request=GetLe' +
    'gendGraphic&sld_version=1.1.0&' +
    'layer=persoonlijke_dienstverlening&format=image/png&STYLE=default',
    detailUrl: 'handelsregister/geosearch/',
    detailItem: 'persoonlijke_dienstverlening'
  },
  ovrg: {
    authScope: 'HR/R',
    url: 'maps/handelsregister',
    label_short: 'Overige',
    label_long: 'Overige',
    layers: ['overige', 'overige_label'],
    minZoom: 11,
    maxZoom: 16,
    legend: 'maps/handelsregister?version=1.3.0&service=WMS&request=GetLe' +
    'gendGraphic&sld_version=1.1.0&layer=overige&format=image/png&STYLE=default',
    detailUrl: 'handelsregister/geosearch/',
    detailItem: 'overige'
  },

  // onroerende zaken
  kadaster: {
    url: 'maps/brk?service=wms',
    label_short: 'Kadastrale perceelgrenzen',
    label_long: 'Kadastrale perceelgrenzen',
    layers: ['kadaster'],
    minZoom: 8,
    maxZoom: 16,
    legend: 'maps/brk?version=1.3.0&service=WMS&request=GetLegend' +
    'Graphic&sld_version=1.1.0&layer=kadaster&format=image/png&STYLE=default'
  },
  bgem: {
    url: 'maps/brk?service=wms',
    label_short: 'Burgerlijke gemeenten',
    label_long: 'Burgerlijke gemeenten',
    parent_label: 'Kadastrale perceelsgrenzen',
    layers: ['burgerlijke_gemeente', 'burgerlijke_gemeente_label'],
    minZoom: 8,
    maxZoom: 16,
    legend: 'maps/brk?version=1.3.0&service=WMS&request=GetLegend' +
    'Graphic&sld_version=1.1.0&layer=burgerlijke_gemeente&format=image/png&STYLE=default',
    noDetail: true
  },
  kgem: {
    url: 'maps/brk?service=wms',
    label_short: 'Kadastrale gemeenten',
    label_long: 'Kadastrale gemeenten',
    parent_label: 'Kadastrale perceelsgrenzen',
    layers: ['kadastrale_gemeente', 'kadastrale_gemeente_label'],
    minZoom: 8,
    maxZoom: 16,
    legend: 'maps/brk?version=1.3.0&service=WMS&request=GetLegend' +
    'Graphic&sld_version=1.1.0&layer=kadastrale_gemeente&format=image/png&STYLE=default',
    noDetail: true
  },
  ksec: {
    url: 'maps/brk?service=wms',
    label_short: 'Kadastrale secties',
    label_long: 'Kadastrale secties',
    parent_label: 'Kadastrale perceelsgrenzen',
    layers: ['kadastrale_sectie', 'kadastrale_sectie_label'],
    minZoom: 8,
    maxZoom: 16,
    legend: 'maps/brk?version=1.3.0&service=WMS&request=GetLegend' +
    'Graphic&sld_version=1.1.0&layer=kadastrale_sectie&format=image/png&STYLE=default',
    noDetail: true
  },
  kot: {
    url: 'maps/brk?service=wms',
    label_short: 'Kadastrale objecten',
    label_long: 'Kadastrale objecten',
    parent_label: 'Kadastrale perceelsgrenzen',
    layers: ['kadastraal_object', 'kadastraal_object_label'],
    minZoom: 8,
    maxZoom: 16,
    legend: 'maps/brk?version=1.3.0&service=WMS&request=GetLegend' +
    'Graphic&sld_version=1.1.0&layer=kadastraal_object&format=image/png&STYLE=default',
    detailUrl: 'geosearch/search/',
    detailItem: 'kadastraal_object',
    detailIsShape: true
  },
  gbep: {
    url: 'maps/wkpb',
    label_short: 'Gemeentelijke beperkingen',
    label_long: 'Gemeentelijke beperkingen (WKPB)',
    layers: ['wkpb'],
    minZoom: 13,
    maxZoom: 16,
    legend: 'maps/wkpb?version=1.3.0&service=WMS&request=GetLegend' +
    'Graphic&sld_version=1.1.0&layer=wkpb&format=image/png&STYLE=default'
  },

  // geografie: gebieden
  gsg: {
    url: 'maps/gebieden?service=wms',
    label_short: 'Grootstedelijke gebieden',
    label_long: 'Grootstedelijke gebieden',
    layers: ['grootstedelijkgebied', 'grootstedelijkgebied_label'],
    minZoom: 8,
    maxZoom: 16,
    legend: 'maps/gebieden?version=1.3.0&service=WMS&request=GetLegend' +
    'Graphic&sld_version=1.1.0&layer=grootstedelijkgebied&format=image/png&STYLE=default'
  },
  unesco: {
    url: 'maps/gebieden?service=wms',
    label_short: 'Unesco werelderfgoedzones',
    label_long: 'Unesco werelderfgoedzones',
    layers: ['unesco', 'unesco_label'],
    minZoom: 10,
    maxZoom: 16,
    legend: 'maps/gebieden?version=1.3.0&service=WMS&request=GetLe' +
    'gendGraphic&sld_version=1.1.0&layer=unesco&format=image/png&STYLE=default'
  },
  sd: {
    url: 'maps/gebieden?service=wms',
    label_short: 'Stadsdelen',
    label_long: 'Stadsdelen',
    parent_label: 'Bestuurlijke gebieden',
    layers: ['stadsdeel', 'stadsdeel_label'],
    minZoom: 8,
    maxZoom: 16,
    legend: 'maps/gebieden?version=1.3.0&service=WMS&request=GetLegend' +
    'Graphic&sld_version=1.1.0&layer=stadsdeel&format=image/png&STYLE=default'
  },
  ggw: {
    url: 'maps/gebieden?service=wms',
    label_short: 'Gebiedsgerichtwerken-gebieden',
    label_long: 'Gebiedsgerichtwerken-gebieden',
    parent_label: 'Bestuurlijke gebieden',
    layers: ['gebiedsgerichtwerken', 'gebiedsgerichtwerken_label'],
    minZoom: 8,
    maxZoom: 16,
    legend: 'maps/gebieden?version=1.3.0&service=WMS&request=GetLegend' +
    'Graphic&sld_version=1.1.0&layer=gebiedsgerichtwerken&format=image/png&STYLE=default'
  },
  bc: {
    url: 'maps/gebieden?service=wms',
    label_short: 'Wijken',
    label_long: 'Wijken',
    parent_label: 'Bestuurlijke gebieden',
    layers: ['buurtcombinatie', 'buurtcombinatie_label'],
    minZoom: 8,
    maxZoom: 16,
    legend: 'maps/gebieden?version=1.3.0&service=WMS&request=GetLegend' +
    'Graphic&sld_version=1.1.0&layer=buurtcombinatie&format=image/png&STYLE=default'
  },
  buurt: {
    url: 'maps/gebieden?service=wms',
    label_short: 'Buurten',
    label_long: 'Buurten',
    parent_label: 'Bestuurlijke gebieden',
    layers: ['buurt', 'buurt_label'],
    minZoom: 8,
    maxZoom: 16,
    legend: 'maps/gebieden?version=1.3.0&service=WMS&request=GetLegend' +
    'Graphic&sld_version=1.1.0&layer=buurt&format=image/png&STYLE=default'
  },
  grex: {
    authScope: 'GREX/R',
    url: 'maps/grondexploitatie?service=wms',
    label_short: 'Grondexploitatie',
    label_long: 'Grondexploitatie',
    layers: ['grondexploitatie_polygons'],
    minZoom: 8,
    maxZoom: 16,
    legend: 'maps/grondexploitatie?version=1.3.0&service=WMS&request=GetLegend' +
    'Graphic&sld_version=1.1.0&layer=grondexploitatie_polygons&format=image/png&STYLE=default',
    detailUrl: 'geosearch/search/', // Geosearch URL
    detailItem: 'grondexploitatie', // Geosearch name
    detailIsShape: true
  },
  bbn: {
    url: 'maps/gebieden?service=wms',
    label_short: 'Bouwblokken',
    label_long: 'Bouwblokken',
    layers: ['bouwblok', 'bouwblok_label'],
    minZoom: 12,
    maxZoom: 16,
    legend: 'maps/gebieden?version=1.3.0&service=WMS&request=GetLegend' +
    'Graphic&sld_version=1.1.0&layer=bouwblok&format=image/png&STYLE=default',
    detailUrl: 'geosearch/search/',
    detailItem: 'bouwblok',
    detailIsShape: true
  },

  // geografie: hoogte
  dsm: {
    label_short: 'Oppervlaktemodel (DSM AHN)',
    label_long: 'Oppervlaktemodel (DSM AHN)',
    url: 'https://geodata.nationaalgeoregister.nl/ahn3/wms?',
    layers: ['ahn3_05m_dsm'],
    minZoom: 10,
    maxZoom: 16,
    legend: 'https://geodata.nationaalgeoregister.nl/ahn3/ows?version=1.3.0&service=WMS' +
    '&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=ahn3_05m_dsm&style=ahn3_05m',
    external: true,
    noDetail: true
  },
  dtm: {
    label_short: 'Terreinmodel (DTM AHN)',
    label_long: 'Terreinmodel (DTM AHN)',
    url: 'https://geodata.nationaalgeoregister.nl/ahn3/wms?',
    layers: ['ahn3_05m_dtm'],
    minZoom: 10,
    maxZoom: 16,
    legend: 'https://geodata.nationaalgeoregister.nl/ahn3/ows?version=1.3.0&service=WMS' +
    '&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=ahn3_05m_dtm&style=ahn3_05m',
    external: true,
    noDetail: true
  },
  nap: {
    url: 'maps/nap',
    label_short: 'Normaal Amsterdams Peil (NAP)',
    label_long: 'Normaal Amsterdams Peil (NAP)',
    layers: ['peilmerk_hoogte', 'peilmerk_label'],
    minZoom: 10,
    maxZoom: 16,
    legend: 'maps/nap?version=1.3.0&service=WMS&request=GetLegendG' +
    'raphic&sld_version=1.1.0&layer=NAP&format=image/png&STYLE=default',
    detailUrl: 'geosearch/search/',
    detailItem: 'peilmerk'
  },
  mbs: {
    url: 'maps/meetbouten?service=wms',
    label_short: 'Meetbouten - Status',
    label_long: 'Meetbouten - Status',
    layers: ['meetbouten_status', 'meetbouten_labels'],
    minZoom: 12,
    maxZoom: 16,
    legend: 'maps/meetbouten?version=1.3.0&service=WMS&request=Get' +
    'LegendGraphic&sld_version=1.1.0&layer=meetbouten_status&format=image/png&STYLE=default',
    detailUrl: 'geosearch/search/',
    detailItem: 'meetbout'
  },
  mbz: {
    url: 'maps/meetbouten?service=wms',
    label_short: 'Meetbouten - Zaksnelheid',
    label_long: 'Meetbouten - Zaksnelheid',
    layers: ['meetbouten_zaksnelheid', 'meetbouten_labels'],
    minZoom: 12,
    maxZoom: 16,
    legend: 'maps/meetbouten?version=1.3.0&service=WMS&request=Get' +
    'LegendGraphic&sld_version=1.1.0&layer=meetbouten_zaksnelheid&format=image/png&STYLE=default',
    detailUrl: 'geosearch/search/',
    detailItem: 'meetbout'
  },
  mbr: {
    url: 'maps/meetbouten',
    label_short: 'Meetbouten - Referentiepunten',
    label_long: 'Meetbouten - Referentiepunten',
    layers: ['referentiepunten'],
    minZoom: 12,
    maxZoom: 16,
    legend: 'maps/meetbouten?version=1.3.0&service=WMS&request=Get' +
    'LegendGraphic&sld_version=1.1.0&layer=referentiepunten&format=image/png&STYLE=default',
    noDetail: true
  },

  // milieu bodem
  mbgm: {
    url: 'maps/bodem',
    label_short: 'Grondmonsters',
    label_long: 'Grondmonsters',
    layers: ['grondmonsters'],
    minZoom: 11,
    maxZoom: 16,
    legend: 'maps/bodem?version=1.3.0&service=WMS&request=GetLegen' +
    'dGraphic&sld_version=1.1.0&layer=grondmonsters&format=image/png&STYLE=default',
    noDetail: true
  },
  mbgwm: {
    url: 'maps/bodem',
    label_short: 'Grondwatermonsters',
    label_long: 'Grondwatermonsters',
    layers: ['grondwatermonsters'],
    minZoom: 8,
    maxZoom: 16,
    legend: 'maps/bodem?version=1.3.0&service=WMS&request=GetLegen' +
    'dGraphic&sld_version=1.1.0&layer=grondwatermonsters&format=image/png&STYLE=default',
    noDetail: true
  },
  mbaig: {
    url: 'maps/bodem',
    label_short: 'Grondmonsters asbest',
    label_long: 'Grondmonsters asbest',
    layers: ['asbest'],
    minZoom: 11,
    maxZoom: 16,
    legend: 'maps/bodem?version=1.3.0&service=WMS&request=GetLegen' +
    'dGraphic&sld_version=1.1.0&layer=asbest&format=image/png&STYLE=default',
    noDetail: true
  },
  exin: {
    url: 'maps/bommenkaart',
    label_short: 'Explosieven - Inslagen',
    label_long: 'Explosieven - Inslagen',
    layers: ['inslagen'],
    minZoom: 8,
    maxZoom: 16,
    legend: 'maps/bommenkaart?version=1.3.0&service=WMS&request=GetLegendGraphic&sld_version=1.1.0&la' +
    'yer=inslagen&format=image/png&STYLE=default',
    detailUrl: 'geosearch/search/',
    detailItem: 'bominslag'
  },
  exvg: {
    url: 'maps/bommenkaart',
    label_short: 'Explosieven - Verdachte geb.',
    label_long: 'Explosieven - Verdachte gebieden',
    layers: ['verdachte_gebieden'],
    minZoom: 8,
    maxZoom: 16,
    legend: 'maps/bommenkaart?version=1.3.0&service=WMS&request=GetLegendGraphic&sld_version=1.1.0&la' +
    'yer=verdachte_gebieden&format=image/png&STYLE=default'
  },
  exgg: {
    url: 'maps/bommenkaart',
    label_short: 'Explosieven - Gevrijw. geb.',
    label_long: 'Explosieven - Gevrijwaarde gebieden',
    layers: ['gevrijwaarde_gebieden'],
    minZoom: 8,
    maxZoom: 16,
    legend: 'maps/bommenkaart?version=1.3.0&service=WMS&request=GetLegendGraphic&sld_version=1.1.0&la' +
    'yer=gevrijwaarde_gebieden&format=image/png&STYLE=default'
  },
  exuo: {
    url: 'maps/bommenkaart',
    label_short: 'Explosieven - Uitgev. onderz.',
    label_long: 'Explosieven - Uitgevoerde CE-onderzoeken',
    layers: ['uitgevoerde_CE_onderzoeken'],
    minZoom: 8,
    maxZoom: 16,
    legend: 'maps/bommenkaart?version=1.3.0&service=WMS&request=GetLegendGraphic&sld_version=1.1.0&la' +
    'yer=uitgevoerde_CE_onderzoeken&format=image/png&STYLE=default'
  },

  // milieu: veiligheid
  mvlpgv: {
    url: 'maps/externeveiligheid',
    label_short: 'LPG-vulpunten - Risicozones',
    label_long: 'LPG-vulpunten - Risicozones',
    layers: [
      'lpgvulpuntinvloedsgebied',
      'lpgvulpuntplaatsgebondenrisico106',
      'lpgvulpuntplaatsgebondenrisico105',
      'lpgvulpuntlocaties'
    ],
    minZoom: 8,
    maxZoom: 16,
    legend: 'maps/externeveiligheid?version=1.3.0&service=WMS&requ' +
    'est=GetLegendGraphic&sld_version=1.1.0&layer=milieu_veiligheid_lpg_vulpunt&format=image/png&' +
    'STYLE=default',
    noDetail: true
  },
  mvlpga: {
    url: 'maps/externeveiligheid',
    label_short: 'LPG-afleverzuilen - Risicozones',
    label_long: 'LPG-afleverzuilen - Risicozones',
    layers: ['milieu_veiligheid_lpg_afleverzuil'],
    minZoom: 8,
    maxZoom: 16,
    legend: 'maps/externeveiligheid?version=1.3.0&service=WMS&requ' +
    'est=GetLegendGraphic&sld_version=1.1.0&layer=milieu_veiligheid_lpg_afleverzuil&format=image/' +
    'png&STYLE=default',
    noDetail: true
  },
  mvlpgt: {
    url: 'maps/externeveiligheid',
    label_short: 'LPG-tanks - Risicozones',
    label_long: 'LPG-tanks - Risicozones',
    layers: ['lpgtankinvloedsgebied', 'lpgtankplaatsgebondenrisico', 'lpgtankligging'],
    minZoom: 8,
    maxZoom: 16,
    legend: 'maps/externeveiligheid?version=1.3.0&service=WMS&requ' +
    'est=GetLegendGraphic&sld_version=1.1.0&layer=milieu_veiligheid_lpg_tank&format=image/png&STY' +
    'LE=default',
    noDetail: true
  },
  mvlpgs: {
    url: 'maps/externeveiligheid',
    label_short: 'LPG-stations - Risicozones',
    label_long: 'LPG-stations - Risicozones',
    layers: ['lpgstationcontouren', 'lpgstationslocaties'],
    minZoom: 8,
    maxZoom: 16,
    legend: 'maps/externeveiligheid?version=1.3.0&service=WMS&requ' +
    'est=GetLegendGraphic&sld_version=1.1.0&layer=milieu_veiligheid_lpg_station&format=image/png&' +
    'STYLE=default',
    noDetail: true
  },
  mvbr: {
    url: 'maps/externeveiligheid',
    label_short: 'Bedrijven - Bronnen en risicozones',
    label_long: 'Bedrijven - Bronnen en risicozones',
    layers: ['overigerisicobedrijfsbronnen', 'overigerisicobedrijfplaatsgebondenrisico106'],
    minZoom: 8,
    maxZoom: 16,
    legend: 'maps/externeveiligheid?version=1.3.0&service=WMS&requ' +
    'est=GetLegendGraphic&sld_version=1.1.0&layer=overigerisicobedrijven&format=image/png&STYLE=d' +
    'efault',
    noDetail: true
  },
  mvi: {
    authScope: 'HR/R',
    url: 'maps/externeveiligheid',
    label_short: 'Bedrijven - invloedsgebieden',
    label_long: 'Bedrijven - invloedsgebieden',
    layers: ['overigerisicobedrijfinvloedsgebied'],
    minZoom: 8,
    maxZoom: 16,
    legend: 'maps/externeveiligheid?version=1.3.0&service=WMS&requ' +
    'est=GetLegendGraphic&sld_version=1.1.0&layer=overigerisicobedrijfinvloedsgebied&format=image/pn' +
    'g&STYLE=default',
    noDetail: true
  },
  mvbd: {
    url: 'maps/externeveiligheid',
    label_short: 'Bedrijven - Terreingrenzen',
    label_long: 'Bedrijven - Terreingrenzen',
    layers: ['milieu_veiligheid_bedrijf'],
    minZoom: 8,
    maxZoom: 16,
    legend: 'maps/externeveiligheid?version=1.3.0&service=WMS&requ' +
    'est=GetLegendGraphic&sld_version=1.1.0&layer=milieu_veiligheid_bedrijf&format=image/png&STYL' +
    'E=default',
    noDetail: true
  },
  mvabl: {
    url: 'maps/externeveiligheid',
    label_short: 'Aardgasbuisleid. - Risicozones',
    label_long: 'Aardgasbuisleidingen - Risicozones',
    layers: ['milieu_veiligheid_aardgasbuisleidingen'],
    minZoom: 8,
    maxZoom: 16,
    legend: 'maps/externeveiligheid?version=1.3.0&service=WMS&requ' +
    'est=GetLegendGraphic&sld_version=1.1.0&layer=milieu_veiligheid_aardgasbuisleidingen&format=i' +
    'mage/png&STYLE=default',
    noDetail: true
  },
  mvsw: {
    url: 'maps/externeveiligheid',
    label_short: 'Spoorwegen - Risicozones',
    label_long: 'Spoorwegen - Risicozones',
    layers: ['risicozonesspoorweg'],
    minZoom: 8,
    maxZoom: 16,
    legend: 'maps/externeveiligheid?version=1.3.0&service=WMS&requ' +
    'est=GetLegendGraphic&sld_version=1.1.0&layer=risicozonesspoorweg&format=image/png&STYLE=defa' +
    'ult',
    noDetail: true
  },
  mvvw: {
    url: 'maps/externeveiligheid',
    label_short: 'Vaarwegen - Risicozones',
    label_long: 'Vaarwegen - Risicozones',
    layers: ['risicozonesvaarweg'],
    minZoom: 8,
    maxZoom: 16,
    legend: 'maps/externeveiligheid?version=1.3.0&service=WMS&requ' +
    'est=GetLegendGraphic&sld_version=1.1.0&layer=risicozonesvaarweg&format=image/png&STYLE=default',
    noDetail: true
  },
  mvw: {
    url: 'maps/externeveiligheid',
    label_short: 'Wegen - Risicozones',
    label_long: 'Wegen - Risicozones',
    layers: ['risicozonesweg'],
    minZoom: 8,
    maxZoom: 16,
    legend: 'maps/externeveiligheid?version=1.3.0&service=WMS&requ' +
    'est=GetLegendGraphic&sld_version=1.1.0&layer=risicozonesweg&format=image/png&STYLE=default',
    noDetail: true
  },
  mvvo: {
    url: 'maps/externeveiligheid',
    label_short: 'Vuurwerkopslag - Veilig.afst.',
    label_long: 'Vuurwerkopslag - Veiligheidsafstanden',
    parent_label: 'Veiligheidsafstanden',
    layers: ['milieu_veiligheid_vuurwerk'],
    minZoom: 8,
    maxZoom: 16,
    legend: 'maps/externeveiligheid?version=1.3.0&service=WMS&requ' +
    'est=GetLegendGraphic&sld_version=1.1.0&layer=milieu_veiligheid_vuurwerk&format=image/png&STY' +
    'LE=default',
    noDetail: true
  },
  mvmo: {
    url: 'maps/externeveiligheid',
    label_short: 'Munitieopslag - Veilig.afst.',
    label_long: 'Munitieopslag - Veiligheidsafstanden',
    parent_label: 'Veiligheidsafstanden',
    layers: ['milieu_veiligheid_munitie'],
    minZoom: 8,
    maxZoom: 16,
    legend: 'maps/externeveiligheid?version=1.3.0&service=WMS&requ' +
    'est=GetLegendGraphic&sld_version=1.1.0&layer=milieu_veiligheid_munitie&format=image/png&STYL' +
    'E=default',
    noDetail: true
  },
  mvgms: {
    url: 'maps/externeveiligheid',
    label_short: 'Gasdruk...stations - Veilig.afst.',
    label_long: 'Gasdrukregel- en meetstation - Veiligheidsafstanden',
    parent_label: 'Veiligheidsafstanden',
    layers: ['milieu_veiligheid_gasdrukregel_meetstation'],
    minZoom: 8,
    maxZoom: 16,
    legend: 'maps/externeveiligheid?version=1.3.0&service=WMS&requ' +
    'est=GetLegendGraphic&sld_version=1.1.0&layer=milieu_veiligheid_gasdrukregel_meetstation&form' +
    'at=image/png&STYLE=default',
    noDetail: true
  },
  mvsls: {
    url: 'maps/externeveiligheid',
    label_short: 'Sluizen - Veilig.afst.',
    label_long: 'Sluizen - Veiligheidsafstanden',
    parent_label: 'Veiligheidsafstanden',
    layers: ['milieu_veiligheid_sluis'],
    minZoom: 8,
    maxZoom: 16,
    legend: 'maps/externeveiligheid?version=1.3.0&service=WMS&requ' +
    'est=GetLegendGraphic&sld_version=1.1.0&layer=milieu_veiligheid_sluis&format=image/png&STYLE=' +
    'default',
    noDetail: true
  },
  mvwp: {
    url: 'maps/externeveiligheid',
    label_short: 'Wachtplaatsen - Veilig.afst.',
    label_long: 'Wachtplaatsen - Veiligheidsafstanden',
    parent_label: 'Veiligheidsafstanden',
    layers: ['milieu_veiligheid_wachtplaats'],
    minZoom: 8,
    maxZoom: 16,
    legend: 'maps/externeveiligheid?version=1.3.0&service=WMS&requ' +
    'est=GetLegendGraphic&sld_version=1.1.0&layer=milieu_veiligheid_wachtplaats&format=image/png&' +
    'STYLE=default',
    noDetail: true
  },
  mvbs: {
    url: 'maps/externeveiligheid',
    label_short: 'Bunkerschepen - Veilig.afst.',
    label_long: 'Bunkerschepen - Veiligheidsafstanden',
    parent_label: 'Veiligheidsafstanden',
    layers: ['milieu_veiligheid_bunkerschepen'],
    minZoom: 8,
    maxZoom: 16,
    legend: 'maps/externeveiligheid?version=1.3.0&service=WMS&requ' +
    'est=GetLegendGraphic&sld_version=1.1.0&layer=milieu_veiligheid_bunkerschepen&format=image/pn' +
    'g&STYLE=default',
    noDetail: true
  },

  // milieu zones
  mgpind: {
    url: 'maps/planologischegeluidszones',
    label_short: 'Industrie - Geluidszones',
    label_long: 'Industrie - Geluidszones',
    layers: [
      'geluidzoneindustrieterrein',
      'gezoneerdindustrieterrein'
    ],
    minZoom: 8,
    maxZoom: 16,
    legend: 'maps/planologischegeluidszones?version=1.3.0&service=' +
    'WMS&request=GetLegendGraphic&sld_version=1.1.0&layer=milieu_geluid_planologisch_industrie&fo' +
    'rmat=image/png&STYLE=default',
    noDetail: true
  },
  mgsw: {
    url: 'maps/planologischegeluidszones',
    label_short: 'Spoorwegen - Geluidszones',
    label_long: 'Spoorwegen - Geluidszones',
    layers: ['spoorwegen'],
    minZoom: 8,
    maxZoom: 16,
    legend: 'maps/planologischegeluidszones?version=1.3.0&service=' +
    'WMS&request=GetLegendGraphic&sld_version=1.1.0&layer=spoorwegen&format=image/png&STYLE=default',
    noDetail: true
  },
  mgpm: {
    url: 'maps/planologischegeluidszones',
    label_short: 'Metro - Geluidszones',
    label_long: 'Metro - Geluidszones',
    layers: ['metro'],
    minZoom: 8,
    maxZoom: 16,
    legend: 'maps/planologischegeluidszones?version=1.3.0&service=' +
    'WMS&request=GetLegendGraphic&sld_version=1.1.0&layer=metro&format=image/png&STYLE=default',
    noDetail: true
  },
  mgpsh: {
    url: 'maps/planologischezonesschiphol',
    label_short: 'Schiphol - Ruimtel. beperkingen',
    label_long: 'Schiphol - Ruimtelijke beperkingen',
    layers: ['geluidszoneschiphol'],
    minZoom: 8,
    maxZoom: 16,
    legend: 'maps/planologischezonesschiphol?version=1.3.0&service' +
    '=WMS&request=GetLegendGraphic&sld_version=1.1.0&layer=geluidszoneschiphol&format=image/png&S' +
    'TYLE=default',
    noDetail: true
  },
  mgth: {
    url: 'maps/planologischezonesschiphol',
    label_short: 'Schiphol - Toetshoogte',
    label_long: 'Schiphol - Maatgevende toetshoogte',
    layers: ['maatgevendetoetshoogteschiphol'],
    minZoom: 8,
    maxZoom: 16,
    legend: 'maps/planologischezonesschiphol?version=1.3.0&service=WMS&request=GetLegendGraphic&' +
    'sld_version=1.1.0&layer=maatgevendetoetshoogteschiphol&format=image/png&STYLE=default',
    noDetail: true
  },
  mthr: {
    url: 'maps/planologischezonesschiphol',
    label_short: 'Schiphol - Toetshoogte radar',
    label_long: 'Schiphol - Toetshoogte i.v.m. radar',
    layers: ['toetshoogteradarschiphol'],
    minZoom: 8,
    maxZoom: 16,
    legend: 'maps/planologischezonesschiphol?version=1.3.0&service=WMS&request=GetLegendGraphic&' +
    'sld_version=1.1.0&layer=toetshoogteradarschiphol&format=image/png&STYLE=default',
    noDetail: true
  },
  mgvvgsh: {
    url: 'maps/planologischezonesschiphol',
    label_short: 'Schiphol - Vogelvrijwaring',
    label_long: 'Schiphol - Vogelvrijwaringsgebied',
    layers: ['vogelvrijwaringsgebiedschiphol'],
    minZoom: 8,
    maxZoom: 16,
    legend: 'maps/planologischezonesschiphol?version=1.3.0&service' +
    '=WMS&request=GetLegendGraphic&sld_version=1.1.0&layer=vogelvrijwaringsgebiedschiphol&format=' +
    'image/png&STYLE=default',
    noDetail: true
  },

  // Openbare orde en veiligheid
  oovoalg: {
    url: 'maps/overlastgebieden',
    label_short: 'Overlastgebieden - Algemeen',
    label_long: 'Overlastgebieden - Algemeen',
    parent_label: 'Overlastgebieden',
    layers: ['algemeen_overlastgebied', 'algemeen_overlastgebied_label'],
    minZoom: 8,
    maxZoom: 16,
    legend: 'maps/overlastgebieden?version=1.3.0&service' +
    '=WMS&request=GetLegendGraphic&sld_version=1.1.0&layer=algemeen_overlastgebied&format=' +
    'image/png&STYLE=default'
  },
  oovodlrs: {
    url: 'maps/overlastgebieden',
    label_short: 'Overlastgebieden - Dealers',
    label_long: 'Overlastgebieden - Dealers',
    parent_label: 'Overlastgebieden',
    layers: ['dealeroverlastgebied', 'dealeroverlastgebied_label'],
    minZoom: 8,
    maxZoom: 16,
    legend: 'maps/overlastgebieden?version=1.3.0&service' +
    '=WMS&request=GetLegendGraphic&sld_version=1.1.0&layer=dealeroverlastgebied&format=' +
    'image/png&STYLE=default'
  },
  oovouitg: {
    url: 'maps/overlastgebieden',
    label_short: 'Overlastgebieden - Uitgaan',
    label_long: 'Overlastgebieden - Uitgaan',
    parent_label: 'Overlastgebieden',
    layers: ['uitgaansoverlastgebied', 'uitgaansoverlastgebied_label'],
    minZoom: 8,
    maxZoom: 16,
    legend: 'maps/overlastgebieden?version=1.3.0&service' +
    '=WMS&request=GetLegendGraphic&sld_version=1.1.0&layer=uitgaansoverlastgebied&format=' +
    'image/png&STYLE=default'
  },
  oovctg: {
    url: 'maps/overlastgebieden',
    label_short: 'Cameratoezichtgebieden',
    label_long: 'Cameratoezichtgebieden',
    layers: ['cameratoezichtgebied', 'cameratoezichtgebied_label'],
    minZoom: 8,
    maxZoom: 16,
    legend: 'maps/overlastgebieden?version=1.3.0&service' +
    '=WMS&request=GetLegendGraphic&sld_version=1.1.0&layer=cameratoezichtgebied&format=' +
    'image/png&STYLE=default'
  },

  // Toerisme en cultuur
  tcmnmt: {
    url: 'maps/monumenten',
    label_short: 'Monumenten',
    label_long: 'Monumenten',
    layers: ['monumenten'],
    minZoom: 12,
    maxZoom: 16,
    legend: 'maps/monumenten?version=1.3.0&service' +
    '=WMS&request=GetLegendGraphic&sld_version=1.1.0&layer=monumenten&format=' +
    'image/png&STYLE=default',
    detailUrl: 'geosearch/search/',
    detailItem: 'monument'
  },

  // Verkeer
  trm: {
    url: 'maps/trm',
    label_short: 'Tram - lijnen',
    label_long: 'Tram - lijnen',
    parent_label: 'Metro en tram - lijnen',
    layers: ['tramlijnen'],
    minZoom: 8,
    maxZoom: 16,
    noDetail: true
  },
  mtr: {
    url: 'maps/trm',
    label_short: 'Metro - lijnen',
    label_long: 'Metro - lijnen',
    parent_label: 'Metro en tram - lijnen',
    layers: ['metrolijnen'],
    minZoom: 8,
    maxZoom: 16,
    noDetail: true
  },
  pv: {
    url: 'maps/parkeervakken',
    label_short: 'Parkeervakken - Fiscale indeling',
    label_long: 'Parkeervakken - Fiscale indeling',
    layers: ['alle_parkeervakken', 'parkeervakken_label'],
    minZoom: 8,
    maxZoom: 16,
    legend: 'maps/parkeervakken?version=1.3.0&service=WMS&request=' +
    'GetLegendGraphic&sld_version=1.1.0&layer=alle_parkeervakken&format=image/png&STYLE=de' +
    'fault',
    noDetail: true
  },
  pvb: {
    url: 'maps/parkeervakken',
    label_short: 'Parkeervakken - Spec. bestemmingen',
    label_long: 'Parkeervakken - Speciale bestemmingen',
    layers: ['alle_parkeervakken', 'parkeervakken_bord'],
    minZoom: 8,
    maxZoom: 16,
    legend: 'maps/parkeervakken?version=1.3.0&service=WMS&request=' +
    'GetLegendGraphic&sld_version=1.1.0&layer=parkeervakken_bord&format=image/png&STYLE=de' +
    'fault',
    noDetail: true
  },
  pvr: {
    url: 'maps/parkeervakken',
    label_short: 'Parkeervakken - Gereserveerd',
    label_long: 'Parkeervakken - Gereserveerd',
    layers: ['parkeervakken_reservering', 'parkeervakken_reservering_label'],
    minZoom: 11,
    maxZoom: 16,
    legend: 'maps/parkeervakken?version=1.3.0&service=WMS&request=' +
    'GetLegendGraphic&sld_version=1.1.0&layer=parkeervakken_reservering&format=image/png&STYLE=de' +
    'fault',
    noDetail: true
  },
  pr: {
    url: 'maps/reistijdenauto',
    label_short: 'Verkeersstromen - Snelheden',
    label_long: 'Verkeersstromen - Snelheden',
    layers: ['reistijdenauto'],
    minZoom: 8,
    maxZoom: 16,
    noDetail: true
  },

  // Panoramabeelden
  pano: {
    url: 'maps/panorama',
    label_short: 'Panoramabeelden',
    label_long: 'Panoramabeelden',
    layers: ['panorama_recent'],
    minZoom: 11,
    maxZoom: 16,
    legend: 'maps/panorama?version=1.3.0&service=WMS&request=' +
    'GetLegendGraphic&sld_version=1.1.0&layer=panorama_recent&format=image/png&STYLE=de' +
    'fault'
  },
  pano2016: {
    url: 'maps/panorama',
    label_short: 'Panoramabeelden',
    label_long: 'Panoramabeelden',
    layers: ['panorama_recent_2016'],
    minZoom: 11,
    maxZoom: 16,
    legend: 'maps/panorama?version=1.3.0&service=WMS&request=' +
    'GetLegendGraphic&sld_version=1.1.0&layer=panorama_recent_2016&format=image/png&STYLE=de' +
    'fault'
  },
  pano2017: {
    url: 'maps/panorama',
    label_short: 'Panoramabeelden',
    label_long: 'Panoramabeelden',
    layers: ['panorama_recent_2017'],
    minZoom: 11,
    maxZoom: 16,
    legend: 'maps/panorama?version=1.3.0&service=WMS&request=' +
    'GetLegendGraphic&sld_version=1.1.0&layer=panorama_recent_2017&format=image/png&STYLE=de' +
    'fault'
  },
  pano2018: {
    url: 'maps/panorama',
    label_short: 'Panoramabeelden',
    label_long: 'Panoramabeelden',
    layers: ['panorama_recent_2018'],
    minZoom: 11,
    maxZoom: 16,
    legend: 'maps/panorama?version=1.3.0&service=WMS&request=' +
    'GetLegendGraphic&sld_version=1.1.0&layer=panorama_recent_2018&format=image/png&STYLE=de' +
    'fault'
  },
  pano2019: {
    url: 'maps/panorama',
    label_short: 'Panoramabeelden',
    label_long: 'Panoramabeelden',
    layers: ['panorama_recent_2019'],
    minZoom: 11,
    maxZoom: 16,
    legend: 'maps/panorama?version=1.3.0&service=WMS&request=' +
    'GetLegendGraphic&sld_version=1.1.0&layer=panorama_recent_2019&format=image/png&STYLE=de' +
    'fault'
  },
  pano2020: {
    url: 'maps/panorama',
    label_short: 'Panoramabeelden',
    label_long: 'Panoramabeelden',
    layers: ['panorama_recent_2020'],
    minZoom: 11,
    maxZoom: 16,
    legend: 'maps/panorama?version=1.3.0&service=WMS&request=' +
    'GetLegendGraphic&sld_version=1.1.0&layer=panorama_recent_2020&format=image/png&STYLE=de' +
    'fault'
  }
};

export default SOURCES;
