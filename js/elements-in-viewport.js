/**
 * Element in Viewport
 * Tracks when an element is in the view port.
 * Default behavior is to fade in specific elements - this behavior/animation/transition is handled via css
 **/
import $ from 'jquery';
import $$ from './cached-dom-elements';

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
			scrollThreshold = _viewportHeight*.8;
		}

		$.each($$('.prepare-in-view'), function (index, value) {
			var verticalScrollThreshold = (_currentScrollTop + scrollThreshold);
			var thisElementOffset = $(this).offset().top;

			// Add class to elements once they are halfway up the screen
			if (thisElementOffset < verticalScrollThreshold) {
				$(this).addClass('element-in-view');
			}
		});
	}

	function hideAllElements() {
		// First, hide all elements
		$('body').find('h1, h2, h3, h4, h5, h6, p, span').addClass('prepare-in-view');

		// Add elements that need to be manipulated here:
		$('body').find('h1, h2, h3, h4, h5, h6, p, span').each(function (index, value) {
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

	this.init = function($el) {
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

export default ElementsInViewport;
