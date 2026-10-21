/**
 * Legacy dot navigation (`.dots-component a`).
 */

/**
 * Dot clicks go to the slide with the same position as the dot.
 *
 * The index is stored before `goTo()` runs, so a click during a transition
 * still moves the index without rendering (legacy behaviour).
 *
 * @param {Object} ctx Carousel instance context.
 */
export function bindDots( ctx ) {
	const { $el, state } = ctx;

	$el.on( 'click', '.dots-component a', function ( e ) {
		e.preventDefault();

		// Find parent
		const $parent = $( this ).closest( '.dots-component' );

		// Get index of this dot compared to siblings
		state.index = $parent.find( 'a' ).index( $( this ) );

		ctx.api.goTo( state.index );
	} );
}

/**
 * Show the dots when there is more than one slide.
 *
 * @param {Object} ctx Carousel instance context.
 */
export function showDots( ctx ) {
	if ( ctx.state.$slides.length > 1 ) {
		$( '.dots-component', ctx.$el ).css( {
			visibility: 'visible',
		} );
	}
}

/**
 * Update the active dot.
 *
 * @param {Object} ctx     Carousel instance context.
 * @param {number} current Zero-based current slide number.
 */
export function updateDots( ctx, current ) {
	ctx.state.$dotsContainer.each( function () {
		$( this ).find( 'li.dot' ).removeClass( 'active' );
		$( this ).find( 'li.dot' ).eq( current ).addClass( 'active' );
	} );
}
