import { cookie } from 'cookie_js';

/**
 * Preloader component
 * Shows branded logo and preloader animation on page load
 */
function Preloader($el) {
	function bindEvents() {
		setTimeout(function () {
// 			// Fade out .preloader
			$('body').addClass('hide-preloader');

			setTimeout(function () {
				// Remove .preloader from DOM so page is useful
				$el.remove();
			}, 500);
		}, 2000);
	}

	this.init = function($el) {
		const preloaderCookie = cookie('theRollinsLoaded');
		if(preloaderCookie) {
			$('body').addClass('hide-preloader');
			$el.remove();
		} else {
			const expiresIn = new Date(+new Date() + (30 * 60 * 1000));
      cookie.set({
        theRollinsLoaded: expiresIn.toString(),
      }, {
        expires: expiresIn
      })
			bindEvents();
		}

		return this;
	}

	return this.init($el);
}

export default Preloader;
