/**
 * component_carousel options.
 *
 * Option-less markup keeps the v5.8.5 behaviour (the legacy defaults below).
 * `data-component-options` (passed in as `params` by the loader) may select
 * the newer modes; every key is validated and invalid values are ignored.
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

const ENUMS = {
	layout: [ 'peek', 'stage' ],
	nav: [ 'dots', 'thumbs' ],
};

const BOOLEANS = [ 'arrows', 'loop', 'autoplay' ];

/**
 * Read one option from `params`, or `undefined` when it is absent or invalid.
 *
 * @param {Object} params Raw options.
 * @param {string} key    Option name.
 * @return {string|boolean|number|undefined} The valid value, or undefined.
 */
function readOption( params, key ) {
	const value = params[ key ];

	if ( ENUMS[ key ] ) {
		return ENUMS[ key ].includes( value ) ? value : undefined;
	}

	if ( BOOLEANS.includes( key ) ) {
		return typeof value === 'boolean' ? value : undefined;
	}

	if ( key === 'swipeThreshold' ) {
		const number = Number( value );

		return value !== null &&
			value !== '' &&
			Number.isFinite( number ) &&
			number > 0
			? number
			: undefined;
	}

	return undefined;
}

/**
 * Build the options object for one carousel instance.
 *
 * @param {Object} [params] `data-component-options` (non-objects are ignored).
 * @return {Object} The legacy defaults overridden by the valid `params` keys.
 */
export function createOptions( params ) {
	const options = { ...LEGACY_DEFAULTS };

	if ( ! params || typeof params !== 'object' || Array.isArray( params ) ) {
		return options;
	}

	Object.keys( LEGACY_DEFAULTS ).forEach( ( key ) => {
		const value = readOption( params, key );

		if ( value !== undefined ) {
			options[ key ] = value;
		}
	} );

	return options;
}
