import $ from 'jquery';

// Share button
function Share( $el ) {
	// Opens social share links in new windows
	function openShareWindow( e ) {
		e.preventDefault();

		// Get href
		const targetURL = $( this ).attr( 'href' );

		// Get target
		const target = $( this ).attr( 'target' );

		// Get options
		const options = $( this ).attr( 'data-options' );

		// Open share window
		window.open( targetURL, target, options );
	}

	function expandShareTools() {
		$el.toggleClass( 'expandShare' );
	}

	this.init = function ( $initEl ) {
		$initEl.find( '.shareLink' ).on( 'click', openShareWindow );
		$initEl.find( '.shareExpand' ).on( 'click', expandShareTools );

		return this;
	};

	return this.init( $el );
}

export default Share;
