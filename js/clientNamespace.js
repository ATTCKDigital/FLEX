/**
 * Declares the global namespace, and the ns() utility for declaring
 * sub-namespaces.
 */
"use strict";

// Namespace & config
var FLEX = {
	breakpoints: [
		"small",
		"phone",
		"phone-plus",
		"tablet-portrait",
		"tablet-landscape",
		"desktop",
		"xl",
		"2xl",
		"3xl",
		"4xl",
		"5xl"
	],
	debugOverride: false,
	showConsoleLogs: true
};

FLEX.Globals = {};

// Fire up the chopper
FLEX.init = function () {
	// Retrieve URL vars
	this.queryVariables.init();

	// Detect debug mode
	this.debug.init();

	return this;
};

// Cookie manager
FLEX.cookies = (function () {
	function set(key, value, expiry) {
		console.log('/src\t/scripts\t/FLEX.js', 'FLEX.cookies.set(key:' + key + ', value:' + value + ', expiry:' + expiry + ')');

		var expires = new Date();
		expires.setTime(expires.getTime() + (expiry * 24 * 60 * 60 * 1000));
		document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();
	}

	function get(key) {
		var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
		var returnValue = keyValue ? keyValue[2] : null;

		console.log('/src\t/scripts\t/FLEX.js', 'FLEX.cookies.get(' + key + ') › returnValue: ' + returnValue);

		return returnValue;
	}

	function remove(key) {
		console.log('/src\t/scripts\t/FLEX.js', 'FLEX.cookies.remove(' + key + ')');

		var keyValue = this.get(key);
		this.set(key, keyValue, '-1');
	}

	return {
		get: get,
		remove: remove,
		set: set
	}
})();

FLEX.formatPhoneNumber = function (phoneNumberString) {
	console.log('/FLEX/js/clientNamespace', 'formatPhoneNumber()');
	console.log('/— phoneNumberString: ', phoneNumberString);

	var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
	var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
	
	if (match) {
		return '(' + match[1] + ') ' + match[2] + '-' + match[3]
	}

	return null;
};

// URL variable manager
FLEX.queryVariables = (function () {
	var store = {};

	function set(key, value) {
		console.log('/src\t/scripts\t/FLEX.js', 'FLEX.queryVariables.set(key: ' + key + ', value:' + value + ')');
		store[key] = value;
	}

	function get(key) {
		console.log('/src\t/scripts\t/FLEX.js', 'FLEX.queryVariables.get(key: ' + key + ')');

		return store[key];
	}

	function getAll() {
		console.log('/src\t/scripts\t/FLEX.js', 'FLEX.queryVariables.getAll()');
		var query = window.location.search.substring(1);
		var vars = query.split('&');

		for (var i = 0; i < vars.length; i++) {
			var pair = vars[i].split('=');

			set(pair[0], pair[1]);
		}

		return store;
	}

	function init() {
		console.log('/src\t/scripts\t/FLEX.js', 'FLEX.queryVariables.init()');

		return getAll();
	}

	function remove(key) {
		console.log('/src\t/scripts\t/FLEX.js', 'FLEX.queryVariables.remove(key: ' + key + ')');

		return delete store[key];
	}

	return {
		get: get,
		getAll: getAll,
		init: init
	}
})();

FLEX.insertDecimal = function (num) {
	num = (num / 100).toFixed(2);
	num = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

	return num;
}

FLEX.isUndefined = function (value) {
	return typeof value === 'undefined';
}

FLEX.truncateString = function (str, num) {
	// https://medium.com/@DylanAttal/truncate-a-string-in-javascript-41f33171d5a8
	console.log('/FLEX/js/global-events.js', 'truncateString()');

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

// Initiate Global Component Loader and Global Events.
$(function() {
	FLEX.init();
});

console.log('loaded', '/FLEX\t/js\t/clientNamespace.js');

export default FLEX;
