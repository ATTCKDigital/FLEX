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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
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

/**
 * DEPRECATED. Use import / export instead. 
 *
 * Namespace function. Creates the namespace passed to it, if it doesn't exist.
 */
ATTCK.namespace = function () {
	var ln = arguments.length,
	    i,
	    value,
	    x,
	    xln,
	    parts,
	    object;

	for (i = 0; i < ln; i++) {
		value = arguments[i];
		parts = value.split(".");
		object = window[parts[0]] = Object(window[parts[0]]);

		for (x = 1, xln = parts.length; x < xln; x++) {
			object = object[parts[x]] = Object(object[parts[x]]);
		}
	}
	return object;
};

ATTCK.ns = ATTCK.namespace;

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

var _config = __webpack_require__(6);

var _config2 = _interopRequireDefault(_config);

var _nav = __webpack_require__(3);

var _nav2 = _interopRequireDefault(_nav);

var _test = __webpack_require__(4);

var _test2 = _interopRequireDefault(_test);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Add your components here so they get loaded.
// Make sure to import them above first.


// Import all JS components explicitly.
// import $$ from './components/cached-dom-elements';
// import Analytics from './components/analytics';
// import FadeInElements from './components/fade-in-elements';
_attck2.default.Components = {
  // 'Analytics': Analytics,
  // 'FadeInElements': FadeInElements,
  'Nav': _nav2.default,
  'Test': _test2.default
};

_attck2.default.Utils = {};

_attck2.default.Utils.loadComponents = function () {
  _attck2.default.Utils.loadedComponents = [];

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
      var instance = new _attck2.default.Components[componentName]($this, params);

      // Save component instance references in a global manifest.
      if (typeof _attck2.default.Components[componentName] !== 'undefined') {
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

_attck2.default.Utils.initGlobalEvents = function () {
  var G = _attck2.default.Globals;
  var $window = $(window);
  var self = this;

  G.currentScrollTop = $window.scrollTop();
  G.lastScrollTop = $window.scrollTop();
  G.viewportHeight = $window.outerHeight();
  G.viewportWidth = $window.outerWidth();
  G.scrollInProgress = false;

  // Trigger a custom event when scrolling.
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

  // Detect screen orientation
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

    // Map video aspect ratio detection
    if (G.viewportWidth / G.viewportHeight > 1.41) {
      mapOrientation = 'map-landscape';
    }

    // Screen height for compass sizing
    if (G.viewportHeight < 900 && G.viewportWidth > 1100) {
      screenHeight = 'short-screen';
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
  function detectContentVsViewportHeightRatio() {
    // Tab body if content height is taller than viewport
    // TODO: (DP) Change this to be agnostic to QB_OBS
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
  detectContentVsViewportHeightRatio();

  // ...and screen resize
  $(document.body).on('ATTCK.resize', detectContentVsViewportHeightRatio);

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

    // Adding for QB-OBS blackout modal fade out on load animation (2sec)
    setTimeout(function () {
      $(document.body).addClass('dom-has-been-loaded-for-two-seconds');
    }, 2000);

    // Adding for QB-OBS hero page load animation (5sec)
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

  // Listen to WPCF7 Events.
  function FormEvents() {
    document.addEventListener('wpcf7mailsent', function (event) {
      $('.wpcf7').addClass('hideForm');
      $('body').find('.component-contact-thankyou').addClass('showThankyou');
    });
  }
  FormEvents();

  // Init Analytics
  // TODO: (DP) User event tracking goes here
  var instance = new _attck2.default.Components['Analytics']($('body'), {});

  //Warning pop-up when user clicks on a link that goes to a 3rd party site.
  //These links will ALL have the class "leaveSite"
  function open3rdpartyPopup(e) {
    //prevent the link from going to the new site
    e.preventDefault();
    //get the href of the clicked link
    var link = $(this).attr('href');
    //replace the "Ok" button href with the clicked link href
    $('body').find('.leave').attr('href', link);
    //open the pop-up
    $('.leave-site-popup').addClass('popupOpen');
  }

  function close3rdpartyPopup() {
    //close the popup if cancel is clicked
    $('.leave-site-popup').removeClass('popupOpen');
  }

  //when user clicks on 3rd party link
  $('body').find('.leaveSite').on('click', open3rdpartyPopup);
  //when user clicks cancel on 3rd party pop-up
  $('body').find('.cancel').on('click', close3rdpartyPopup);
  //when user clicks ok on 3rd party pop-up
  $('body').find('.leave').on('click', close3rdpartyPopup);
};

// Declares ATTCK.Utils.xsOnly(), smOnly(), etc for running
// breakpoint-specific functionality.
$.each(_config2.default.breakpoints, function (i, val) {
  _attck2.default.Utils[val + 'Only'] = function (f) {
    if (!$$('.breakpoint.' + val).is(':visible')) {
      return;
    }

    f();
  };
});

// Add debug utilities to the page when Config.debug is true.
if (_config2.default.debug === true) {
  $(document.body).addClass("debug").on("ATTCK.resize", function () {
    _attck2.default.Utils.xsOnly(function () {
      $(".breakpoint-current").show().text("Breakpoint is XS");
    });

    _attck2.default.Utils.smOnly(function () {
      $(".breakpoint-current").show().text("Breakpoint is SM");
    });

    _attck2.default.Utils.mdOnly(function () {
      $(".breakpoint-current").show().text("Breakpoint is MD");
    });

    _attck2.default.Utils.lgOnly(function () {
      $(".breakpoint-current").show().text("Breakpoint is LG");
    });

    _attck2.default.Utils.xlOnly(function () {
      $(".breakpoint-current").show().text("Breakpoint is XL");
    });
  });
}

// Trigger scroll event in case anything is in a partial-state waiting
// for scroll (e.g., initial nav opacity)
$(window).trigger('resize');

exports.default = _attck2.default.Utils;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_attck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_attck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_attck__);


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
		//check if user is scrolled on page load (for refresh)
		if ($(window).scrollTop() >= 10) {
			$('body').addClass('hideNav');
		}
	}


	function scrolledNav($el) {
		// Bind to scroll
		$(document.body).bind('ATTCK.scroll', function (e, data) {
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

		// change the logo color as you scroll down the page.
		var $body = $('body');

		var row = $('.component-row');

		var footer = $('footer.page-footer').offset().top


		$(document.body).bind('ATTCK.scroll', function (e, data) {
			var viewportHeight = data.viewportHeight;
			var scrollTop = data.currentScrollTop;

			$(row).each(function() {
				var rowTop = $(this).offset().top;
				var logoColor = $(this).data('logo-color');

				if (rowTop <= scrollTop + 20 ) {
					if(logoColor == 'row-text-white') {
						$body.addClass('logoLight').removeClass('logoDark');
					}

					if(logoColor == 'row-text-black') {
						$body.addClass('logoDark').removeClass('logoLight');
					
						if($body.hasClass('page-amenities') && $(this).last()) {
							if($(window).width() < 1023) {
								$body.addClass('logoLight').removeClass('logoDark');
							}
						}
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
		$el.find('.searchToggle').on('click', searchToggle);
		

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
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_attck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_attck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_attck__);


function Test($el) {

  this.init = function ($el) {
    return this;
  }

  return this.init($el);
}

/* harmony default export */ __webpack_exports__["default"] = (Test);


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__webpack_provided_window_dot_jQuery) {

var _utils = __webpack_require__(2);

var _utils2 = _interopRequireDefault(_utils);

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

__webpack_provided_window_dot_jQuery = _jquery2.default;

// Import jQuery and make it a global object

window.$ = _jquery2.default;
// window.lodash = _.noConflict(); // remove lodash underscore conflict
// Import jQuery plugins, then make them global.
// import 'slick-carousel';

// Global component loader.
(0, _jquery2.default)(function () {
		_utils2.default.loadComponents();
		_utils2.default.initGlobalEvents();
});

//Resolves persisted cache issue in safari
window.onpageshow = function (event) {
		if (event.persisted) {
				window.location.reload();
		} else {}
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _attck = __webpack_require__(1);

var _attck2 = _interopRequireDefault(_attck);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Config = {
	// Set to true temporarily to enable custom debugging tools.
	debug: false,

	breakpoints: ["xs", "sm", "md", "lg", "xl"]
}; /**
    * Global configuration options go here.
    */
exports.default = Config;

/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map