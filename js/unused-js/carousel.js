/**
 * Carousel component
 */
function Carousel ($el, params={}) {
	const defaults = {
		'accessibility': true,
		'arrows': false,
		'dots': false,
		'prevArrow': '<button class="slick-prev"><svg class="icon icon-page-left">'
			+'<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-page-left"></use>'
			+'</svg><span class="sr-only">Previous slide</span></button>',
		'nextArrow': '<button class="slick-next"><svg class="icon icon-page-right">'
			+'<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-page-left"></use>'
			+'</svg><span class="sr-only">Next slide</span></button>'
	};

	var index = 0;
	var nextIndex = 0;
	var prevIndex = 0;
	var CSStransitionInProgress = false;
	var $dotsContainer;
	var $slidesContainer;
	var $slides;
	var slidesLength;

	// Merge any options set on the DOM element with 
	// the component defaults set above
	var options = $.extend(true, {}, defaults, params);

	function bindEvents() {
		// Arrow click events
		$el.on('carousel.goPrev', goPrev);
		$el.on('carousel.goNext', goNext);

		// Dot click events
		$el.on('click', '.dots-component a', function (e) {
			e.preventDefault();

			// Find parent
			var $parent = $(this).closest('.dots-component');

			// Get index of this dot compared to siblings
			var index = $parent.find('a').index($(this));

			goTo(index - 1);
		});

		// Keyboard commands (left & right arrow keys)
		$('body').on('keydown', function (e) {
			// Left arrow key
			if (e.keyCode === 37) {
				$('.nav.prev', $el).click();
			}

			// Right arrow key
			if (e.keyCode === 39) {
				$('.nav.next', $el).click();
			}
		});

		// Bind to prev/next arrows
		$el.on('click', '.nav', function (e) {
			e.preventDefault();

			var direction = 'carousel.goNext';

			if ($(this).hasClass('prev')) {
				direction = 'carousel.goPrev';
			}

			$el.trigger(direction);
		});

		// Listen for CSS3 transition animation end
		$el.find('li').on('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function () {
			CSStransitionInProgress = false;
		});

		// Paralax background images
		$('.slide', $el).each(function () {
			// Based on container height relative to viewport center
			var containerHeight = $(this).outerHeight();
			var containerOffsetTop = $(this).offset().top;
			var viewportHeight = $(window).outerHeight();
			var scrollStartThreshold = (viewportHeight / 2) + (containerHeight / 2);

			// Determine when image container top reaches the scroll start point
			$(this).attr('data-scroll-start', scrollStartThreshold);
		});

		// Auto-scroll every five seconds
		setInterval(function () {
			$('.nav.next', $el).click();
		}, 5000);
	}

	function go() {
		// Indicate CSS transition is in progress
		CSStransitionInProgress = true;

		$slides.eq(index).removeClass('previous next').addClass('active');
		$slides.eq(prevIndex).removeClass('previous next active').addClass('previous');
		$slides.eq(nextIndex).removeClass('previous next active').addClass('next');

		updateDots(index);
		setResponsiveBackgroundImages();
	}

	function goNext() {
		// Proceed only if no CSS transition is in progress
		if (CSStransitionInProgress) return;

		// If current active slide isn't at the end
		// bump up index
		if (index < slidesLength) {
			index = index + 1;
			prevIndex = index - 1;

			// If current active slide still isn't at the end
			// bump up nextIndex
			if (index < slidesLength) {
				nextIndex = index + 1;
			} else {
				// Otherwise reset it to the beginning
				nextIndex = 0;
			}
		} else {
			index = 0;
			nextIndex = index + 1;
			prevIndex = slidesLength;
		}

		go();
	}

	function goPrev() {
		// Proceed only if no CSS transition is in progress
		if (CSStransitionInProgress) return;

		// If current active slide isn't at the beginning
		if (index > 0) {
			// drop down index
			index = index - 1;

			// [ ] [p] [i] [n] [ ]
			nextIndex = index + 1;

			// If current active slide still isn't at the end,
			if (index > 0) {
				// drop down prevIndex.
				// [p] [i] [n] [ ] [ ]
				prevIndex = index - 1;
			} else {
				// Otherwise, set it to the last slide
				// [i] [n] [ ] [ ] [p]
				prevIndex = $slides.length;
			}
		} else {
			// [n] [ ] [ ] [p] [i]
			index = slidesLength;
			nextIndex = 0;
			prevIndex = index - 1;
		}

		go();
	}

	function goTo(arg) {
		// Determine whether to go next, prev, or nowhere (default)
		switch (true) {
			case (arg > index) :
				goNext();
				break;

			case (index > arg) :
				goPrev();
				break;

			default:
				// Do nothing (index === arg)
		}
	}

	function render() {
		$dotsContainer = $('.dots-component', $el);
		$slidesContainer = $('.slides', $el);
		$slides = $('.slides > li', $el);
		slidesLength = $slides.length - 1;

		setActiveItems();
	}

	/**
	 * Initializes all default active states
	 */
	function setActiveItems() {
		// - first LI of first UL
		$('.slides.active li', $el).eq(0).addClass('active');

		// Set active elements (because they aren't set via PHP):
		for (var x = 0; x < $slides.length; x++) {
			// Set next/prev of each slide
			switch (true) {
				// - first LI
				case x === 0:
					// $slidesContainer.eq(0).addClass('active');
					$slides.eq(x).addClass('active');
					break;

				// - last LI
				case x === ($slides.length - 1):
					$slides.eq(x).addClass('previous');
					break;

				// - middle LIs
				default:
					$slides.eq(x).addClass('next');
					break;
			}	
		}

		// Set active dot
		updateDots(0);
	}

	/**
	 * Checks current breakpoint, and matches against data attributes
	 * to determine which class to apply, matching the appropriate background image
	 * NOTE: Only happens on page load. TODO: (DP) Improve this with better
	 * responsive image function in utils.js.
	 */
	function setResponsiveBackgroundImages() {
		// Check viewport and determine current mediaquery breakpoint
		// Match against each data attribute in $el slides
		// Set default background image (mobile)
		var backgroundURL = $slides.eq(index).attr('data-background-image-source');
		
		// - Determine which breakpoint we're using
		var breakpoint;

		// - by looping through hidden divs checking for visibility
		$('.breakpoint').each(function (ind, val) {
			if ($(this).is(':visible')) {
				breakpoint = $(this).attr('data-breakpoint');

				// Progressively update which background image to use,
				// if there is one available in the element's data attribute,
				if (typeof $slides.eq(index).attr('data-' + breakpoint + '-background-image-source') !== 'undefined') {
					// Found a match
					backgroundURL = $slides.eq(index).attr('data-' + breakpoint + '-background-image-source');
				}
			}
		});
		
		// - set $el background 
		$el.css({
			'backgroundImage': 'url(' + backgroundURL + ')'
		});
	}

	/**
	 * Update the active dot.
	 * @param {Number} current - Zero-based current slide number.
	 */
	function updateDots(current) {
		$dotsContainer.each(function () {
			$(this).find('li.dot').removeClass('active');
			$(this).find('li.dot').eq(current).addClass('active');
		});
	}

	this.init = function ($el) {
		bindEvents();
		render();

		return this;
	}

	return this.init($el);
}

export default Carousel;
