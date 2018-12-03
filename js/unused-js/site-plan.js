// Site plan

function Share ($el) {
	

	function swapLevels() {
		var levelID = $(this).attr('id');
		$(this).addClass('activeLevel').siblings().removeClass('activeLevel');
		$('.level-map[data-level="'+levelID+'"]').addClass('activeLevel').siblings().removeClass('activeLevel');
	}

	function expandLevel() {
		var activeLevelID = $(this).parent().find('.activeLevel').attr('data-level');
		$('body').addClass('showLevelMap');
		$('.level-popup').find('.popup-img[data-level="'+activeLevelID+'"]').addClass('activeLevel');
	}

	function openDetails() {
		var activeSiteID = $(this).attr('data-cid');
		$('body').addClass('showSiteDetails');
	}

	function closeDetails() {
		$('body').removeClass('showSiteDetails');
	}

	function closeLevel() {
		$('body').removeClass('showLevelMap');
		$('.level-popup').find('.popup-img').addClass('activeLevel');
	}

	this.init = function($el) {
		$el.find('.level').on('click', swapLevels);
		$el.find('.expandMap').on('click', expandLevel);
		$el.find('.level-popup .close').on('click', closeLevel);
		$el.find('.site-popup .close').on('click', closeDetails);
		$el.find('.site').on('click', openDetails);
		
		return this;
	}

	return this.init($el);
}

export default Share;
