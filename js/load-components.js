console.log('loaded', '/FLEX\t/js\t/load-components.js');

import FLEX from './client-namespace';
import Debug from './debug';
import ObjectAssign from 'es6-object-assign';

// ie11 object assign polyfill
// TODO: figure out why this has to explicitly be in this file. - Author?
ObjectAssign.polyfill();

// Used to create dot character replacements for submit buttons
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat
import StringRepeat from 'string.prototype.repeat';

// Import all JS components explicitly.
// Required
// Launch TODO: Comment out any unused components for production. -DP
// Global utility components (REQUIRED)
import $$ from 					'../components/component_cached-dom-elements/cached-dom-elements';
import Analytics from 			'../components/component_analytics/analytics';
import CF7 from 				'../components/component_cf7/cf7';
import LoadMore from 			'../components/component_load-more/load-more';
import GDPR from 				'../components/component_gdpr/gdpr';
import Parallax from 			'../components/component_parallax/parallax';
import ScrollIn from 			'../components/component_scroll-in/scroll-in';
import ScrollTo from 			'../components/component_scroll-to/scroll-to';
import WCAG from	 			'../components/component_wcag/wcag';

// Interactive components
import Bookmark from 			'../components/component_bookmark/bookmark';
import CalendarLink from 		'../components/component_calendarlink/calendarlink';
import Nav from 				'../components/component_nav/nav';
import Reserve from 			'../components/component_reserve/reserve';
import Share from 				'../components/component_share/share';
import Timer from 				'../components/component_timer/timer';

// Gutenberg block components
import AnimatedGif from 		'../gutenberg/blocks/block_animated-gif/swap-gif';
import PopupController from  '../gutenberg/blocks/block_popup/popup-controller';
import Video from 				'../gutenberg/blocks/block_video/play-video';
import VideoThumb from 			'../gutenberg/components/gb-component_background-options/video-thumb';

// Project Specific
const childComponents = FLEX.ChildComponents || {};

// Add your components here so they get loaded.
// Make sure to import them above first.
FLEX.Components = Object.assign({
	'Analytics': Analytics,
	'AnimatedGif': AnimatedGif,
	'Bookmark': Bookmark,
	'CalendarLink': CalendarLink,
	'CF7': CF7,
	'GDPR': GDPR,
	'LoadMore': LoadMore,
	'Nav': Nav,
	'Reserve': Reserve,
	'ScrollIn': ScrollIn,
	'ScrollTo': ScrollTo,
	'Share': Share,
	'Timer': Timer,
	'Parallax': Parallax,
	'PopupController': PopupController,
	'Video': Video,
	'VideoThumb': VideoThumb,
	'WCAG': WCAG
}, childComponents);

FLEX.Loader = {};

// Components with JS functionality can be defined via data attribute.
// Supports multiple components separated by space.
FLEX.Loader.loadComponents = function () {
	FLEX.Loader.loadedComponents = [];

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
			if (typeof FLEX.Components[componentName] === 'undefined') {
				return;
			}

			let params = $this.data('component-options') || {};
			let instance = new FLEX.Components[componentName]($this, params);

			// Save component instance references in a global manifest.
			if (typeof FLEX.Components[componentName] !== 'undefined') {
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

FLEX.Loader.loadComponent = function ($el) {
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
		if (typeof FLEX.Components[componentName] === 'undefined') {
			console.log('FLEX.js ‹ loadComponents(), unknown component: ', componentName);
			return;
		}

		let params = $el.data('component-options') || {};
		let instance = new FLEX.Components[componentName]($el, params);
	});
};


export default FLEX.Loader;
