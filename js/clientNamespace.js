/**
 * Declares the global namespace, and the ns() utility for declaring
 * sub-namespaces.
 */
"use strict";

var clientNamespace = {};
var FLEXLAYOUT = clientNamespace;

// Turn console logging on or off
FLEXLAYOUT.showConsoleLogs = true;

FLEXLAYOUT.Globals = {};

// Console event override
(function () {
	// NOTE: Uncomment to see script references in console
	// return true;
	var _log = console.log;
	var _error = console.error;
	var _warning = console.warning;

	console.error = function (errMessage) {
		if (FLEXLAYOUT.showConsoleLogs) {
			_error.apply(console, arguments);
		}
	};

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
						argArray.push('color: #efefef');
					} else if (arguments[0].startsWith('/')) {
						argArray = [];

						// Otherwise, if the first item starts with '/', grey it out
						argArray.push('%c   ' + arguments[0] + ' › %c ' + arguments[1]);

						// for (const prop in arguments) {
						// 	if (arguments.hasOwnProperty(prop)) {
						// 		if (arguments[(prop * 1) + 2]) {
						// 			argArray.push(arguments[(prop * 1) + 2]);
						// 		}
						// 	}
						// }
						argArray.push('color: #555');
						argArray.push('color: #666; font-style: italic');
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

			// Reset value
			// delete FLEXLAYOUT.debugpath;
		}
	};

	console.warning = function (warnMessage) {
		if (FLEXLAYOUT.showConsoleLogs) {
			_warning.apply(console, arguments);
		}
	};
})();

// TODO: Move this into a global utils later
window.formatPhoneNumber = function (phoneNumberString) {
  var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3]
  }
  return null
}

console.log('loaded', '/flexlayout/js/clientNamespace.js');

export default FLEXLAYOUT;
