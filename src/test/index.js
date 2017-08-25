// setup for test files
require('babel-register');

// temporary hack until SBKS-269 is fixed and fully rolled out
require('ignore-styles');

const jsdom = require('jsdom');
// Setup the jsdom environment
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = global.window.navigator;
