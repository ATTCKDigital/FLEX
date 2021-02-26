// import Player from '@vimeo/player';
// TODO: (OT) Allow video block to support vimeo.
function Video($el) {
	// YouTube API Player
	var player;

	function playVideo(autoplay) {
		console.log('/FLEX/\tgutenberg/\tblocks/\tblock_video/\tplay-video.js', 'playVideo()');

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
		console.log('/FLEX/\tgutenberg/\tblocks/\tblock_video/\tplay-video.js', 'pauseVideo()');

		var videoId = $(this).attr('data-video-id');
		var video = document.getElementById(videoId);

		video.pause();

		$el.removeClass('playingVideo');
	}

	function onYouTubePlayer() {
		console.log('/FLEX/\tgutenberg/\tblocks/\tblock_video/\tplay-video.js', 'onYouTubePlayer()');

		if (typeof YT === 'undefined') {
			// Go back and wait another second if player API hasn't loaded yet.
			loadPlayer();
		} else {
			if (typeof YT.Player !== 'function') {
				// Try again, otherwise we may throw this error:
				// "Uncaught TypeError: YT.Player is not a constructor"
				// Solution: https://sung.codes/blog/2020/06/08/youtube-i-frame-api-yt-player-is-not-a-constructor/
				window.YT.ready(loadPlayer);
			} else {
				// Finally we can create our player object
				var videoId = $('.youtubePlayer', $el).data('video-id');

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
		}

	}

	function onPlayerStateChange(event) {
		// Once the video has ended on it's own, bring back the thumbnail and play button
		if (event.data === 0) {
			$el.removeClass('playingVideo');
		}
	}

	function onPlayerReady(event) {
		console.log('onPlayerReady(), $el: ', $el);

		// $el.on('click', function (e) {
		// 	console.log('testing event delegation, e.currentTarget: ', e.currentTarget);
		// });

		// Once the player is ready, allow the user to interect with the video.
		$el.on('click', '.video-wrapper[data-video-type="youtube"] .playVideo', function () {
			// Play video
			$el.addClass('playingVideo')
			event.target.playVideo();
		});

		$el.on('click', '.video-wrapper[data-video-type="youtube"] .pauseVideo', function () {
			// Pause video
			$el.removeClass('playingVideo')
			event.target.pauseVideo();
		});
	}

 	function loadYoutubeApi() {
 		// Load the YouTube API onto the page if it is not already there
		if (typeof(YT) === 'undefined' || typeof(YT.Player) === 'undefined') {
			var tag = document.createElement('script');

			tag.src = "//www.youtube.com/iframe_api";

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
		var video = document.querySelector('video[data-video-id="' + videoId + '"]');

		video.play();

		$el.addClass('playingVideo');

		video.addEventListener('ended',function(){
			$el.removeClass('playingVideo');
		},false);
	}

	function pauseBrightcoveVideo() {
		console.log('/FLEX/\tgutenberg/\tblocks/\tblock_video/\tplay-video.js', 'pauseBrightcoveVideo()');

		var videoId = $(this).attr('data-video-id');
		var video = document.querySelector('video[data-video-id="'+videoId+'"]');

		video.pause();

		$el.removeClass('playingVideo');
	}

	this.init = function ($el) {
		console.log('/FLEX/\tgutenberg/\tblocks/\tblock_video/\tplay-video.js', 'init()');

		$el = $el;

		// Determine if video should autoplay,
		var shouldAutoplay = $('video', $el).prop('autoplay') === true;

		if (shouldAutoplay) {
			$('video', $el).trigger('play');

		// ...otherwise, bind player control events
		} else {
			$el.on('click', '.video-wrapper[data-video-type="upload"] .playVideo', playVideo);
			$el.on('click', '.video-wrapper[data-video-type="upload"] .pauseVideo', pauseVideo);
		}

		// If there is a youtube video on the page, load the API
		if ($el.find('.video-wrapper').attr('data-video-type') == 'youtube') {
			loadYoutubeApi();
			loadPlayer();
		}

		// If there is a Brightcove video on the page, bind play/pause events
		if ($el.find('.video-wrapper').attr('data-video-type') === 'brightcove') {
			$el.on('click', '.video-wrapper[data-video-type="brightcove"] .playVideo', playBrightcoveVideo);
			$el.on('click', '.video-wrapper[data-video-type="brightcove"] .pauseVideo', pauseBrightcoveVideo);
		}

		return this;
	}

	return this.init($el);
}

export default Video;
