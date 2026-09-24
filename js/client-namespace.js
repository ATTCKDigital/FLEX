/**
 * Declares the global namespace,
 * TODO: (DP) Add the ns() utility for declaring sub-namespaces.
 */
'use strict';

import $ from 'jquery';

// Namespace & config
const FLEX = {
	// Used by debug.js to parse which .breakpoint element is(':visible')
	breakpoints: [
		'small',
		'phone',
		'phone-plus',
		'tablet-portrait',
		'tablet-landscape',
		'desktop',
		'xl',
		'2xl',
		'3xl',
		'4xl',
		'5xl',
	],

	// Forces debug state without needing ?debug=true
	debugOverride: false,

	// Functionality added to this namespace in global-events.js
	Globals: {},

	// Exposes verbose, colored console logs
	showConsoleLogs: true,

	// Set false by default.
	// Will be overridden by check below.
	isProd: false,
};

console.log( 'client namespace loaded, FLEX: ', FLEX );
window.FLEX = FLEX;

// Cookie manager
FLEX.cookies = ( function () {
	function set( key, value, expiry ) {
		console.log(
			'/src\t/scripts\t/FLEX.js',
			'FLEX.cookies.set(key:' +
				key +
				', value:' +
				value +
				', expiry:' +
				expiry +
				')'
		);

		const expires = new Date();
		expires.setTime( expires.getTime() + expiry * 24 * 60 * 60 * 1000 );
		document.cookie =
			key + '=' + value + ';path=/;expires=' + expires.toUTCString();
	}

	function get( key ) {
		const keyValue = document.cookie.match(
			'(^|;) ?' + key + '=([^;]*)(;|$)'
		);
		const returnValue = keyValue ? keyValue[ 2 ] : null;

		console.log(
			'/src\t/scripts\t/FLEX.js',
			'FLEX.cookies.get(' + key + ') › returnValue: ' + returnValue
		);

		return returnValue;
	}

	function remove( key ) {
		console.log(
			'/src\t/scripts\t/FLEX.js',
			'FLEX.cookies.remove(' + key + ')'
		);

		const keyValue = this.get( key );
		this.set( key, keyValue, '-1' );
	}

	return {
		get,
		remove,
		set,
	};
} )();

/**
 * Basic function testing
 */
FLEX.enforce = ( function () {
	/**
	 * Logs error messages to console
	 *
	 * Usages:
	 * — FLEX.enforce.required(varName, [errorMessage]);
	 * — FLEX.enforce.type(varName, type, [errorMessage]);
	 * — FLEX.enforce.custom(boolean, callbackFunction);
	 *
	 * @param {string}        errorMessage Message to display
	 * @param {string|object} errorType    Category of error, object format: { 'errorType': '{string} typeName' }
	 * @return {boolean} True if defined, else undefined & an error message
	 */
	const _error = ( function () {
		function _showError( errorType, errorMessage ) {
			console.log(
				'/src\t/scripts\t/FLEX.js',
				'FLEX.enforce._error._showError(errorType: , errorMessage: )',
				errorType,
				errorMessage
			);

			// Set default error message
			const error = {
				errorType: 'default',
				message: 'There has been an error.',
			};

			// Handle errorType objects (e.g., typechecks)
			if ( typeof errorType === 'object' ) {
				switch ( true ) {
					// Handle type checking errors
					case errorType.hasOwnProperty( 'typeCheck' ):
						error.typeCheck = errorType.typeCheck;
						error.errorType = 'typeCheck';

						return;
				}
			}

			// Handle various error types
			switch ( true ) {
				case error.errorType === 'default':
				case error.errorType === 'generic':
					error.message = 'There has been an error.';

					break;

				case error.errorType === 'required':
					error.message = 'Required parameter is missing.';

					break;

				case error.errorType === 'typeCheck':
					error.message =
						'Parameter type must be: ' + error.typeCheck;

					break;

				default:
					error.message = errorMessage;
			}

			// Append error message if passed
			if ( ! FLEX.isUndefined( errorMessage ) ) {
				error.message += ': ' + errorMessage;
			}

			// Display the final error message
			console.error( error.message );

			return false;
		}

		function generic( errorMessage ) {
			console.log(
				'/src\t/scripts\t/FLEX.js',
				'FLEX.enforce._error.generic(errorMessage:)',
				errorMessage
			);

			return _showError( 'generic', errorMessage );
		}

		function requiredError( errorMessage ) {
			console.log(
				'/src\t/scripts\t/FLEX.js',
				'FLEX.enforce._error.required(errorMessage:)',
				errorMessage
			);

			return _showError( 'required', errorMessage );
		}

		// Available tests
		return {
			generic,
			required: requiredError,
			typeCheck: type,
		};
	} )();

	/**
	 * Tests if value is defined.
	 * @param {string} val          Required value to check
	 * @param {string} errorMessage
	 * @return {boolean} True if defined, else undefined & an error message
	 */
	function required( val, errorMessage ) {
		console.log(
			'/src\t/scripts\t/FLEX.js',
			'FLEX.enforce.required(val:, errorMessage:)',
			val,
			errorMessage
		);

		// Return if value is defined
		if ( ! FLEX.isUndefined( val ) ) {
			return true;
		}

		// Otherwise, log error message...
		_error.required();

		// Return error
		return false;
	}

	/**
	 * Tests if value matches type.
	 * @param {string} val            Value to check
	 * @param {string} expectedType   Type to compare against value
	 * @param {string} [errorMessage] Error shown if tests fail
	 * @return {boolean} True if typecheck is passed, else undefined & an error message
	 */
	function type( val, expectedType, errorMessage ) {
		console.log(
			'/src\t/scripts\t/FLEX.js',
			'FLEX.enforce.type(val:, type:, errorMessage:)',
			val,
			expectedType,
			errorMessage
		);

		// Enforce required parameters
		FLEX.enforce.required( val );
		FLEX.enforce.required( expectedType );

		// Enforce type
		if ( typeof val !== expectedType ) {
			return _error.typeCheck( 'string' );
		}

		// If all tests passed, return true.
		return true;
	}

	/**
	 * Returns callback if passesTest param is true.
	 * @param {boolean}       passesTest    Calling method set this value.
	 * @param {() => unknown} errorCallback Callback function
	 * @return {unknown} Returns return value of callback function
	 */
	function custom( passesTest, errorCallback ) {
		console.log(
			'/src\t/scripts\t/FLEX.js',
			'FLEX.enforce.custom(passesTest:, errorCallback:)',
			passesTest,
			errorCallback
		);

		if ( ! passesTest ) {
			// Enforce function type
			if ( FLEX.enforce.type( errorCallback, 'function' ) ) {
				return errorCallback();
			}
			return false;
		}
		return true;
	}

	return {
		required,
		type,
		custom,
	};
} )();

FLEX.formatPhoneNumber = function ( phoneNumberString ) {
	console.log( '/FLEX/js/client-namespace', 'formatPhoneNumber()' );
	console.log( '/— phoneNumberString: ', phoneNumberString );

	const cleaned = ( '' + phoneNumberString ).replace( /\D/g, '' );
	const match = cleaned.match( /^(\d{3})(\d{3})(\d{4})$/ );

	if ( match ) {
		return '(' + match[ 1 ] + ') ' + match[ 2 ] + '-' + match[ 3 ];
	}

	return null;
};

// URL variable manager
// API:
// — get(key): Saves the String:key to a private _store object.
// — getAll(): Returns object with all cookies that have been set.
// — remove(key): Removes String:key from _store object.
FLEX.queryVariables = ( function () {
	const _store = {};

	function set( key, value ) {
		console.log(
			'/src\t/scripts\t/FLEX.js',
			'FLEX.queryVariables.set(key: ' + key + ', value:' + value + ')'
		);

		_store[ key ] = value;
	}

	function get( key ) {
		console.log(
			'/src\t/scripts\t/FLEX.js',
			'FLEX.queryVariables.get(key: ' + key + ')'
		);

		// Enforce required parameter
		FLEX.enforce.required( key );

		// Enforce parameter data type
		FLEX.enforce.type( key, 'string' );

		// Log error (but don't fail) if cookie doesn't exist in store
		if ( ! _store.hasOwnProperty( key ) ) {
			console.log(
				'Requested cookie (' + key + ") doesn't exist in store."
			);
			console.table( _store );
			console.log( '\n' );
		}

		// Return data store if no errors
		return _store[ key ];
	}

	function getAll() {
		console.log(
			'/src\t/scripts\t/FLEX.js',
			'FLEX.queryVariables.getAll()'
		);

		const query = window.location.search.substring( 1 );
		const vars = query.split( '&' );

		for ( let i = 0; i < vars.length; i++ ) {
			const pair = vars[ i ].split( '=' );

			set( pair[ 0 ], pair[ 1 ] );
		}

		console.table( _store );

		return _store;
	}

	function remove( key ) {
		console.log(
			'/src\t/scripts\t/FLEX.js',
			'FLEX.queryVariables.remove(key: ' + key + ')'
		);

		// Enforce required parameter
		if ( typeof key === 'undefined' ) {
			console.error( 'Required parameter is missing.' );

			return undefined;
		}

		// Enforce parameter data type
		if ( typeof key !== 'string' ) {
			console.error( 'Parameter must be a string' );

			return undefined;
		}

		// Return data store if no errors
		return delete _store[ key ];
	}

	return {
		get,
		getAll,
		remove,
	};
} )();

FLEX.insertDecimal = function ( num ) {
	num = ( num / 100 ).toFixed( 2 );
	num = num.toString().replace( /\B(?=(\d{3})+(?!\d))/g, ',' );

	return num;
};

// Alias for common typechecks
FLEX.isUndefined = function ( value ) {
	return typeof value === 'undefined';
};

FLEX.isUndefinedOrNull = function ( value ) {
	// Default value
	let returnValue = false;

	switch ( true ) {
		case typeof value === 'undefined':
			returnValue = true;
		// falls through (intentional: let these pass through)

		case value === null || value === undefined:
			returnValue = true;
		// falls through

		default:
			break;
	}

	return returnValue;
};

FLEX.truncateString = function ( str, num ) {
	// https://medium.com/@DylanAttal/truncate-a-string-in-javascript-41f33171d5a8
	console.log( '/FLEX/js/global-events.js', 'truncateString()' );

	if ( ! str ) {
		return false;
	}
	if ( ! num ) {
		return false;
	}

	// If the length of str is less than or equal to num
	// just return str--don't truncate it.
	if ( str.length <= num ) {
		return str;
	}

	// Return str truncated with '...' concatenated to the end of str.
	return str.slice( 0, num ) + '...';
};

// Fire up the chopper
FLEX.init = function () {
	// Retrieve URL vars
	this.queryVariables.getAll();

	// Detect debug mode
	if (
		typeof this.debug !== 'undefined' &&
		typeof this.debug.init !== 'undefined'
	) {
		this.debug.init();
	}

	return this;
};

// Initiate Global Component Loader and Global Events.
$( function () {
	FLEX.init();
} );

console.log( 'loaded', '/FLEX\t/js\t/client-namespace.js' );

export default FLEX;
