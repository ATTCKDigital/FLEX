/**
 * Scroller component
 * Manages top navigation display state on scroll
 */
import ATTCK from 'attck';

function Scroller ($el) {
	function bindEvents() {
		$el.find('.icon-scroller').on('click', scrollDown);

		$(document.body).on('ATTCK.scroll', function (e, data) {
			console.log('scroller.js > bindEvents > document.body.scroll, e: data:', e, data);
			// Check the current scroll offset
			// Check for newly visible elements on page resize as well since that 
			// can potentially cause the page to scroll
		});
	}

	function scrollDown() {
		var scrollID = $('body').find('.scroller').data('scroller-id');

	    $('html, body').animate({
	        'scrollTop': $('#' + scrollID).offset().top
	    }, 2000);
	}

	/**
	 * Fades in hidden elements when user scrolls them far enough into view
	 */
	function fadeInElements() {
		hideAllElement();
	}

	function hideAllElements() {
		console.log('scroller.js > hideAllElements');

		// First, hide all elements
		$('.content-wrapper').each(function () {
			$(this).find('h1').addClass('fade-me-in');
			$(this).find('h2').addClass('fade-me-in');
			$(this).find('h3').addClass('fade-me-in');
			$(this).find('h4').addClass('fade-me-in');
			$(this).find('h5').addClass('fade-me-in');
			$(this).find('p').addClass('fade-me-in');
			$(this).find('span').addClass('fade-me-in');
		});
	}

	this.init = function($el) {
		bindEvents();
		fadeInElements();

		return this;
	}

	return this.init($el);
}

export default Scroller;
