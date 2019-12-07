/**
 * Declares the global namespace, and the ns() utility for declaring
 * sub-namespaces.
 */
"use strict";

var clientNamespace = {};
var FLEXLAYOUT = clientNamespace;

FLEXLAYOUT.Globals = {};

FLEXLAYOUT.formatPhoneNumber = function (phoneNumberString) {
	console.log('/flexlayout/js/clientNamespace', 'formatPhoneNumber()');
	console.log('/— phoneNumberString: ', phoneNumberString);

	var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
	var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
	
	if (match) {
		return '(' + match[1] + ') ' + match[2] + '-' + match[3]
	}

	return null
};

FLEXLAYOUT.getQueryVariable = function (variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");

	for (var i=0; i < vars.length; i++) {
		var pair = vars[i].split("=");

		if (pair[0] === variable) {
			return pair[1];
		}
	}

	return(false);
};

// https://medium.com/@DylanAttal/truncate-a-string-in-javascript-41f33171d5a8
FLEXLAYOUT.truncateString = function (str, num) {
	console.log('/flexlayout/js/global-events.js', 'truncateString()');

	if (!str) return false;
	if (!num) return false;

	// If the length of str is less than or equal to num
	// just return str--don't truncate it.
	if (str.length <= num) {
		return str;
	}

	// Return str truncated with '...' concatenated to the end of str.
	return str.slice(0, num) + '...';
};

// Turn console logging on or off
// Can override with ?debug=true URL variable
FLEXLAYOUT.showConsoleLogs = false || FLEXLAYOUT.getQueryVariable('debug');

// Console event override
(function () {
	// NOTE: Uncomment to see script references in console
	// return true;
	var _log = console.log;
	
	console.log = function (logMessage) {
		if (FLEXLAYOUT.showConsoleLogs) {
			var argArray = arguments;

			if (arguments.length === 2) {
				if (arguments[0] && arguments[1]) {
					if (arguments[0] === 'loaded') {
						argArray = [];

						// If first item is 'loaded', make it green
						argArray.push('%c   loaded: %c ' + arguments[1]);
						argArray.push('color: #BADA55');
						argArray.push('color: #759417');
					} else if (arguments[0].startsWith && arguments[0].startsWith('/')) {
						argArray = [];

						// Otherwise, if the first item starts with '/', grey it out
						argArray.push('%c   ' + arguments[0] + ' › %c ' + arguments[1]);
						argArray.push('color: #89a9c8');
						argArray.push('color: #0b286d; font-style: italic');
					}
				}
			} else {
				argArray = [];

				for (const prop in arguments) {
					if (arguments.hasOwnProperty(prop)) {
						if (arguments[(prop * 1)]) {
							argArray.push(arguments[(prop * 1)]);
						}
					}
				}
			}

			_log.apply(console, argArray);
		}
	};
})();

console.log('loaded', '/flexlayout/js/clientNamespace.js');

export default FLEXLAYOUT;
