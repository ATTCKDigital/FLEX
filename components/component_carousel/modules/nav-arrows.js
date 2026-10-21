/**
 * Prev / next arrows. Legacy markup: `.nav.prev` / `.nav.next` (jQuery,
 * `.disabled` class). Stage layout: native buttons (addEventListener); with
 * `loop: false` they are disabled at the ends. `arrows: false` binds nothing.
 */
import { withSource } from './a11y';

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

		withSource( ctx, 'arrow', () => $el.trigger( direction ) );
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

/**
 * Stage layout: native `<button class="nav prev|next">`, bound with
 * addEventListener (no jQuery click handler for component_wcag to find).
 *
 * @param {Object} ctx Carousel instance context.
 * @return {() => void} Teardown.
 */
export function bindStageArrows( ctx ) {
	const root = ctx.$el[ 0 ];

	const onClick = ( event ) => {
		const button = event.target.closest( '.nav.prev, .nav.next' );

		if ( ! button || ! root.contains( button ) ) {
			return;
		}

		event.preventDefault();

		if ( button.disabled || button.classList.contains( 'disabled' ) ) {
			return;
		}

		const delta = button.classList.contains( 'prev' ) ? -1 : 1;
		ctx.api.step( delta, { source: 'arrow' } );
	};

	root.addEventListener( 'click', onClick );

	return () => root.removeEventListener( 'click', onClick );
}

/**
 * Stage layout: with `loop: false` the arrows are disabled at the ends
 * (attribute and legacy class); otherwise they are never disabled.
 *
 * @param {Object} ctx Carousel instance context.
 */
export function updateStageArrows( ctx ) {
	const { state, options } = ctx;
	const clamp = options.loop === false;

	ctx.$el[ 0 ]
		.querySelectorAll( '.nav.prev, .nav.next' )
		.forEach( ( button ) => {
			const atEnd = button.classList.contains( 'prev' )
				? state.index <= 0
				: state.index >= state.count - 1;
			const disabled = clamp && atEnd;

			button.disabled = disabled;
			button.classList.toggle( 'disabled', disabled );
		} );
}
