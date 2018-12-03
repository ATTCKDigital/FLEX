// Livestream Video
function LivestreamVideo($el) {
	function openLivestream() {
		$el.find('.video-popup[data-video-id="1"]').addClass('playVideo');
	}

	function closeLivestream() {
		$el.find('.video-popup[data-video-id="1"]').removeClass('playVideo');
	}

	this.init = function ($el) {
		$el.find('#playButton-1').on('click', openLivestream);
		$el.find('#closeVideo-1').on('click', closeLivestream);
		return this;
	}

	return this.init($el);
}

export default LivestreamVideo;
