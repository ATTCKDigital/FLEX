/**
 * Accessibility hooks: component_wcag registration, the polite live region
 * and, for the lazily loaded legacy layout, component_wcag's tab stops.
 */
import FLEX from '../../../js/client-namespace';

// Changes a visitor asked for; `autoplay` and `api` are never announced.
const USER_SOURCES = [ 'thumb', 'dot', 'arrow', 'key', 'swipe' ];
// Clear, then set after this delay, so a repeated text is announced again
// and a burst of changes announces only the last one.
const ANNOUNCE_DELAY_MS = 100;

/**
 * Register the non-native controls (legacy `li.dot`, `a.nav`) with
 * component_wcag. Native `<button>`s are focusable and operable already and
 * are never registered (J-3, plan risk 7).
 *
 * @param {Object} ctx Carousel instance context.
 */
export function registerInteractiveElements( ctx ) {
	const { $el } = ctx;
	const nonNative = ( el ) => ! ( el && el.tagName === 'BUTTON' );
	const elements = [
		$( '.nav.next', $el )[ 0 ],
		$( '.nav.prev', $el )[ 0 ],
		$( 'li.dot', $el ).toArray().filter( nonNative ),
	].filter( ( el ) => ! el || Array.isArray( el ) || nonNative( el ) );

	if ( ctx.options.layout === 'stage' && ! elements.some( isPresent ) ) {
		return;
	}

	$( FLEX ).trigger( FLEX.events.wcag.registerInteractive, {
		elements,
	} );
}

/**
 * @param {Element|Element[]|undefined} entry A registration entry.
 * @return {boolean} Whether it holds at least one element.
 */
function isPresent( entry ) {
	return Array.isArray( entry ) ? entry.length > 0 : !! entry;
}

/**
 * Find the status live region, or create one (legacy markup has none). A created
 * region is visually hidden inline: no shared screen-reader utility exists.
 *
 * @param {Object} ctx Carousel instance context.
 */
export function initLiveRegion( ctx ) {
	const root = ctx.$el[ 0 ];
	// Only the carousel's own status element; never an aria-live inside a slide.
	let region = root.querySelector(
		'.component-image-carousel__status, .component-carousel__status'
	);

	if ( ! region ) {
		region = document.createElement( 'p' );
		region.className = 'component-carousel__status screen-reader-text';
		region.setAttribute( 'aria-live', 'polite' );
		region.setAttribute( 'aria-atomic', 'true' );
		Object.assign( region.style, {
			border: '0',
			clipPath: 'inset(50%)',
			height: '1px',
			margin: '-1px',
			overflow: 'hidden',
			padding: '0',
			position: 'absolute',
			whiteSpace: 'nowrap',
			width: '1px',
		} );
		root.appendChild( region );
	}

	ctx.state.liveRegion = region;
}

/**
 * Run `fn` with `source` recorded, so a legacy render can tell what asked
 * for it.
 *
 * @param {Object}               ctx    Carousel instance context.
 * @param {string|undefined}     source What asked for the change.
 * @param {() => (boolean|void)} fn     The navigation call.
 * @return {boolean|void} What `fn` returned.
 */
export function withSource( ctx, source, fn ) {
	const previous = ctx.state.source;
	// An inner call without a source keeps the outer one (arrow → event).
	ctx.state.source = source !== undefined ? source : previous;

	try {
		return fn();
	} finally {
		ctx.state.source = previous;
	}
}

/**
 * Announce the current slide ("Slide N of M[: caption]") when `source` is a
 * user action. Never on load, for autoplay or for the API.
 *
 * @param {Object} ctx    Carousel instance context.
 * @param {string} source What asked for the change.
 */
export function announce( ctx, source ) {
	const { state } = ctx;
	const region = state.liveRegion;

	if ( ! region || ! USER_SOURCES.includes( source ) ) {
		return;
	}

	const slides = state.$slides ? state.$slides.toArray() : [];
	const slide = slides[ state.index ];
	const caption = slide && slide.querySelector( 'figcaption' );
	const captionText = caption ? caption.textContent.trim() : '';
	let text = `Slide ${ state.index + 1 } of ${ slides.length }`;

	if ( captionText ) {
		text += `: ${ captionText }`;
	}

	clearTimeout( state.announceTimer );
	region.textContent = '';
	state.announceTimer = setTimeout( () => {
		region.textContent = text;
	}, ANNOUNCE_DELAY_MS );
}

// Elements component_wcag leaves alone (natively focusable).
const NATIVE_FOCUSABLE = 'a[href], button, input, select, textarea, summary';

/**
 * Whether component_wcag is on the page; its tab-stop scan runs when the
 * components finish loading (`components:loaded`).
 *
 * @return {boolean} True when a WCAG component instance was loaded.
 */
function wcagScanHasRun() {
	const { Components = {}, Loader = {} } = FLEX;

	return (
		!! Components.WCAG &&
		( Loader.loadedComponents || [] ).some(
			( entry ) => entry.instance instanceof Components.WCAG
		)
	);
}

/**
 * Legacy parity for the lazily loaded component: component_wcag gives
 * `tabindex="0"` to elements that have a jQuery click handler, but its scan ran
 * before this chunk bound any. Repeat that rule for this carousel's own
 * elements (root included) so the tab order matches the synchronous version.
 *
 * @param {jQuery} $el Carousel root.
 */
export function addLegacyTabStops( $el ) {
	if ( ! wcagScanHasRun() ) {
		return;
	}

	$el.find( '*' )
		.addBack()
		.each( function () {
			const $candidate = $( this );

			if (
				$candidate.is( NATIVE_FOCUSABLE ) ||
				$candidate.attr( 'tabindex' ) !== undefined ||
				$candidate.is( '[disabled]' )
			) {
				return;
			}

			const events = $._data( this, 'events' );

			if ( events && events.click ) {
				$candidate.attr( 'tabindex', '0' );
			}
		} );
}
