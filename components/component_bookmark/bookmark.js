import FLEX from 'FLEX/js/client-namespace';

if ( ! FLEX.isProd ) {
	console.log(
		'loaded',
		'/FLEX\t/components\t/component_analytics\t/bookmark.js'
	);
}

/**
 * Display a calendar selector
 * @param {jQuery} $el
 */
function Bookmark( $el ) {
	this.init = function () {
		console.log(
			'/FLEX\t/components\t/component_analytics\t/bookmark.js',
			'Bookmark.init()'
		);

		// https://stackoverflow.com/questions/22085812/addfavorite-js-doesnt-work-with-chrome
		// This will only work in IE
		//bindEvents();

		return this;
	};

	return this.init( $el );
}

export default Bookmark;
