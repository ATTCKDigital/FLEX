import FLEX from 'FLEX/js/client-namespace';

if (!FLEX.isProd) { console.log('loaded', '/FLEX\t/components\t/component_carousel\t/_carousel.js'); }

// Global carousel
function _carousel($el) {
	// Cache the body
	function bindEvents() {
		console.log('/FLEX\t/components\t/component_carousel\t/_carousel.js', '_carousel.bindEvents()');

		// Only render on mobile devices
		if (!$('.breakpoint.tablet-portrait').is(':visible')) {
			render();
		}

		// Render on window resize
		$(document.body).on('FLEX.resize', render);
	}

	function render() {
		console.log('/FLEX\t/components\t/component_carousel\t/_carousel.js', '_carousel.render()');

		// Collect all slides relating to this group
		var carouselID = '.' + $el.attr('data-carousel-id');
		var slides = $('.slide').find(carouselID);

		console.log('/FLEX\t/components\t/component_carousel\t/_carousel.js', 'Carousel.render(), carouselID: ', carouselID, 'slides: ', slides);

		// Default to mobile only (add a desktop flag later if necessary)
	}

	this.init = function ($el) {
		bindEvents();

		return this;
	}

	return this.init($el);
}

export default _carousel;
