/**
 * Swipe with pointer events (feature 019, J-5; v5.8.5 used touch events).
 *
 * A gesture starts on `pointerdown` and is decided on `pointerup` or
 * `pointercancel`: it is a swipe when the horizontal distance reaches
 * `swipeThreshold` (legacy default 100 px, the block 40 px) and is more than
 * 1.5 × the vertical distance. Mouse pointers are ignored (as touch events
 * never fired for a mouse); vertical moves are never prevented, so the page
 * still scrolls, and the click that follows a swipe is swallowed.
 *
 * Surface: the stage (`.slides`) in the `stage` layout, `.component-carousel`
 * in the legacy layout.
 */

const DOMINANCE = 1.5;
// A click this soon after a swipe is the swipe's own click.
const CLICK_SUPPRESS_MS = 400;

/**
 * @param {Object} ctx Carousel instance context.
 * @return {Element|null} The swipe surface.
 */
function surfaceOf( ctx ) {
	const root = ctx.$el[ 0 ];

	return ctx.options.layout === 'stage'
		? root.querySelector( '.slides' )
		: root.querySelector( '.component-carousel' );
}

/**
 * @param {Object} ctx Carousel instance context.
 * @return {() => void} Teardown.
 */
export function bindSwipe( ctx ) {
	const surface = surfaceOf( ctx );

	if ( ! surface || typeof window.PointerEvent === 'undefined' ) {
		return () => {};
	}

	let gesture = null;
	let swipedAt = 0;

	// Legacy markup has no `touch-action` rule; without one the browser may
	// claim a horizontal drag and cancel the pointer. Pinch zoom stays on.
	if ( ctx.options.layout !== 'stage' && ! surface.style.touchAction ) {
		surface.style.touchAction = 'pan-y pinch-zoom';
	}

	const onDown = ( event ) => {
		// A new press ends the window in which a click belongs to the swipe.
		swipedAt = 0;

		if ( event.pointerType === 'mouse' || ! event.isPrimary ) {
			gesture = null;
			return;
		}

		gesture = {
			id: event.pointerId,
			x: event.clientX,
			y: event.clientY,
			lastX: event.clientX,
			lastY: event.clientY,
		};
	};

	const onMove = ( event ) => {
		if ( gesture && event.pointerId === gesture.id ) {
			gesture.lastX = event.clientX;
			gesture.lastY = event.clientY;
		}
	};

	const onEnd = ( event ) => {
		if ( ! gesture || event.pointerId !== gesture.id ) {
			return;
		}

		// pointercancel may carry no coordinates: use the last move.
		const useEvent = event.type === 'pointerup';
		const dx = ( useEvent ? event.clientX : gesture.lastX ) - gesture.x;
		const dy = ( useEvent ? event.clientY : gesture.lastY ) - gesture.y;
		gesture = null;

		if (
			Math.abs( dx ) < ctx.options.swipeThreshold ||
			Math.abs( dx ) <= DOMINANCE * Math.abs( dy )
		) {
			return;
		}

		swipedAt = Date.now();

		if ( dx < 0 ) {
			ctx.api.goNext( undefined, { source: 'swipe' } );
		} else {
			ctx.api.goPrev( undefined, { source: 'swipe' } );
		}
	};

	const onClick = ( event ) => {
		if ( swipedAt && Date.now() - swipedAt < CLICK_SUPPRESS_MS ) {
			event.preventDefault();
			event.stopImmediatePropagation();
		}
		swipedAt = 0;
	};

	surface.addEventListener( 'pointerdown', onDown );
	surface.addEventListener( 'pointermove', onMove );
	surface.addEventListener( 'pointerup', onEnd );
	surface.addEventListener( 'pointercancel', onEnd );
	surface.addEventListener( 'click', onClick, true );

	return () => {
		surface.removeEventListener( 'pointerdown', onDown );
		surface.removeEventListener( 'pointermove', onMove );
		surface.removeEventListener( 'pointerup', onEnd );
		surface.removeEventListener( 'pointercancel', onEnd );
		surface.removeEventListener( 'click', onClick, true );
	};
}
