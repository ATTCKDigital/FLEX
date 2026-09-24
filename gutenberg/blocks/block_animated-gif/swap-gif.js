function AnimatedGif( $el ) {
	let _loaded = false;

	function swapGif() {
		// Ensure load only happens once
		if ( _loaded === false ) {
			const gif = $el.find( '.image-wrapper' ).attr( 'data-gif-src' );
			const image = $el.find( 'img' );

			// Remove the srcset, we don't need
			$( image ).attr( 'srcset', '' );

			// Swap the placeholder image src with the gif src
			$( image ).attr( 'src', gif );

			_loaded = true;
		}
	}

	this.init = function ( $el ) {
		$el = $el;

		// After window is loading, swap out the gifs
		// TODO: Enable this with options JSON var. -DP
		// $(window).on('load', swapGif);

		// After element has scrolled into view, swap in the gif
		$el.on( 'FLEX.scrollIn', swapGif );

		return this;
	};

	return this.init( $el );
}

export default AnimatedGif;
