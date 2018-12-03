/**
 * Contact Modal component
 * Fades in hidden elements when user scrolls them far enough into view
 */
function ContactModal($el) {
	function bindEvents() {
		// Close modal on [X] icon click
		$('.close', $el).on('click', toggleContactModal);

		// Highlight submit button on press/mousedown
		$('input[type="submit"]', $el).on('mousedown touchstart', function () {
			$(this).addClass('mousedown');
		});

		$(document.body).on('mouseup touchend', function () {
			$('input[type="submit"]').removeClass('mousedown');
		});
	}

	function toggleContactModal() {
		$('body').removeClass('showContactModal');

		// Make sure animation is triggered after display is toggled,
		// otherwise, animation isn't seen.
		setTimeout(function () {
			$el.removeClass('visible');
			$('.component-contact-modal-overlay').removeClass('visible');
		}, 500); // <-- 500ms is the length of the opacity fade-out animation 
	}

	this.init = function ($el) {
		bindEvents();

		return this;
	}

	return this.init($el);
}

export default ContactModal;
