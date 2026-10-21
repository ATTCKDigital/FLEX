/**
 * Legacy one-finger touch swipe on `.component-carousel`.
 */

/**
 * @param {Object} ctx Carousel instance context.
 */
export function bindSwipe( ctx ) {
	const { $el, options } = ctx;
	let start = null;
	const carousel = $( '.component-carousel', $el );

	carousel.on( 'touchstart', function ( event ) {
		if ( event.touches.length === 1 ) {
			// Just one finger touched
			start = event.touches.item( 0 ).clientX;
		} else {
			// A second finger hit the screen, abort the touch
			start = null;
		}
	} );

	carousel.on( 'touchend', function ( event ) {
		const offset = options.swipeThreshold; // at least this many px are a swipe

		if ( start ) {
			// The only finger that hit the screen left it
			const end = event.changedTouches.item( 0 ).clientX;

			if ( end > start + offset ) {
				ctx.api.goPrev();
			}

			if ( end < start - offset ) {
				ctx.api.goNext();
			}
		}
	} );
}
