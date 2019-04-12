// Subnav scroll to
import FLEXLAYOUT from 'flexlayout';

function SubNav ($el) {
	function scrollToSection() {
		var scrollID = $(this).data('location');
		$(this).addClass('activeSubnav').siblings().removeClass('activeSubnav');
	    $('html, body').animate({
	    	// 140 is offset for subnav + regular nav
	        'scrollTop': $('#' + scrollID).offset().top - 140
	    }, 1000);
	}

	function stickySubNav() {
		// 65 is offset for regular nav
		var stickyTop = $('.component-subnav').offset().top;
		$(document.body).on('FLEXLAYOUT.scroll', function(e, params) {
			if(params.currentScrollTop >= stickyTop) {
	            $('.component-subnav').closest('.component-row').addClass('stickySubNav');
			} else {
			 	$('.component-subnav').closest('.component-row').removeClass('stickySubNav');
			}
		})
		
		
	}

	this.init = function($el) {
		$el.find('.subnav-item').on('click', scrollToSection);
		stickySubNav();

		return this;
	}

	return this.init($el);
}

export default SubNav;
