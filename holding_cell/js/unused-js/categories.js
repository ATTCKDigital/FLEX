// Categories
import FLEXLAYOUT from 'flexlayout';

function Categories ($el) {
	function categoryOpen() {
		$(this).addClass('categoryOpen').siblings().removeClass('categoryOpen');
	}

	function categoryClose() {
		$(this).removeClass('categoryOpen').siblings().removeClass('categoryOpen');
	}

	this.init = function($el) {
		$el.find('.category-card').on('mouseover', categoryOpen).on('mouseout', categoryClose);

		

		return this;
	}

	return this.init($el);
}

export default Categories;
