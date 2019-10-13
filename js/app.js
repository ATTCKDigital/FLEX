// https://stackoverflow.com/questions/34338411/how-to-import-jquery-using-es6-syntax
import $ from 'jquery';
window.$ = $;

import cssVars from 'css-vars-ponyfill';
import GlobalEvents from './global-events';
import Loader from './load-components';

// Support for native css variables in legacy browsers
cssVars();

// Initiate Global Component Loader and Global Events.
$(function() {
	Loader.loadComponents();
	GlobalEvents.initGlobalEvents();
});

// Resolves persisted cache issue in safari
window.onpageshow = function(event) {
	if (event.persisted) {
		window.location.reload()
	}
};
