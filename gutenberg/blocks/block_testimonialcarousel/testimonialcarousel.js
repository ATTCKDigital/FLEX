// TestimonialCarousel Component
function TestimonialCarousel( $el ) {
	// Cache the body
	function bindEvents() {
		// Render on window resize
		$( document.body ).on( 'FLEX.resize', render );
	}

	function render() {}

	this.init = function () {
		bindEvents();

		return this;
	};

	return this.init( $el );
}

export default TestimonialCarousel;
