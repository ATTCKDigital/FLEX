/**
 * Accessibility hooks: register the legacy controls with component_wcag.
 */
import FLEX from '../../../js/client-namespace';

/**
 * @param {Object} ctx Carousel instance context.
 */
export function registerInteractiveElements( ctx ) {
	const { $el } = ctx;

	$( FLEX ).trigger( FLEX.events.wcag.registerInteractive, {
		elements: [
			$( '.nav.next', $el )[ 0 ],
			$( '.nav.prev', $el )[ 0 ],
			$( 'li.dot', $el ).toArray(),
		],
	} );
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
