import $ from 'jquery';
import FLEX from 'FLEX/js/client-namespace';

if ( ! FLEX.isProd ) {
	console.log( 'loaded', '/FLEX\t/js\t/components\t/component_cf7\t/cf7.js' );
}

/**
 * Contact Form 7 helper
 * — Loaded from the body and binds to any CF7 form on the page.
 *
 * — Applies waiting state to submit button, preventing duplicate
 *   entries arising from users clicking the submit button multiple
 *   times thinking nothing is happening.
 * @param {jQuery} $el
 */
function CF7( $el ) {
	// Listens for CF7 DOM events
	// https://contactform7.com/dom-events
	function bindFormEvents( $form ) {
		console.log(
			'/FLEX/\tcomponents/\tcomponent-cf7/\tcf7.js',
			'bindFormEvents($form:) ',
			$form
		);

		// Save initial display value (we'll need to change it back after
		// temporarily replacing it with '...' while a submission is pending)
		const originalSubmitTextValue = $( 'input[type=submit]', $form )
			.eq( 0 )
			.val();
		$form.data( 'originalSubmitTextValue', originalSubmitTextValue );

		$form.on( 'submit', function ( a, b, c ) {
			console.log(
				'/FLEX/\tcomponents/\tcomponent_cf7/\tcf7.js',
				'bindFormEvents(), form submit event › a: b: c: ',
				a,
				b,
				c
			);

			submissionInProgress( $form, true );
		} );

		$form.on( 'wpcf7invalid', function ( a, b, c ) {
			console.log(
				'/FLEX/\tcomponents/\tcomponent_cf7/\tcf7.js',
				'bindFormEvents(), form wpcf7invalid event › a: b: c: ',
				a,
				b,
				c
			);

			submissionInProgress( $form, false );
		} );

		$form.on( 'wpcf7spam', function ( a, b, c ) {
			console.log(
				'/FLEX/\tcomponents/\tcomponent_cf7/\tcf7.js',
				'bindFormEvents(), form wpcf7spam event › a: b: c: ',
				a,
				b,
				c
			);

			submissionInProgress( $form, false );
		} );

		$form.on( 'wpcf7mailsent', function ( a, b, c ) {
			console.log(
				'/FLEX/\tcomponents/\tcomponent_cf7/\tcf7.js',
				'bindFormEvents(), form wpcf7mailsent event › a: b: c: ',
				a,
				b,
				c
			);

			submissionInProgress( $form, false );
		} );

		$form.on( 'wpcf7mailfailed', function ( a, b, c ) {
			console.log(
				'/FLEX/\tcomponents/\tcomponent_cf7/\tcf7.js',
				'bindFormEvents(), form wpcf7mailfailed event › a: b: c: ',
				a,
				b,
				c
			);

			submissionInProgress( $form, false );
		} );

		$form.on( 'wpcf7submit', function ( a, b, c ) {
			console.log(
				'/FLEX/\tcomponents/\tcomponent_cf7/\tcf7.js',
				'bindFormEvents(), form wpcf7submit event › a: b: c: ',
				a,
				b,
				c
			);
		} );
	}

	function loadCF7Forms() {
		console.log(
			'/FLEX/\tcomponents/\tcomponent-cf7/\tcf7.js',
			'loadCF7Forms()'
		);

		// $('form.wpcf7-form')

		$( '.wpcf7' ).each( function () {
			console.log(
				'/FLEX/\tcomponents/\tcomponent-cf7/\tcf7.js',
				'loadCF7Forms() › form.wpcf7.each: ',
				$( this )
			);

			initForms( $( this ) );
		} );
	}

	function initForms( $form ) {
		console.log(
			'/FLEX/\tcomponents/\tcomponent-cf7/\tcf7.js',
			'initForms()'
		);

		bindFormEvents( $form );
	}

	function submissionInProgress( $form, isInProgress ) {
		if ( typeof $form === 'undefined' ) {
			return console.error( 'form element is required' );
		}

		const $submitButton = $( 'input[type=submit]', $form );

		// Tag the submit button with a CSS class attribute
		$submitButton.toggleClass( 'cta-disabled', isInProgress );

		// Disable / Enable submit button. The label is intentionally left unchanged:
		// swapping it for a placeholder changes the button width and shifts the layout.
		$submitButton.prop( 'disabled', isInProgress );

		return isInProgress;
	}

	this.init = function () {
		console.log( '/FLEX/\tcomponents/\tcomponent-cf7/\tcf7.js', 'init()' );

		loadCF7Forms();

		return this;
	};

	return this.init( $el );
}

export default CF7;
