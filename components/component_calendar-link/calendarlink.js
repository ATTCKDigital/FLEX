import $ from 'jquery';
import FLEX from 'FLEX/js/client-namespace';

if (!FLEX.isProd) { console.log('loaded', '/FLEX\t/components\t/component-calendar-link\t/calendarlink.js'); }

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
		console.log('/FLEX\t/components\t/component-calendar-link\t/calendarlink.js', 'CalendarLink.init()');

		bindEvents();

		return this;
	}

	return this.init($el);
}

export default CalendarLink;
