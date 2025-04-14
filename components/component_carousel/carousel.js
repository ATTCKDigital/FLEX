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

	var _$el = $el;
	var _index = 0;
	var _carouselWidth;
	var _CSStransitionInProgress = false;
	var _$dotsContainer;
	var _fullCarouselWidth;
	var _lastScrollableSlide;
	var _maxVisibleSlides;
	var _nextIndex = 0;
	var _prevIndex = 0;
	var _slideWidth;
	var _$slides;
	var _$slidesContainer;
	var _slidesLength;
	var _visibleGap;
	var _vwGaptoPx;

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
			_index = $parent.find('a').index($(this));

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
			_CSStransitionInProgress = false;
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
		console.log('/child/\tcomponents	/\tcomponent_carousel/\t	carousel.js', 'getSlideProperties()');

		_$dotsContainer = $('.dots-component', $el);
		_$slidesContainer = $('.slides', $el);
		_$slides = $('.slides .slide', $el);

		_slidesLength = _$slides.length - 1;

		// Get slide width value
		// -- Take into account a 1vw gap;
		_vwGaptoPx = $(window).width() / 100;

		// - Calculate max number of visible slides
		if ($('.breakpoint.tablet-landscape:not(:visible)').length === 1) {
			_maxVisibleSlides = 1;
			_visibleGap = (_vwGaptoPx)
		} else {
			// _maxVisibleSlides = Math.floor(_carouselWidth / _slideWidth);
			_maxVisibleSlides = 3;
			_visibleGap = (2 * _vwGaptoPx)
		}

		// Programatically set slide width so the site always loads showing three full slides
		// - Determine what 1/3 width of available space is
		_slideWidth = (_$slidesContainer.innerWidth() - _visibleGap) / _maxVisibleSlides;

		// - Apply this to each slide width
		_$slides.css('width', _slideWidth);

		// Strip "px" from width value
		_slideWidth = parseFloat(_slideWidth);
		
		// Set full crousel width
		_fullCarouselWidth = (_slidesLength + 2) * _slideWidth + 'px';

		console.log('slides-container-inner: ', $('.slides-container-inner', $el), '_fullCarouselWidth: ', _fullCarouselWidth);

		$('.slides-container-inner', $el).css({
			'width': _fullCarouselWidth
		});

		// - Get visible carousel width
		_carouselWidth = _$slidesContainer.outerWidth();
	}

	function go() {
		console.log('/child/\tcomponents	/\tcomponent_carousel/\t	carousel.js', 'go(), _index: ', _index);
		
		// Indicate CSS transition is in progress
		_CSStransitionInProgress = true;

		_$slides.eq(_index).removeClass('previous next').addClass('active');

		for (var x = 0; x < _$slides.length; x++) {
			if (x < _index) {
				if (x === 0 && _index === (_$slides.length - 1)) {
					_$slides.eq(x).removeClass('previous next active').addClass('next');
				} else {
					_$slides.eq(x).removeClass('previous next active').addClass('previous');
				}
			}

			if (x > _index){
				if (x === (_$slides.length - 1) && _index === 0) {
					_$slides.eq(x).removeClass('previous next active').addClass('previous');
				} else {
					_$slides.eq(x).removeClass('previous next active').addClass('next');
				}
			}
		}

		updateDots(_index);

		moveSlideContainerInner();

		$(document.body).trigger('FLEX.slideUpdate', {
			id: $el.attr('id')
		});
	}

	function goNext() {
		console.log('/child/\tcomponents	/\tcomponent_carousel/\t	carousel.js', 'goNext(), _CSStransitionInProgress:', _CSStransitionInProgress);
		
		// Proceed only if no CSS transition is in progress
		if (_CSStransitionInProgress) return;

		if ($(this).hasClass('disabled')) { return; };

		// If current active slide isn't at the end
		// bump up index
		if (_index < _slidesLength || _index <= _lastScrollableSlide) {
			_index = _index + 1;
			_prevIndex = _index - 1;

			// If current active slide still isn't at the end
			// bump up nextIndex
			if (_index < _slidesLength) {
				_nextIndex = _index + 1;

				$('.nav', $el).removeClass('disabled');

				// Stop at max visible slides index
				if (_index >= _lastScrollableSlide) {
					_nextIndex = _index - 1;
	
					_CSStransitionInProgress = false;
					$('.nav.next', $el).addClass('disabled');
				}
			} else {
				// Otherwise, reset it to the beginning (if setting is present)
				//nextIndex = 0;

				// Otherwise, stop at current index
				_nextIndex = _index - 1;

				_CSStransitionInProgress = false;
				$('.nav.next', $el).addClass('disabled');
			}
		} else {
			_index = 0;
			_nextIndex = _index + 1;
			_prevIndex = _slidesLength;

			_CSStransitionInProgress = false;
			$('.nav.next', $el).addClass('disabled');
		}

		go();
	}

	function goPrev() {
		console.log('/child/\tcomponents	/\tcomponent_carousel/\t	carousel.js', 'goPrev()');

		// Proceed only if no CSS transition is in progress
		if (_CSStransitionInProgress) return;
		
		if ($(this).hasClass('disabled')) { return; };

		// If current active slide isn't at the beginning
		if (_index > 0) {
			// drop down index
			_index = _index - 1;
			
			// [ ] [p] [i] [n] [ ]
			_nextIndex = _index + 1;
			
			// If current active slide still isn't at the end,
			if (_index > 0) {
				// drop down prevIndex.
				// [p] [i] [n] [ ] [ ]
				_prevIndex = _index - 1;

				$('.nav', $el).removeClass('disabled');
			} else {
				// TOOD: (DP) Move these into passable options
				// Otherwise, set it to the last slide
				// [i] [n] [ ] [ ] [p]
				// prevIndex = $slides.length;

				// Otherwise, stop at the beginning
				_prevIndex = _index - 1;

				_CSStransitionInProgress = false;
				$('.nav.prev', $el).addClass('disabled');
			}
		} else {
			// [n] [ ] [ ] [p] [i]
			// index = slidesLength;
			// nextIndex = 0;
			// prevIndex = index - 1;

			// Otherwise, stop at the beginning
			_index = 0;
			_nextIndex = 1;
			_prevIndex = -1;

			_CSStransitionInProgress = false;
			$('.nav.prev', $el).addClass('disabled');
		}

		console.log('/child/\tcomponents	/\tcomponent_carousel/\t	carousel.js', 'goPrev(), _index: ', _index);

		go();
	}

	function goTo(arg) {
		console.log('/child/\tcomponents	/\tcomponent_carousel/\t	carousel.js', 'ar()');
		
		// Proceed only if no CSS transition is in progress
		if (_CSStransitionInProgress) return;

		// If current active slide isn't at the beginning
		if (_index !== arg) {
			// go to index
			_index = arg;

			// If current active slide isn't at the end
			if (_index < _slidesLength) {
				_nextIndex = _index + 1;

				// If current active slide isnt at the beginning,
				if (_index > 0) {
					// drop down prevIndex.
					// [p] [i] [n] [ ] [ ]
					_prevIndex = _index - 1;
				} else {
					_prevIndex = _slidesLength;
				}
			} else {
				// TODO: (DP) Move this to passable options.
				_nextIndex = 0;
				_prevIndex = _index - 1;
			}
		}

		go();
	}

	function moveSlideContainerInner() {
		console.log('/child/\tcomponents	/\tcomponent_carousel/\t	carousel.js', 'moveSlideContainerInner()');

		// Find current active slide index
		var activeSlideIndex = $el.find('.slide.active').index();

		// Calculate left offset + gap
		var leftOffset = ((activeSlideIndex * _slideWidth) + (activeSlideIndex * _vwGaptoPx)) * -1;

		// Ensure the scrolling stops when the last slide has reached the right most edge of the screen
		// - Calculate last slide index minus max visible slides
		_lastScrollableSlide = Math.ceil(_$slides.length - _maxVisibleSlides);

		// - Override leftOffset if at this boundary
		if (activeSlideIndex >= _lastScrollableSlide) {
			leftOffset = ((_lastScrollableSlide * _slideWidth) + (_lastScrollableSlide * _vwGaptoPx)) * -1;

			// Reset this since no animation will happen in this scenario
			_CSStransitionInProgress = false;
		}

		// Move inner container
		$el.find('.slides-container-inner').css({
			'margin-left': leftOffset
		});
	}

	function registerInteractiveElements() {
		console.log('saving these interactive elements: ', $('.nav.next', _$el)[0], $('.nav.prev', _$el)[0], $('li.dot', _$el).toArray());

		$(FLEX).trigger(FLEX.events.wcag.registerInteractive, {
			elements: [
				$('.nav.next', _$el)[0],
				$('.nav.prev', _$el)[0],
				$('li.dot', _$el).toArray()
			]
		});
	}

	function render() {
		console.log('/child/\tcomponents	/\tcomponent_carousel/\t	carousel.js', 'render()');
		
		// Default set the prev nav item to disabled
		$('.nav.prev', $el).addClass('disabled');

		// Hide dots if only one slide
		if (_$slides.length > 1) {
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
		for (var x = 0; x < _$slides.length; x++) {
			// Set next/prev of each slide
			switch (true) {
				// - first LI
				case x === 0:
					_$slides.eq(x).addClass('active');
					break;

				// - last LI
				case x === (_$slides.length - 1):
					_$slides.eq(x).addClass('previous');
					break;

				// - middle LIs
				default:
					_$slides.eq(x).addClass('next');
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
		
		_$dotsContainer.each(function () {
			$(this).find('li.dot').removeClass('active');
			$(this).find('li.dot').eq(current).addClass('active');
		});
	}

	this.init = function ($el) {
		console.log('/child/\tcomponents	/\tcomponent_carousel/\t	carousel.js', 'init', 'e()');
		
		getSlideProperties();
		bindEvents();
		registerInteractiveElements();
		render();

		return this;
	}

	return this.init($el);
}

export default Carousel;
