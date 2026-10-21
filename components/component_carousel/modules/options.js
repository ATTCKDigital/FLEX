/**
 * component_carousel options.
 *
 * Legacy defaults only: option-less markup keeps the v5.8.5 behaviour. The
 * component does not read `data-component-options` yet; accepting and
 * validating `params` arrives with the stage layout (feature 019, US1).
 */

const LEGACY_DEFAULTS = Object.freeze( {
	layout: 'peek',
	nav: 'dots',
	arrows: true,
	// `loop` unset = legacy edge rules (next wraps to 0, prev stops at 0).
	loop: undefined,
	autoplay: true,
	swipeThreshold: 100,
} );

/**
 * Build the options object for one carousel instance.
 *
 * @return {Object} A fresh copy of the legacy defaults.
 */
export function createOptions() {
	return { ...LEGACY_DEFAULTS };
}
