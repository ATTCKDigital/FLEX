
function Contact($el) {
	
	function hideMessage(e) {

		//after the form is submitted, hide the message
		window.addEventListener('message', event => {
		   if(event.data.type === 'hsFormCallback' && event.data.eventName === 'onFormSubmitted') {
		       $el.find('.contact-message').hide();
		   }
		});		
	}

	function addContactForm(e) {
		var formArea = $el.find('.contact-form');
		var portalId = $(formArea).attr('data-portal-id');
		var formId = $(formArea).attr('data-form-id');
		
		hbspt.forms.create({
			portalId: portalId,
			formId: formId,
			target: '.contact-form',
		});
	}


	this.init = function ($el) {
		$el = $el;
		addContactForm();
		hideMessage();
	
		return this;
	}

	return this.init($el);
}

export default Contact;