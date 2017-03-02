Error.stackTraceLimit = Infinity;

require('core-js/es6');
require('zone.js/dist/zone');
// require('zone.js/dist/long-stack-trace-zone');
require('zone.js/dist/proxy');
require('zone.js/dist/sync-test');
require('zone.js/dist/jasmine-patch');
require('zone.js/dist/async-test');
require('zone.js/dist/fake-async-test');
require('reflect-metadata');

// RxJS
require('rxjs/Rx');

const testing = require('@angular/core/testing');
const browser = require('@angular/platform-browser-dynamic/testing');

testing.TestBed.initTestEnvironment(
	browser.BrowserDynamicTestingModule,
	browser.platformBrowserDynamicTesting()
);

const testContext = require.context('../src', true, /\.spec\.ts/);
testContext.keys().map(testContext);