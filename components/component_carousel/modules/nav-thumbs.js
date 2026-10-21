/**
 * Thumbnail navigation (`nav: "thumbs"`): the thumbnails are the "dots".
 * Native `<button class="dot__thumb" data-index>` inside
 * `.dots-component--thumbs li.dot`. Bound with addEventListener so
 * component_wcag's jQuery-handler scan adds no stray tab stops.
 */
import { scrollBehavior } from './motion';

// Space kept between the active thumbnail and the row's edge when scrolling.
const SCROLL_MARGIN_PX = 8;

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

/**
 * Scroll the thumbnail row just enough to show the active thumbnail. Uses
 * `row.scrollTo()` on the row only, so the page never scrolls (no
 * `scrollIntoView`, J-4); instant under reduced motion.
 *
 * @param {Object}  ctx            Carousel instance context.
 * @param {Object}  [opts]         Options.
 * @param {boolean} [opts.instant] Jump instead of a smooth scroll.
 */
export function scrollToActiveThumb( ctx, { instant = false } = {} ) {
	const row = ctx.$el[ 0 ].querySelector( '.dots-component--thumbs' );
	const thumb = getThumbs( ctx )[ ctx.state.index ];

	if ( ! row || ! thumb || row.scrollWidth <= row.clientWidth ) {
		return;
	}

	const item = thumb.closest( 'li.dot' ) || thumb;
	const rowBox = row.getBoundingClientRect();
	const itemBox = item.getBoundingClientRect();
	const start = itemBox.left - rowBox.left - row.clientLeft + row.scrollLeft;
	const end = start + itemBox.width;
	const viewStart = row.scrollLeft;
	const viewEnd = viewStart + row.clientWidth;
	let left = null;

	if ( start - SCROLL_MARGIN_PX < viewStart ) {
		left = start - SCROLL_MARGIN_PX;
	} else if ( end + SCROLL_MARGIN_PX > viewEnd ) {
		left = end + SCROLL_MARGIN_PX - row.clientWidth;
	}

	if ( left === null ) {
		return;
	}

	const max = row.scrollWidth - row.clientWidth;
	left = Math.min( Math.max( Math.round( left ), 0 ), max );

	if ( typeof row.scrollTo === 'function' ) {
		row.scrollTo( { left, behavior: instant ? 'auto' : scrollBehavior() } );
	} else {
		row.scrollLeft = left;
	}
}
