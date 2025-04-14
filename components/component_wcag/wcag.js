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

	function addTabIndexesToInteractiveElements() {
		console.log('Adding tabindex to interactive elements');

		if (!FLEX || !FLEX.events || !FLEX.events.wcag || !FLEX.events.wcag.interactiveElements) {
			console.warn('No registered WCAG interactive elements');
			return;
		}
	
		// 1. Find elements that have click handlers
		$('*').each(function() {
			var $el = $(this);
	
			// Skip elements already tabbable by default
			if (
				$el.is('a[href], button, input, select, textarea, summary') ||
				$el.attr('tabindex') !== undefined ||
				$el.is('[disabled]')
			) {
				return;
			}
	
			// Check if element has a jQuery click event
			var events = $._data(this, 'events');
			if (events && events.click) {
				console.log('el has click event attached, $el: ', $el);
				$el.attr('tabindex', '0');
			}
	
			// 2. Also add tabindex to elements with "role" attributes that imply interactivity
			var role = $el.attr('role');
			if (role && ['button', 'link', 'checkbox', 'tab', 'switch', 'menuitem'].includes(role)) {
				$el.attr('tabindex', '0');
			}
		});

		// 2. Check for custom interactive components with data-wcag-interactive
		$('.component[data-wcag-interactive]').each(function () {
			var $component = $(this);
			var selector = $component.data('wcag-interactive');

			if (!selector) return;

			// Find the child elements matching the declared selector
			$component.find(selector)
				.not('[tabindex]')
				.each(function () {
					$(this).attr('tabindex', '0');
				});
		});

		// 3. Check for any interactive components registered by individual components
		var seenElements = new Set();

		console.log('FLEX.events.wcag.interactiveElements: ', FLEX.events.wcag.interactiveElements);

		FLEX.events.wcag.interactiveElements.forEach(function(entry) {
			console.log('looping inside FLEX.events.wcag.interactiveElements, entry: ', entry);

			if (!entry) {
				return; // skip null/undefined entries
			}

			if (typeof entry.elements !== 'undefined') {
				// Newer method: DOM elements passed directly
				var elements = Array.isArray(entry.elements) ? entry.elements : [entry.elements];
	
				console.log('passed elements: ', elements);

				elements.forEach(function($el) {
					console.log('looping inside elements, $el: ', $el);

					var $el = $(el);

					if (seenElements.has(el)) {
						return; // Already processed
					}
				
					// 1. Add tabindex if missing
					if (!$el.is('[tabindex]')) {
						$el.attr('tabindex', '0');
					}
				
					// 2. Add role and aria-label if it's a <div> or <span>
					if ($el.is('div, span')) {
						if (!$el.attr('role')) {
							$el.attr('role', entry.role || 'button');
						}
						if (!$el.attr('aria-label')) {
							const label = entry.label || $el.text().trim() || 'Interactive element';
							$el.attr('aria-label', label);
						}
					}
				
					// 3. Add keyboard support (enter / space triggers click)
					$el.on('keydown', function(e) {
						if (e.key === 'Enter' || e.key === ' ') {
							console.log('pressed enter or space on $el: ', $el);
							e.preventDefault();
							$el.trigger('click');
						}
					});
				
					seenElements.add(el);
				});
			} else if (typeof entry.selectors !== 'undefined') {
				// Older method: selectors passed (string, single or multiple)
	
				entry.$el
					.find(entry.selectors) // ← handles comma-separated selectors automatically
					.not('[tabindex]')
					.each(function() {
						if (!seenElements.has(this)) {
							$(this).attr('tabindex', '0');
							seenElements.add(this);
						}
					});
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

		function handleFirstTab(e) {
			if (e.key === 'Tab') {
				$('body').addClass('user-is-tabbing');
				$(window).off('keydown', handleFirstTab);
				$(window).on('mousedown', handleMouseDownOnce);
			}
		}
	
		function handleMouseDownOnce() {
			$('body').removeClass('user-is-tabbing');
			$(window).off('mousedown', handleMouseDownOnce);
			$(window).on('keydown', handleFirstTab);
		}
	
		$(window).on('keydown', handleFirstTab);
	}

	function render() {
		console.log('/FLEX/\tcomponents/\tcomponent-wcag/\wcag.js', 'render()');

		addMainContentRelativeLink();
		addSkipToMainLink();
		addTabIndexes();

		$(document).on('components:loaded', function () {
			addTabIndexesToInteractiveElements();
		});
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
