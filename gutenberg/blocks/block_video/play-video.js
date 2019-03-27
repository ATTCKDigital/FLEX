// import Player from '@vimeo/player';
//okatodo: allow video block to support vimeo and youtube

function Video($el) {
	


	function playVideo() {

		var videoId = $(this).attr('data-video-id');
		var video = document.getElementById(videoId); 

		video.play();

		$el.addClass('playingVideo');

	}

	function pauseVideo() {

		var videoId = $(this).attr('data-video-id');
		var video = document.getElementById(videoId); 

		video.pause();

		$el.removeClass('playingVideo');

	}

	//YouTube API Player
    var player;
    function onYouTubePlayer() {
      	var videoId = $el.find('#player').data('video-id');

        player = new YT.Player('player', {
			height: '390',
			width: '640',
			videoId: videoId,
			events: {
				'onReady': onPlayerReady,
				// 'onStateChange': onPlayerStateChange
			}
        });
    }

    function onPlayerReady(event) {
    	//once the player is ready, allow the user to interect with the video.

    	$el.find('.video-wrapper[data-video-type="youtube"] .playVideo').on('click', function(){
    		//play video
	    	$el.addClass('playingVideo')
	    	event.target.playVideo();
    	});

    	$el.find('.video-wrapper[data-video-type="youtube"] .pauseVideo').on('click', function(){
    		//pause video
	    	$el.removeClass('playingVideo')
	    	event.target.pauseVideo();
    	});
    }

 	function loadYoutubeApi() {
 		//load the YouTube API onto the page if it is not already there
        if (typeof(YT) == 'undefined' || typeof(YT.Player) == 'undefined') {
			var tag = document.createElement('script');
			tag.src = "https://www.youtube.com/iframe_api";
			var firstScriptTag = document.getElementsByTagName('script')[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

		}
	}

	function loadPlayer() {
		// After the API has been loaded, load the iframe
		window.onYouTubeIframeAPIReady = function() {
			onYouTubePlayer();
		};
	}


	
	this.init = function ($el) {
		$el = $el;
		$el.find('.video-wrapper[data-video-type="upload"] .playVideo').on('click', playVideo);
		$el.find('.video-wrapper[data-video-type="upload"] .pauseVideo').on('click', pauseVideo);

		if($el.find('.video-wrapper').attr('data-video-type') == 'youtube') {
			//if there is a youtube video on the page, load the API
			loadYoutubeApi();
			loadPlayer();
		}



		return this;
	}

	return this.init($el);
}

export default Video;