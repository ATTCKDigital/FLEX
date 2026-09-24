import $ from 'jquery';

//GDPR
function GDPR( $el ) {
	function setCookie( cname, cvalue, exdays ) {
		const d = new Date();
		d.setTime( d.getTime() + 30 * 24 * 60 * 60 * 1000 );
		const expires = 'expires=' + d.toUTCString();
		document.cookie = 'allowCookies=yes;path=/;' + expires;
		$el.addClass( 'hideGDPR' );
	}

	function getCookie( cname ) {
		const name = cname + '=';
		const ca = document.cookie.split( ';' );
		for ( let i = 0; i < ca.length; i++ ) {
			let c = ca[ i ];
			while ( c.charAt( 0 ) == ' ' ) {
				c = c.substring( 1 );
			}
			if ( c.indexOf( name ) == 0 ) {
				return c.substring( name.length, c.length );
			}
		}
		return '';
	}

	function checkCookie() {
		const allowCookies = getCookie( 'allowCookies' );
		if ( allowCookies == 'yes' ) {
			setCookie( 'allowCookies', 'yes', 90 );
			$el.addClass( 'hideGDPR' );
		} else {
			$el.removeClass( 'hideGDPR' );
		}
	}

	function bindEvents() {
		$el = $el;
		$el.find( '.gdprAgree' ).on( 'click', setCookie );
		checkCookie();
	}

	this.init = function ( $el ) {
		bindEvents();

		return this;
	};

	return this.init( $el );
}

export default GDPR;
