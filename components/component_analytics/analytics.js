// Global google analytics event tracking
function Analytics($el) {
	console.log('/analytics.js', 'Analytics()');

	function bindEvents() {
		console.log('/flexlayout/\tcomponents/\tcomponent-analytics/\tanalytics.js', 'bindEvents()');

		// $(document.body).on('click', '*', { 'type': 'click' }, trackEvent);
		// $(document.body).on('mouseenter', '*', { 'type': 'mouseenter' }, trackEvent);
		// $(document.body).on('hover', '*', { 'type': 'hover' }, trackEvent);

		// Check for any class = track-analytics
		// Try to find event info in data attributes 
		$('.track-analytics').filter(function () {
			var eventID = $(this).attr('data-event-id');
			var eventSource = $(this).attr('data-event-source');
			var eventMedium = $(this).attr('data-event-medium');


		});

		// Try to find event info in classes
		console.log('/— $(".track-event"): ', '', $('.track-event'));

		$('.track-event').filter(function () {
			var classes = this.className.split(/\s/);
			console.log('/— classes: ', classes);
			
			// Set up defaults
			var event = {
				'category': '',
				'action': '',
				'label': '',
				'value': 0
			};

			// Track whether a piece of data was found
			var match = false;


			for (var i = 0, len = classes.length; i < len; i++) {
				console.log('/— return: ', true);

				switch (true) {
					case classes[i].indexOf('event-category') > -1 :
						event['category'] = classes[i].substr('event-category'.length + 1);
						match = true;
						break;

					case classes[i].indexOf('event-action') > -1 :
						event['action'] = classes[i].substr('event-action'.length + 1);
						match = true;
						break;

					case classes[i].indexOf('event-label') > -1 :
						event['label'] = classes[i].substr('event-label'.length + 1);
						match = true;
						break;

					case classes[i].indexOf('event-value') > -1 :
						event['value'] = classes[i].substr('event-value'.length + 1);
						match = true;
						break;

					default: 
				}

				if (match) {
					ga('send', 'event', event.category, event.action, event.label, event.value);
				}
				
				console.log('/— return: ', false);
			}
		});
	

	}

	function recordEvent(event) {
		console.log('/flexlayout/\tcomponents/\tcomponent-analytics/\tanalytics.js', 'recordEvent()');

		// Sent event to Gogle Analytics (GA)
	}

	function trackEvent(e) {
		// console.log('/flexlayout/\tcomponents/\tcomponent-analytics/\tanalytics.js', 'trackEvent()');
		// console.log('/— e: ', 'object:', e);

		// Set up defaults so switch below doesn't fail
		e.data = e.data || {};

		// NOTE: Don't prevent default behavior
		// e.preventDefalt();

		// Process different event types
		switch (true) {
			case e.data.type === 'click':
				console.log('/— type: ', 'click', e.target)
				break;

			case e.data.type === 'hover':
				console.log('/— type: ', 'hover', e.target)
				break;

			case e.data.type === 'mouseenter':
				console.log('/— type: ', 'mouseenter', e.target)
				break;

			default: 
				console.log('/— type: ', 'no event type passed');
		}
	}

	this.init = function INIT($el) {
		console.log('/flexlayout/\tcomponents/\tcomponent-analytics/\tanalytics.js', 'init()');

		bindEvents();

		return this;
	}

	return this.init($el);
}

console.log('loaded', '/flexlayout/components/component_analytics/analytics.js');

export default Analytics;
