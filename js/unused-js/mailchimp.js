// Mailchimp
function Mailchimp ($el) {
	function subscribeMailchimp() {
		ajaxMailChimpForm($('#mc-embedded-subscribe-form'), $('#subscribeThankyou'), $('.subscribe-error'), $('.subscribe-error2'));
		
		// Turn the given MailChimp form into an ajax version of it.
		// If resultElement is given, the subscribe result is set as html to
		// that element.
		function ajaxMailChimpForm($form, $resultElement, $error, $error2){
			// Hijack the submission. We'll submit the form manually.
			$form.submit(function (e) {
				e.preventDefault();

				if (!isValidEmail($form)) {
					var error =  'A valid email address must be provided.';
					$error.html(error);
					$error.css('color', 'red');
				} else {
					submitSubscribeForm($form, $resultElement, $error, $error2);
				}

				if (!isValidName($form)) {
					var error2 =  'First name is required.';
					$error2.html(error2);
					$error2.css('color', 'red');
				} else {
					submitSubscribeForm($form, $resultElement, $error, $error2);
				}
			});
		}			

		// Validate the email address in the form
		function isValidEmail($form) {
			// If email is empty, show error message.
			// contains just one @
			var email = $form.find('input[type="email"]').val();
			if (!email || !email.length) {
				return false;
			} else if (email.indexOf('@') == -1) {
				return false;
			}

			return true;
		}

		function isValidName($form) {
			var name = $form.find('input[type="text"]').val();
			if (!name || !name.length) {
				return false;
			}

			return true;
		}

		// Submit the form with an ajax/jsonp request.
		// Based on http://stackoverflow.com/a/15120409/215821
		function submitSubscribeForm($form, $resultElement, $error, $error2) {
			$.ajax({
				'type': 'GET',
				'url': $form.attr('action'),
				'data': $form.serialize(),
				'cache': false,
				'dataType': 'jsonp',
				'jsonp': 'c', // trigger MailChimp to return a JSONP response
				'contentType': 'application/json; charset=utf-8',
				error: function (error) {
					// According to jquery docs, this is never called for cross-domain JSONP requests
				},
				success: function (data) {
					if (data.result != 'success') {
						var message = data.msg || 'Sorry. Unable to subscribe. Please try again later.';
						$error.css('color', 'red');

						if (data.msg.indexOf('already subscribed') == 0) {
							message = "You are already subscribed.";
							$error.css('color', 'red');
						}
						
						$error.html(message);
					} else {
						$('#subscribeThankyou').show();

					}
				}
			});
		}

		$('#closeThankyou').on('click', function () {
			$('body').removeClass('thankyouOpen');
			$('#mce-EMAIL').val('Email');  
			$('#mce-FNAME').val('First Name');  
			$('.subscribe-error').text();
		});
	}

	this.init = function ($el) {
		subscribeMailchimp();
		return this;
	}

	return this.init($el);
}

export default Mailchimp;
