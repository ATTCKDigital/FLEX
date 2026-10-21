/**
 * Legacy slide classes: `active`, and `previous` / `next` around it with the
 * first and last slides wrapping.
 */

/**
 * Apply the classes for the current index.
 *
 * @param {Object} ctx Carousel instance context.
 */
export function applySlideClasses( ctx ) {
	const { state } = ctx;
	const $slides = state.$slides;

	$slides
		.eq( state.index )
		.removeClass( 'previous next' )
		.addClass( 'active' );

	for ( let x = 0; x < $slides.length; x++ ) {
		if ( x < state.index ) {
			const wraps = x === 0 && state.index === $slides.length - 1;
			$slides
				.eq( x )
				.removeClass( 'previous next active' )
				.addClass( wraps ? 'next' : 'previous' );
		}

		if ( x > state.index ) {
			const wraps = x === $slides.length - 1 && state.index === 0;
			$slides
				.eq( x )
				.removeClass( 'previous next active' )
				.addClass( wraps ? 'previous' : 'next' );
		}
	}
}

/**
 * Initial classes (they aren't set via PHP): first slide active, last slide
 * previous, the others next.
 *
 * @param {Object} ctx Carousel instance context.
 */
export function setInitialSlideClasses( ctx ) {
	const $slides = ctx.state.$slides;

	// - first LI of first UL
	$( '.slides.active li', ctx.$el ).eq( 0 ).addClass( 'active' );

	for ( let x = 0; x < $slides.length; x++ ) {
		if ( x === 0 ) {
			$slides.eq( x ).addClass( 'active' );
		} else if ( x === $slides.length - 1 ) {
			$slides.eq( x ).addClass( 'previous' );
		} else {
			$slides.eq( x ).addClass( 'next' );
		}
	}
}
