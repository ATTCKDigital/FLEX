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
