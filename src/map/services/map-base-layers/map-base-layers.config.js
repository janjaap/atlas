const mapBaseLayers = [
  {
    value: 'topografie',
    label: 'Topografie',
    category: 'topography',
    selected: true,
    urlTemplate: 'https://{s}.data.amsterdam.nl/topo_rd/{z}/{x}/{y}.png'
  }, {
    value: 'topo_rd_light',
    category: 'topography',
    label: 'Topografie licht',
    urlTemplate: 'https://{s}.data.amsterdam.nl/topo_rd_light/{z}/{x}/{y}.png'
  }, {
    value: 'topo_rd_zw',
    category: 'topography',
    label: 'Topografie grijs',
    urlTemplate: 'https://{s}.data.amsterdam.nl/topo_rd_zw/{z}/{x}/{y}.png'
  }, {
    value: 'lf2018',
    label: 'Luchtfoto 2018',
    category: 'aerial',
    selected: true,
    urlTemplate: 'https://{s}.data.amsterdam.nl/lufo2018_RD/{z}/{x}/{y}.jpeg'
  }, {
    value: 'ir2018',
    label: 'Infrarood 2018',
    category: 'aerial',
    urlTemplate: 'https://{s}.data.amsterdam.nl/infrarood2018_RD/{z}/{x}/{y}.jpeg'
  }, {
    value: 'lf2017',
    label: 'Luchtfoto 2017',
    category: 'aerial',
    urlTemplate: 'https://{s}.data.amsterdam.nl/lufo2017_RD/{z}/{x}/{y}.jpeg'
  }, {
    value: 'lf2016',
    label: 'Luchtfoto 2016',
    category: 'aerial',
    urlTemplate: 'https://{s}.data.amsterdam.nl/lufo2016_RD/{z}/{x}/{y}.jpeg'
  }, {
    value: 'lf2015',
    label: 'Luchtfoto 2015',
    category: 'aerial',
    urlTemplate: 'https://{s}.data.amsterdam.nl/lufo2015_RD/{z}/{x}/{y}.jpeg'
  }, {
    value: 'lf2014',
    label: 'Luchtfoto 2014',
    category: 'aerial',
    urlTemplate: 'https://{s}.data.amsterdam.nl/lufo2014_RD/{z}/{x}/{y}.jpeg'
  }, {
    value: 'lf2013',
    label: 'Luchtfoto 2013',
    category: 'aerial',
    urlTemplate: 'https://{s}.data.amsterdam.nl/lufo2013_RD/{z}/{x}/{y}.jpeg'
  }, {
    value: 'lf2012',
    label: 'Luchtfoto 2012',
    category: 'aerial',
    urlTemplate: 'https://{s}.data.amsterdam.nl/lufo2012_RD/{z}/{x}/{y}.jpeg'
  }, {
    value: 'lf2011',
    label: 'Luchtfoto 2011',
    category: 'aerial',
    urlTemplate: 'https://{s}.data.amsterdam.nl/lufo2011_RD/{z}/{x}/{y}.jpeg'
  }, {
    value: 'lf2010',
    label: 'Luchtfoto 2010',
    category: 'aerial',
    urlTemplate: 'https://{s}.data.amsterdam.nl/lufo2010_RD/{z}/{x}/{y}.jpeg'
  }, {
    value: 'lf2009',
    label: 'Luchtfoto 2009',
    category: 'aerial',
    urlTemplate: 'https://{s}.data.amsterdam.nl/lufo2009_RD/{z}/{x}/{y}.jpeg'
  }, {
    value: 'lf2008',
    label: 'Luchtfoto 2008',
    category: 'aerial',
    urlTemplate: 'https://{s}.data.amsterdam.nl/lufo2008_RD/{z}/{x}/{y}.jpeg'
  }, {
    value: 'lf2007',
    label: 'Luchtfoto 2007',
    category: 'aerial',
    urlTemplate: 'https://{s}.data.amsterdam.nl/lufo2007_RD/{z}/{x}/{y}.jpeg'
  }, {
    value: 'lf2006',
    label: 'Luchtfoto 2006',
    category: 'aerial',
    urlTemplate: 'https://{s}.data.amsterdam.nl/lufo2006_RD/{z}/{x}/{y}.jpeg'
  }, {
    value: 'lf2005',
    label: 'Luchtfoto 2005',
    category: 'aerial',
    urlTemplate: 'https://{s}.data.amsterdam.nl/lufo2005_RD/{z}/{x}/{y}.jpeg'
  }, {
    value: 'lf2004',
    label: 'Luchtfoto 2004',
    category: 'aerial',
    urlTemplate: 'https://{s}.data.amsterdam.nl/lufo2004_RD/{z}/{x}/{y}.jpeg'
  }, {
    value: 'lf2003',
    label: 'Luchtfoto 2003',
    category: 'aerial',
    urlTemplate: 'https://{s}.data.amsterdam.nl/lufo2003_RD/{z}/{x}/{y}.jpeg'
  }
];

export default mapBaseLayers;
