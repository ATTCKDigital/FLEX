// Gallery

function Nestio ($el) {

	function nestioFilter() {
		var filter = $(this).attr('data-layout');
		var countResidences = $el.find('.residence-row[data-layout="'+filter+'"]').length;
		var countTotalResidences = $el.find('.residence-row').length;

		if($(this).hasClass('activeFilter')) {
			//if the clicked filter is active, reset the rows
			$(this).removeClass('activeFilter');
			$el.find('.residence-row').removeClass('showRow hideRow');		
			$el.find('.residences-wrapper').removeClass('showMoreResidences');

			if($(window).width() >= 1024) {
				$el.find('.residence-row:nth-child(n+5)').addClass('hideRow');
			}

			if(countTotalResidences >= 4) {
				//if there are more than 4 residences in total, show the arrow
				$el.find('.toggleResidences').show();

			}

		} else {
			//if the clicked filter is inactive, set it
			$(this).addClass('activeFilter').siblings().removeClass('activeFilter')

			//get number of residences in the filter

			if(countResidences > 0) {
				//if there are residences that match the filter
				//hide elements not in the filter
				$el.find('.residence-row:not([data-layout="'+filter+'"])').removeClass('showRow').addClass('hideRow');
				//show elements in the filter
				$el.find('.residence-row[data-layout="'+filter+'"]').addClass('showRow').removeClass('hideRow');

				if(countResidences <= 2) {
					//if there are less than 4 residences in a filter, hide the arrow
					$el.find('.toggleResidences').hide();
				} else {
					//if there are more than 4 residences in a filter, show the arrow
					$el.find('.toggleResidences').show();

				}
			} else {
				//if the are no residences in the filter, hide all and show the message
				$el.find('.no-matches').addClass('showRow').siblings().addClass('hideRow');
			}
		}

	}

	function nestioMore() {
		$el.find('.residences-wrapper').toggleClass('showMoreResidences');
		$el.find('.residence-row:nth-child(n+5)').toggleClass('hideRow');
		
	}

	function nestioShowAll() {
		$el.find('.residence-row').removeClass('hideRow');
	}

	function nestioHideRows() {
		$el.find('.residence-row:nth-child(n+5)').addClass('hideRow');
	}


	function showFloorPlan() {
		var floorPlan = $(this).attr('data-floor-plan');
		$(this).closest('.component-row').addClass('zindexTop');
		$el.find('.floorplan-popup').addClass('openFloorPlan');
		$el.find('.floorplan-popup img').attr('src', floorPlan);
	}


	function hideFloorPlan() {
		$(this).closest('.component-row').removeClass('zindexTop');
		$el.find('.floorplan-popup').removeClass('openFloorPlan');
	}


	function bindEvents() {
		$el.find('.circle-button').on('click', nestioFilter);
		$el.find('.toggleResidences').on('click', nestioMore);
		$el.find('.showFloorPlan').on('click', showFloorPlan);
		$el.find('.closeFloorPlan').on('click', hideFloorPlan);

		if($(window).width() < 1024) {
			nestioShowAll();
		}

		$(window).on('resize', function(){
			if($(window).width() < 1024) {
				nestioShowAll();
			} else {
				nestioHideRows();
			}				
		})
	}

	this.init = function($el) {
		bindEvents();
		return this;
		
	}

	return this.init($el);
}

export default Nestio;
