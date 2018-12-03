function SearchForm ($el) {
	function toggleOptions($el) {
		// Hide and show the more options drop down
		$(this).closest('.component-search-form').toggleClass('openOptions');
	    $(this).closest('.optionsToggle').text($(this).closest('.optionsToggle').text() == 'More Options' ? 'Less Options' : 'More Options');
	}

	function toggleList($el) {
		//hide and show the more options drop down
		$(this).closest('.dropdown').toggleClass('expandOptions');
	    $(this).find('span').text($(this).find('span').text() == 'See All' ? 'See Less' : 'See All');
	}

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
			.removeClass('selectedFilter')
			.find('input[type="radio"]')
			.prop('checked', false);
	}

	function clearFilter($el) {
		var thisFilter = $(this).closest('.dropdown');
		var thisDropdown = $(this).closest('.dropdown-menu');
		
		// Find selected and uncheck the checkbox
		thisDropdown
			.find('.selectedFilter')
			.removeClass('selectedFilter')
			.find('input[type="checkbox"]')
			.attr('checked', false);

		// Close the dropdown
		thisDropdown.removeClass('showDropdown');

		// Clear the selections
		thisFilter.find('.filter small').text('');
		thisFilter.removeClass('selectedFilter');
	}

	function applyFilter($el) {
		var thisFilter = $(this).closest('.dropdown');
		var thisFilterID = $(this).closest('.dropdown').attr('id');
		
		// If the filter is a range slider
		if (thisFilter.hasClass('rangeSlider')) {
			// Get the value of the slider
			var rangeValue = $('#' + thisFilterID).find('.output').text();

			// Make it human readable
			var rangeValueString = rangeValue.replace(';', '-');

			// Update the button and the data attribute
			thisFilter.find('.filter small').text(': ' + rangeValueString);
			thisFilter.attr('data-select-' + thisFilterID, rangeValueString);

		} else if (thisFilter.hasClass('selectStyle')) {
			// If it is a select
			// Get the value of the filter
			var selectedFilter = thisFilter.find('.selectedFilter');
			
			// Create an empty array for the selections
			var filterSelections = [];

			$(selectedFilter).each(function () {
				// Find the value of the selection
				var filterText = $(this).attr('value');

				// Push value to the array
				filterSelections.push(filterText);
			});

			// Create a CSV out of array
			var filterSelections = filterSelections.join(', ');

			// Update the filter button with selections
			thisFilter.find('.select span').text(filterSelections);
			thisFilter.attr('data-select-' + thisFilterID, filterSelections);
			$(this).closest('.dropdown-menu').removeClass('showDropdown');
		} else {
			// If it is checkbox or radio
			// Get the value of the filter
			var selectedFilter = thisFilter.find('.selectedFilter');

			// Create an empty array for the selections
			var filterSelections = [];

			$(selectedFilter).each(function () {
				// Find the value of the selection
				var filterText = $(this).attr('value');

				// Push value to the array
				filterSelections.push(filterText);
			})
			//create a csv out of array
			var filterSelections = filterSelections.join(', ');

			//update the filter button with selections
			thisFilter.find('.filter small').text(': '+filterSelections);
			thisFilter.attr('data-select-'+thisFilterID, filterSelections);
		}

		// Add a selected class to the filter button
		thisFilter.addClass('selectedFilter');

		// Close the menu
		$(this).closest('.dropdown-menu').removeClass('showDropdown');
	}

	function rangeSlider($el) {
		$('.rangeSlider').each(function (index) {
			var sliderID = $(this).find('input').attr('data-slider-id');
			var $slider = $(this); //cache the sliders to access in callbacks
			var sliderMax = $(this).data('max');
			var sliderMin = $(this).data('min');
			var sliderFrom = $(this).data('from');
			var sliderTo = $(this).data('to');
			var sliderStep = $(this).data('step');

			$('input[data-slider-id="' + sliderID + '"]').ionRangeSlider({
				'type': "double",
				'grid': false,
				'min': sliderMin,
				'max': sliderMax,
				'from': sliderFrom,
				'to': sliderTo,
				'prefix': "$",
				'postfix': "K",
				'decorate_both': true,
				'prettify_enabled': true,
				'prettify_separator': ",",
				'step': sliderStep,
				'force_edges': true,
				'hide_min_max': true,
				'hide_from_to': true,
				onStart: function (data) {
					var selectionFrom = data.from;
					var selectionTo = data.to;

					$slider.find('.output[data-value="'+sliderID+'"] .value-from').text(selectionFrom.toLocaleString());
					$slider.find('.output[data-value="'+sliderID+'"] .value-to').text(selectionTo.toLocaleString());
				},
				onChange: function (data) {
					var selectionFrom = data.from;
					var selectionTo = data.to;

					$slider.find('.output[data-value="'+sliderID+'"] .value-from').text(selectionFrom.toLocaleString());
					$slider.find('.output[data-value="'+sliderID+'"] .value-to').text(selectionTo.toLocaleString());
					var $this = $(this);
					var value = $this.prop("value");
				}
			});
			
			// Reset slider when reset is clicked
			var slider = $('input[data-slider-id="' + sliderID + '"]').data("ionRangeSlider");
			
			$('.resetOptions').on('click', function () {
				slider.reset();
			});
		});
	}

	function applyAllFilter($el) {
		// Get all the dropdowns
		var $dropdown = $('.dropdown', $el);

		// Foreach dropdown
		$dropdown.each(function () {
			var thisFilter = $(this);
			var thisFilterID = $(this).closest('.dropdown').attr('id');

			//get the value of the filter
			var selectedFilter = thisFilter.find('.selectedFilter');
			// create an empty array for the selections
			var filterSelections = [];
			$(selectedFilter).each(function(){
				//find the value of the selection
				var filterText = $(this).attr('value');
				//push value to the array
				filterSelections.push(filterText);
			})
			
			//Create a csv out of array
			var filterSelections = filterSelections.join(', ');

			// Update the filter data with selections
			thisFilter.attr('data-select-'+thisFilterID, filterSelections);
		})

		toggleOptions();
	}

	function resetOptions() {
		var filters = $('body').find('.selectedFilter');

		//reset filters
		$(filters).each(function () {
			$(this).removeClass('selectedFilter');
			$(this).find('input').prop('checked', false);

			var thisFilter = $(this).closest('.dropdown');
			var thisFilterID = $(this).closest('.dropdown').attr('id');

			thisFilter.attr('data-select-' + thisFilterID, '');
		})
	}

	function submitForm() {
		// Gather all the fields into an array
		var urlString = [];

		// - form action
		var targetURL = $('form', $el).attr('action');

		if (typeof targetURL !== 'undefined') {
			urlString.push(targetURL);
		}		

		// - search string
		var keywordText = $('#property_keyword', $el).val();

		if (typeof keywordText !== 'undefined' && keywordText !== '') {
			urlString.push('/keywordText:' + keywordText);
		}

		// - state
		var state = $('#state', $el).attr('data-select-state');

		if (typeof state !== 'undefined' && state !== '') {
			urlString.push('/state:' + state);
		}

		// - city
		var city = $('#city', $el).attr('data-select-city');

		if (typeof city !== 'undefined' && city !== '') {
			urlString.push('/city:' + city);
		}

		// TODO: (DP) Add this field once we figure out where it should be saved to
		// - availabilities
		// var availabilities = $('form', $el)

		// if (typeof all !== 'undefined') {
		// 	urlString.push('keywordText:' + all)
		// }

		// Navigate to search page
		location.href = urlString.join('');
		return false;
	}

	this.init = function ($el) {
		$el.find('.optionsToggle').on('click', toggleOptions);
		$el.find('.toggleList').on('click', toggleList);
		$el.find('.dropdown .filter').on('click', showDropdown);
		$el.find('.dropdown .select').on('click', showDropdown);
		$el.find('.closeOptions').on('click', toggleOptions);
		$el.find('.dropdown-menu .selection').on('click', filter);
		$el.find('.dropdown-menu .apply').on('click', applyFilter);
		$el.find('.selectStyle .dropdown-menu .selection').on('click', applyFilter);
		$el.find('.applyAll').on('click', applyAllFilter);
		$el.find('.resetOptions').on('click', resetOptions);
		$el.find('.dropdown-menu .clearFilters').on('click', clearFilter);

		$('form', $el).on('submit', submitForm);

		rangeSlider();

		$(window).on('resize', function () {
			// Close advanced search on window resize
			$('body').find('.component-search-form').removeClass('openOptions');

			if ($('body').find('.optionsToggle').text() === 'Less Options') {
				$('body').find('.optionsToggle').text('More Options')
			}
		})

		return this;
	}

	return this.init($el);
}

export default SearchForm;
