/**
 * Thumbnail navigation (`nav: "thumbs"`): the thumbnails are the "dots".
 * Native `<button class="dot__thumb" data-index>` inside
 * `.dots-component--thumbs li.dot`. Bound with addEventListener so
 * component_wcag's jQuery-handler scan adds no stray tab stops.
 */

/**
 * Delegated thumbnail clicks (click, tap, Enter and Space on the button).
 *
 * @param {Object} ctx Carousel instance context.
 * @return {() => void} Teardown.
 */
export function bindThumbs( ctx ) {
	const root = ctx.$el[ 0 ];

	const onClick = ( event ) => {
		const button = event.target.closest(
			'.dots-component--thumbs .dot__thumb'
		);

		if ( ! button || ! root.contains( button ) ) {
			return;
		}

		const index = Number( button.getAttribute( 'data-index' ) );

		if ( ! Number.isInteger( index ) ) {
			return;
		}

		event.preventDefault();
		ctx.api.goTo( index, { source: 'thumb' } );
	};

	root.addEventListener( 'click', onClick );

	return () => root.removeEventListener( 'click', onClick );
}

/**
 * The thumbnail buttons, in slide order.
 *
 * @param {Object} ctx Carousel instance context.
 * @return {Element[]} Buttons.
 */
export function getThumbs( ctx ) {
	return Array.from(
		ctx.$el[ 0 ].querySelectorAll( '.dots-component--thumbs .dot__thumb' )
	);
}

/**
 * Mark the active thumbnail: `li.dot.active` and `aria-current="true"` on the
 * active one only.
 *
 * @param {Object} ctx Carousel instance context.
 */
export function updateThumbs( ctx ) {
	const { index } = ctx.state;

	getThumbs( ctx ).forEach( ( button, i ) => {
		const isActive = i === index;
		const item = button.closest( 'li.dot' );

		if ( item ) {
			item.classList.toggle( 'active', isActive );
		}

		if ( isActive ) {
			button.setAttribute( 'aria-current', 'true' );
		} else {
			button.removeAttribute( 'aria-current' );
		}
	} );
}
