/**
 * Tile component
 * Keeps tiles in a group at the same vertical height, except on phones
 */
import FLEXLS from 'flexls';
import $$ from './cached-dom-elements';

function Tile ($el) {
// 	// _private vars here
// 	var _$closestTileGroup = $el.closest('.tile-group');
//
// 	function bindEvents() {
// 		// Run on component load,
// 		setTimeout(function () {
// 			setHeights();
// 		}, 500);
//
// 		// and on window resize
// 		$(document.body).on('FLEXLS.resize', function (e, data) {
// 			// Allows setHeights to run again
// 			_$closestTileGroup.find('.component-tile').removeClass('height-registered');
//
// 			// Allows setHeights to calculate heights correctly
// 			_$closestTileGroup.attr('data-group-h1-height', '')
// 			_$closestTileGroup.attr('data-group-h2-height', '')
// 			_$closestTileGroup.attr('data-group-p-height', '')
// 			_$closestTileGroup.attr('data-group-location-height', '')
// 			_$closestTileGroup.attr('data-group-thumbnail-height', '')
//
// 			// $('.component-tile h1 span, .component-tile p span').css('height', '');
// 			_$closestTileGroup
// 				.find('.component-tile')
// 				.find('h1 span, h2 span, p span, .center-name-location-container, .thumbnail')
// 				.css('height', '');
//
// 			setHeights();
// 		});
// 	}
//
// 	/**
// 	 * Unify heights of H1 and span elements across .component-tiles within their parent .tile-group
// 	 */
// 	function setHeights() {
// 		// Only set heights on desktop
// 		if (!$('body .breakpoint.tablet-portrait').is(':visible')) {
// 			// Reset to default on mobile
// 			_$closestTileGroup
// 				.find('.component-tile')
// 				.find('h1 span, h2 span, p span, .center-name-location-container, .thumbnail')
// 				.css('height', '');
// 			return;
// 		}
//
// 		// Protects against when there is no .tile-group class on the row
// 		if (_$closestTileGroup.length === 0) return;
//
// 		$el.closest('.tile-group').find('.component-tile').each(function (index, value) {
// 			var $el = $(this);
//
// 			// Exit if this element has already registered its height
// 			if ($el.hasClass('height-registered')) return;
//
// 			// Normalize <h1> elements
// 			var $elH1OuterHeight = parseInt($el.find('h1 span').outerHeight(), 10);
//
// 			// If the existing value is taller than $el.find('h1'),
// 			if (parseInt(_$closestTileGroup.attr('data-group-h1-height'), 10) > $elH1OuterHeight) {
// 				// resize this $el
// 				$el.find('h1 span').css('height', _$closestTileGroup.attr('data-group-h1-height'));
// 			} else {
// 				// Otherwise, increase the '.tile-group' value,
// 				_$closestTileGroup.attr('data-group-h1-height', $elH1OuterHeight);
//
// 				// and resize the rest of the registered tiles in the group
// 				_$closestTileGroup
// 					.find('.component-tile.height-registered h1 span')
// 					.css('height', $elH1OuterHeight);
// 			}
//
// 			// Normalize <h2> elements
// 			var $elH2OuterHeight = parseInt($el.find('h2 span').outerHeight(), 10);
//
// 			// If the existing value is taller than $el.find('h1'),
// 			if (parseInt(_$closestTileGroup.attr('data-group-h2-height'), 10) > $elH2OuterHeight) {
// 				// resize this $el
// 				$el.find('h2 span').css('height', _$closestTileGroup.attr('data-group-h2-height'));
// 			} else {
// 				// Otherwise, increase the '.tile-group' value,
// 				_$closestTileGroup.attr('data-group-h2-height', $elH2OuterHeight);
//
// 				// and resize the rest of the registered tiles in the group
// 				_$closestTileGroup
// 					.find('.component-tile.height-registered h2 span')
// 					.css('height', $elH2OuterHeight);
// 			}
//
// 			// Normalize <p> elements
// 			var $elPOuterHeight = parseInt($el.find('p.copy span').outerHeight(), 10);
//
// 			// If the existing value is taller than $el.find('p'),
// 			if (parseInt(_$closestTileGroup.attr('data-group-p-height'), 10) > $elPOuterHeight) {
// 				// resize this $el
// 				$el.find('p.copy span').css('height', _$closestTileGroup.attr('data-group-p-height'));
// 			} else {
// 				// Otherwise, increase the '.tile-group' value,
// 				_$closestTileGroup.attr('data-group-p-height', $elPOuterHeight);
//
// 				// and resize the rest of the registered tiles in the group
// 				_$closestTileGroup
// 					.find('.component-tile.height-registered p.copy span')
// 					.css('height', $elPOuterHeight);
// 			}
//
// 			// Normalize <.center-name-location-container> elements
// 			var $elLocationOuterHeight = parseInt($el.find('.center-name-location-container').outerHeight(), 10);
//
// 			// If the existing value is taller than $el.find('p'),
// 			if (parseInt(_$closestTileGroup.attr('data-group-location-height'), 10) > $elLocationOuterHeight) {
// 				// resize this $el
// 				$el.find('.center-name-location-container').css('height', _$closestTileGroup.attr('data-group-location-height'));
// 			} else {
// 				// Otherwise, increase the '.tile-group' value,
// 				_$closestTileGroup.attr('data-group-location-height', $elLocationOuterHeight);
//
// 				// and resize the rest of the registered tiles in the group
// 				_$closestTileGroup
// 					.find('.component-tile.height-registered .center-name-location-container')
// 					.css('height', $elLocationOuterHeight);
// 			}
//
// 			// Normalize <img> elements (match the smallest one)
// 			var $elThumbnailOuterHeight = parseInt($el.find('.thumbnail').outerHeight(), 10);
//
// 			// If the existing value is taller than $el.find('h1'),
// 			if (parseInt(_$closestTileGroup.attr('data-group-thumbnail-height'), 10) < $elThumbnailOuterHeight) {
// 				// resize this $el
// 				$el.find('.thumbnail').css('height', _$closestTileGroup.attr('data-group-thumbnail-height'));
// 			} else {
// 				// Otherwise, increase the '.tile-group' value,
// 				_$closestTileGroup.attr('data-group-thumbnail-height', $elThumbnailOuterHeight);
//
// 				// and resize the rest of the registered tiles in the group
// 				_$closestTileGroup
// 					.find('.component-tile.height-registered .thumbnail')
// 					.css('height', $elThumbnailOuterHeight);
// 			}
//
// 			// Tag this element so this element may receive all future height increases if necessary
// 			$el.addClass('height-registered');
// 		});
// 	}
//
// 	this.init = function($el) {
// 		bindEvents();
//
// 		return this;
// 	}
//
// 	return this.init($el);
}

export default Tile;
