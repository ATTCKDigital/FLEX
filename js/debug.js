import FLEX from './clientNamespace';
import GlobalEvents from './global-events';

// const Debug = {
// 	// Set to true temporarily to enable custom debugging tools.
// 	debug: false,

// 	breakpoints: ["phone", "tablet-portrait", "tablet-landscape", "desktop", "xl", "2xl", "3xl", "4xl", "5xl"]
// };

FLEX.debug = (function () {
	var debugModeStatus = false;

	function bindEvents() {
		// Only bind keyboard events if already in debug mode
		if ($('body').hasClass('debug')) {
			$(document).on('keydown', function (e) {
				switch (true) {
					// Shift + D toggles debug mode
					case e.key == 'D':
						debuggingToggle();

						break;

					// do nothing
					default:
						break;
				}
			});
		}
	}

	// Set body class attribute for CSS debugging help
	function bodyClassSet(status) {
		console.log('/src\t/scripts\t/FLEX.js', 'FLEX.debug.bodyClassSet(status: ' + status + ')');

		if (status === true) {
			$('body').addClass('debug');
		} else {
			$('body').removeClass('debug');
		}
	}

	function bodyClassToggle() {
		console.log('/src\t/scripts\t/FLEX.js', 'FLEX.debug.bodyClassToggle()');

		if ($('body').hasClass('debug')) {
			bodyClassSet(false);
		} else {
			bodyClassSet(true);
		}
	}

	// Manage debug cookies
	function cookiesSet(status) {
		console.log('/src\t/scripts\t/FLEX.js', 'FLEX.debug.cookiesSet(status: ' + status + ')');

		if (status === true) {
			FLEX.cookies.set('debug', status);
		} else {
			FLEX.cookies.remove('debug');
		}
	}

	// Check config and URL vars
	function debugModeStatusDetect(successCallback) {
		console.log('/src\t/scripts\t/FLEX.js', 'FLEX.debug.debugModeStatusDetect()');

		// Default value
		var debugMode = false;

		switch (true) {
			// Check URL var
			case FLEX.queryVariables.get('debug') === 'true':
				debugMode = true;
				break;

			case FLEX.queryVariables.get('debug') === 'false':
				debugMode = false;
				break;

			// Check cookies from previous session
			case !!FLEX.cookies.get('debug'):
				debugMode = true;
				break;

			default:
				break;
		}

		// Set the debug value and run the callback if debugging is active
		if (debugModeStatusSet(debugMode)) {
			successCallback();
		}
	}

	function debugModeStatusGet() {
		console.log('/src\t/scripts\t/FLEX.js', 'FLEX.debug.debugModeStatusGet(), debugModeStatus: ' + debugModeStatus);

		return debugModeStatus;
	}

	// Manages access to debugModeStatus variable and enforces type
	function debugModeStatusSet(status) {
		// Enforce type
		if (typeof status !== "boolean") {
			// Revert to previous value if invalid type passed
			status = debugModeStatus;
		}

		cookiesSet(status);

		return debugModeStatus = status;
	}

	// Runs only when in debug mode
	function debuggingDisable() {
		console.log('/src\t/scripts\t/FLEX.js', 'FLEX.debug.debuggingDisable()');
		bodyClassSet(false);
		cookiesSet(false);
		showCSSBreakpoints(false);

		// Don't want to turn off syntax coloring if 
		// manually toggling visual debug
		// enhancedConsoleLoggingSet(false);
	}

	function debuggingEnable() {
		console.log('/src\t/scripts\t/FLEX.js', 'FLEX.debug.debuggingEnable()');
		console.log('');
		console.log('******* DEBUGGING ENABLED *******');
		console.log('');

		enhancedConsoleLoggingSet(true);
		bodyClassSet(true);
		cookiesSet(true);
		showCSSBreakpoints(true);
	}

	function debuggingToggle() {
		console.log('/src\t/scripts\t/FLEX.js', 'FLEX.debug.debuggingToggle()');

		if ($('body').hasClass('debug')) {
			debuggingDisable();
		} else {
			debuggingEnable();
		}
	}

	// Turn console logging on or off
	function enhancedConsoleLoggingSet(status) {
		console.log('/src\t/scripts\t/FLEX.js', 'FLEX.debug.enableEnhancedConsoleLoggingSet(status: ' + status + ')');

		// Console event override
		var _log = console.log;
		var _status = status;

		console.log = function (logMessage) {
			// Show console logs if explicitly enabled
			if (_status === true) {
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
							argArray.push('color: #1d50ca; font-style: italic');
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
			} else {
				// Don't display console logs
			}
		};
	}

	function showCSSBreakpoints(status) {
		console.log('/src\t/scripts\t/FLEX.js', 'FLEX.debug.showCSSBreakpoints(status: ' + status + ')');

		// Declares FLEX.GlobalEvents.xsOnly(), smOnly(), etc for running
		// breakpoint-specific functionality.
		if (typeof $ !== 'undefined' && status !== false) {
			$.each(FLEX.breakpoints, function (i, val) {
				val = val.replace('-', '');

				FLEX.GlobalEvents['only' + val] = function (f) {
					if (!$$('.breakpoint.' + val).is(':visible')) {
						return;
					}

					f();
				}
			});

			// Expose text value on resize
			$(document.body)
				.on("FLEX.resize", function () {
					FLEX.GlobalEvents.onlysmall(function () {
						$('.breakpoint-current').show().text('Breakpoint is small');
					});

					FLEX.GlobalEvents.onlyphone(function () {
						$('.breakpoint-current').show().text('Breakpoint is phone');
					});

					FLEX.GlobalEvents.onlytabletportrait(function () {
						$('.breakpoint-current').show().text('Breakpoint is tablet portrait');
					});

					FLEX.GlobalEvents.onlytabletlandscape(function () {
						$('.breakpoint-current').show().text('Breakpoint is tablet landscape');
					});

					FLEX.GlobalEvents.onlydesktop(function () {
						$('.breakpoint-current').show().text('Breakpoint is desktop');
					});

					FLEX.GlobalEvents.onlyxl(function () {
						$('.breakpoint-current').show().text('Breakpoint is xl');
					});

					FLEX.GlobalEvents.only2xl(function () {
						$('.breakpoint-current').show().text('Breakpoint is 2xl');
					});

					FLEX.GlobalEvents.only3xl(function () {
						$('.breakpoint-current').show().text('Breakpoint is 3xl');
					});

					FLEX.GlobalEvents.only4xl(function () {
						$('.breakpoint-current').show().text('Breakpoint is 4xl');
					});

					FLEX.GlobalEvents.only5xl(function () {
						$('.breakpoint-current').show().text('Breakpoint is 5xl');
					});
				});

		}

		if (typeof $ !== 'undefined' && status === false) {
			// Hide the breakpoints if false is passed as param
			$(".breakpoint-current").hide();
		}
	}

	// Determine if we are in debugging mode
	function init() {
		console.log('/src\t/scripts\t/FLEX.js', 'FLEX.debug.init()');

		// Turn off console by default (unless overridden)
		enhancedConsoleLoggingSet(FLEX.showConsoleLogs);

		// Check for URL or cookie setting
		debugModeStatusDetect(debuggingEnable);

		bindEvents();
	}

	return {
		getStatus: debugModeStatusGet,
		init: init
	};
})();

export default FLEX.debug;
