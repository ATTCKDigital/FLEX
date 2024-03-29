import Loader from '../../../js/load-components';

function PopupController($el) {
	var popupNames;
	var $popup;
	var $popupEl;
	var $buttons;

	function bindEvents() {
		console.log('/FLEX/\tgutenberg /\tblocks/\t Popup Controller', 'bindEvents()');

		var counter = 0;

		$buttons.each(function (counter) {
			var n = counter++;

			return function (index) {
				$(this).on('click', function(e) {
					
					e.preventDefault();

					openPopup(n);
				});
			};
		}(counter));
	}

	function openPopup(index) {
		console.log('/FLEX/\tgutenberg /\tblocks/\t Popup Controller', 'openPopup()');
		
		const popupName = popupNames[index].popupName;

		// If URL was used, open new browser window and exit this function
		switch (true) {
			case popupName.startsWith('https://projectdomain.org/subfolder'):
				return window.open(popupName);
				break;

			case popupName.startsWith('https://projectdomain.org/'):
				return window.open(popupName, '_self');
				break;

			case popupName.startsWith('http'):
				return window.open(popupName);
				break;
		}

		// ...Otherwise, use the popup template on the page
		$popup = $(`[data-popup-tpl="${popupName}"]`);

		// Exit with warning if no popup template is found
		if (!$popup) {
			console.warn(`Can't find popup template "${popupName}"`);

			return;
    	}

    	// Add popup element to the end of the page
		$('body').append($popup.html());

		// Retrieve access to popup element
		$popupEl = $('.component-popup');

		initComponents();

		let $popupOverlay = $('.popup-background-overlay', $popupEl);
		let $closeButton = $('.close-button', $popupEl);

		bindClosePopup($popupOverlay);
		bindClosePopup($closeButton);
	}

	function bindClosePopup($el) {
		$el.on('click', (e) => {
			e.preventDefault();

			closePopup();
		});
	}

	function initComponents() {
		console.log('/FLEX/\tgutenberg /\tblocks/\t Popup Controller', 'initComponents()');

		let $componentElements = $('[data-component-name]', $popupEl);

		$componentElements.each(function () {
			Loader.loadComponent($(this));
		});
	}

	function closePopup() {
		$popupEl.remove();
	}

	this.init = function ($el) {
		console.log('/FLEX/\tgutenberg /\tblocks/\t Popup Controller', 'init()');

		$el = $el;

		// Retrieve JSON options from block properties
		popupNames = $el.data('componentOptions');

		if (!Array.isArray(popupNames)) {
			popupNames = [popupNames];
		}

		$buttons = $('.open-popup-button', $el);

		if (!$buttons) return;
    
		bindEvents();

		return this;
	}

	return this.init($el);
}

export default PopupController;