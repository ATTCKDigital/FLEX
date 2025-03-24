import FLEX from '../../../FLEX/js/client-namespace';

if (!FLEX.isProd) { console.log('loaded', '/FLEX\t/components\t/component_carousel\t/carousel.js'); }

/**
 * Carousel component
 */
function Carousel ($el, params={}) {
	console.log('/child/\tcomponents	/\tcomponent_carousel/\t	carousel.js', 'Carousel()');

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
	var slideWidth;
	var vwGaptoPx;
	var maxVisibleSlides;
	var carouselWidth;
	var hoveredSlideImage;
	var hoveredSlideThumbnailImage;

	// Merge any options set on the DOM element with
	// the component defaults set above
	var options = $.extend(true, {}, defaults, params);

	function bindEvents() {
		console.log('/child/\tcomponents	/\tcomponent_carousel/\t	carousel.js', 'bindEvents()');
		
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

			goTo(index);
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

			if ($(this).hasClass('disabled')) { return; };

			var direction = 'carousel.goNext';

			if ($(this).hasClass('prev')) {
				direction = 'carousel.goPrev';
			}

			$el.trigger(direction);
		});

		detectSwipes();

		function randomInteger(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}

		// Listen for browser resize and update slide widths
		$(document.body).on('FLEX.resize', getSlideProperties);

		// ...and subsequently make offset adjustment to carousel inner container
		$(document.body).on('FLEX.resize', moveSlideContainerInner);

		// Listen for CSS3 transition animation end
		//$el.find('li, .slide, .slides, .slide-inner-container').on('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function () {
		$el.find('*').on('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function () {
			console.log('/child/\tcomponents	/\tcomponent_carousel/\t	carousel.js', 'CSStransition complete');
			CSStransitionInProgress = false;
		});

		// Auto-scroll every five seconds
		setInterval(function () {
			// NOTE: (DP) Evidently, the event listener noted above is not catching the transition 
			// end event anymore. So, we're going to make sure to reset the value here manually.
			
			// TODO: (DP) Find out if this event spec changed recently.
			// CSStransitionInProgress = false;
			
			// TODO: (DP) Add override options to prevent autoscroll. 
			// goNext();
		}, randomInteger(4000, 6000));

		// Add pseudoelement styles for each carousel slide
		$('.slide', $el).each(function (index, el) {
			var thisSlideId = $(this).attr('data-section-id');
			var thisSlideThumbnailImage = $('.image-wrapper img', this).attr('src');

			console.log('thisSlideId: ', thisSlideId);

			// Add anchor link to entire element
			var anchorLink = $('a', this).attr('href');

			$(el).on('click', function () {
				if (typeof anchorLink !== 'undefined') {
					window.location.href = anchorLink;
				}
			});

			// Swaps out background for thumbnail on hover
			if (thisSlideThumbnailImage !== 'none' && typeof thisSlideThumbnailImage !== 'undefined') {
				$('<style>')
					.attr('id', 'dynamic-style')
					.html(`
						.component-background[data-section-id="${thisSlideId}"]::before {
						background-image: url(${thisSlideThumbnailImage});
						background-size: cover;
						background-position: center;
						content: "";
						position: absolute;
						top: 0; left: 0; right: 0; bottom: 0;
						opacity: 0;
						}
					`)
					.appendTo('head');
			}
		});

		// // Embedded image thumb hover state
		// $('.slide', $el).on('mouseover', function () {
		// 	// Fades out the thumbnail image
		// 	$(this).addClass('hover');
		// });

		// $('.slide', $el).on('mouseout', function () {
		// 	// Fades in the thumbnail image
		// 	$(this).removeClass('hover');
		// });
	}

	function detectSwipes() {
		console.log('/child/\tcomponents	/\tcomponent_carousel/\t	carousel.js', 'detectSwipes()');
		
		let start = null;
		let carousel = $('.component-carousel', $el);

		carousel.on("touchstart", function(event) {
			if(event.touches.length === 1){
				//just one finger touched
				start = event.touches.item(0).clientX;
			}else{
				//a second finger hit the screen, abort the touch
				start = null;
			}
		});

		carousel.on("touchend", function(event) {
			var offset = 100;//at least 100px are a swipe

			if(start){
				//the only finger that hit the screen left it
				var end = event.changedTouches.item(0).clientX;

				if(end > start + offset) {
					goPrev();
				}

				if(end < start - offset) {
					goNext();
				}
			}
		});
	}

	// Can be used as references for moving slides around
	function getSlideProperties() {
		$dotsContainer = $('.dots-component', $el);
		$slidesContainer = $('.slides', $el);
		$slides = $('.slides .slide', $el);

		console.log('/— $slides: ', {}, $slides.length, $slides);

		slidesLength = $slides.length - 1;

		// Get slide width value
		console.log('slide 1 width: ', $el.find('.slide').eq(0), $el.find('.slide').eq(0).css('width'));
		
		// -- Take into account a 1vw gap;
		vwGaptoPx = $(window).width() / 100;

		// Programatically set slide width so the site always loads showing three full slides
		slideWidth = ($el.find('.slides').innerWidth() - (2 * vwGaptoPx)) / 3;

		$el.find('.slide').css('width', slideWidth);

		//slideWidth = $el.find('.slide').eq(0).outerWidth(true);

		// Strip "px" from width value
		slideWidth = parseFloat(slideWidth);

		// - Get visible carousel width
		carouselWidth = $slidesContainer.outerWidth();

		// - Calculate max number of visible slides
		maxVisibleSlides = carouselWidth / slideWidth;
	}

	function go() {
		console.log('/child/\tcomponents	/\tcomponent_carousel/\t	carousel.js', 'go(), index: ', index);
		
		// Indicate CSS transition is in progress
		CSStransitionInProgress = true;

		$slides.eq(index).removeClass('previous next').addClass('active');

		for (var x = 0; x < $slides.length; x++) {
			if (x < index) {
				if (x === 0 && index === ($slides.length - 1)) {
					$slides.eq(x).removeClass('previous next active').addClass('next');
				} else {
					$slides.eq(x).removeClass('previous next active').addClass('previous');
				}
			}

			if (x > index){
				if (x === ($slides.length - 1) && index === 0) {
					$slides.eq(x).removeClass('previous next active').addClass('previous');
				} else {
					$slides.eq(x).removeClass('previous next active').addClass('next');
				}
			}
		}

		updateDots(index);

		moveSlideContainerInner();

		$(document.body).trigger('FLEX.slideUpdate', {
			id: $el.attr('id')
		});
	}

	function goNext() {
		console.log('/child/\tcomponents	/\tcomponent_carousel/\t	carousel.js', 'goNext(), CSStransitionInProgress:', CSStransitionInProgress);
		
		// Proceed only if no CSS transition is in progress
		if (CSStransitionInProgress) return;

		if ($(this).hasClass('disabled')) { return; };

		// If current active slide isn't at the end
		// bump up index
		if (index < slidesLength || index <= Math.ceil(maxVisibleSlides)) {
			index = index + 1;
			prevIndex = index - 1;

			// If current active slide still isn't at the end
			// bump up nextIndex
			if (index < slidesLength) {
				nextIndex = index + 1;

				$('.nav', $el).removeClass('disabled');

				// Stop at max visible slides index
				if (index > Math.ceil(maxVisibleSlides)) {
					nextIndex = index - 1;
	
					CSStransitionInProgress = false;
					$('.nav.next', $el).addClass('disabled');
				}
			} else {
				// Otherwise, reset it to the beginning
				//nextIndex = 0;

				// Otherwise, stop at current index
				nextIndex = index - 1;

				CSStransitionInProgress = false;
				$('.nav.next', $el).addClass('disabled');
			}
		} else {
			index = 0;
			nextIndex = index + 1;
			prevIndex = slidesLength;

			CSStransitionInProgress = false;
			$('.nav.next', $el).addClass('disabled');
		}

		console.log('/child/\tcomponents	/\tcomponent_carousel/\t	carousel.js', 'goNext(), index:', index);

		go();
	}

	function goPrev() {
		// Proceed only if no CSS transition is in progress
		if (CSStransitionInProgress) return;
		
		if ($(this).hasClass('disabled')) { return; };

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

				$('.nav', $el).removeClass('disabled');
			} else {
				// TOOD: (DP) Move these into passable options
				// Otherwise, set it to the last slide
				// [i] [n] [ ] [ ] [p]
				// prevIndex = $slides.length;

				// Otherwise, stop at the beginning
				prevIndex = index - 1;

				CSStransitionInProgress = false;
				$('.nav.prev', $el).addClass('disabled');
			}
		} else {
			// [n] [ ] [ ] [p] [i]
			// index = slidesLength;
			// nextIndex = 0;
			// prevIndex = index - 1;

			// Otherwise, stop at the beginning
			index = 0;
			nextIndex = 1;
			prevIndex = -1;

			CSStransitionInProgress = false;
			$('.nav.prev', $el).addClass('disabled');
		}

		console.log('/child/\tcomponents	/\tcomponent_carousel/\t	carousel.js', 'goPrev(), index: ', index);

		go();
	}

	function goTo(arg) {
		console.log('/child/\tcomponents	/\tcomponent_carousel/\t	carousel.js', 'ar()');
		
		// Proceed only if no CSS transition is in progress
		if (CSStransitionInProgress) return;

		// If current active slide isn't at the beginning
		if (index !== arg) {
			// go to index
			index = arg;

			// If current active slide isn't at the end
			if (index < slidesLength) {
				nextIndex = index + 1;

				// If current active slide isnt at the beginning,
				if (index > 0) {
					// drop down prevIndex.
					// [p] [i] [n] [ ] [ ]
					prevIndex = index - 1;
				} else {
					prevIndex = slidesLength;
				}
			} else {
				// TODO: (DP) Move this to passable options.
				nextIndex = 0;
				prevIndex = index - 1;
			}
		}

		go();
	}

	function moveSlideContainerInner() {
		// Find current active slide index
		var activeSlideIndex = $el.find('.slide.active').index();

		// Calculate left offset + gap
		var leftOffset = ((activeSlideIndex * slideWidth) + (activeSlideIndex * vwGaptoPx)) * -1;

		// Determine number of visible slides
		// - Get visible carousel width
		// carouselWidth = $slidesContainer.outerWidth();

		// - Calculate max number of visible slides
		// maxVisibleSlides = carouselWidth / slideWidth;

		// Ensure the scrolling stops when the last slide has reached the right most edge of the screen
		// - Calculate last slide index minus max visible slides
		var lastScrollableSlide = Math.ceil($slides.length - maxVisibleSlides);

		// - Override leftOffset if at this boundary
		if (activeSlideIndex >= lastScrollableSlide) {
			leftOffset = ((lastScrollableSlide * slideWidth) + (lastScrollableSlide * vwGaptoPx)) * -1;

			// Reset this since no animation will happen in this scenario
			CSStransitionInProgress = false;
		}

		console.log('left offset: ', activeSlideIndex, slideWidth, leftOffset);

		// Move inner container
		$el.find('.slides-container-inner').css({
			'margin-left': leftOffset
		});
	}

	function render() {
		console.log('/child/\tcomponents	/\tcomponent_carousel/\t	carousel.js', 'render()');
		
		// Default set the prev nav item to disabled
		$('.nav.prev', $el).addClass('disabled');

		// Hide dots if only one slide
		if ($slides.length > 1) {
			$('.dots-component', $el).css({
				'visibility': 'visible'
			});
		}

		setActiveItems();
	}

	/**
	 * Initializes all default active states
	 */
	function setActiveItems() {
		console.log('/child/\tcomponents	/\tcomponent_carousel/\t	carousel.js', 'setActiveItems()');
		
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
	 * Update the active dot.
	 * @param {Number} current - Zero-based current slide number.
	 */
	function updateDots(current) {
		console.log('/child/\tcomponents	/\tcomponent_carousel/\t	carousel.js', 'updateDots(current:)', current);
		
		$dotsContainer.each(function () {
			$(this).find('li.dot').removeClass('active');
			$(this).find('li.dot').eq(current).addClass('active');
		});
	}

	this.init = function ($el) {
		console.log('/child/\tcomponents	/\tcomponent_carousel/\t	carousel.js', 'init', 'e()');
		
		getSlideProperties();
		bindEvents();
		render();

		return this;
	}

	return this.init($el);
}

export default Carousel;