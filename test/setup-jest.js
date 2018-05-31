import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'leaflet';
import 'leaflet-draw';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

// Make Enzyme functions available in all test files without importing
global.shallow = shallow;
global.render = render;
global.mount = mount;

// add leaflet
global.L = L;

// Mock the window.fetch function
global.fetch = require('jest-fetch-mock');

// Fail tests on any warning
// this seems to swallow up important info on errors, making it harder to debug failing tests
// so we have to keep an eye on it
console.error = message => { // eslint-disable-line
  throw new Error(message); // eslint-disable-line
};
