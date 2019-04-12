/**
 * Parallax component
 */
import $ from 'jquery';
import $$ from './cached-dom-elements';

function Parallax($el, params={}) {
	const defaults = {};

	// Merge any options set on the DOM element with
	// the component defaults set above
	var options = $.extend(true, {}, defaults, params);
	var viewportHeight = $(window).outerHeight();
	var scrollStartThreshold = parseInt($el.attr("data-scroll-start"), 10) - (viewportHeight * .2);
	var $elOuterHeight = $el.outerHeight();

	function bindEvents() {
		// Start offsetting the background-position-y value
		// on scroll when we reach data-scroll-start
		$(document.body).on('FLEXLAYOUT.scroll', parallaxGo);

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
		scrollStartThreshold = (viewportHeight / 2) + (containerHeight / 2);

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
			var finalOffset = defaultOffset - ((percentToScrollPerPixel * totalPixelsScrolledWithinThreshold) / 2);
			var lowerBounds = -100;
			var upperBounds = 100;

			// console.log('finalOffset, lowerBounds, upperBounds: ', finalOffset, lowerBounds, upperBounds);

			// If we're within the sweet spot
			if (finalOffset > lowerBounds && finalOffset < upperBounds) {
				// Move the background
				finalOffset = finalOffset - ((percentToScrollPerPixel * totalPixelsScrolledWithinThreshold) / 2);
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
					case ($el.find('h1').length > 0):
						validContent = false;
						break;

					// elements with .no-parallax class and their children
					case ($el.hasClass('.no-parallax') || $el.find('.no-parallax').length > 0):
						validContent = false;
						break;

					// elements with .no-parallax parents
					case ($el.closest('.no-parallax').length > 0):
						validContent = false;
						break;

					// map elements
					case ($el.find('#mapbox').length > 0):
						validContent = false;
						break;

					// map elements
					case ($el.find('.component-map').length > 0):
						validContent = false;
						break;

					// elements with forms in them
					case ($el.find('form').length > 0):
						validContent = false;
						break;

					default: break;
				}

				if (validContent) {
					$el.css({
						'position': 'relative',
						// 'top': (finalOffset * 1.5) + 'px'
						'transform': 'translate3d(0, ' + (finalOffset * 1.5) + 'px' + ', 0)'
					});
				}
			} else {
				// Move background forwards
				$el.css({
					'background-position': 'center ' + (finalOffset * -1) + '%'
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
	}

	return this.init($el);
}

export default Parallax;
