import $ from 'jquery';
import FLEX from 'FLEX/js/client-namespace';

if (!FLEX.isProd) { console.log('loaded', '/FLEX\t/components\t/component_analytics\t/bookmark.js'); }

/**
 * Display a calendar selector
 */
function Bookmark($el) {
	// Cache the body
	var $body = $('body');

	function bindEvents() {
		$el = $el;

		$('a[href="/#bookmark"]').on('click', openBookmark);
	}

	function openBookmark() {
		if (window.sidebar) { // Mozilla Firefox Bookmark
			window.sidebar.addPanel(location.href,document.title,"");
		} else if(window.external) { // IE Favorite
			window.external.AddFavorite(location.href,document.title); }
		else if(window.opera && window.print) { // Opera Hotlist
			this.title=document.title;
			return true;
		}
	}

	this.init = function ($el) {
		console.log('/FLEX\t/components\t/component_analytics\t/bookmark.js', 'Bookmark.init()');

		// https://stackoverflow.com/questions/22085812/addfavorite-js-doesnt-work-with-chrome
		// This will only work in IE
		//bindEvents();

		return this;
	}

	return this.init($el);
}

export default Bookmark;
