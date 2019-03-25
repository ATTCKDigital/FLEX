// import Player from '@vimeo/player';
//okatodo: allow video block to support vimeo and youtube

function Video($el) {
	
	// function initVimeo() {
	// 	$el.find('.video-module').each(function(){
	// 		var videoId = $(this).attr('data-video-id');
	// 		var iframe = $el.find('iframe#video-'+videoId);

	// 		let player = new Player(iframe)
	// 		$el.data('vimeo-player', player)

	// 	});
	// }

	// function vimeoPlayVideo() {
	// 	var videoId = $(this).attr('data-video-id');	
	// 	var iframe = $el.find('iframe#video-'+videoId);

	// 	let player = new Player(iframe)
	// 	$el.data('vimeo-player', player)
	// 	player.play();

	// 	$(this).closest('.component-row').addClass('zindexTop');
	// 	$el.find('.video-module[data-video-id="'+videoId+'"]').addClass('playVideo');
	// }


	// function vimeoStopVideo() {
	// 	let player = $el.data('vimeo-player')
	// 	player.pause();
	// 	//set video back to beginning
	// 	player.setCurrentTime(0);

	// 	var videoId = $(this).attr('data-video-id');

	// 	$(this).closest('.component-row').removeClass('zindexTop');
	// 	$el.find('.video-module[data-video-id="'+videoId+'"]').removeClass('playVideo');
	//}


	// function keyCommands() {

	// 	//key commands for slideshow
	// 	$(document).keydown(function(e){
	// 	    if (e.keyCode == 27) { 
	// 			var videoId = $('.playVideo').attr('data-video-id');	
	// 			var iframe = $el.find('iframe#video-'+videoId);

	// 			let player = new Player(iframe)
	// 			$el.data('vimeo-player', player)
	// 			player.play();

	// 			$el.find('.video-module').removeClass('playVideo');
	// 			$('body').find('.component-row').removeClass('zindexTop');
	// 	    }
	// 	});
		
	// }

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

	
	this.init = function ($el) {
		$el = $el;
		$el.find('.playVideo').on('click', playVideo);
		$el.find('.pauseVideo').on('click', pauseVideo);

		return this;
	}

	return this.init($el);
}

export default Video;