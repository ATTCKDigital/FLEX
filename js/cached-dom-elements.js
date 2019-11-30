/**
 * Caching function
 * Usage: $$({selector}) returned cached element if previously used
 * or caches upon first use.
 */

console.log('loaded', '/flexlayout/js/cached-dom-elements.js');

import $ from 'jquery';

window.cachedDomElements = (function () {
	var cachedElements = {};

	// Using the HTML element for data storage
	var $EL = $('html');

	function get(name) {
		// Return everything if param is empty
		if (typeof name === 'undefined') {
			return cachedElements;
		}

		// If the element hasn't been cached yet, cache it
		// If it's not a jQuery object, assume it should be cached within
		// the current component context ($EL)
		if (typeof cachedElements[name] === 'undefined') {
			if (name instanceof $) {
				return set(name, name);
			} else {
				return set(name, $EL.find(name));
			}
		}

		// Otherwise just give them what they asked for
		return cachedElements[name];
	}

	function reset(name) {
		if (!name) {
			cachedElements = {};
		}

		delete cachedElements[name];
	}

	function set(name, value) {
		cachedElements[name] = value;
		return cachedElements[name];
	}

	return {
		'get': get,
		'reset': reset,
		'set': set
	};
})();

var $$ = function (el) {
	return window.cachedDomElements.get(el);
};

export default $$;
