/**
 * Legacy prev/next arrows (`.nav.prev` / `.nav.next`).
 */

/**
 * Arrow clicks trigger the public carousel events on the root element.
 *
 * @param {Object} ctx Carousel instance context.
 */
export function bindArrows( ctx ) {
	const { $el } = ctx;

	$el.on( 'click', '.nav', function ( e ) {
		e.preventDefault();

		if ( $( this ).hasClass( 'disabled' ) ) {
			return;
		}

		let direction = 'carousel.goNext';

		if ( $( this ).hasClass( 'prev' ) ) {
			direction = 'carousel.goPrev';
		}

		$el.trigger( direction );
	} );
}

/**
 * Initial state: the prev arrow starts disabled.
 *
 * @param {Object} ctx Carousel instance context.
 */
export function initArrows( ctx ) {
	$( '.nav.prev', ctx.$el ).addClass( 'disabled' );
}

/**
 * Enable both arrows.
 *
 * @param {Object} ctx Carousel instance context.
 */
export function enableArrows( ctx ) {
	$( '.nav', ctx.$el ).removeClass( 'disabled' );
}

/**
 * Disable one arrow.
 *
 * @param {Object}        ctx  Carousel instance context.
 * @param {'prev'|'next'} side Which arrow.
 */
export function disableArrow( ctx, side ) {
	$( `.nav.${ side }`, ctx.$el ).addClass( 'disabled' );
}
