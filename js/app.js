import Utils from 'utils';

// Import jQuery and make it a global object
import $ from 'jquery';
window.jQuery = $;
window.$ = $;
// window.lodash = _.noConflict(); // remove lodash underscore conflict
// Import jQuery plugins, then make them global.
// import 'slick-carousel';

// Global component loader.
$(function() {
	Utils.loadComponents();
	Utils.initGlobalEvents();
});

//Resolves persisted cache issue in safari
window.onpageshow = function(event) {
		if (event.persisted) {
				window.location.reload()
		} else {
		}
};
