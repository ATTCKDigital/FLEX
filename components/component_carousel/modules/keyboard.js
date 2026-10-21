/**
 * Legacy keyboard handling: ←/→ anywhere on the page click this carousel's
 * arrows. Page-wide on purpose until feature 019 US3 scopes it to the
 * focused carousel.
 */

/**
 * @param {Object} ctx Carousel instance context.
 */
export function bindKeyboard( ctx ) {
	const { $el } = ctx;

	$( 'body' ).on( 'keydown', function ( e ) {
		// Left arrow key
		if ( e.keyCode === 37 ) {
			$( '.nav.prev', $el ).click();
		}

		// Right arrow key
		if ( e.keyCode === 39 ) {
			$( '.nav.next', $el ).click();
		}
	} );
}
