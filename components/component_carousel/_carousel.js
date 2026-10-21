// Global carousel
function _carousel( $el ) {
	// Cache the body
	function bindEvents() {
		// Only render on mobile devices
		if ( ! $( '.breakpoint.tablet-portrait' ).is( ':visible' ) ) {
			render();
		}

		// Render on window resize
		$( document.body ).on( 'FLEX.resize', render );
	}

	function render() {
		// Collect all slides relating to this group
		const carouselID = '.' + $el.attr( 'data-carousel-id' );
		$( '.slide' ).find( carouselID );

		// Default to mobile only (add a desktop flag later if necessary)
	}

	this.init = function () {
		bindEvents();

		return this;
	};

	return this.init( $el );
}

export default _carousel;
