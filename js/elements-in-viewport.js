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
		console.log('/flexlayout/\tjs/\telements-in-viewport.js', 'bindEvents()');

        // $(document.body).on('FLEXLAYOUT.apploaded', hideElements);

		$(document.body).on('FLEXLAYOUT.scroll', function (e, data) {
			// Reset timer to trigger ElementsInViewport
			_scrollstopTimer = 0;

			_currentScrollTop = data.currentScrollTop;

			// Check the current scroll offset against the DOM element offset array
			inViewElements();
		});

		// Include check for page resize as well since that
		// can potentially cause the page to scroll
		$(document.body).on('FLEXLAYOUT.resize', function () {
			// Reset timer to trigger ElementsInViewport
			_scrollstopTimer = 0;

			_viewportHeight = $(window).outerHeight();

			indexAllElements();
		});
	}

	function checkTimer() {
		// console.log('/flexlayout/\tjs/\telements-in-viewport.js', 'checkTimer()');

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
		// console.log('/flexlayout/\tjs/\telements-in-viewport.js', 'inViewElements()');

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
		console.log('/flexlayout/\tjs/\telements-in-viewport.js', 'hideAllElements()');

        // Show protected areas
		$('.component-header').addClass('no-element-in-view');
		$('.component-footer').addClass('no-element-in-view');
		$('.component-gdpr p').addClass('no-element-in-view');
		$('.area-inner h4, .area-inner p').addClass('no-element-in-view');

        // Set default elements to hide
        var elementsToHide = 'h3, h4, h5, h6, p, span, .cta, img, .category-list, .area-inner';

        // Check for elements override from child
        var elementsToHideOverride = $(document.body).attr('data-elements-to-hide');

        if (typeof elementsToHideOverride !== 'undefined') {
            elementsToHide = elementsToHideOverride;
        }

        // First, hide all elements
		$('body').find(elementsToHide).addClass('prepare-in-view');

		// Add elements that need to be manipulated here
		$('body').find(elementsToHide).each(function (index, value) {
			if (!$(this).hasClass('no-element-in-view') && !$(this).parents('.no-element-in-view').length) {
				$(this).addClass('prepare-in-view');
			}
		});


		indexAllElements();
	}

	function indexAllElements() {
		console.log('/flexlayout/\tjs/\telements-in-viewport.js', 'indexAllElements()');

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
