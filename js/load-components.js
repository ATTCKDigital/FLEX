import FLEXLS from './clientNamespace';
import Debug from './debug';
import $ from 'jquery';

// Import all JS components explicitly.

//Required
import $$ from './cached-dom-elements';
import Parallax from './parallax';
import ElementsInViewport from './elements-in-viewport';
import Nav from '../components/component_nav/nav';
import Share from '../components/component_share/share';
import Video from '../gutenberg/blocks/block_video/play-video';
import LoadMore from './load-more';

//Project Specific

// Add your components here so they get loaded.
// Make sure to import them above first.
FLEXLS.Components = {
	'Parallax': Parallax,
	'ElementsInViewport': ElementsInViewport,
	'Nav': Nav,
	'LoadMore': LoadMore,
	'Share': Share,
	'Video': Video,
};

FLEXLS.Loader = {};

FLEXLS.Loader.loadComponents = function () {
	FLEXLS.Loader.loadedComponents = [];

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
			let instance = new FLEXLS.Components[componentName]($this, params);

			// Save component instance references in a global manifest.
			if (typeof FLEXLS.Components[componentName] !== 'undefined') {
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


export default FLEXLS.Loader;
