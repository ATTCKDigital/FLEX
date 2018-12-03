// Gallery

function Slider ($el) {
	function nextSlide(e) {
		//slide nextslide
		var thisSlide = $el.find('.activeSlide');
		var next = $(thisSlide).next();
		var slideId = $(thisSlide).attr('data-slide-id');
		var slideNo = slideId.replace('slide-', '');
		var nextSlide = parseInt(slideNo)+1;
		var nextCaption = $el.find('.slide-caption[data-slide-id="slide-'+nextSlide+'"]')

		if ($(next).length) {
			//if there is a next slide 

			//make the next slide visible
			$(next).addClass('activeSlide').siblings().removeClass('activeSlide'); 
			
			//update the next caption
			$(nextCaption).addClass('activeSlide').siblings().removeClass('activeSlide'); 

		} else {
			//if the next slide is the last slide, go back to the first slide
			$el.find('.slider-item:first-child').addClass('activeSlide').siblings().removeClass('activeSlide');
			$el.find('.slide-caption[data-slide-id="slide-1"]').addClass('activeSlide').siblings().removeClass('activeSlide');
		}
	}

	function prevSlide() {
		var thisSlide = $el.find('.activeSlide');
		var prev = $(thisSlide).prev();
		var slideId = $(thisSlide).attr('data-slide-id');
		var slideNo = slideId.replace('slide-', '');
		var prevSlide = parseInt(slideNo)-1;
		var prevCaption = $el.find('.slide-caption[data-slide-id="slide-'+prevSlide+'"]')

		if ($(prev).length) {
			//previous direction

			//make the prev slide visible
			$(prev).addClass('activeSlide').siblings().removeClass('activeSlide'); 
	
			//update the next dot
			$(prevCaption).addClass('activeSlide').siblings().removeClass('activeSlide'); 


		} else {
			//if the prev slide is the last slide, go back to the first slide
			$el.find('.slider-item:last-child').addClass('activeSlide').siblings().removeClass('activeSlide');
			$el.find('.slide-caption:last-child').addClass('activeSlide').siblings().removeClass('activeSlide');

		}

	}
	
	function thumbnails(){
		//slider thumbnails OR can be used for gallery dots
		var slides = $('.gallery-items');
		var slideId = $(this).data('slide-id');
		$(slides).find('#'+slideId).addClass('activeSlide').siblings().removeClass('activeSlide');
		$(this).addClass('activeSlide').siblings().removeClass('activeSlide');
	   
	}

	function closeSlideshow() {
		$(this).closest('.component-row').removeClass('zindexTop');
		$el.removeClass('galleryOpened');
		$('body').removeClass('popupOpen');
	}

	function openSlideshow() {
		$(this).closest('.component-row').addClass('zindexTop');
		$el.addClass('galleryOpened');
		$('body').addClass('popupOpen');
		//find the slide that was clicked and activate it
		var slideID = $(this).attr('data-slide-id');
		
		$el.find('.gallery-popup-item').removeClass('activeSlide');
		$el.find('.gallery-popup-item#'+slideID).addClass('activeSlide');
	}
	
	function keyCommands() {

		//key commands for slideshow
		$(document).keydown(function(e){
		    if (e.keyCode == 37) { 
		       prevSlide();
		    }

		    if (e.keyCode == 39) { 
		       nextSlide();
		    }

		    if (e.keyCode == 27) { 
				// $el.removeClass('galleryOpened');
		    }

		});
		
	}


	this.init = function($el) {
		$el.find('.arrow-next').on('click', nextSlide);
		$el.find('.arrow-prev').on('click', prevSlide);
		$el.find('.slider-item').on('click', nextSlide);
		keyCommands();
		return this;
		
	}

	return this.init($el);
}

export default Slider;
