/**
 * Turntables component
 * Shows animated radial graphics in background
 */
function Turntables($el, params={}) {
	// var options = $.extend(true, {}, params);
	// var multiples = (typeof options.multiples !== 'undefined') ? options.multiples : 10;
	var multiples = (typeof params.multiples !== 'undefined') ? params.multiples : 10;

	function render() {
		// Only access _private vars through methods 
		var _$cloneTemp;
		var _clones = [];
		var _quantity = parseInt(multiples, 10);

		// Increase number on mobile since it's otherwise 
		// rare to have one rendered in between other opaque sections
		if ($('.breakpoint.tablet-landscape').is(':visible')) {
			_quantity = 5;
		}

		function _getNewClone() {
			// Create new instance from master
			var $clone = $el.clone();

			// Save clone reference so we can apply 
			// CSS positioning later
			_clones.push($clone);

			return $clone;
		}

		// https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
		function getRandomNumber(min, max) {
			return Math.random() * (max - min) + min;
		}

		// Multiply randomly
		function multiplyTurntables() {
			for (var x = 0; x < _quantity; x++) {
				_$cloneTemp = _getNewClone();
				_$cloneTemp.insertAfter($el);
			}
		}

		// Position randomly
		function positionTurntables() {
			// Make sure there are an even-ish distribution of turntable sizes
			// var scaleStart = .2;
			var scaleStart = 30;
			// var scaleEnd = 1.4;
			var scaleEnd = 60;
			var increaseBy = (scaleEnd - scaleStart) / _quantity;

			function scaleIncrease() {
				scaleStart = scaleStart + increaseBy; 

				return scaleStart;
			} 

			$(_clones).each(function (index, value) {
				$(this)
					.addClass('clone')
					.css({
						'left': getRandomNumber(-20, 90) + 'vw',
						'top': getRandomNumber(-20, 70) + 'vh',
						'height': getRandomNumber(30, scaleIncrease()) + '%',
						'width': getRandomNumber(30, scaleIncrease()) + '%',
						'animation': 'TURNTABLES ' + scaleStart/5 + 's ' + (parseInt(scaleStart, 10) + 100) + 'ms infinite'
					});
			});
		}

		// Get this party started
		multiplyTurntables();
		positionTurntables();
	}

	this.init = function($el) {
		render();

		return this;
	}

	return this.init($el);
}

export default Turntables;
