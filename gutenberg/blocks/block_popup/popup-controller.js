import Loader from '../../../js/load-components';

function PopupController( $el ) {
	let popupNames;
	let $popup;
	let $popupEl;
	let $buttons;

	function bindEvents() {
		console.log(
			'/FLEX/\tgutenberg /\tblocks/\t Popup Controller',
			'bindEvents()'
		);

		const counter = 0;

		$buttons.each(
			( function ( startCount ) {
				const n = startCount++;

				return function () {
					$( this ).on( 'click', function ( e ) {
						e.preventDefault();

						openPopup( n );
					} );
				};
			} )( counter )
		);

		console.log(
			'/FLEX/\tgutenberg/\tblocks/\tblock_popup/\tpopup-controller.js › binding FLEX.keydown'
		);

		$( document.body ).on( 'FLEX.keydown', function ( e, data ) {
			if ( data.keyCode === 27 ) {
				closePopup();
			}
		} );
	}

	function openPopup( index ) {
		console.log(
			'/FLEX/\tgutenberg /\tblocks/\t Popup Controller',
			'openPopup()'
		);

		const popupName = popupNames[ index ].popupName;

		// If URL was used, open new browser window and exit this function
		switch ( true ) {
			case popupName.startsWith( 'https://projectdomain.org/subfolder' ):
				return window.open( popupName );

			case popupName.startsWith( 'https://projectdomain.org/' ):
				return window.open( popupName, '_self' );

			case popupName.startsWith( 'http' ):
				return window.open( popupName );
		}

		// ...Otherwise, use the popup template on the page
		$popup = $( `[data-popup-tpl="${ popupName }"]` );
		console.log(
			'/FLEX/\tgutenberg /\tblocks/\t Popup Controller',
			'$popup:',
			$popup
		);

		// Exit with warning if no popup template is found
		if ( ! $popup ) {
			console.warn( `Can't find popup template "${ popupName }"` );

			return;
		}

		// Add popup element to the end of the page
		$( 'body' ).append( $popup.html() );

		// Retrieve access to popup element
		$popupEl = $( '.component-popup' );

		initComponents();

		const $popupOverlay = $( '.popup-background-overlay', $popupEl );
		const $closeButton = $( '.close-button', $popupEl );

		bindClosePopup( $popupOverlay );
		bindClosePopup( $closeButton );
	}

	function bindClosePopup( $target ) {
		$target.on( 'click', ( e ) => {
			e.preventDefault();

			closePopup();
		} );
	}

	function initComponents() {
		console.log(
			'/FLEX/\tgutenberg /\tblocks/\t Popup Controller',
			'initComponents()'
		);

		const $componentElements = $( '[data-component-name]', $popupEl );

		$componentElements.each( function () {
			Loader.loadComponent( $( this ) );
		} );
	}

	function closePopup( $popupToClose = $popupEl ) {
		if ( typeof $popupToClose !== 'undefined' ) {
			$popupEl.remove();
		}
	}

	this.init = function ( $element ) {
		console.log(
			'/FLEX/\tgutenberg /\tblocks/\t Popup Controller',
			'init()'
		);

		// Retrieve JSON options from block properties
		popupNames = $element.data( 'componentOptions' );

		if ( ! Array.isArray( popupNames ) ) {
			popupNames = [ popupNames ];
		}

		$buttons = $( '.open-popup-button', $element );

		if ( ! $buttons ) {
			return;
		}

		bindEvents();

		return this;
	};

	return this.init( $el );
}

export default PopupController;
