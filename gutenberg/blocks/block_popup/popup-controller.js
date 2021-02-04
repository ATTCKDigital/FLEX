function PopupController($el) {

	var popupNames;
	var $popup;
	var $popupEl;
	var $popupOverlay;
	var $closeButton;
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

		$popup = $(`[data-popup-tpl="${popupName}"]`);

		if (!$popup) {
      console.warn(`Can't find popup template "${popupName}"`);
      return;
    }

		$( "body" ).append($popup.html());
		$popupEl = $('.component-popup');
		$popupOverlay = $('.popup-background-overlay', $popupEl);
		$closeButton = $('.close-button', $popupEl);

		$popupOverlay.on('click', (e) => {
			e.preventDefault();

			closePopup()
		});

		$closeButton.on('click', (e) => {
			e.preventDefault();

			closePopup()
		});
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
		console.log({'buttons': $buttons});

		if (!$buttons) return;
    
		console.log(popupNames);

		bindEvents();

		return this;
	}

	return this.init($el);
}

export default PopupController;