// Form interactions for buddypress

function Forms ($el) {
	function checkbox() {
		//what is the state of the checkbox?
		var checkbox = $(this).find('input[type="checkbox"]').prop('checked');
		if(checkbox == true) {
			$(this).addClass('checked');
			$(this).find('input[type="checkbox"]').prop( 'checked', true );
			
		} else {
			$(this).removeClass('checked');
			$(this).prop( 'checked', false );
		}
	}

	function signUp() {
		$('body').addClass('signupOpen');
	}

	function closeSignUp() {
		$('body').removeClass('signupOpen');
		$('body').find('.signup-popup').removeClass('registerComplete');
		$('body').find('.login-form').hide();
		$('body').find('.register-form').show();

	}

	function checkRegister(){
		//check to see what state the registration is in on page load
		var urlParams = new URLSearchParams(window.location.search);
		var state = urlParams.get('registerStatus');
		if(state == 'activate') {
			$('body').find('.signup-popup').addClass('registerComplete');
		}

		if(state == 'errors') {
			$('body').addClass('signupOpen');
		}
	}

	function loadCheckboxes() {
		var checkbox = $el.find('input[type="checkbox"]');

		$(checkbox).each(function(){
			var checked = $(this).attr('checked');

			if(checked == 'checked') {
				$(this).parent().addClass('checked');
			} 
			
		})
	}

	function logIn() {
		$el.find('.login-form').show();
		$el.find('.register-form').hide();
	}

	this.init = function($el) {
		$el.find('.signUp').on('click', signUp);
		$el.find('.thankyouClose').on('click', closeSignUp);
		$el.find('.closeSignUp').on('click', closeSignUp);
		$el.find('.option-label').on('click', checkbox);
		$el.find('.login-remember label').on('click', checkbox);
		$el.find('.logIn').on('click', logIn);
		loadCheckboxes();
		checkRegister();

		return this;
	}

	return this.init($el);
}

export default Forms;
