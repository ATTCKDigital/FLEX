// Expander
//vimeo api
import Player from '@vimeo/player';


function Expander ($el) {
	function expandComponent(e) {

		$el.removeClass('peekClose peekOpen')
		$el.toggleClass('expanded');

		//remove the active map class when the expander is closed
		if(!$el.hasClass('expanded')) {
			$el.find('.map-details.openBox').removeClass('openBox');
		}		

		if($('body').hasClass('page-amenities')) {
			//change menu icon on amenities page
			if($(window).width() > 1023) {
				$('body').addClass('logoDark').removeClass('logoLight');
			}
		}
	}	

	function changeMap() {
		//amenities map
		var amenityID = $(this).attr('data-amenity-id');
		var mapCard = $el.find('.amenity[data-amenity-id="'+amenityID+'"]')
		$el.addClass('expanded');
		$(this).addClass('activeAmenity').siblings().removeClass('activeAmenity');
		$(mapCard).addClass('activeAmenity').siblings().removeClass('activeAmenity');

		if($(window).width() > 1023) {
			if($(mapCard).hasClass('no-image')) {
				$('body').addClass('logoDark').removeClass('logoLight');
			} else {
				$('body').addClass('logoLight').removeClass('logoDark');
			}
		}
	}

	function changeMapMobile() {
		//amenities map mobile
		var amenityID = $(this).attr('data-amenity-id');
		var mapCard = $el.find('.amenity[data-amenity-id="'+amenityID+'"]')
		var mapPoint = $el.find('.map-point[data-amenity-id="'+amenityID+'"]')
		$el.addClass('expanded');
		$(this).addClass('activeAmenity').siblings().removeClass('activeAmenity');
		$(mapCard).addClass('activeAmenity').siblings().removeClass('activeAmenity');
		$(mapPoint).addClass('activeAmenity').siblings().removeClass('activeAmenity');
	}


	function playVideo(e) {

		var videoId = $(this).attr('data-video-id');
		var videoPlayer = $el.find('video#video-'+videoId);
		$(this).closest('.component-row').addClass('zindexTop');
		$el.find('.expander-video-wrapper[data-video-id="'+videoId+'"]').addClass('playVideo');
		$el.removeClass('expanded');

		videoPlayer.get(0).play();
	}

	function stopVideo() {

		var videoId = $(this).attr('data-video-id');
		var videoPlayer = $el.find('video#video-'+videoId);
		$(this).closest('.component-row').removeClass('zindexTop');
		$el.find('.expander-video-wrapper[data-video-id="'+videoId+'"]').removeClass('playVideo fullScreen');

		videoPlayer.get(0).pause();
		//set video back to beginning
		videoPlayer.get(0).currentTime = 0;
	}


	function initVimeoVideos() {
		$el.find('.expander-video-wrapper.vimeo').each(function(){
			var videoId = $(this).attr('data-video-id');
			var iframe = $(this).find('iframe#video-'+videoId);

			let player = new Player(iframe)
			$el.data('vimeo-player', player)
			console.log($el.data('vimeo-player', player))
		})

	}

	function fullScreenVideo() {
		var videoId = $(this).attr('data-video-id');
		var videoWrapper = $el.find('.expander-video-wrapper');
		$(videoWrapper).toggleClass('fullScreen');
	}

	function vimeoPlayVideo() {

		let player = $el.data('vimeo-player')
		player.play();

		var videoId = $(this).attr('data-video-id');

		$(this).closest('.component-row').addClass('zindexTop');
		$el.find('.expander-video-wrapper[data-video-id="'+videoId+'"]').addClass('playVideo');
		$el.removeClass('expanded');
	}

	function vimeoStopVideo() {
		let player = $el.data('vimeo-player')
		player.pause();
		//set video back to beginning
		player.setCurrentTime(0);

		var videoId = $(this).attr('data-video-id');

		$(this).closest('.component-row').removeClass('zindexTop');
		$el.find('.expander-video-wrapper[data-video-id="'+videoId+'"]').removeClass('playVideo fullScreen');
	}


	function prepGallery() {
		//gallery is created in a separate column from the expander. this function finds the gallery in the same row as the expander
		//find the row that we are in
		var currentRow = $(this).closest('.component-row');
		//find the gallery in that row
		var gallery = $(currentRow).find('.component-gallery');
		$(gallery).addClass('galleryOpened');
		$(currentRow).addClass('zindexTop');
	}

	function showAddress() {
		$(this).toggleClass('showAddress');
	}

	function activateLayer() {
		//get the layer id
		var layerID = $(this).attr('data-layer-id');
		//toggle the layer and the layer trigger
		$(this).toggleClass('activeLayer');
		$el.find('.map-location[data-layer-id="'+layerID+'"]').toggleClass('activeLayer');
	}

	function mapBox() {
		//get the map point id
		var mapID = $(this).attr('data-map-id');
		$el.find('.map-details#'+mapID).toggleClass('openBox').siblings().removeClass('openBox');

		//open the expander
		$el.addClass('expanded');

	}

	function panZoom() {
		//if the image is wider than the screen, the element being panned must have explicit width set for this to work
		var zoomBoxContainer = $el.find('.expander-image-wrapper');
		var zoomBox = $el.find('#draggable');
		var zoomBoxHeight = $(zoomBoxContainer).height();
		//1.41 is the image aspect ratio
		var zoomBoxWidth = zoomBoxHeight * 1.41;

		var $window = $(window);
		var viewportHeight   = $window.outerHeight();
		var viewportWidth	= $window.outerWidth();


		function mapPortrait() {
			if((viewportWidth / viewportHeight) < 1.41) {
				//only apply a fixed width if the viewport ratio is less than 1.41, aka in portrait view
				$(zoomBox).css({
				'width' : zoomBoxWidth+'px',
				})
			} else {
				$(zoomBox).css({
					'width' : '100%',
				})
			}
		}

		mapPortrait();


		$(window).on('resize', function(){
			$( "#draggable" ).load(window.location.href + " #draggable" );
      		return;
		});

		$(zoomBox).panzoom({
			minScale: 1,
			maxScale: 2,
			increment: 0.3,
			$zoomIn: $el.find(".zoom-in"),
			$zoomOut: $el.find(".zoom-out"),
			contain: 'invert',
			// startTransform: 'translateX(-30%)'
		});



		// Bind to scroll
		$(document.body).bind('FLEXLS.scroll', function (e, data) {
		    var scroll = data.currentScrollTop;

			//fixes issue with zoom buttons being covered by the chrome in mobile safari
			if (data.scrollDirection === 'down') {
				$('body').find('.zoom-layer').addClass('safariBarGone');
		    } 

		    if(scroll <= 0) {
		    	$('body').find('.zoom-layer').removeClass('safariBarGone');
		    }

		});

	}


	function tabPeek() {
		$el.addClass('peekTab');
	}

	function tabPeekClose() {
		$el.removeClass('peekTab');
	}

	function dismissMapDetail() {
		$(this).closest('.map-details').removeClass('openBox');
	}

	function bindEvents() {
		$el.find('.expandComponent').on('click', expandComponent)
		$el.find('.html5Play').on('click', playVideo)
		$el.find('.html5Close').on('click', stopVideo)
		$el.find('.full-screen').on('click', fullScreenVideo)
		$el.find('.vimeoPlay').on('click', vimeoPlayVideo)
		$el.find('.vimeoClose').on('click', vimeoStopVideo)
		$el.find('.map-point').on('click', changeMap)
		$el.find('.map-point-item').on('click', changeMapMobile)
		$el.find('.address').on('click', showAddress)
		$el.find('.openGallery').on('click', prepGallery)
		$el.find('.map-layer-level').on('click', activateLayer)
		$el.find('.mapMenu').on('click', dismissMapDetail)
		panZoom();
		initVimeoVideos();

		if($(window).width() >= 1024) {
			$el.find('.map-box').on('click', mapBox)
			$el.find('.expandComponent').on('mouseenter touchstart', tabPeek)
			$el.find('.expandComponent').on('mouseleave touchend', tabPeekClose)
		}

	}




	this.init = function($el) {
		bindEvents();

		return this;
		
	}

	return this.init($el);
}

export default Expander;
