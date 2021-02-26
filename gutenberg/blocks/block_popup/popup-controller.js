import Loader from '../../../js/load-components';

function PopupController($el) {

	var popupNames;
	var $popup;
	var $popupEl;
	var $buttons;

	function bindEvents() {
		console.log('/FLEX/\tguttenberg /\tblocks/\t Popup Controller', 'bindEvents()');

		$buttons.each(function(index) {
			$(this).on('click', function(e) {
				e.preventDefault();

				openPopup(index)
			})
		});
	}

	function openPopup(index) {
		console.log('/FLEX/\tguttenberg /\tblocks/\t Popup Controller', 'openPopup()');
		
		const popupName = popupNames[index].popupName;

		// If URL was used, open new browser window and exit this function
		if (popupName.startsWith('http')) {
			return window.open(popupName);
		}

		$popup = $(`[data-popup-tpl="${popupName}"]`);

		if (!$popup) {
      		console.warn(`Can't find popup template "${popupName}"`);

      		return;
    	}

		$( "body" ).append($popup.html());
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

			closePopup()
		});
	}

	function initComponents() {
		console.log('/FLEX/\tguttenberg /\tblocks/\t Popup Controller', 'initComponents()');

		let $componentElements = $('[data-component-name]', $popupEl);

		$componentElements.each(function() {
			Loader.loadComponent($(this))
		})
	}

	function closePopup() {
		$popupEl.remove();
	}

	this.init = function ($el) {
		console.log('/FLEX/\tguttenberg /\tblocks/\t Popup Controller', 'init()');

		$el = $el;
		popupNames = $el.data('componentOptions');

		if (!Array.isArray(popupNames)) {
			popupNames = [popupNames];
		}

		$buttons = $(`.open-popup-button`, $el);

		if (!$buttons) return;
    

		bindEvents();

		return this;
	}

	return this.init($el);
}

export default PopupController;