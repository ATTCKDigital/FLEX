import $ from 'jquery';
import $$ from '../component_cached-dom-elements/cached-dom-elements';
import FLEX from 'FLEX/js/client-namespace';

if (!FLEX.isProd) { console.log('loaded', '/FLEX\t/js\t/components\t/component_scroll-in\t/scroll-in.js'); }

/**
 * Scroll In
 * Tracks when an element is in the view port.
 * Default behavior is to fade in specific elements - this behavior/animation/transition is handled via css
 * TODO: Add more useage info.
 * TODO: Add options JSON for different effects. JSON could include timing & premade effects.
 */
function ScrollIn($el) {
	// console.log('/scroll-in.js', 'ScrollIn()');

	var _detectElementsInViewOffsetIndex = [];
	var _scrollstopTimer = 0;
	var _currentScrollTop = $(window).scrollTop();
	var _viewportHeight = $(window).outerHeight();

	function bindEvents() {
		// console.log('/FLEX/\tjs/\tscroll-in.js', 'bindEvents()');
		// $(document.body).on('FLEXLAYOUT.apploaded', hideElements);

		$(document.body).on('FLEX.scroll', function (e, data) {
			// console.log('/FLEX/\tjs/\tscroll-in.js', 'FLEX.scroll()');

			// Reset timer to trigger ScrollIn
			_scrollstopTimer = 0;

			_currentScrollTop = data.currentScrollTop;

			// Check the current scroll offset against the DOM element offset array
			detectElementsInView();
		});

		// Include check for page resize as well since that
		// can potentially cause the page to scroll
		$(document.body).on('FLEX.resize', function () {
			// console.log('/FLEX/\tjs/\tscroll-in.js', 'FLEX.resize()');

			// Reset timer to trigger ScrollIn
			_scrollstopTimer = 0;

			_viewportHeight = $(window).outerHeight();

			indexAllElements();
		});
	}

	function checkTimer() {
		// console.log('/FLEX/\tjs/\tscroll-in.js', 'checkTimer()');

		// Check if user stopped scrolling for more than two seconds and show anything that
		// would be visible but hasn't hit the vertical scroll threshold yet
		if (_scrollstopTimer > 500 && _scrollstopTimer !== 1) {
			// console.log('/FLEX/\tjs/\tscroll-in.js', 'checkTimer(), timer is up');

			detectElementsInView(_viewportHeight);

			// Stop the timer once it runs once, until the next time the user scrolls
			// which will trigger this again
			_scrollstopTimer = 1;
		} else if (_scrollstopTimer !== 1) {
			// Increment timer
			_scrollstopTimer = _scrollstopTimer + 100;
		}
	}

	function detectElementsInView(scrollThreshold) {
		// console.log('/FLEX/\tjs/\tscroll-in.js', 'detectElementsInView(), scrollThreshold: ', scrollThreshold);

		// Set Default scroll threshold
		if (typeof scrollThreshold === 'undefined') {
			scrollThreshold = _viewportHeight*.8;
		}

		$.each($$('.transition-when-visible'), function (index, value) {
			var verticalScrollThreshold = (_currentScrollTop + scrollThreshold);
			var thisElementOffset = $(this).offset().top;

			// Add class to elements once they are halfway up the screen
			if (thisElementOffset < verticalScrollThreshold) {
				// console.log('/FLEX/\tjs/\tscroll-in.js', 'detectElementsInView(), showing $(this): ', $(this));

				$(this).addClass('transitioned-into-view');
				$(this).trigger('FLEX.scrollIn');
			}
		});
	}

	function hideAllElements() {
		// console.log('/FLEX/\tjs/\tscroll-in.js', 'hideAllElements()');

		// Don't hide these elements
		$('.component-header').addClass('no-element-in-view');
		$('.component-footer').addClass('no-element-in-view');
		$('.component-gdpr p').addClass('no-element-in-view');
		$('.component-gdpr .cta').addClass('no-element-in-view');
		$('.area-inner h4, .area-inner p').addClass('no-element-in-view');

		// Set default elements to hide
		var elementsToHide = 'h3, h4, h5, h6, p, span, .cta, img, .category-list, .area-inner';
		// TODO: Add some way to merge this with some project setting / JSON object

		// Check for elements override from child
		var elementsToHideOverride = $(document.body).attr('data-elements-to-hide');

		if (typeof elementsToHideOverride !== 'undefined') {
			elementsToHide = elementsToHideOverride;
		}

		// First, hide all elements
		$('body').find(elementsToHide).addClass('transition-when-visible');

		// Add elements that need to be manipulated here
		$('body').find(elementsToHide).each(function (index, value) {
			if (!$(this).hasClass('no-element-in-view') && !$(this).parents('.no-element-in-view').length) {
				$(this).addClass('transition-when-visible');
			}
		});

		indexAllElements();
	}

	function indexAllElements() {
		// console.log('/FLEX/\tjs/\tscroll-in.js', 'indexAllElements()');

		$('.transitioned-into-view').each(function () {
			// Convert offset values to strings since they're floats and not a valid array ID
			_detectElementsInViewOffsetIndex.push({
				'offset': $(this).offset().top,
				'element': $(this)
			});
		});
	}

	this.init = function($el) {
		// console.log('/FLEX/\tjs/\tscroll-in.js', 'init()');

		bindEvents();
		hideAllElements();

		// Start scroll timer
		setInterval(function () {
			checkTimer();
		}, 100);

		return this;
	}

	return this.init($el);
}

export default ScrollIn;
