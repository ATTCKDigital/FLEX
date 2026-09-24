/*!
 * FLEX v1.21.1.23
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://js.foundation/
 *
 * Date: 2021-01-23
 */

// Load order: First, before

import $ from 'jquery';

const isProd = typeof $( 'body' ).attr( 'data-server-environment' );
if ( ! isProd ) {
	console.log( 'loaded', '/FLEX\t/js\t/app.js' );
}

// https://stackoverflow.com/questions/34338411/how-to-import-jquery-using-es6-syntax
window.$ = window.jQuery = $;

import GlobalEvents from './global-events';
import Loader from './load-components';

// Initiate Global Component Loader and Global Events.
$( function () {
	Loader.loadComponents();
	GlobalEvents.initGlobalEvents();
} );

// Resolves persisted cache issue in safari
// SOURCE: https://stackoverflow.com/questions/8788802/prevent-safari-loading-from-cache-when-back-button-is-clicked
window.onpageshow = function ( event ) {
	if ( event.persisted ) {
		window.location.reload();
	}
};
