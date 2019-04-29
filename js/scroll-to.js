import $ from 'jquery';

function ScrollTo($el) {

	function ScrollToAnchor() {
		var anchor = $(this).attr('data-anchor');
		var row = $('body').find('#'+anchor);

		$('html, body').animate({ 
			scrollTop: $(row).offset().top 
		}, 1000);
	}

	this.init = function ($el) {
		$el = $el;
		$el.find('.scrollTo').on('click', ScrollToAnchor);

		return this;
	}

	return this.init($el);
}

export default ScrollTo;