import ATTCK from 'attck';
import Debug from 'debug';

ATTCK.GlobalEvents = {};

ATTCK.GlobalEvents.initGlobalEvents = function () {
	var G = ATTCK.Globals;
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
	G.lastScrollTop	= $window.scrollTop();
	G.viewportHeight   = $window.outerHeight();
	G.viewportWidth	= $window.outerWidth();
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
			'viewportHeight':   G.viewportHeight,
			'scrollDirection':  (G.currentScrollTop > G.lastScrollTop ? 'down' : 'up')
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
		if ((G.viewportWidth / G.viewportHeight) > 1.77) {
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
	$window.resize(function(e) {
		G.viewportHeight = $window.outerHeight();
		G.viewportWidth  = $window.outerWidth();

		$(document.body).trigger('ATTCK.resize', {
			'e': e,
			'viewportHeight': G.viewportHeight,
			'viewportWidth': G.viewportWidth
		});
	});

};

// Declares ATTCK.GlobalEvents.xsOnly(), smOnly(), etc for running
// breakpoint-specific functionality.
$.each(Debug.breakpoints, function (i, val) {
	ATTCK.GlobalEvents[val + 'Only'] = function (f) {
		if (!$$('.breakpoint.' + val).is(':visible')) {
			return;
		}

		f();
	}
});

// Add debug utilities to the page when Debug.debug is true.
if (Debug.debug === true) {
	$(document.body)
		.addClass("debug")
		.on("ATTCK.resize", function () {
			ATTCK.GlobalEvents.xsOnly(function () {
				$(".breakpoint-current").show().text("Breakpoint is XS");
			});

			ATTCK.GlobalEvents.smOnly(function () {
				$(".breakpoint-current").show().text("Breakpoint is SM");
			});

			ATTCK.GlobalEvents.mdOnly(function () {
				$(".breakpoint-current").show().text("Breakpoint is MD");
			});

			ATTCK.GlobalEvents.lgOnly(function () {
				$(".breakpoint-current").show().text("Breakpoint is LG");
			});

			ATTCK.GlobalEvents.xlOnly(function () {
				$(".breakpoint-current").show().text("Breakpoint is XL");
			});
		});
}

// Trigger scroll event in case anything is in a partial-state waiting
// for scroll (e.g., initial nav opacity)
$(window).trigger('resize');

export default ATTCK.GlobalEvents;
