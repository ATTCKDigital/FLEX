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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($, jQuery) {

Object.defineProperty(exports, "__esModule", {
	value: true
});
/**
 * Caching function
 * Usage: $$({selector}) returned cached element if previously used
 * or caches upon first use.
 */
window.cachedDomElements = function () {
	var cachedElements = {};

	// Using the HTML element for data storage
	var $EL = $('html');

	function get(name) {
		// Return everything if param is empty
		if (typeof name === 'undefined') {
			return cachedElements;
		}

		// If the element hasn't been cached yet, cache it
		// If it's not a jQuery object, assume it should be cached within
		// the current component context ($EL)
		if (typeof cachedElements[name] === 'undefined') {
			if (name instanceof jQuery) {
				return set(name, name);
			} else {
				return set(name, $EL.find(name));
			}
		}

		// Otherwise just give them what they asked for
		return cachedElements[name];
	}

	function reset(name) {
		if (!name) {
			cachedElements = {};
		}

		delete cachedElements[name];
	}

	function set(name, value) {
		cachedElements[name] = value;
		return cachedElements[name];
	}

	return {
		'get': get,
		'reset': reset,
		'set': set
	};
}();

var $$ = function $$(el) {
	return window.cachedDomElements.get(el);
};

exports.default = $$;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(0)))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var Debug = {
	// Set to true temporarily to enable custom debugging tools.
	debug: false,

	breakpoints: ["global", "small", "medium", "large", "xl", "2xl", "3xl", "4xl", "5xl"]
};

exports.default = Debug;

/***/ }),
/* 3 */
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
var FLEXLS = clientNamespace;

FLEXLS.Globals = {};

exports.default = FLEXLS;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _flexls = __webpack_require__(3);

var _flexls2 = _interopRequireDefault(_flexls);

var _cachedDomElements = __webpack_require__(1);

var _cachedDomElements2 = _interopRequireDefault(_cachedDomElements);

var _debug = __webpack_require__(2);

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_flexls2.default.GlobalEvents = {};

_flexls2.default.GlobalEvents.initGlobalEvents = function () {
	var G = _flexls2.default.Globals;
	var $window = $(window);
	var self = this;

	/*** Detect scrolling and scrolling direction ***/
	//USAGE
	// Bind to scroll
	// $(document.body).bind('FLEXLS.scroll', function (e, data) {
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

		$(document.body).trigger('FLEXLS.scroll', {
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
	$(document.body).on('FLEXLS.resize', detectOrientation);

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
	$(document.body).on('FLEXLS.resize', detectViewportHeightRatio);

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

		$(document.body).trigger('FLEXLS.resize', {
			'e': e,
			'viewportHeight': G.viewportHeight,
			'viewportWidth': G.viewportWidth
		});
	});
};

// Declares FLEXLS.GlobalEvents.xsOnly(), smOnly(), etc for running
// breakpoint-specific functionality.
$.each(_debug2.default.breakpoints, function (i, val) {
	_flexls2.default.GlobalEvents['only' + val] = function (f) {
		if (!(0, _cachedDomElements2.default)('.breakpoint.' + val).is(':visible')) {
			return;
		}

		f();
	};
});

// Add debug utilities to the page when Debug.debug is true.
if (_debug2.default.debug === true) {
	$(document.body).addClass("debug").on("FLEXLS.resize", function () {

		_flexls2.default.GlobalEvents.onlysmall(function () {
			$(".breakpoint-current").show().text("Breakpoint is SM");
		});

		_flexls2.default.GlobalEvents.onlymedium(function () {
			$(".breakpoint-current").show().text("Breakpoint is MD");
		});

		_flexls2.default.GlobalEvents.onlylarge(function () {
			$(".breakpoint-current").show().text("Breakpoint is LG");
		});

		_flexls2.default.GlobalEvents.onlyxl(function () {
			$(".breakpoint-current").show().text("Breakpoint is XL");
		});

		_flexls2.default.GlobalEvents.only2xl(function () {
			$(".breakpoint-current").show().text("Breakpoint is 2XL");
		});

		_flexls2.default.GlobalEvents.only3xl(function () {
			$(".breakpoint-current").show().text("Breakpoint is 3XL");
		});

		_flexls2.default.GlobalEvents.only4xl(function () {
			$(".breakpoint-current").show().text("Breakpoint is 4XL");
		});

		_flexls2.default.GlobalEvents.only5xl(function () {
			$(".breakpoint-current").show().text("Breakpoint is 5XL");
		});
	});
}

// Trigger scroll event in case anything is in a partial-state waiting
// for scroll (e.g., initial nav opacity)
$(window).trigger('resize');

exports.default = _flexls2.default.GlobalEvents;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _flexls = __webpack_require__(3);

var _flexls2 = _interopRequireDefault(_flexls);

var _debug = __webpack_require__(2);

var _debug2 = _interopRequireDefault(_debug);

var _cachedDomElements = __webpack_require__(1);

var _cachedDomElements2 = _interopRequireDefault(_cachedDomElements);

var _parallax = __webpack_require__(9);

var _parallax2 = _interopRequireDefault(_parallax);

var _elementsInViewport = __webpack_require__(8);

var _elementsInViewport2 = _interopRequireDefault(_elementsInViewport);

var _nav = __webpack_require__(6);

var _nav2 = _interopRequireDefault(_nav);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Project Specific

// Add your components here so they get loaded.
// Make sure to import them above first.


// Import all JS components explicitly.

//Required
_flexls2.default.Components = {
	'Parallax': _parallax2.default,
	'ElementsInViewport': _elementsInViewport2.default,
	'Nav': _nav2.default
};

_flexls2.default.Loader = {};

_flexls2.default.Loader.loadComponents = function () {
	_flexls2.default.Loader.loadedComponents = [];

	var self = this;

	$('.component').each(function () {
		// Gracefully fail if no component name has been defined
		if (!$(this).attr('data-component-name')) {
			return;
		}

		var $this = $(this);
		var componentNames = $this.attr('data-component-name').split(',');

		// A stack of JS components associated with this DOM element.
		var instances = $this.data('component-instances');

		if (!instances) {
			instances = [];
		}

		$.each(componentNames, function (i, el) {
			var componentName = el;
			var params = $this.data('component-options') || {};
			// console.log(componentName);
			var instance = new _flexls2.default.Components[componentName]($this, params);

			// Save component instance references in a global manifest.
			if (typeof _flexls2.default.Components[componentName] !== 'undefined') {
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

exports.default = _flexls2.default.Loader;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function($) {//Global Nav & Header behavior
function Nav($el) {
	//cache the body
	var $body = $('body');

	function navToggle() {
		// Open nav on hamburger click
		$body.toggleClass('navOpen');
		$el.find('.openNav').removeClass('openSubNav');
		$el.find('.menu-back').removeClass('openSubNav');
		$body.removeClass('searchOpen');
	}

	function searchToggle() {
		// Open search on click
		$body.toggleClass('searchOpen');
		$body.removeClass('navOpen');
	}

	function toggleSubNav(e) {
		e.preventDefault();
		$(this).parent().toggleClass('openSubNav').siblings().removeClass('openSubNav');
		$body.toggleClass('openSubNav');
	}

	function openSubNav(e) {
		e.preventDefault();
		$(this).addClass('openSubNav').siblings().removeClass('openSubNav');
		$body.addClass('openSubNav');
	}

	function closeSubNav() {
		$el.find('.menu-item-has-children').removeClass('openSubNav');
		$body.removeClass('openSubNav');
	}
	
	function userScrolled() {
		//check if user is scrolled on page load so that the nav is hidden when they refresh the page
		if ($(window).scrollTop() >= 10) {
			$('body').addClass('hideNav');
		}
	}

	function scrolledNav($el) {
		// Bind to scroll
		$(document.body).bind('FLEXLS.scroll', function (e, data) {
			// Show/hide nav bar background color
		    var scroll = data.currentScrollTop;

		    // Hide nav entirely once scrolled past a certain distance
		    if (scroll >= 300) {
		    	if (!$('body').hasClass('hideNav')) {
		    		$('body').addClass('hideNav');
		    	}
		    }

		    // Show again as soon as they start scrolling back up
		    if (data.scrollDirection === 'up') {
		    	$('body').removeClass('hideNav');
		    }
		});
	}

	function logoColor($el) {

		// Change the logo color as you scroll down the page. Can also be used to change the hamburger color. Make color changes using CSS.
		var row = $('.component-row');

		var footer = $('.global-footer').offset().top


		$(document.body).bind('FLEXLS.scroll', function (e, data) {
			var viewportHeight = data.viewportHeight;
			var scrollTop = data.currentScrollTop;

			$(row).each(function() {
				var rowTop = $(this).offset().top;
				var logoColor = $(this).data('logo-color');

				if (rowTop <= scrollTop + 20 ) {
					if(logoColor == 'logo-color-white') {
						$body.addClass('logoLight').removeClass('logoDark');
					}

					if(logoColor == 'logo-color-dark') {
						$body.addClass('logoDark').removeClass('logoLight');
					}
				}
				if(scrollTop == 0 ) {
					$body.removeClass('logoDark logoLight');
				}

			});

			if( scrollTop >= footer ) {
		    	$body.addClass('logoLight').removeClass('logoDark');
			}

		});
	}



	function bindEvents() {
		$el = $el;
		$el.find('.hamburger-wrapper').on('click', navToggle);
		
		scrolledNav();		

		//Use this if subnav is triggered on hover
		if($(window).width() > 1024) {
			$el.find('.menu-items > .menu-item-has-children').on('mouseenter', openSubNav);

			// If we're hovering outside the nav, close the nav.
			$(document).on('mouseover',function (e) {
				let $target = $(e.target);

				if (!$target.is('.main-header') && !$target.closest('.main-header').length) {
					closeSubNav(e);
				}

				if (!$target.is('.menu-item-has-children') && !$target.closest('.menu-item-has-children').length) {
					closeSubNav(e);
				}
			});

		} else {
			$el.find('.menu-item-has-children > a').on('click', toggleSubNav);
			
		}
	}

	this.init = function ($el) {
		bindEvents();

		return this;
	}

	return this.init($el);
}

/* harmony default export */ __webpack_exports__["default"] = (Nav);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__webpack_provided_window_dot_jQuery) {

var _globalEvents = __webpack_require__(4);

var _globalEvents2 = _interopRequireDefault(_globalEvents);

var _loadComponents = __webpack_require__(5);

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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _cachedDomElements = __webpack_require__(1);

var _cachedDomElements2 = _interopRequireDefault(_cachedDomElements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ElementsInViewport($el) {
	var _inViewElementsOffsetIndex = [];
	var _scrollstopTimer = 0;
	var _currentScrollTop = $(window).scrollTop();
	var _viewportHeight = $(window).outerHeight();

	function bindEvents() {
		$(document.body).on('FLEXLS.scroll', function (e, data) {
			// Reset timer to trigger ElementsInViewport
			_scrollstopTimer = 0;

			_currentScrollTop = data.currentScrollTop;

			// Check the current scroll offset against the DOM element offset array
			inViewElements();
		});

		// Include check for page resize as well since that
		// can potentially cause the page to scroll
		$(document.body).on('FLEXLS.resize', function () {
			// Reset timer to trigger ElementsInViewport
			_scrollstopTimer = 0;

			_viewportHeight = $(window).outerHeight();

			indexAllElements();
		});
	}

	function checkTimer() {
		// Check if user stopped scrolling for more than two seconds and show anything that
		// would be visible but hasn't hit the vertical scroll threshold yet
		if (_scrollstopTimer > 500 && _scrollstopTimer !== 1) {
			inViewElements(_viewportHeight);

			// Stop the timer once it runs once, until the next time the user scrolls
			// which will trigger this again
			_scrollstopTimer = 1;
		} else if (_scrollstopTimer !== 1) {
			// Increment timer
			_scrollstopTimer = _scrollstopTimer + 100;
		}
	}

	function inViewElements(scrollThreshold) {
		// Set Default scroll threshold
		if (typeof scrollThreshold === 'undefined') {
			scrollThreshold = _viewportHeight * .8;
		}

		$.each((0, _cachedDomElements2.default)('.prepare-in-view'), function (index, value) {
			var verticalScrollThreshold = _currentScrollTop + scrollThreshold;
			var thisElementOffset = $(this).offset().top;

			// Add class to elements once they are halfway up the screen
			if (thisElementOffset < verticalScrollThreshold) {
				$(this).addClass('element-in-view');
			}
		});
	}

	function hideAllElements() {
		// First, hide all elements
		$('body').find('h1, h2, h3, h4, h5, p, span').addClass('prepare-in-view');

		// Add elements that need to be manipulated here:
		$('body').find('h1, h2, h3, h4, h5, p, span').each(function (index, value) {
			if (!$(this).hasClass('no-element-in-view')) {
				$(this).addClass('prepare-in-view');
			}
		});

		// Show protected areas
		$('.global-header').addClass('no-element-in-view');
		$('.global-footer').addClass('no-element-in-view');

		indexAllElements();
	}

	function indexAllElements() {
		$('.element-in-view').each(function () {
			// Convert offset values to strings since they're floats and not a valid array ID
			_inViewElementsOffsetIndex.push({
				'offset': $(this).offset().top,
				'element': $(this)
			});
		});
	}

	this.init = function ($el) {
		bindEvents();
		hideAllElements();

		// Start scroll timer
		setInterval(function () {
			checkTimer();
		}, 100);

		return this;
	};

	return this.init($el);
} /**
   * Element in Viewport
   * Tracks when an element is in the view port.
   * Default behavior is to fade in specific elements - this behavior/animation/transition is handled via css
   **/
exports.default = ElementsInViewport;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _cachedDomElements = __webpack_require__(1);

var _cachedDomElements2 = _interopRequireDefault(_cachedDomElements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Parallax($el) {
	var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	var defaults = {};

	// Merge any options set on the DOM element with 
	// the component defaults set above
	var options = $.extend(true, {}, defaults, params);
	var viewportHeight = $(window).outerHeight();
	var scrollStartThreshold = parseInt($el.attr("data-scroll-start"), 10) - viewportHeight * .2;
	var $elOuterHeight = $el.outerHeight();

	function bindEvents() {
		// Start offsetting the background-position-y value 
		// on scroll when we reach data-scroll-start		
		$(document.body).on('FLEXLS.scroll', parallaxGo);

		// Prevent full height hero from affecting body height when 
		// scrolling on mobile, which due to the changing size of the
		// address bar, causes jankyness all the way down the page
		var viewportHeight = $(window).outerHeight(true);
		$('.component-row-height-full-height').css('height', viewportHeight * .7);
	}

	function calculateScrollStart() {
		// Based on container height relative to viewport center
		var containerHeight = $el.outerHeight();
		var containerOffsetTop = $el.offset().top;
		viewportHeight = $(window).outerHeight();
		scrollStartThreshold = viewportHeight / 2 + containerHeight / 2;

		// Determine when image container top reaches the scroll start point
		$el.attr('data-scroll-start', scrollStartThreshold);
	}

	function parallaxGo(e, data) {
		var distanceToViewportTop = $el.offset().top - data.currentScrollTop;
		var distanceScrolled = data.currentScrollTop;

		if (scrollStartThreshold > distanceToViewportTop) {
			// Determine how much to offset the background position 
			// based on scroll distance relative to $el height
			// % per px, need to move 10%
			var relativePercentOfContainerToViewport = $elOuterHeight / viewportHeight;
			var percentToScrollPerPixel = relativePercentOfContainerToViewport / 10;
			var totalPixelsScrolledWithinThreshold = scrollStartThreshold - distanceToViewportTop;
			var offsetPerPxScrolled = $elOuterHeight * .01;
			var percentOffsetFromScroll = (data.currentScrollTop - scrollStartThreshold) / offsetPerPxScrolled;

			// Set default offset
			var defaultOffset = 0;
			var finalOffset = defaultOffset - percentToScrollPerPixel * totalPixelsScrolledWithinThreshold / 2;
			var lowerBounds = -100;
			var upperBounds = 100;

			// console.log('finalOffset, lowerBounds, upperBounds: ', finalOffset, lowerBounds, upperBounds);

			// If we're within the sweet spot
			if (finalOffset > lowerBounds && finalOffset < upperBounds) {
				// Move the background
				finalOffset = finalOffset - percentToScrollPerPixel * totalPixelsScrolledWithinThreshold / 2;
			}

			// Enforce lower bounds
			if (finalOffset < lowerBounds) {
				finalOffset = lowerBounds;
			}

			// Enforce upper bounds
			if (finalOffset > upperBounds) {
				finalOffset = upperBounds;
			}

			// console.log('Parallax.js > finalOffset: ', finalOffset, $el.prop('nodeName'));
			// TODO: (DP) Add different effects for each element
			if ($el.prop('nodeName') === 'DIV') {
				var validContent = true;

				// Don't apply this effect to...
				switch (true) {
					// containers with H1 inside
					case $el.find('h1').length > 0:
						validContent = false;
						break;

					// elements with .no-parallax class and their children
					case $el.hasClass('.no-parallax') || $el.find('.no-parallax').length > 0:
						validContent = false;
						break;

					// elements with .no-parallax parents
					case $el.closest('.no-parallax').length > 0:
						validContent = false;
						break;

					// map elements
					case $el.find('#mapbox').length > 0:
						validContent = false;
						break;

					// map elements
					case $el.find('.component-map').length > 0:
						validContent = false;
						break;

					// elements with forms in them
					case $el.find('form').length > 0:
						validContent = false;
						break;

					default:
						break;
				}

				if (validContent) {
					$el.css({
						'position': 'relative',
						// 'top': (finalOffset * 1.5) + 'px'
						'transform': 'translate3d(0, ' + finalOffset * 1.5 + 'px' + ', 0)'
					});
				}
			} else {
				// Move background forwards
				$el.css({
					'background-position': 'center ' + finalOffset * -1 + '%'
				});
			}
		}
	}

	// Animations won't apply to elemnents that aren't 
	// positioned with a default top value
	function setDefaultStyles() {
		$el.css({
			'position': 'relative',
			'top': 0
		});
	}

	this.init = function ($el) {
		bindEvents();
		calculateScrollStart();
		// setDefaultStyles();

		// Make sure any visible parallax elements are properly set on 
		// page load otherwise they jump on first scroll
		parallaxGo({}, {
			'currentScrollTop': $(window).scrollTop()
		});

		return this;
	};

	return this.init($el);
} /**
   * Parallax component
   */
exports.default = Parallax;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map