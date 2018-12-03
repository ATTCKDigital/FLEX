

// Check for pop-up after WP login timesout

function LoginSession ($el) {
	function checkFrame() {
		if ( window.location !== window.parent.location ) {
		  // The page is in an iframe
		  $('body').addClass('inFrame');
		} else {
		  // The page is not in an iframe
		}
	}

	this.init = function($el) {
		checkFrame();

		return this;
	}

	return this.init($el);
}

export default LoginSession;
