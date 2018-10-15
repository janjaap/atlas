import PAGES from './pages';

export const ROUTER_NAMESPACE = 'atlasRouter';

export const routing = {
  home: {
    title: 'Home',
    location: '/',
    type: `${ROUTER_NAMESPACE}/${PAGES.HOME}`,
    page: PAGES.HOME
  },
  map: {
    title: 'Grote kaart',
    location: '/map',
    type: `${ROUTER_NAMESPACE}/${PAGES.KAART}`,
    page: PAGES.KAART,
    children: [PAGES.KAART_SEARCH, PAGES.KAART_DETAIL, PAGES.KAART_PANORAMA]
  },
  catalogus: {
    title: 'Catalogus',
    location: '/catalogus',
    type: `${ROUTER_NAMESPACE}/${PAGES.CATALOGUS}`,
    page: PAGES.CATALOGUS
  },
  catalogusDetail: {
    title: '',
    location: '/catalogus/detail/:id',
    type: `${ROUTER_NAMESPACE}/${PAGES.CATALOGUS_DETAIL}`,
    page: PAGES.CATALOGUS_DETAIL
  },
  adressen: {
    title: '',
    location: '/adressen',
    type: `${ROUTER_NAMESPACE}/${PAGES.ADRESSEN}`,
    page: PAGES.ADRESSEN
  },
  vestigingen: {
    title: '',
    location: '/vestigingen',
    type: `${ROUTER_NAMESPACE}/${PAGES.VESTIGINGEN}`,
    page: PAGES.VESTIGINGEN
  },
  panorama: {
    title: '',
    location: '/panorama',
    type: `${ROUTER_NAMESPACE}/${PAGES.PANORAMA}`,
    page: PAGES.PANORAMA
  },
  dataset: {
    title: '',
    location: '/dataset',
    type: `${ROUTER_NAMESPACE}/${PAGES.DATASETS}`,
    page: PAGES.DATASETS
  },
  detail: {
    title: '',
    location: '/map/detail',
    type: `${ROUTER_NAMESPACE}/${PAGES.KAART_DETAIL}`,
    page: PAGES.KAART_DETAIL
  },
  mapPanorama: {
    title: '',
    location: '/map/panorama',
    type: `${ROUTER_NAMESPACE}/${PAGES.KAART_PANORAMA}`,
    page: PAGES.KAART_PANORAMA
  },
  mapSearch: {
    title: '',
    location: '/map/search',
    type: `${ROUTER_NAMESPACE}/${PAGES.KAART_SEARCH}`,
    page: PAGES.KAART_SEARCH
  },
  mapEmbed: {
    title: 'Embed',
    location: '/map/embed',
    type: `${ROUTER_NAMESPACE}/${PAGES.KAART_EMBED}`,
    page: PAGES.KAART_EMBED
  },
  nieuws: {
    title: '',
    location: '/nieuws',
    type: `${ROUTER_NAMESPACE}/${PAGES.NIEUWS}`,
    page: PAGES.NIEUWS
  },
  help: {
    title: '',
    location: '/help',
    type: `${ROUTER_NAMESPACE}/${PAGES.HELP}`,
    page: PAGES.HELP
  },
  proclaimer: {
    title: '',
    location: '/proclaimer',
    type: `${ROUTER_NAMESPACE}/${PAGES.PROCLAIMER}`,
    page: PAGES.PROCLAIMER
  },

  bediening: {
    title: '',
    location: '/bediening#:deeplink?',
    type: `${ROUTER_NAMESPACE}/${PAGES.BEDIENING}`,
    page: PAGES.BEDIENING
  },
  gegevens: {
    title: '',
    location: '/gegevens',
    type: `${ROUTER_NAMESPACE}/${PAGES.GEGEVENS}`,
    page: PAGES.GEGEVENS
  },
  apis: {
    title: '',
    location: '/apis',
    type: `${ROUTER_NAMESPACE}/${PAGES.OVER_API}`,
    page: PAGES.OVER_API
  },
  privacy_beveiliging: {
    title: '',
    location: '/privacy-en-informatiebeveiliging',
    type: `${ROUTER_NAMESPACE}/${PAGES.PRIVACY_BEVEILIGING}`,
    page: PAGES.PRIVACY_BEVEILIGING
  },
  beschikbaar_kwaliteit: {
    title: '',
    location: '/beschikbaarheid-en-kwaliteit-data',
    type: `${ROUTER_NAMESPACE}/${PAGES.BESCHIKBAAR_KWALITEIT}`,
    page: PAGES.BESCHIKBAAR_KWALITEIT
  },
  beheer_werkwijze: {
    title: '',
    location: '/technisch-beheer-en-werkwijze',
    type: `${ROUTER_NAMESPACE}/${PAGES.BEHEER_WERKWIJZE}`,
    page: PAGES.BEHEER_WERKWIJZE
  },
  statistieken: {
    title: '',
    location: '/statistieken',
    type: `${ROUTER_NAMESPACE}/${PAGES.STATISTIEKEN}`,
    page: PAGES.STATISTIEKEN
  }
};

// e.g. { home: '/' }, to be used by redux-first-router/connectRoutes
const routes = Object.keys(routing).reduce((acc, key) => {
  acc[routing[key].type] = routing[key].location;
  return acc;
}, {});

export const isMapSubPage = (page) => routing.map.children.includes(page);

export default routes;
