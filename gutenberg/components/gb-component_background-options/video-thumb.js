function VideoThumb( $el ) {
	function isPlaying() {
		const videoId = $el.find( 'video' ).attr( 'id' );
		const player = document.getElementById( videoId );

		const promise = player.play();
		if ( promise !== undefined ) {
			promise
				.then( function () {
					$el.addClass( 'playingVideo' );
				} )
				.catch( function ( error ) {
					console.log( 'cannot play' );
				} );
		}
	}

	this.init = function ( $el ) {
		$el = $el;
		isPlaying();

		return this;
	};

	return this.init( $el );
}

export default VideoThumb;
