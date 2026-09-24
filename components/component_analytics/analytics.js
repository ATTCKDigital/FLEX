/* global ga */
import FLEX from 'FLEX/js/client-namespace';

if ( ! FLEX.isProd ) {
	console.log(
		'loaded',
		'/FLEX\t/components\t/component_analytics\t/analytics.js'
	);
}

function Analytics( $el ) {
	console.log( '/analytics.js', 'Analytics()' );

	function bindEvents() {
		console.log(
			'/FLEX/\tcomponents/\tcomponent-analytics/\tanalytics.js',
			'bindEvents()'
		);

		// $(document.body).on('click', '*', { 'type': 'click' }, trackEvent);
		// $(document.body).on('mouseenter', '*', { 'type': 'mouseenter' }, trackEvent);
		// $(document.body).on('hover', '*', { 'type': 'hover' }, trackEvent);

		// Check for any class = track-analytics
		// Try to find event info in data attributes

		// Try to find event info in classes
		console.log( '/— $(".track-event"): ', '', $( '.track-event' ) );

		$( '.track-event' ).each( function () {
			const classes = this.className.split( /\s/ );
			console.log( '/— classes: ', classes );

			// Set up defaults
			const event = {
				category: '',
				action: '',
				label: '',
				value: 0,
			};

			// Track whether a piece of data was found
			let match = false;

			for ( let i = 0, len = classes.length; i < len; i++ ) {
				console.log( '/— return: ', true );

				switch ( true ) {
					case classes[ i ].indexOf( 'event-category' ) > -1:
						event.category = classes[ i ].substr(
							'event-category'.length + 1
						);
						match = true;
						break;

					case classes[ i ].indexOf( 'event-action' ) > -1:
						event.action = classes[ i ].substr(
							'event-action'.length + 1
						);
						match = true;
						break;

					case classes[ i ].indexOf( 'event-label' ) > -1:
						event.label = classes[ i ].substr(
							'event-label'.length + 1
						);
						match = true;
						break;

					case classes[ i ].indexOf( 'event-value' ) > -1:
						event.value = classes[ i ].substr(
							'event-value'.length + 1
						);
						match = true;
						break;

					default:
				}

				if ( match ) {
					ga(
						'send',
						'event',
						event.category,
						event.action,
						event.label,
						event.value
					);
				}

				console.log( '/— return: ', false );
			}
		} );
	}

	this.init = function INIT() {
		console.log(
			'/FLEX/\tcomponents/\tcomponent-analytics/\tanalytics.js',
			'init()'
		);

		bindEvents();

		return this;
	};

	return this.init( $el );
}

export default Analytics;
