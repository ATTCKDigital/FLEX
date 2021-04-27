import $ from 'jquery';

// WCAG
function WCAG($el) {
	console.log('/wcag.js', 'WCAG()');

	// Adds a relative link clickable ID attribue to the first matching content block
	function addMainContentRelativeLink() {
		console.log('/FLEX/\tcomponents/\tcomponent-wcag/\wcag.js', 'addMainContentRelativeLink()');

		$('main[role="main"]').attr('id', 'mainContent');
	}

	// Adds hidden accessibility link as the first 
	// focusable element on the page
	function addSkipToMainLink() {
		console.log('/FLEX/\tcomponents/\tcomponent-wcag/\wcag.js', 'addSkipToMainLink()');

		// Exit if already on the page for some reason
		if ($('body').find('#skipToMainContent').length > 0) {
			return console.log('WCAG compliance skip to main content link already present');
		} 

		// Insert link onto page
		$('<a href="#mainContent" id="skipToMainContent" tabindex="0">Skip to main content</a>').prependTo('body');
	}

	function addTabIndexes() {
		// Make form labels tabbable
		$('label').attr('tabindex', '0');

		// Make checkboxes enter-key-able
		$('label').on('keypress', function (e) {
			var keyCode = e.keyCode || e.which;

			var $checkbox = $(this).find(':checkbox');

			// Detect enter key press
			if (keyCode === 13) {
				$checkbox.prop('checked', !$checkbox.prop('checked'));
			}
		});
	}

	function bindEvents() {
		$(document).on('keyup', function (e) { 
			// Detect key press for WCAG compliance
			var keyCode = e.keyCode || e.which;

			var $focused_element = document.activeElement;

			console.log('/FLEX/\tcomponents/\tcomponent_wcag/\twcag.js', 'document keypress › pressed ' + e.key + ' key:type ' + e.type + ', keyCode: ' + keyCode);

			// Detect key press
			// 9 = tab
			// 13 = enter
			// 27 = esc
			if (keyCode === 9) {
				console.log('/FLEX/\tcomponents/\tcomponent_wcag/\twcag.js', '$focused_element: ');
				console.log($focused_element.innerHTML.substring(0, 100), $focused_element);
			} 
		});
	}

	function render() {
		console.log('/FLEX/\tcomponents/\tcomponent-wcag/\wcag.js', 'render()');

		addMainContentRelativeLink();
		addSkipToMainLink();
		addTabIndexes();
	}

	this.init = function ($el) {
		console.log('/FLEX/\tcomponents/\tcomponent-wcag/\wcag.js', 'init()');

		render();
		bindEvents();

		return this;
	}

	return this.init($el);
}

export default WCAG;
