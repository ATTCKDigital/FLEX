/**
 * Contact Modal CTA component
 * Responsible for toggling contact form modal visibility
 */
function ContactModalCTA($el) {
	function bindEvents() {
		$('.button', $el).on('click', function () {
			$('.component-contact-modal, .component-contact-modal-overlay').toggleClass('visible');

			// Make sure animation is triggered after display is toggled,
			// otherwise, animation isn't seen.
			setTimeout(function () {
				$('body').toggleClass('showContactModal');
			}, 10);

		});
		
		// Highlight submit button on press/mousedown
		$('.button.button-modal', $el).on('mousedown touchstart', function () {
			$(this).addClass('mousedown');
		});

		$(document.body).on('mouseup touchend', function () {
			$('.button.button-modal').removeClass('mousedown');
		});
	}

	this.init = function ($el) {
		bindEvents();

		return this;
	}

	return this.init($el);
}

export default ContactModalCTA;
