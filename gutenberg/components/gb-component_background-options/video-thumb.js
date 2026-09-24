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
				.catch( function () {
					console.log( 'cannot play' );
				} );
		}
	}

	this.init = function () {
		isPlaying();

		return this;
	};

	return this.init( $el );
}

export default VideoThumb;
