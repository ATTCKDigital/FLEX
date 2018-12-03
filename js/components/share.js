// Share button

function Share ($el) {
		// Opens social share links in new windows
	function openShareWindow(e) {
		e.preventDefault();

		// Get href
		var targetURL = $(this).attr('href');

		// Get target
		var target = $(this).attr('target');

		// Get options
		var options = $(this).attr('data-options');

		// Open share window
		window.open(targetURL, target, options);
	}


	this.init = function($el) {
		$el.find('.shareLink').on('click', openShareWindow);
		
		return this;
	}

	return this.init($el);
}

export default Share;
