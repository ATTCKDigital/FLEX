/**
 * Legacy autoplay: advance every 4–6 s (picked once per instance).
 */

function randomInteger( min, max ) {
	return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
}

/**
 * @param {Object} ctx Carousel instance context.
 */
export function startAutoplay( ctx ) {
	if ( ! ctx.options.autoplay ) {
		return;
	}

	setInterval(
		function () {
			// NOTE: (DP) Evidently, the event listener noted above is not catching the transition
			// end event anymore. So, we're going to make sure to reset the value here manually.

			// TODO: (DP) Find out if this event spec changed recently.
			ctx.state.transitionInProgress = false;

			ctx.api.goNext();
		},
		randomInteger( 4000, 6000 )
	);
}
