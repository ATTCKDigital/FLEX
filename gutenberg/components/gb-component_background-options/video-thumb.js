function VideoThumb($el) {

	function isPlaying() {

		var videoId = $el.find('video').attr('id');
		var player = document.getElementById(videoId); 

		var promise = player.play();
		if (promise !== undefined) {
			promise.then(function() {
	    		$el.addClass('playingVideo');
	    	}).catch(function(error) {
	      		console.log('cannot play')
	    	});
	  	}
	}
	
	this.init = function ($el) {
		$el = $el;
		isPlaying();

		return this;
	}

	return this.init($el);
}

export default VideoThumb;