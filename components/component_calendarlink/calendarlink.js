import $ from 'jquery';

/**
 * Display a calendar selector
 */
function CalendarLink($el) {
	// Cache the body
	var $body = $('body');

	function bindEvents() {
		$el = $el;

		$('a[href="/#reminder"]').on('click', displayCalendarLinkPopup);
	}

	function displayCalendarLinkPopup(e) {
		e.preventDefault();
		
		$('.addeventatc').addClass('visible');
	}

	this.init = function ($el) {
		console.log('loaded', 'CalendarLink.init()');

		bindEvents();

		return this;
	}

	return this.init($el);
}

export default CalendarLink;
