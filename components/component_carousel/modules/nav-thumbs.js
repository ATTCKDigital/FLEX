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
 * A thumbnail item's start and end along the row's scroll axis, in px.
 *
 * @param {Element} row  The scrolling thumbnail row.
 * @param {Element} item The thumbnail's `li.dot` (or button).
 * @return {{start: number, end: number}} Span in scroll coordinates.
 */
function getItemSpan( row, item ) {
	const rowBox = row.getBoundingClientRect();
	const itemBox = item.getBoundingClientRect();
	const start = itemBox.left - rowBox.left - row.clientLeft + row.scrollLeft;

	return { start, end: start + itemBox.width };
}

/**
 * The span to keep visible: the active thumbnail plus its previous and next
 * neighbours (clamped at the ends, never wrapped), so the visitor can see
 * there is more to select. When the three do not fit (narrow rows), the
 * active thumbnail is centred so both neighbours peek in from the edges.
 *
 * @param {Element}   row   The scrolling thumbnail row.
 * @param {Element[]} items Thumbnail items in slide order.
 * @param {number}    index Active slide index.
 * @return {{start: number, end: number}} Span in scroll coordinates.
 */
function getVisibleSpan( row, items, index ) {
	const first = getItemSpan( row, items[ Math.max( index - 1, 0 ) ] );
	const last = getItemSpan(
		row,
		items[ Math.min( index + 1, items.length - 1 ) ]
	);
	const span = {
		start: first.start - SCROLL_MARGIN_PX,
		end: last.end + SCROLL_MARGIN_PX,
	};

	if ( span.end - span.start <= row.clientWidth ) {
		return span;
	}

	const active = getItemSpan( row, items[ index ] );
	const start = ( active.start + active.end - row.clientWidth ) / 2;

	return { start, end: start + row.clientWidth };
}

/**
 * Scroll the thumbnail row just enough to show the active thumbnail and its
 * neighbours. Uses `row.scrollTo()` on the row only, so the page never
 * scrolls (no `scrollIntoView`, J-4); instant under reduced motion.
 *
 * @param {Object}  ctx            Carousel instance context.
 * @param {Object}  [opts]         Options.
 * @param {boolean} [opts.instant] Jump instead of a smooth scroll.
 */
export function scrollToActiveThumb( ctx, { instant = false } = {} ) {
	const row = ctx.$el[ 0 ].querySelector( '.dots-component--thumbs' );
	const items = getThumbs( ctx ).map(
		( thumb ) => thumb.closest( 'li.dot' ) || thumb
	);

	if (
		! row ||
		! items[ ctx.state.index ] ||
		row.scrollWidth <= row.clientWidth
	) {
		return;
	}

	const span = getVisibleSpan( row, items, ctx.state.index );
	const viewStart = row.scrollLeft;
	const viewEnd = viewStart + row.clientWidth;
	let left = null;

	if ( span.start < viewStart ) {
		left = span.start;
	} else if ( span.end > viewEnd ) {
		left = span.end - row.clientWidth;
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
