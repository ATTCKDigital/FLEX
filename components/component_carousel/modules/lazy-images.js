/**
 * Deferred slide images (stage layout). The server renders the first slide's
 * image normally and the others with `data-src` / `data-srcset` /
 * `data-sizes` and no `src`. A slide's image is promoted when the slide is
 * shown; one neighbour is preloaded once the browser is idle and again after
 * each change, so a page shows at most two full-size images per carousel
 * before any interaction. `state.loaded` holds the promoted indexes.
 */

const IDLE_TIMEOUT_MS = 2000;

/**
 * Promote the deferred image(s) of slide `index` (once).
 *
 * @param {Object} ctx   Carousel instance context.
 * @param {number} index Slide index.
 */
export function loadSlide( ctx, index ) {
	const { state } = ctx;
	const slide = state.slides[ index ];

	if ( ! slide || state.loaded.has( index ) ) {
		return;
	}

	state.loaded.add( index );

	slide.querySelectorAll( 'img[data-src]' ).forEach( ( img ) => {
		[ 'sizes', 'srcset', 'src' ].forEach( ( name ) => {
			const value = img.getAttribute( `data-${ name }` );

			if ( value ) {
				img.setAttribute( name, value );
			}
			img.removeAttribute( `data-${ name }` );
		} );

		if ( ! img.complete ) {
			slide.classList.add( 'is-loading' );

			const done = () => slide.classList.remove( 'is-loading' );
			img.addEventListener( 'load', done, { once: true } );
			img.addEventListener( 'error', done, { once: true } );
		}
	} );
}

/**
 * The neighbour to preload after a move from `from` to the current index:
 * the next slide in the direction of travel (forwards by default).
 *
 * @param {Object} ctx    Carousel instance context.
 * @param {number} [from] Previous index.
 * @return {number|null} Index to preload, or null at a clamped end.
 */
function neighbourOf( ctx, from ) {
	const { state, options } = ctx;
	const last = state.count - 1;
	let step = from === undefined || from < state.index ? 1 : -1;

	// A wrap (last → first, or first → last) keeps its direction of travel.
	if ( from === last && state.index === 0 ) {
		step = 1;
	} else if ( from === 0 && state.index === last ) {
		step = -1;
	}

	const target = state.index + step;

	if ( target >= 0 && target < state.count ) {
		return target;
	}

	return options.loop === false
		? null
		: ( target + state.count ) % state.count;
}

/**
 * Preload one neighbour of the current slide.
 *
 * @param {Object} ctx    Carousel instance context.
 * @param {number} [from] Previous index.
 */
export function preloadNeighbour( ctx, from ) {
	const index = neighbourOf( ctx, from );

	if ( index !== null ) {
		loadSlide( ctx, index );
	}
}

/**
 * Mark already-rendered images as loaded and schedule the idle preload.
 *
 * @param {Object} ctx Carousel instance context.
 * @return {() => void} Teardown.
 */
export function bindLazyImages( ctx ) {
	const { state } = ctx;

	state.slides.forEach( ( slide, i ) => {
		if ( ! slide.querySelector( 'img[data-src]' ) ) {
			state.loaded.add( i );
		}
	} );

	const preload = () => preloadNeighbour( ctx );

	if ( typeof window.requestIdleCallback === 'function' ) {
		const handle = window.requestIdleCallback( preload, {
			timeout: IDLE_TIMEOUT_MS,
		} );

		return () => window.cancelIdleCallback( handle );
	}

	const timer = setTimeout( preload, IDLE_TIMEOUT_MS );

	return () => clearTimeout( timer );
}
