/**
 * Index state and navigation with the legacy edge rules: next wraps to 0, prev
 * stops at 0, and the peek layout's `lastScrollableSlide` couples the two.
 * The stage layout navigates through ./stage-nav (loop / clamp, no lock).
 */
import { applySlideClasses } from './slide-classes';
import { updateDots } from './nav-dots';
import { moveSlideContainerInner } from './layout-peek';
import { enableArrows, disableArrow } from './nav-arrows';
import { stageGoTo } from './stage-nav';
import { announce } from './a11y';

/**
 * @return {Object} Fresh per-instance state; the peek layout adds its measurements.
 */
export function createState() {
	return {
		index: 0,
		transitionInProgress: false,
		// Stage layout: slide count, last requested index, promoted images.
		count: 0,
		requested: 0,
		loaded: new Set(),
	};
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

	// Only user actions (arrow, dot, key, swipe) set a source here.
	announce( ctx, state.source );
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
 * @param {Object} ctx           Carousel instance context.
 * @param {number} arg           Target index.
 * @param {Object} [opts]        Options.
 * @param {string} [opts.source] thumb|dot|arrow|key|swipe|autoplay|api.
 * @return {boolean|undefined} Stage layout: whether the slide changed.
 */
export function goTo( ctx, arg, opts = {} ) {
	if ( ctx.options.layout === 'stage' ) {
		return stageGoTo( ctx, arg, opts );
	}

	const { state } = ctx;
	// Proceed only if no CSS transition is in progress
	if ( state.transitionInProgress ) {
		return;
	}

	state.index = arg;
	go( ctx );
}
