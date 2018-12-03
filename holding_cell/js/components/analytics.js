/**
 * Analytics component
 */
function Analytics ($el, params={}) {
	const defaults = {};

	// Merge any options set on the DOM element with 
	// the component defaults set above
	var options = $.extend(true, {}, defaults, params);

	function bindEvents() {
		// console.log('Analytics component loaded');
	}

	this.init = function ($el) {
		bindEvents();

		return this;
	}

	return this.init($el);
}

export default Analytics;
