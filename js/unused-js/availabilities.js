//Availabilities

function Availabilities ($el) {

	function floorToggle() {
		//find the floor id of clicked
		var floorID = $(this).attr('data-floor-id');
		var floorName = $(this).text();

		//change the visible floor name
		$el.find('.floor-toggle.displayFloor').text(floorName);

		$el.find('.floor-plan').removeClass('activeFloor');
		$el.find('.floor-toggle').removeClass('activeFloor');

		//display the correct floor plan and activate the tab (desktop)
		$el.find('.floor-plan[data-floor-id="'+floorID+'"]').addClass('activeFloor');
		$el.find('.floor-toggle[data-floor-id="'+floorID+'"]').addClass('activeFloor');

		//close the expander
		$el.find('.floor-list').removeClass('expandList');


		//show listings
		$el.find('.floor').removeClass('activeFloor');
		$el.find('.floor[data-floor-id="'+floorID+'"]').addClass('activeFloor');
		$el.find('.listing-row').removeClass('activeFloor');

		if($el.find('.listing-row[data-floor-id="'+floorID+'"]').length) {
			//if there are listings for the selected floor
			$el.find('.listing-row[data-floor-id="'+floorID+'"]').addClass('activeFloor');
		} else  {
			//if not, show message
			$el.find('.listing-row.no-matches').addClass('activeFloor');
		}

		//if all floors is selected
		if(floorID == 'AllFloors') {
			$el.find('.listing-row:not(.no-matches)').addClass('activeFloor');
		}

	}

	function dropdownToggle() {
		//open the dropdown (mobile only, styling for e);
		$el.find('.floor-list').toggleClass('expandList');
	}

	function viewDetail() {
		var activeFloor = $el.find('.floor-plan.activeFloor');
		var activeFloorImage = $(activeFloor).find('img').attr('src');
		//replace the floor image in the pop-up
		$el.find('.floor-plan-popup img').attr('src', activeFloorImage);

		//make the pop-up be above nav
		$('body').addClass('zindexBottom');

		//show pop-up
		$el.find('.floor-plan-popup.floorplan').addClass('showDetail')
		$('body').addClass('popupOpen popupTop');
	}

	function viewDetailRoom() {
		var roomPlanImage = $(this).attr('data-floor-plan');
		//replace the floor image in the pop-up
		$el.find('.floor-plan-popup.roomplan img').attr('src', roomPlanImage);

		//make the pop-up be above nav
		$('body').addClass('zindexBottom');

		//show pop-up
		$el.find('.floor-plan-popup.roomplan').addClass('showDetail');
		$('body').addClass('popupOpen hideNav');
	}

	function hideDetail() {
		$('body').removeClass('zindexBottom');

		//hide pop-up
		$el.find('.floor-plan-popup').removeClass('showDetail')
		$('body').removeClass('popupOpen popupTop');
	}

	function bindEvents() {
		$el.find('.floor-toggle').on('click', floorToggle)
		$el.find('.viewDetail').on('click', viewDetail)
		$el.find('.showFloorPlan').on('click', viewDetailRoom)
		$el.find('.close').on('click', hideDetail)
		$el.find('.floor-list .expand-list').on('click', dropdownToggle);

	}




	this.init = function($el) {
		bindEvents();

		return this;
		
	}

	return this.init($el);
}

export default Availabilities;
