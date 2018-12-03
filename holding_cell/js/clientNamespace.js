/**
 * Declares the global namespace, and the ns() utility for declaring
 * sub-namespaces.
 */
"use strict";

var clientNamespace = {};
var ATTCK = clientNamespace;

/**
 * DEPRECATED. Use import / export instead. 
 *
 * Namespace function. Creates the namespace passed to it, if it doesn't exist.
 */
ATTCK.namespace = function() {
	var ln = arguments.length, i, value, x, xln, parts, object;

	for (i = 0; i < ln; i++) {
		value = arguments[i];
		parts = value.split(".");
		object = window[parts[0]] = Object(window[parts[0]]);

		for (x = 1, xln = parts.length; x < xln; x++) {
			object = object[parts[x]] = Object(object[parts[x]]);
		}
	}
	return object;
};

ATTCK.ns = ATTCK.namespace;

ATTCK.Globals = {};

export default ATTCK;
