function SelectDropdown ($el) {

	function showDropdown($el) {
		// Close other dropdowns
		$('body').find('.showDropdown').removeClass('showDropdown');

		// Show the dropdown
		$(this).next('.dropdown-menu').addClass('showDropdown');
	}

	function hideDropdown($el) {
		// Hide the dropdown
		$(this).parent().removeClass('showDropdown');
	}

	function filter($el) {
		//add class to selected
		$(this)
			.addClass('selectedFilter')
			.siblings()
			.removeClass('selectedFilter');
	}

	function submitCF7() {
		document.addEventListener( 'wpcf7submit', function( event ) {
		    $('body').addClass('openThankyou');
		}, false );
	}

	function closeThankyou() {
		$('body').removeClass('openThankyou')
	}


	function applyFilter($el) {
		var thisFilter = $(this).closest('.dropdown');
		var thisFilterID = $(this).closest('.dropdown').attr('id');

		
		if (thisFilter.hasClass('selectStyle')) {
			// If it is a select
			// Get the value of the filter
			var selectedFilter = thisFilter.find('.selectedFilter');
			
			// Create an empty array for the selections
			var filterSelections = [];
			var filterValues = [];

			$(selectedFilter).each(function () {
				// Find the value of the selection
				var filterValue = $(this).attr('value');
				var filterText = $(this).text();

				// Push value to the array
				filterSelections.push(filterText);
				if(filterValue) {
					filterValues.push(filterValue);
				} else {
					filterValues.push(filterText);
				}
			});

			// Create a csv out of array
			var filterSelections = filterSelections.join(', ')
			var filterValues = filterValues.join(', ')

			thisFilter.find('.select .display-select').text(filterSelections);
			thisFilter.find('.select input').attr('value',filterValues);
			$(this).closest('.dropdown-menu').removeClass('showDropdown');

			if(thisFilterID = 'region') {
				$('body').find('.selections[data-region="'+filterSelections+'"]').removeClass('hideSelections')
			}
		}


		// Add a selected class to the filter button
		thisFilter.addClass('selectedFilter');

		// Close the menu
		$(this).closest('.dropdown-menu').removeClass('showDropdown');
	}


	this.init = function ($el) {
		$el.find('.dropdown .select').on('click', showDropdown);
		$el.find('.dropdown-menu .selection').on('click', filter);
		$el.find('.selectStyle .dropdown-menu .selection').on('click', applyFilter);
		$el.find('#closeThankyou').on('click', closeThankyou);
		submitCF7();
		return this;
	}

	return this.init($el);
}

export default SelectDropdown;
