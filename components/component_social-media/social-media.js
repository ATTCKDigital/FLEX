import $ from 'jquery';

//Social Media
function SocialMedia( $el ) {
	//cache the body
	const $body = $( 'body' );

	function bindEvents() {
		$el = $el;
	}

	this.init = function ( $el ) {
		bindEvents();

		return this;
	};

	return this.init( $el );
}

export default SocialMedia;
