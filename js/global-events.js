console.log('loaded', '/FLEX\t/js\t/global-events.js');

import FLEX from 	'./clientNamespace';
import $$ from 		'../components/component_cached-dom-elements/cached-dom-elements';
import Debug from 	'./debug';

// global-events
FLEX.GlobalEvents = {};

// Cross-component asynchronous event manager
// - Each pub/sub event expects a data payload defined in the component class,
//   as well as a listener callback function.
// - Allows components to listen for and send requests to each other
FLEX.events = {
	'carousel': {
		// Data store
		carousels: [],

		// Pubs
		'go': 'carousel.go',
		'next': 'carousel.next',
		'prev': 'carousel.prev',
		'render': 'carousel.render',
		'rendered': 'carousel.rendered',

		// Subs
		register: function (data) {
			// Save reference to store
			this.carousels.push({
				'id': data.id,
				'listener': data.listener,
				'$el': data.$el
			});

			var _this = this;

			$(FLEX).bind(FLEX.events.carousel.go, function (e, data) {
				$(_this.carousels).each(function (index, value) {
					if (value.id === data.id) {
						this.listener('go', data);
					}
				});
			});

			$(FLEX).bind(FLEX.events.carousel.next, function (e, data) {
				$(_this.carousels).each(function (index, value) {
					if (value.id === data.id) {
						this.listener('next', data);
					}
				});
			});

			$(FLEX).bind(FLEX.events.carousel.prev, function (e, data) {
				$(_this.carousels).each(function (index, value) {
					if (value.id === data.id) {
						this.listener('prev', data);
					}
				});
			});

			$(FLEX).bind(FLEX.events.carousel.render, function (e, data) {
				$(_this.carousels).each(function (index, value) {
					if (value.id === data.id) {
						if (typeof this.listener !== 'undefined') {
							this.listener('render', data);
						}
					}
				});
			});

			$(FLEX).bind(FLEX.events.carousel.rendered, function (e, id) {
				$(_this.carousels).each(function (index, value) {
					if (value.id === data.id) {
						this.listener('rendered');
					}
				});
			});

			return this.carousels[data.id];
		},

		// registerListener: function (id) {
		// 	this.carousels[id]
		// }
	},
	'cart': {
		// Data store
		'carts': [],

		// Pubs
		'add': 'cart.add',
		'added': 'cart.added',
		'clear': 'cart.clear',
		'cleared': 'cart.cleared',
		'open': 'cart.open',
		'close': 'cart.close',
		'toggle': 'cart.toggle',
		'toggled': 'cart.toggled',
		'update': 'cart.update',
		'updated': 'cart.updated',
		'changeqty': 'cart.changeqty',
		'qtychanged': 'cart.qtychanged',
		'rendered': 'cart.rendered',
		'error': 'cart.error',

		// Subs
		register: function (data) {
			console.log('/src/scripts/FLEX.js', 'FLEX.events.register');
			console.log('/— data.id: ', data.id);
			console.log('/— data.listener: ', data.listener);
			console.log('/— data.$el: ', data.$el.attr('class'));
			console.log('\n');

			// Ensure no duplicates
			var duplicates = false;

			for (var crt in this.carts) {
				if (data.loadOnce && this.carts[crt].loadOnce === data.loadOnce) {
					duplicates = true;
				}
			}

			if (!duplicates) {
				this.carts.push({
					'id': data.id,
					'listener': data.listener,
					'$el': data.$el,
					'loadOnce': data.loadOnce
				});
			}

			var _this = this;

			$(FLEX).unbind(FLEX.events.cart.add).bind(FLEX.events.cart.add, function (e, data) {
				$(_this.carts).each(function (index, value) {
					if (value.id === data.id) {
						data.value = value;
						this.listener('add', data);
					}
				});
			});

			$(FLEX).unbind(FLEX.events.cart.added).bind(FLEX.events.cart.added, function (e, data) {
				$(_this.carts).each(function (index, value) {
					if (value.id === data.id) {
						data.value = value;
						this.listener('added', data);
					}
				});
			});

			$(FLEX).unbind(FLEX.events.cart.clear).bind(FLEX.events.cart.clear, function (e, data) {
				$(_this.carts).each(function (index, value) {
					if (value.id === data.id) {
						data.value = value;
						this.listener('clear', data);
					}
				});
			});

			$(FLEX).unbind(FLEX.events.cart.cleared).bind(FLEX.events.cart.cleared, function (e, data) {
				$(_this.carts).each(function (index, value) {
					if (value.id === data.id) {
						data.value = value;
						this.listener('cleared', data);
					}
				});
			});

			$(FLEX).unbind(FLEX.events.cart.open).bind(FLEX.events.cart.open, function (e, data) {
				$(_this.carts).each(function (index, value) {
					if (value.id === data.id) {
						data.value = value;
						this.listener('open', data);
					}
				});
			});

			$(FLEX).unbind(FLEX.events.cart.close).bind(FLEX.events.cart.close, function (e, data) {
				$(_this.carts).each(function (index, value) {
					if (value.id === data.id) {
						data.value = value;
						this.listener('close', data);
					}
				});
			});

			$(FLEX).unbind(FLEX.events.cart.toggle).bind(FLEX.events.cart.toggle, function (e, data) {
				$(_this.carts).each(function (index, value) {
					if (value.id === data.id) {
						data.value = value;
						this.listener('toggle', data);
					}
				});
			});

			$(FLEX).unbind(FLEX.events.cart.toggled).bind(FLEX.events.cart.toggled, function (e, data) {
				$(_this.carts).each(function (index, value) {
					if (value.id === data.id) {
						data.value = value;
						this.listener('toggled', data);
					}
				});
			});

			$(FLEX).unbind(FLEX.events.cart.update).bind(FLEX.events.cart.remove, function (e, data) {
				$(_this.carts).each(function (index, value) {
					if (value.id === data.id) {
						data.value = value;
						this.listener('update', data);
					}
				});
			});

			$(FLEX).unbind(FLEX.events.cart.updated).bind(FLEX.events.cart.updated, function (e, data) {
				$(_this.carts).each(function (index, value) {
					if (value.id === data.id) {
						data.value = value;
						this.listener('updated', data);
					}
				});
			});

			$(FLEX).unbind(FLEX.events.cart.changeqty).bind(FLEX.events.cart.changeqty, function (e, data) {
				$(_this.carts).each(function (index, value) {
					if (value.id === data.id) {
						data.value = value;
						this.listener('changeqty', data);
						console.log(window.counter);
					}
				});
			});

			$(FLEX).unbind(FLEX.events.cart.qtychanged).bind(FLEX.events.cart.qtychanged, function (e, data) {
				$(_this.carts).each(function (index, value) {
					if (value.id === data.id) {
						data.value = value;
						this.listener('qtychanged', data);
					}
				});
			});

			$(FLEX).unbind(FLEX.events.cart.rendered).bind(FLEX.events.cart.rendered, function (e, data) {
				$(_this.carts).each(function (index, value) {
					if (value.id === data.id) {
						data.value = value;
						this.listener('rendered', data);
					}
				});
			});

			$(FLEX).unbind(FLEX.events.cart.error).bind(FLEX.events.cart.error, function (e, data) {
				$(_this.carts).each(function (index, value) {
					if (value.id === data.id) {
						data.value = value;
						this.listener('error', data);
					}
				});
			});

			return this.carts[data.id];
		}
	},
	'form': {
		// Data store
		'forms': [],

		// Events
		'submit': 'form.submit',
		'blur': 'form.fieldblur',
		'error': 'form.fielderror',

		// Bindings
		register: function (data) {
			console.log('/FLEX/\tjs/\tglobal-events.js', 'FLEX.events.formregister(), arguments: ', arguments);
			
			// Save references to store
			this.forms.push({
				'id': data.id,
				'listener': data.listener,
				'$el': data.el
			});

			var _this = this;

			$(FLEX).bind(FLEX.events.form.error, function (e, data) {
				console.log('/FLEX/\tjs/\tglobal-events.js', 'FLEX.events.formregister(), [FLEX.events.form.error TRIGGERED] arguments: ', arguments);

				$(_this.forms).each(function (index, value) {
					if (value.id === data.id) {
						this.listener('error', data);
					}
				})
			});

			$(FLEX).bind(FLEX.events.form.submit, function (e, data) {
				console.log('/FLEX/\tjs/\tglobal-events.js', 'FLEX.events.formregister(), [FLEX.events.form.error TRIGGERED] arguments: ', arguments);

				$(_this.forms).each(function (index, value) {
					if (value.id === data.id) {
						this.listener('submit', data);
					}
				})
			});

			return this.forms[data.id];
		}
	},
	'popup': {
		// Data store
		popups: [],

		// Pubs
		'open': 'popup.open',
		'opened': 'popup.opened',
		'close': 'popup.close',
		'closed': 'popup.closed',

		// Subs
		register: function (data) {
			this.popups.push({
				'id': data.id,
				'listener': data.listener,
				'$el': data.$el
			});

			var _this = this;

			$(FLEX).bind(FLEX.events.popup.open, function (e, data) {
				$(_this.popups).each(function (index, value) {
					if (value.id === data.id) {
						this.listener('open', data);
					}
				});
			});

			$(FLEX).bind(FLEX.events.popup.opened, function (e, id) {
				$(_this.popups).each(function (index, value) {
					if (value.id === data.id) {
						this.listener('opened');
					}
				});
			});

			$(FLEX).bind(FLEX.events.popup.close, function (e, id) {
				$(_this.popups).each(function (index, value) {
					if (value.id === data.id) {
						this.listener('close');
					}
				});
			});

			$(FLEX).bind(FLEX.events.popup.closed, function (e, id) {
				$(_this.popups).each(function (index, value) {
					if (value.id === data.id) {
						this.listener('closed');
					}
				});
			});

			return this.popups[data.id];
		}
		// },

		// remove: function (id) {
		// 	var index = array.indexOf(id);

		// 	if (index !== -1) {
		// 		return array.splice(index, 1);
		// 	} else {
		// 		return false;
		// 	}
		// }
	},
	'pdp': {
		// Data store
		'pdps': [],

		// Pubs
		'changeOption': 'pdp.changeOption',
		'optionChanged': 'pdp.optionChanged',
		'getColor': 'pdp.getColor',
		'setColor': 'pdp.setColor',
		'getSize': 'pdp.getSize',
		'setSize': 'pdp.setSize',
		'getSKU': 'pdp.getSKU',
		'setSKU': 'pdp.setSKU',

		// Subs
		register: function (data) {
			this.pdps.push({
				'id': data.id,
				'listener': data.listener,
				'$el': data.$el
			});

			var _this = this;

			$(FLEX).bind(FLEX.events.pdp.changeOption, function (e, data) {
				$(_this.pdps).each(function (index, value) {
					if (value.id === data.id) {
						this.listener('changeOption', data);
					}
				});
			});

			$(FLEX).bind(FLEX.events.pdp.optionChanged, function (e, data) {
				$(_this.pdps).each(function (index, value) {
					if (value.id === data.id) {
						data.value = value;
						this.listener('optionChanged', data);
					}
				});
			});

			$(FLEX).bind(FLEX.events.pdp.getColor, function (e, data) {
				$(_this.pdps).each(function (index, value) {
					if (value.id === data.id) {
						data.value = value;
						this.listener('getColor', data);
					}
				});
			});

			$(FLEX).bind(FLEX.events.pdp.setColor, function (e, data) {
				$(_this.pdps).each(function (index, value) {
					if (value.id === data.id) {
						data.value = value;
						this.listener('setColor', data);
					}
				});
			});

			$(FLEX).bind(FLEX.events.pdp.getSize, function (e, data) {
				$(_this.pdps).each(function (index, value) {
					if (value.id === data.id) {
						data.value = value;
						this.listener('getSize', data);
					}
				});
			});

			$(FLEX).bind(FLEX.events.pdp.setSize, function (e, data) {
				$(_this.pdps).each(function (index, value) {
					if (value.id === data.id) {
						data.value = value;
						this.listener('setSize', data);
					}
				});
			});

			$(FLEX).bind(FLEX.events.pdp.getSKU, function (e, data) {
				$(_this.pdps).each(function (index, value) {
					if (value.id === data.id) {
						data.value = value;
						this.listener('getSKU', data);
					}
				});
			});

			$(FLEX).bind(FLEX.events.pdp.setSKU, function (e, data) {
				$(_this.pdps).each(function (index, value) {
					if (value.id === data.id) {
						data.value = value;
						this.listener('setSKU', data);
					}
				});
			});

			return this.pdps[data.id];
		}
	}
};

FLEX.GlobalEvents.initGlobalEvents = function () {
	console.log('/FLEX/\tjs/\tglobal-events.js', 'initGlobalEvents()');

	var G = FLEX.Globals;
	var $window = $(window, FLEX.GlobalEvents.initGlobalEvents);
	var self = this;

	/*** Detect scrolling and scrolling direction ***/
	//USAGE
	// Bind to scroll
	// $(document.body).bind('FLEX.scroll', function (e, data) {
	// 		// if scroll is past or before x position
	// 	    if (scroll >= 300) {
	// 	    	your code here
	// 	    }
	//
	// 	    // detect scroll direction
	// 	    if (data.scrollDirection === 'up') {
	// 	    	your code here
	// 	    }
	// 	});

	G.currentScrollTop = $window.scrollTop();
	G.lastScrollTop	= $window.scrollTop();
	G.viewportHeight   = $window.outerHeight();
	G.viewportWidth	= $window.outerWidth();
	G.scrollInProgress = false;

    $window.on('scroll', function (e) {
		G.currentScrollTop = $window.scrollTop();

		// Limit how often this fires, so we don't have the JS double-firing.
		if (Math.abs(G.currentScrollTop - G.lastScrollTop) < 10) {
			return;
		}

        $(document.body).trigger('FLEX.scroll', {
			'e': e,
			'currentScrollTop': G.currentScrollTop,
			'viewportHeight':   G.viewportHeight,
			'scrollDirection':  (G.currentScrollTop > G.lastScrollTop ? 'down' : 'up')
		});

		G.lastScrollTop = G.currentScrollTop;
	});

	// Detect screen orientation
	function detectOrientation() {
		console.log('/FLEX/\tjs/\tglobal-events.js', 'detectOrientation()');

        // Default is portrait
		var orientation = 'orientation-portrait';
		var videoOrientation = 'video-portrait';
		var mapOrientation = 'map-portrait';
		var screenHeight = 'tall-screen';

		// Landscape
		if (G.viewportWidth > G.viewportHeight) {
			orientation = 'orientation-landscape';
		}

		// BG video aspect ratio detection
		if ((G.viewportWidth / G.viewportHeight) > 1.77) {
			videoOrientation = 'video-landscape';
		}

		// Remove previous detections
		$(document.body).removeClass('orientation-portrait orientation-landscape video-portrait video-landscape short-screen tall-screen');

		// Set new detection values
		$(document.body).addClass(orientation + ' ' + videoOrientation + ' ' + mapOrientation + ' ' + screenHeight);
	}

	// ...on load
	detectOrientation();

	// ...and screen resize
	$(document.body).on('FLEX.resize', detectOrientation);

	// Detect whether body content is taller than viewport
	function detectViewportHeightRatio() {
		console.log('/FLEX/\tjs/\tglobal-events.js', 'detectViewportHeightRatio()');

		// Tab body if content height is taller than viewport
		var totalComponentHeight = 0;

		$('.component').each(function (index, value) {
			// Exclude the hidden modal which doesn't take up any height
			if (!$(this).hasClass('component-contact-modal')) {
				totalComponentHeight += $(this).outerHeight(true);
			}
		});

		if (totalComponentHeight > G.viewportHeight) {
			// Set new detection
			$(document.body).addClass('body-content-height-is-taller-than-viewport');
		} else {
			// Remove previous detection
			$(document.body).removeClass('body-content-height-is-taller-than-viewport');
		}
	}

	// ...on load
	detectViewportHeightRatio();

	// ...and screen resize
	$(document.body).on('FLEX.resize', detectViewportHeightRatio);

	// Tag body once page has loaded for one-time page load functions
	$(window).on('load', function () {
		$(document.body).addClass('window-loaded');

		// 2 second delay
		setTimeout(function () {
			$(document.body).addClass('window-has-been-loaded-for-two-seconds');
		}, 2000);

		// 5 second delay
		setTimeout(function () {
			$(document.body).addClass('window-has-been-loaded-for-five-seconds');
		}, 5000);
	});

	// Tag body once page has loaded for one-time page load functions
	$(function () {
		$(document.body).addClass('dom-loaded');

		// After page has loaded and x seconds have elapsed. Set time as needed or 
		// create multiple time functions/classes
		setTimeout(function () {
			$(document.body).addClass('dom-has-been-loaded-for-five-seconds');
		}, 5000);
	});

	// Save the viewport height only as neccessary when it changes.
	$window.resize(function(e) {
		G.viewportHeight = $window.outerHeight();
		G.viewportWidth  = $window.outerWidth();

		$(document.body).trigger('FLEX.resize', {
			'e': e,
			'viewportHeight': G.viewportHeight,
			'viewportWidth': G.viewportWidth
		});
	});
};


// Trigger scroll event in case anything is in a partial-state waiting
// for scroll (e.g., initial nav opacity)
$(window).trigger('resize');

export default FLEX.GlobalEvents;
