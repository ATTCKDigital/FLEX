import ATTCK from 'attck';
import Debug from 'debug';

// Import all JS components explicitly.

//Required
import $$ from 'cached-dom-elements.js';
import Parallax from 'parallax.js';
import ElementsInViewport from 'elements-in-viewport.js';
import Nav from '../components/component_nav/nav.js';

//Project Specific

// Add your components here so they get loaded.
// Make sure to import them above first.
ATTCK.Components = {
	'Parallax': Parallax,
	'ElementsInViewport': ElementsInViewport,
	'Nav': Nav,
};

ATTCK.Loader = {};

ATTCK.Loader.loadComponents = function () {
	ATTCK.Loader.loadedComponents = [];

	var self = this;

	$('.component').each(function () {
		// Gracefully fail if no component name has been defined
		if (!$(this).attr('data-component-name')) {
			return;
		}

		var $this = $(this);
		var componentNames = $this.attr('data-component-name').split(',');

		// A stack of JS components associated with this DOM element.
		let instances = $this.data('component-instances');

		if (!instances) {
			instances = [];
		}

		$.each(componentNames, function (i, el) {
			let componentName = el;
			let params = $this.data('component-options') || {};
			// console.log(componentName);
			let instance = new ATTCK.Components[componentName]($this, params);

			// Save component instance references in a global manifest.
			if (typeof ATTCK.Components[componentName] !== 'undefined') {
				self.loadedComponents.push({
					'instance': instance
				});

				instances.push(instance);
			}
		});

		// Save component instances to the DOM element.
		$this.data('component-instances', instances);
	});
};


export default ATTCK.Loader;