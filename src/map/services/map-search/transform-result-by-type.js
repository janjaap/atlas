import categoryLabelsByType from './category-labels-by-type';
import { getStatusLabel, getStatusLabelAddress } from './status-labels';

const getDefault = (feature) => ({
  categoryLabel: categoryLabelsByType[feature.properties.type].singular,
  label: feature.properties.display,
  parent: feature.properties.parent,
  type: feature.properties.type,
  uri: feature.properties.uri,
  statusLabel: getStatusLabel(feature.properties.type)
});

const getAddress = (item) => ({
  ...getDefault(item),
  isNevenadres: !item.hoofdadres,
  status: {
    code: item.vbo_status.code,
    description: item.vbo_status.omschrijving
  },
  statusLabel: getStatusLabelAddress(item)
});

const getOpenbareRuimte = (item) => ({
  ...getDefault(item),
  statusLabel: item.properties.opr_type !== 'Weg' ? item.properties.opr_type : ''
});

const transformResultByType = (result) => {
  switch (result.properties.type) {
    case 'pand/address':
      return getAddress(result);

    case 'bag/openbareruimte':
      return getOpenbareRuimte(result);

    default:
      return getDefault(result);
  }
};

export default transformResultByType;
