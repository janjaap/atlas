import React from 'react';
import { connect } from 'react-redux';
import HomePage from './HomePage';
import MapPage from './MapPage';
import PanoramaPage from './PanoramaPage';
import MapPanoramaPage from './MapPanoramaPage';


const PageRouter = ({ page }) => {
  const Page = pages[page];

  document.title = page;

  return (
    <div className="page">
      <h2 className="hide">Page router</h2>
      { Page ? <Page /> : null }
    </div>
  )
};

const mapState = ({ page }) => ({ page })
export default connect(mapState)(PageRouter)

// could be a switch (but this is cached):
const pages = {
  HOME_PAGE: HomePage, // Key should be constant!
  MAP_PAGE: MapPage,
  MAP_PANORAMA_PAGE: MapPanoramaPage,
  PANORAMA_PAGE: PanoramaPage,
};
