//Social Media
function SocialMedia( $el ) {
	function bindEvents() {
		$el = $el;
	}

	this.init = function () {
		bindEvents();

		return this;
	};

	return this.init( $el );
}

export default SocialMedia;
