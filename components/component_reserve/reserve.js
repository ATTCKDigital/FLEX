import $ from 'jquery';

/**
 * Choose your meeting time
 */
function Reserve($el) {
	// Cache the body
	var $body = $('body');

	function bindEvents() {
		$el = $el;

		// Clicking an hour
		$('li', $el).on('click', chooseHour);

		// Prevent disabled CTA clicks
		$('.cta[href="/#"]').on('click', function (e) {
			if ($(this).hasClass('disabled')) {
				e.preventDefault();
			}
		});
	}

	function chooseHour(e) {
		e.preventDefault();

		// Get hour
		var thisHour = $('a', this).attr('href');

		// Sets it's active state for visual style
		$('li', $el).removeClass('active');
		$(this).addClass('active');

		// Changes the CTA target 
		$('.reserve-target')
			.attr('href', '/reserve' + thisHour)
			.removeClass('disabled');
	}

	function render() {
		// Disable submit buttom
		$('.cta[href="/#"]').addClass('disabled reserve-target');
	}

	this.init = function ($el) {
		render();
		bindEvents();

		return this;
	}

	return this.init($el);
}

export default Reserve;
