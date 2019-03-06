import $ from 'jquery';
import GlobalEvents from './global-events';
import Loader from './load-components';


// Import jQuery and make it a global object
//oka todo: jquery from node modules, test if we need the 3 lines of code below.
// import $ from 'jquery';
// window.jQuery = $;
// window.$ = $;
// window.lodash = _.noConflict(); // remove lodash underscore conflict

// Import jQuery plugins, then make them global.

// Initiate Global Component Loader and Global Events.
$(function() {
	Loader.loadComponents();
	GlobalEvents.initGlobalEvents();
});

//Resolves persisted cache issue in safari
window.onpageshow = function(event) {
	if (event.persisted) {
			window.location.reload()
	} else {
	}
};
