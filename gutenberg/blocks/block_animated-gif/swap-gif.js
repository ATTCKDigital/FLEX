function AnimatedGif($el) {
	
	function swapGif() {
		var gif = $el.find('.image-wrapper').attr('data-gif-src');
		var image = $el.find('img');

		//remove the srcset, we don't need
		$(image).attr('srcset', '');

		//swap the placeholder image src with the gif src
		$(image).attr('src', gif);

	}

	
	this.init = function ($el) {
		$el = $el;
		//after window is loading, swap out the gifs
		$(window).on('load', swapGif);


		return this;
	}

	return this.init($el);
}

export default AnimatedGif;