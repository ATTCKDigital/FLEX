// Property List

function PropertyList ($el) {

	function toggleListView($el) {
		//hide and show the more options drop down
		var viewType = $(this).attr('data-view')
	    $('body').find('.properties-list').attr('id', viewType);
	    $('body').find('.component-map').removeClass('mapView');
	    if(viewType == 'mapView') {
	    	$('body').find('.component-map').addClass('mapView');
	    }
	    $(this).addClass('activeView').siblings().removeClass('activeView');

	}

	function initScrollEvents($el) {
		$(document.body).bind("ATTCK.scroll", function (e, data) {
			// Make controls sticky on mobile
		    var scroll = data.currentScrollTop;
		    var $body = $('body');
		    var viewSwitcher = $body.find('.controls');
		    var viewSwitcherTop = viewSwitcher.offset().top - 75;
		    var resultsList = $body.find('.property-list-layout')
		    var resultsListTop = resultsList.offset().top;

		    if (scroll >= viewSwitcherTop) {
		        viewSwitcher.addClass('stickySwitcher');
		    } 
		    if (scroll <= resultsListTop) {
		    	viewSwitcher.removeClass('stickySwitcher');
		    }


		});

	}

	function sortList($el) {
		$(this).toggleClass('sortList');
	}

	function pagination(e) {
		$(this).addClass('activePage').siblings().removeClass('activePage');
	}

	this.init = function($el) {
		$el.find('.controls .icon').on('click', toggleListView);
		$el.find('.center-header').on('click', sortList);
		$el.find('.page-number').on('click', pagination);
		initScrollEvents();
		return this;
	}

	return this.init($el);
}

export default PropertyList;
