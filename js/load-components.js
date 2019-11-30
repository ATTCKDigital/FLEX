console.log('loaded', '/flexlayout/js/load-components.js');

import FLEXLAYOUT from './clientNamespace';
import Debug from './debug';
import ObjectAssign from 'es6-object-assign';

// ie11 object assign polyfill
// TODO: figure out why this has to explicitly be in this file. - Author?
ObjectAssign.polyfill();

// Import all JS components explicitly.
// Required
import $$ from './cached-dom-elements';
import Parallax from './parallax';
import ElementsInViewport from './elements-in-viewport';
import Nav from '../components/component_nav/nav';
import Share from '../components/component_share/share';
import Video from '../gutenberg/blocks/block_video/play-video';
import AnimatedGif from '../gutenberg/blocks/block_animated-gif/swap-gif';
import VideoThumb from '../gutenberg/components/gb-component_background-options/video-thumb';
import LoadMore from './load-more';
import ScrollTo from './scroll-to';
import GDPR from '../components/component_footer/gdpr';
import Analytics from '../components/component_analytics/analytics';

// Project Specific
const childComponents = FLEXLAYOUT.ChildComponents || {};

// Add your components here so they get loaded.
// Make sure to import them above first.
FLEXLAYOUT.Components = Object.assign({
	'Parallax': Parallax,
	'ElementsInViewport': ElementsInViewport,
	'Nav': Nav,
	'LoadMore': LoadMore,
	'ScrollTo': ScrollTo,
	'Share': Share,
	'Video': Video,
	'AnimatedGif': AnimatedGif,
	'VideoThumb': VideoThumb,
	'GDPR': GDPR,
	'Analytics': Analytics
}, childComponents);

FLEXLAYOUT.Loader = {};

// Components with JS functionality can be defined via data attribute.
// Supports multiple components separated by space.
FLEXLAYOUT.Loader.loadComponents = function () {
	FLEXLAYOUT.Loader.loadedComponents = [];

	var self = this;

	$('.component').each(function () {
		// Gracefully fail if no component name has been defined
		if (!$(this).attr('data-component-name')) {
			return;
		}

		var $this = $(this);
		var componentNames = $this.attr('data-component-name');

		// For Legacy support, replace any commas with spaces first
		componentNames = componentNames.replace(',', ' ');
		componentNames = componentNames.replace('  ', ' ');

		// Now, split by space
		componentNames = componentNames.split(' ');


		// A stack of JS components associated with this DOM element.
		let instances = $this.data('component-instances');

		if (!instances) {
			instances = [];
		}

		$.each(componentNames, function (i, el) {
			let componentName = el;

			// Exit if not in component list
			if (typeof FLEXLAYOUT.Components[componentName] === 'undefined') {
				return;
			}

			let params = $this.data('component-options') || {};
			let instance = new FLEXLAYOUT.Components[componentName]($this, params);

			// Save component instance references in a global manifest.
			if (typeof FLEXLAYOUT.Components[componentName] !== 'undefined') {
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

FLEXLAYOUT.Loader.loadComponent = function ($el) {
	var componentName = $el.attr('data-component-name');

	if (typeof componentName === 'undefined') return;

	// For Legacy support, replace any commas with spaces first
	componentName = componentName.replace(',', ' ');
	componentName = componentName.replace('  ', ' ');

	// Now, split by space
	componentName = componentName.split(' ');

	$.each(componentName, function (i, el) {
		let componentName = el;

		// Exit if not in component list
		if (typeof FLEXLAYOUT.Components[componentName] === 'undefined') {
			console.log('FLEX.js ‹ loadComponents(), unknown component: ', componentName);
			return;
		}

		let params = $el.data('component-options') || {};
		let instance = new FLEXLAYOUT.Components[componentName]($el, params);
	});
};


export default FLEXLAYOUT.Loader;
