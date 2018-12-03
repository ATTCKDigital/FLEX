function Consent($el) {
	function setCookie(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		var expires = "expires="+d.toUTCString();
		document.cookie = cname + "=" + cvalue + "; " + expires;
	}

	function getCookie(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i=0; i<ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0)==' ') c = c.substring(1);
				if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
		}
		return "";
	}

	function checkCookie() {
		var user = getCookie("consent");
		if (user != "") {
				//there is no cookie
		} else {
			$('body').addClass('noConsent');
			
		}
	}       

	function hideCookieBar() {
		$('body').removeClass('noConsent');
		setCookie("consent", "accepted", 90);
	}


	this.init = function ($el) {
		$el = $el;
		$el.find('.acceptCookie').on('click', hideCookieBar);
		checkCookie();

		return this;
	}

	return this.init($el);
}

export default Consent;