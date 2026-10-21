/**
 * Index state and navigation with the legacy edge rules: next wraps to 0, prev
 * stops at 0, and the peek layout's `lastScrollableSlide` couples the two.
 */
import { applySlideClasses } from './slide-classes';
import { updateDots } from './nav-dots';
import { moveSlideContainerInner } from './layout-peek';
import { enableArrows, disableArrow } from './nav-arrows';

/**
 * @return {Object} Fresh per-instance state; the peek layout adds its measurements.
 */
export function createState() {
	return { index: 0, transitionInProgress: false };
}

/**
 * Render the current index: slide classes, dots, offset, `FLEX.slideUpdate`.
 *
 * @param {Object} ctx Carousel instance context.
 */
export function go( ctx ) {
	const { $el, state } = ctx;

	// Indicate CSS transition is in progress
	state.transitionInProgress = true;

	applySlideClasses( ctx );
	updateDots( ctx, state.index );
	moveSlideContainerInner( ctx );

	$( document.body ).trigger( 'FLEX.slideUpdate', {
		id: $el.attr( 'id' ),
	} );
}

/**
 * @param {Object}  ctx  Carousel instance context.
 * @param {Element} [el] The element the request came from (`this` of the event).
 */
export function goNext( ctx, el ) {
	const { state } = ctx;

	// Proceed only if no CSS transition is in progress
	if ( state.transitionInProgress || $( el ).hasClass( 'disabled' ) ) {
		return;
	}

	if (
		state.index <= state.slidesLength - 1 ||
		state.index <= state.lastScrollableSlide - 1
	) {
		state.index = state.index + 1;

		if ( state.index <= state.slidesLength ) {
			enableArrows( ctx );

			// Stop at max visible slides index
			if ( state.index >= state.lastScrollableSlide ) {
				state.transitionInProgress = false;
				disableArrow( ctx, 'next' );
			}
		} else {
			// Otherwise, stop at current index
			state.transitionInProgress = false;
			disableArrow( ctx, 'next' );
		}
	} else {
		state.index = 0;
		state.transitionInProgress = false;
		disableArrow( ctx, 'next' );
	}
	go( ctx );
}

/**
 * @param {Object}  ctx  Carousel instance context.
 * @param {Element} [el] The element the request came from (`this` of the event).
 */
export function goPrev( ctx, el ) {
	const { state } = ctx;

	// Proceed only if no CSS transition is in progress
	if ( state.transitionInProgress || $( el ).hasClass( 'disabled' ) ) {
		return;
	}

	if ( state.index > 0 ) {
		state.index = state.index - 1;

		if ( state.index > 0 ) {
			enableArrows( ctx );
		} else {
			// Otherwise, stop at the beginning
			state.transitionInProgress = false;
			disableArrow( ctx, 'prev' );
		}
	} else {
		// Otherwise, stop at the beginning
		state.index = 0;
		state.transitionInProgress = false;
		disableArrow( ctx, 'prev' );
	}
	go( ctx );
}

/**
 * @param {Object} ctx Carousel instance context.
 * @param {number} arg Target index.
 */
export function goTo( ctx, arg ) {
	const { state } = ctx;
	// Proceed only if no CSS transition is in progress
	if ( state.transitionInProgress ) {
		return;
	}

	state.index = arg;
	go( ctx );
}
