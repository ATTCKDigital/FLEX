/**
 * Legacy multi-slide "peek" layout: JS-set slide widths, an offset on
 * `.slides-container-inner`, and the CSS transition lock.
 */

/**
 * Measure the slides and size them (can be used as references for moving
 * slides around). Also caches the slide collections on the state.
 *
 * @param {Object} ctx Carousel instance context.
 */
export function getSlideProperties( ctx ) {
	const { $el, state } = ctx;

	state.$dotsContainer = $( '.dots-component', $el );
	state.$slidesContainer = $( '.slides', $el );
	state.$slides = $( '.slides .slide', $el );
	// Index of the last slide (legacy naming).
	state.slidesLength = state.$slides.length - 1;

	// Get slide width value
	// -- Take into account a 1vw gap;
	state.vwGapToPx = $( window ).width() / 100;

	// - Calculate max number of visible slides
	if ( $( '.breakpoint.tablet-landscape:not(:visible)' ).length === 1 ) {
		state.maxVisibleSlides = 2;
		state.visibleGap = state.vwGapToPx;
	} else {
		state.maxVisibleSlides = 1.75;
		state.visibleGap = 2 * state.vwGapToPx;
	}

	// Programatically set slide width so the site always loads showing three full slides
	// - Determine what 1/3 width of available space is
	state.slideWidth =
		( state.$slidesContainer.innerWidth() - state.visibleGap ) /
		state.maxVisibleSlides;

	// - Apply this to each slide width
	state.$slides.css( 'width', state.slideWidth );
	// Strip "px" from width value
	state.slideWidth = parseFloat( state.slideWidth );
	// Set full crousel width
	state.fullCarouselWidth =
		( state.slidesLength + 2 ) * state.slideWidth + 'px';

	$( '.slides-container-inner', $el ).css( {
		width: state.fullCarouselWidth,
	} );
}

/**
 * Offset the inner container so the active slide is in view.
 *
 * @param {Object} ctx Carousel instance context.
 */
export function moveSlideContainerInner( ctx ) {
	const { $el, state } = ctx;

	// Find current active slide index
	const activeSlideIndex = $el.find( '.slide.active' ).index();

	// Calculate left offset + gap
	let leftOffset =
		( activeSlideIndex * state.slideWidth +
			activeSlideIndex * state.vwGapToPx ) *
		-1;

	// Ensure the scrolling stops when the last slide has reached the right most edge of the screen
	// - Calculate last slide index minus max visible slides
	state.lastScrollableSlide = Math.ceil(
		state.$slides.length - state.maxVisibleSlides
	);

	// - Override leftOffset if at this boundary
	if ( activeSlideIndex >= state.lastScrollableSlide ) {
		leftOffset =
			( state.lastScrollableSlide * state.slideWidth +
				state.lastScrollableSlide * state.vwGapToPx ) *
			-1;

		// Reset this since no animation will happen in this scenario
		state.transitionInProgress = false;
	}

	// Move inner container
	$el.find( '.slides-container-inner' ).css( {
		'margin-left': leftOffset,
	} );
}

/**
 * Re-measure and re-offset on `FLEX.resize`.
 * @param {Object} ctx Carousel instance context.
 */
export function bindPeekLayout( ctx ) {
	// Listen for browser resize and update slide widths
	$( document.body ).on( 'FLEX.resize', () => getSlideProperties( ctx ) );

	// ...and subsequently make offset adjustment to carousel inner container
	$( document.body ).on( 'FLEX.resize', () =>
		moveSlideContainerInner( ctx )
	);
}

/**
 * Release the transition lock when a CSS transition inside the carousel ends.
 * @param {Object} ctx Carousel instance context.
 */
export function bindTransitionLock( ctx ) {
	ctx.$el
		.find( '*' )
		.on(
			'transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd',
			function () {
				ctx.state.transitionInProgress = false;
			}
		);
}
