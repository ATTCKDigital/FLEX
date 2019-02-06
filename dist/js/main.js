/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*** IMPORTS FROM imports-loader ***/
var define = false;

/**
 * Declares the global namespace, and the ns() utility for declaring
 * sub-namespaces.
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var clientNamespace = {};
var ATTCK = clientNamespace;

ATTCK.Globals = {};

exports.default = ATTCK;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _attck = __webpack_require__(1);

var _attck2 = _interopRequireDefault(_attck);

var _debug = __webpack_require__(5);

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_attck2.default.GlobalEvents = {};

_attck2.default.GlobalEvents.initGlobalEvents = function () {
	var G = _attck2.default.Globals;
	var $window = $(window);
	var self = this;

	/*** Detect scrolling and scrolling direction ***/
	//USAGE
	// Bind to scroll
	// $(document.body).bind('ATTCK.scroll', function (e, data) {
	// 		// if scroll is past or before x position
	// 	    if (scroll >= 300) {
	// 	    	your code here
	// 	    }
	//
	// 	    // detect scroll direction
	// 	    if (data.scrollDirection === 'up') {
	// 	    	your code here
	// 	    }
	// 	});

	G.currentScrollTop = $window.scrollTop();
	G.lastScrollTop = $window.scrollTop();
	G.viewportHeight = $window.outerHeight();
	G.viewportWidth = $window.outerWidth();
	G.scrollInProgress = false;

	$window.on('scroll', function (e) {
		G.currentScrollTop = $window.scrollTop();

		// Limit how often this fires, so we don't have the JS double-firing.
		if (Math.abs(G.currentScrollTop - G.lastScrollTop) < 10) {
			return;
		}

		$(document.body).trigger('ATTCK.scroll', {
			'e': e,
			'currentScrollTop': G.currentScrollTop,
			'viewportHeight': G.viewportHeight,
			'scrollDirection': G.currentScrollTop > G.lastScrollTop ? 'down' : 'up'
		});

		G.lastScrollTop = G.currentScrollTop;
	});

	/*** Detect screen orientation ***/
	function detectOrientation() {

		// Default is portrait
		var orientation = 'orientation-portrait';
		var videoOrientation = 'video-portrait';
		var mapOrientation = 'map-portrait';
		var screenHeight = 'tall-screen';

		// Landscape
		if (G.viewportWidth > G.viewportHeight) {
			orientation = 'orientation-landscape';
		}

		// BG video aspect ratio detection
		if (G.viewportWidth / G.viewportHeight > 1.77) {
			videoOrientation = 'video-landscape';
		}

		// Remove previous detections
		$(document.body).removeClass('orientation-portrait orientation-landscape video-portrait video-landscape short-screen tall-screen');

		// Set new detection values
		$(document.body).addClass(orientation + ' ' + videoOrientation + ' ' + mapOrientation + ' ' + screenHeight);
	}

	// ...on load
	detectOrientation();

	// ...and screen resize
	$(document.body).on('ATTCK.resize', detectOrientation);

	// Detect whether body content is taller than viewport
	function detectViewportHeightRatio() {
		// Tab body if content height is taller than viewport
		var totalComponentHeight = 0;

		$('.component').each(function (index, value) {
			// Exclude the hidden modal which doesn't take up any height
			if (!$(this).hasClass('component-contact-modal')) {
				totalComponentHeight += $(this).outerHeight(true);
			}
		});

		if (totalComponentHeight > G.viewportHeight) {
			// Set new detection
			$(document.body).addClass('body-content-height-is-taller-than-viewport');
		} else {
			// Remove previous detection
			$(document.body).removeClass('body-content-height-is-taller-than-viewport');
		}
	}

	// ...on load
	detectViewportHeightRatio();

	// ...and screen resize
	$(document.body).on('ATTCK.resize', detectViewportHeightRatio);

	// Tag body once page has loaded for one-time page load functions
	$(window).on('load', function () {
		$(document.body).addClass('window-loaded');

		// Adding for QB-OBS blackout modal fade out on load animation (2sec)
		setTimeout(function () {
			$(document.body).addClass('window-has-been-loaded-for-two-seconds');
		}, 2000);

		// Adding for QB-OBS hero page load animation (5sec)
		setTimeout(function () {
			$(document.body).addClass('window-has-been-loaded-for-five-seconds');
		}, 5000);
	});

	// Tag body once page has loaded for one-time page load functions
	$(function () {
		$(document.body).addClass('dom-loaded');

		// After page has loaded and x seconds have elapsed. Set time as needed or create multiple time functions/classes
		setTimeout(function () {
			$(document.body).addClass('dom-has-been-loaded-for-five-seconds');
		}, 5000);
	});

	// Save the viewport height only as neccessary when it changes.
	$window.resize(function (e) {
		G.viewportHeight = $window.outerHeight();
		G.viewportWidth = $window.outerWidth();

		$(document.body).trigger('ATTCK.resize', {
			'e': e,
			'viewportHeight': G.viewportHeight,
			'viewportWidth': G.viewportWidth
		});
	});
};

// Declares ATTCK.GlobalEvents.xsOnly(), smOnly(), etc for running
// breakpoint-specific functionality.
$.each(_debug2.default.breakpoints, function (i, val) {
	_attck2.default.GlobalEvents[val + 'Only'] = function (f) {
		if (!$$('.breakpoint.' + val).is(':visible')) {
			return;
		}

		f();
	};
});

// Add debug utilities to the page when Debug.debug is true.
if (_debug2.default.debug === true) {
	$(document.body).addClass("debug").on("ATTCK.resize", function () {
		_attck2.default.GlobalEvents.xsOnly(function () {
			$(".breakpoint-current").show().text("Breakpoint is XS");
		});

		_attck2.default.GlobalEvents.smOnly(function () {
			$(".breakpoint-current").show().text("Breakpoint is SM");
		});

		_attck2.default.GlobalEvents.mdOnly(function () {
			$(".breakpoint-current").show().text("Breakpoint is MD");
		});

		_attck2.default.GlobalEvents.lgOnly(function () {
			$(".breakpoint-current").show().text("Breakpoint is LG");
		});

		_attck2.default.GlobalEvents.xlOnly(function () {
			$(".breakpoint-current").show().text("Breakpoint is XL");
		});
	});
}

// Trigger scroll event in case anything is in a partial-state waiting
// for scroll (e.g., initial nav opacity)
$(window).trigger('resize');

exports.default = _attck2.default.GlobalEvents;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// import ATTCK from 'attck';
// import Debug from 'debug';

// // Import all JS components explicitly.

// //Required
// import $$ from 'cached-dom-elements.js';
// import Parallax from 'parallax.js';
// import ElementsInViewport from 'elements-in-viewport.js';
// import Nav from '../components/component_nav/nav.js';

// //Project Specific
// import Test from '../components/component_test/test.js';

// // Add your components here so they get loaded.
// // Make sure to import them above first.
// ATTCK.Components = {
// 	'Parallax': Parallax,
// 	'ElementsInViewport': ElementsInViewport,
// 	'Nav': Nav,
// 	'Test': Test,
// };

// ATTCK.Loader = {};

// ATTCK.Loader.loadComponents = function () {
// 	ATTCK.Loader.loadedComponents = [];

// 	var self = this;

// 	$('.component').each(function () {
// 		// Gracefully fail if no component name has been defined
// 		if (!$(this).attr('data-component-name')) {
// 			return;
// 		}

// 		var $this = $(this);
// 		var componentNames = $this.attr('data-component-name').split(',');

// 		// A stack of JS components associated with this DOM element.
// 		let instances = $this.data('component-instances');

// 		if (!instances) {
// 			instances = [];
// 		}

// 		$.each(componentNames, function (i, el) {
// 			let componentName = el;
// 			let params = $this.data('component-options') || {};
// 			// console.log(componentName);
// 			let instance = new ATTCK.Components[componentName]($this, params);

// 			// Save component instance references in a global manifest.
// 			if (typeof ATTCK.Components[componentName] !== 'undefined') {
// 				self.loadedComponents.push({
// 					'instance': instance
// 				});

// 				instances.push(instance);
// 			}
// 		});

// 		// Save component instances to the DOM element.
// 		$this.data('component-instances', instances);
// 	});
// };


// export default ATTCK.Loader;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__webpack_provided_window_dot_jQuery) {

var _globalEvents = __webpack_require__(2);

var _globalEvents2 = _interopRequireDefault(_globalEvents);

var _loadComponents = __webpack_require__(3);

var _loadComponents2 = _interopRequireDefault(_loadComponents);

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

__webpack_provided_window_dot_jQuery = _jquery2.default;

// Import jQuery and make it a global object
//oka todo: jquery from node modules, test if we need the 3 lines of code below.

window.$ = _jquery2.default;
// window.lodash = _.noConflict(); // remove lodash underscore conflict

// Import jQuery plugins, then make them global.

// Initiate Global Component Loader and Global Events.
(0, _jquery2.default)(function () {
	_loadComponents2.default.loadComponents();
	_globalEvents2.default.initGlobalEvents();
});

//Resolves persisted cache issue in safari
window.onpageshow = function (event) {
	if (event.persisted) {
		window.location.reload();
	} else {}
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _attck = __webpack_require__(1);

var _attck2 = _interopRequireDefault(_attck);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Debug = {
	// Set to true temporarily to enable custom debugging tools.
	debug: false,

	breakpoints: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"]
};

exports.default = Debug;

/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map