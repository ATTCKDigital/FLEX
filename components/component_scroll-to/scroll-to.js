import $ from 'jquery';

function ScrollTo( $el ) {
	let anchor;

	function bindEvents() {
		$el.find( '.scrollTo' ).on( 'click', ScrollToAnchor );
	}

	function ScrollToAnchor() {
		console.log(
			'/FLEX/\tcomponents /\component_scroll-to/\t ScrollTo',
			'ScrollToAnchor()'
		);

		// If JSON value isn't set, use original attr value
		if ( typeof anchor === 'undefined' ) {
			anchor = $( this ).attr( 'data-anchor' );
		}

		const row = $( 'body' ).find( '#' + anchor );

		$( 'html, body' ).animate(
			{
				scrollTop: $( row ).offset().top,
			},
			1000
		);
	}

	this.init = function ( $initEl ) {
		console.log(
			'/FLEX/\tcomponents /\component_scroll-to/\t ScrollTo',
			'init()'
		);

		// Retrieve JSON options from block properties
		if ( typeof $initEl.data( 'componentOptions' ) !== 'undefined' ) {
			anchor = $initEl.data( 'componentOptions' );

			if ( ! Array.isArray( anchor ) ) {
				anchor = [ anchor ];
			}
		}

		bindEvents();

		return this;
	};

	return this.init( $el );
}

export default ScrollTo;
