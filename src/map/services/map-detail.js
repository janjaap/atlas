import bouwblok from '../../shared/services/bouwblok/bouwblok';
import explosievenGevrijwaardGebied from '../../shared/services/explosieven/explosieven-gevrijwaard-gebied';
import inslag from '../../shared/services/inslag/inslag';
import kadastraalObject from '../../shared/services/kadastraal-object/kadastraal-object';
import meetbout from '../../shared/services/meetbout/meetbout';
import monument from '../../shared/services/monument/monument';
import napPeilmerk from '../../shared/services/nap-peilmerk/nap-peilmerk';
import nummeraanduiding from '../../shared/services/nummeraanduiding/nummeraanduiding';
import openbareRuimte from '../../shared/services/openbare-ruimte/openbare-ruimte';
import pand from '../../shared/services/pand/pand';
import vestiging from '../../shared/services/vestiging/vestiging';

const servicesByEndpointType = {
  'bag/ligplaats': {
    fetch: nummeraanduiding
  },
  'bag/nummeraanduiding': {
    fetch: nummeraanduiding
  },
  'bag/openbareruimte': {
    fetch: openbareRuimte
  },
  'bag/pand': {
    fetch: pand
  },
  'bag/standplaats': {
    fetch: nummeraanduiding
  },
  'bag/verblijfsobject': {
    fetch: nummeraanduiding
  },
  'brk/object': {
    fetch: kadastraalObject
  },
  'gebieden/bouwblok': {
    fetch: bouwblok
  },
  'handelsregister/vestiging': {
    fetch: vestiging,
    authScope: 'HR/R'
  },
  'meetbouten/meetbout': {
    fetch: meetbout
  },
  'milieuthemas/explosieven/gevrijwaardgebied': {
    fetch: explosievenGevrijwaardGebied
  },
  'milieuthemas/explosieven/inslagen': {
    fetch: inslag
  },
  'monumenten/monumenten': {
    fetch: monument
  },
  'nap/peilmerk': {
    fetch: napPeilmerk
  }
};

export default function detail(endpoint, user) {
  const endpointType = Object.keys(servicesByEndpointType).find((type) => endpoint.includes(type));
  const endpointConfig = endpointType && servicesByEndpointType[endpointType];
  const fetchFn = endpointConfig && endpointConfig.fetch;
  const authScope = endpointConfig && endpointConfig.authScope;
  return fetchFn && (!authScope || user.scopes.includes(authScope)) &&
    fetchFn(endpoint);
}
