const subTypesLabels = {
  bominslag: 'inslag',
  gevrijwaardgebied: 'gevrijwaard gebied',
  uitgevoerdonderzoek: 'reeds uitgevoerd CE onderzoek',
  verdachtgebied: 'verdacht gebied',
  grootstedelijkgebied: 'grootstedelijk gebied',
  gebiedsgerichtwerken: 'gebiedsgericht werken'
};

export const getStatusLabel = (type) => {
  const semgents = type.split('/');
  const segment = semgents[1] ? semgents[1] : semgents[0];
  return subTypesLabels[segment] ? subTypesLabels[segment] : segment;
};

const statusCodes = [
  '18'
];

const shouldShowStatus = (result) => result.vbo_status &&
  statusCodes.indexOf(result.vbo_status.code) > -1;

export const getStatusLabelAdress = (result) =>
  `${shouldShowStatus(result) ? `${result.vbo_status.omschrijving}` : ''}` +
  `${shouldShowStatus(result) && !result.hoofdadres ? ' ' : ''}` +
  `${!result.hoofdadres ? 'Nevenadres' : ''}`;