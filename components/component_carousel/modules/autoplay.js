/**
 * Legacy autoplay: advance every 4–6 s (picked once per instance).
 *
 * Runs only when `autoplay` is on (option-less legacy markup; the Carousel
 * block always passes `autoplay: false`, J-9). Under reduced motion it does
 * not advance (feature 019): the preference is read on every tick, so it
 * follows the OS setting without a reload.
 */
import { prefersReducedMotion } from './motion';

function randomInteger( min, max ) {
	return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
}

/**
 * @param {Object} ctx Carousel instance context.
 * @return {() => void} Teardown.
 */
export function startAutoplay( ctx ) {
	if ( ! ctx.options.autoplay ) {
		return () => {};
	}

	const timer = setInterval(
		function () {
			// NOTE: (DP) Evidently, the event listener noted above is not catching the transition
			// end event anymore. So, we're going to make sure to reset the value here manually.

			// TODO: (DP) Find out if this event spec changed recently.
			ctx.state.transitionInProgress = false;

			if ( prefersReducedMotion() ) {
				return;
			}

			ctx.api.goNext( undefined, { source: 'autoplay' } );
		},
		randomInteger( 4000, 6000 )
	);

	return () => clearInterval( timer );
}
