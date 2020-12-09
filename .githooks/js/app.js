/*!
 * FLEX v1.11.17.19
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://js.foundation/
 *
 * Date: 2019-01-01
 */

// Load order: First, before 
console.log('loaded', '/FLEX/js/app.js');

import $ from 'jquery';

// https://stackoverflow.com/questions/34338411/how-to-import-jquery-using-es6-syntax
window.$ = window.jQuery = $;

import cssVars from 'css-vars-ponyfill';
import GlobalEvents from './global-events';
import Loader from './load-components';

// Support for native css variables in legacy browsers
cssVars();

// Initiate Global Component Loader and Global Events.
$(function () {
	Loader.loadComponents();
	GlobalEvents.initGlobalEvents();
});

// Resolves persisted cache issue in safari
// SOURCE: https://stackoverflow.com/questions/8788802/prevent-safari-loading-from-cache-when-back-button-is-clicked
window.onpageshow = function (event) {
	if (event.persisted) {
		window.location.reload()
	}
};
