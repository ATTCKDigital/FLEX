// Drop down

function DropDown ($el) {
	function dropDownToggle() {
		var $dropdown = $(this).closest('.component-drop-down');
		$dropdown.toggleClass('openDropdown')
	}

	this.init = function($el) {
		$el.find('.dropDown').on('click', dropDownToggle);
		return this;
	}

	return this.init($el);
}

export default DropDown;
