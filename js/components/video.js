import Player from '@vimeo/player';

function Video($el) {
	
	function initVimeo() {
		$el.find('.video-module').each(function(){
			var videoId = $(this).attr('data-video-id');
			var iframe = $el.find('iframe#video-'+videoId);

			let player = new Player(iframe)
			$el.data('vimeo-player', player)

		});
	}

	function vimeoPlayVideo() {
		var videoId = $(this).attr('data-video-id');	
		var iframe = $el.find('iframe#video-'+videoId);

		let player = new Player(iframe)
		$el.data('vimeo-player', player)
		player.play();

		$(this).closest('.component-row').addClass('zindexTop');
		$el.find('.video-module[data-video-id="'+videoId+'"]').addClass('playVideo');
	}


	function vimeoStopVideo() {
		let player = $el.data('vimeo-player')
		player.pause();
		//set video back to beginning
		player.setCurrentTime(0);

		var videoId = $(this).attr('data-video-id');

		$(this).closest('.component-row').removeClass('zindexTop');
		$el.find('.video-module[data-video-id="'+videoId+'"]').removeClass('playVideo');
	}


	function keyCommands() {

		//key commands for slideshow
		$(document).keydown(function(e){
		    if (e.keyCode == 27) { 
				var videoId = $('.playVideo').attr('data-video-id');	
				var iframe = $el.find('iframe#video-'+videoId);

				let player = new Player(iframe)
				$el.data('vimeo-player', player)
				player.play();

				$el.find('.video-module').removeClass('playVideo');
				$('body').find('.component-row').removeClass('zindexTop');
		    }
		});
		
	}

	function keyCommandsImage() {

		//key commands for slideshow
		$(document).keydown(function(e){
		    if (e.keyCode == 27) { 
				$el.find('.image-module').removeClass('openImage');
				$('body').find('.component-row').removeClass('zindexTop');
		    }
		});
		
	}

	function openImage() {
		//adding image popup so that media component can show either image or video

		var imageId = $(this).attr('data-image-id');

		$(this).closest('.component-row').addClass('zindexTop');
		$el.find('.image-module[data-image-id="'+imageId+'"]').addClass('openImage');
	}


	function closeImage() {
		//adding image popup so that media component can show either image or video

		var imageId = $(this).attr('data-image-id');

		$(this).closest('.component-row').removeClass('zindexTop');
		$el.find('.image-module[data-image-id="'+imageId+'"]').removeClass('openImage');
	}

	this.init = function ($el) {
		$el = $el;
		$el.find('.vimeoPlay').on('click', vimeoPlayVideo);
		$el.find('.imageOpen').on('click', openImage);
		$el.find('.vimeoClose').on('click', vimeoStopVideo);
		$el.find('.imageClose').on('click', closeImage);
		// keyCommandsImage();

		return this;
	}

	return this.init($el);
}

export default Video;