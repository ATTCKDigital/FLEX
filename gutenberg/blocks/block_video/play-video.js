// import Player from '@vimeo/player';
// TODO: allow video block to support vimeo -OT
function Video($el) {
	function playVideo(autoplay) {
		var videoId = $(this).attr('data-video-id');
		var video = document.getElementById(videoId);

		video.play();

		$el.addClass('playingVideo');

		// Assume for now that autoplaying also means looping
		// We'll add support for both in the future
		console.log('typeof autoplay: ', typeof autoplay);

		if (typeof autoplay !== 'undefined' && autoplay === true) {
			video.addEventListener('ended',function(){
				$el.removeClass('playingVideo');
			},false);
		}
	}

	function pauseVideo() {
		var videoId = $(this).attr('data-video-id');
		var video = document.getElementById(videoId);

		video.pause();

		$el.removeClass('playingVideo');
	}

	// YouTube API Player
    var player;

    function onYouTubePlayer() {
      	var videoId = $el.find('.youtubePlayer').data('video-id');

        player = new YT.Player('player_' + videoId, {
			height: '390',
			width: '640',
			videoId: videoId,
			events: {
				'onReady': onPlayerReady,
				'onStateChange': onPlayerStateChange
			}
        });
    }

    function onPlayerStateChange(event) {
    	// Once the video has ended on it's own, bring back the thumbnail and play button
        if (event.data === 0) {
            $el.removeClass('playingVideo');
        }
    }

    function onPlayerReady(event) {
    	// Once the player is ready, allow the user to interect with the video.
    	$el.find('.video-wrapper[data-video-type="youtube"] .playVideo').on('click', function(){
    		// Play video
	    	$el.addClass('playingVideo')
	    	event.target.playVideo();
    	});

    	$el.find('.video-wrapper[data-video-type="youtube"] .pauseVideo').on('click', function(){
    		// Pause video
	    	$el.removeClass('playingVideo')
	    	event.target.pauseVideo();
    	});
    }

 	function loadYoutubeApi() {
 		// Load the YouTube API onto the page if it is not already there
        if (typeof(YT) == 'undefined' || typeof(YT.Player) == 'undefined') {
			var tag = document.createElement('script');

			tag.src = "https://www.youtube.com/iframe_api";

			var firstScriptTag = document.getElementsByTagName('script')[0];

			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
		}
	}

	function loadPlayer() {
		// After the API has been loaded, load the iframe
		// window.onYouTubeIframeAPIReady = function () {
			// onYouTubePlayer();
		// };

		// To support multiple players on the page, assume the API has loaded after a bit
		setTimeout (function (callback) {
			onYouTubePlayer();
		}, 1000);
	}

    function playBrightcoveVideo() {
        var videoId = $(this).attr('data-video-id');
        var video = document.querySelector('video[data-video-id="'+videoId+'"]');

        video.play();

        $el.addClass('playingVideo');

        video.addEventListener('ended',function(){
            $el.removeClass('playingVideo');
        },false);
    }

    function pauseBrightcoveVideo() {
        var videoId = $(this).attr('data-video-id');
        var video = document.querySelector('video[data-video-id="'+videoId+'"]');

        video.pause();

        $el.removeClass('playingVideo');
    }

	this.init = function ($el) {
		console.log('play.video.js › init');
		$el = $el;

		// Determine if video should autoplay,
		var shouldAutoplay = $el.find('video').prop('autoplay') === true;

		if (shouldAutoplay) {
			$el.find('video').trigger('play');

		// ...otherwise, bind player control events
		} else {
			$el.find('.video-wrapper[data-video-type="upload"] .playVideo').on('click', playVideo);
			$el.find('.video-wrapper[data-video-type="upload"] .pauseVideo').on('click', pauseVideo);
		}

		if ($el.find('.video-wrapper').attr('data-video-type') == 'youtube') {
			// If there is a youtube video on the page, load the API
			loadYoutubeApi();
			loadPlayer();
		}

        if ($el.find('.video-wrapper').attr('data-video-type') === 'brightcove') {
            $el.find('.video-wrapper[data-video-type="brightcove"] .playVideo').on('click', playBrightcoveVideo);
            $el.find('.video-wrapper[data-video-type="brightcove"] .pauseVideo').on('click', pauseBrightcoveVideo);
        }

		return this;
	}

	return this.init($el);
}

export default Video;
