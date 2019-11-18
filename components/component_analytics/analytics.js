// Global google analytics event tracking
function Analytics($el) {
	console.log('/analytics.js', 'Analytics()');

	function bindEvents() {
		console.log('/analytics.js', 'bindEvents()');

		// $(document.body).delegate('a', 'click', trackLinkClick);
		// $(document.body).delegate('div', 'mouseenter', trackHoverAll);
	}

	function trackHoverAll(e) {
		// Don't prevent default behavior
		//e.preventDefalt();

		console.log('/analytics.js', 'trackHoverAll(), text: ', $(this).text());
	}

	function trackLinkClick(e) {
		console.log('/analytics.js', 'trackLinkClick(), arguments: ', arguments);
		// Don't prevent default behavior
		//e.preventDefalt();

		console.log('/analytics.js', 'trackLinkClick(), e: ', e);
	}

	this.init = function INIT($el) {
		console.log('/analytics.js', 'init()');

		bindEvents();

		return this;
	}

	return this.init($el);
}

export default Analytics;
