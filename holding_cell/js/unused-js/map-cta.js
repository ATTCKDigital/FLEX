import FLEXLS from 'flexls';

function MapCta($el) {
	

	function scrolledIcon($el) {
		// Bind to scroll
		$(document.body).bind('FLEXLS.scroll', function (e, data) {
		    var scroll = data.currentScrollTop;
		    var viewPortHeight = data.viewportHeight;
		    var footerHeight = $('body').find('.page-footer').height();
		    var docHeight = $(document).height();
		    //hide map icon if we are touching the footer
			if(scroll + viewPortHeight >= (docHeight - footerHeight)) {
				$('body').find('.map-cta').addClass('nearFooter');
			} else {
				$('body').find('.map-cta').removeClass('nearFooter');
			}

			//fixes issue with button being covered by the chrome in safari
			if (data.scrollDirection === 'down') {
				$('body').find('.zoom-layer').addClass('safariBarGone');
		    	$('body').find('.map-cta').addClass('safariBarGone');
		    } 

		    if(scroll <= 0) {
		    	$('body').find('.zoom-layer').removeClass('safariBarGone');
		    	$('body').find('.map-cta').removeClass('safariBarGone');
		    }

		});
	}

	

	function bindEvents() {
		$el = $el;
		scrolledIcon();
	}

	this.init = function ($el) {
		bindEvents();

		return this;
	}

	return this.init($el);
}

export default MapCta;