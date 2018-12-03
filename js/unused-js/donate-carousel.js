// Donate tabbed carousel
function DonateCarousel ($el) {
	function donateTabs() {
		var tabID = $(this).data('tab-id');
		$('.donate-tab[data-tab-id="'+tabID+'"]').addClass('activeTab').siblings().removeClass('activeTab');
		$('.donate-slide[data-tab-id="'+tabID+'"]').addClass('activeTab').siblings().removeClass('activeTab');

	}

	function donatePopUp() {
		$(this).closest('.donate-slide').toggleClass('openPopup');
	}

	function donateAmounts() {
		$el.find('.donate-slide').removeClass('openPopup').toggleClass('openDonate');
		$el.find('.donate-amounts').toggleClass('openDonate');
	}

	this.init = function($el) {
		$el.find('.donate-tab').on('click', donateTabs);
		$el.find('.toggleMore').on('click', donatePopUp);
		$el.find('.toggleDonate').on('click', donateAmounts);
		return this;
	}

	return this.init($el);
}

export default DonateCarousel;
