/**
 * Qualls Benson — One Blue Slip, Partner List Component
 * Controls height of lower div.
 */
function QBOBSPartnerList($el) {
	function bindEvents() {
		$(window).on('FLEXLAYOUT.resize', resizePartnerListSection);
	}

	function resizePartnerListSection(e, data) {
		var $partnerList = $('.qb-obs-partner-list', $el);
		var partnerListTopOffset = $partnerList.offset().top;
		var footerHeight = $('.page-footer').outerHeight(true);
		var additionalPadding = 25;
		var bodyMinHeight = parseFloat($(document.body).css('min-height'), 10);
		var viewportHeight = data.viewportHeight;

		// Enforce min-height
		if (viewportHeight < bodyMinHeight) {
			viewportHeight = bodyMinHeight;
		}
		
		// Calculate all the things		
		var newHeight = viewportHeight - partnerListTopOffset - footerHeight - additionalPadding;

		// Only apply to desktop (812 is iPhone X)
		if (viewportHeight < 812) {
			// Reset back to default value
			newHeight = 'auto'
		}

		$partnerList.css({
			'height': newHeight
		});
	}

	this.init = function($el) {
		bindEvents();
		resizePartnerListSection({}, {
			'viewportHeight': $(window).outerHeight(true)
		});

		return this;
	}

	return this.init($el);
}

export default QBOBSPartnerList;
