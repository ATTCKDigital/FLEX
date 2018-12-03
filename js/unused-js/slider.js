//slider


function Slider ($el) {
	
	function initSlider() {
		var slider = $el.find('.slider-items');
		$(slider).slick({
			dots: false,
			infinite: true,
			speed: 300,
			slidesToShow: 3,
			slidesToScroll: 3,
			centerMode: true,
			variableWidth: true,
			prevArrow: '<span class="slider-arrow slider-arrow-prev"></span>',
			nextArrow: '<span class="slider-arrow slider-arrow-next"></span>',
			responsive: [
			{
			  breakpoint: 1024,
			  settings: {
			    slidesToShow: 3,
			    slidesToScroll: 3,
			  }
			},
			{
			  breakpoint: 768,
			  settings: {
			    slidesToShow: 2,
			    slidesToScroll: 2
			  }
			},
			{
			  breakpoint: 480,
			  settings: {
			    slidesToShow: 1,
			    slidesToScroll: 1
			  }
			}
			// You can unslick at a given breakpoint now by adding:
			// settings: "unslick"
			// instead of a settings object
			]
		});
	}


	this.init = function($el) {
		initSlider();

		return this;
		
	}

	return this.init($el);
}

export default Slider;
