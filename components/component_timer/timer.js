import $ from 'jquery';
import FLEX from '../../js/client-namespace';
import $$ from '../component_cached-dom-elements/cached-dom-elements';


if (!FLEX.isProd) { console.log('loaded', '/FLEX\t/js\t/components\t/component_timer\t/timer.js'); }
/**
 * Shows countdown timer
 */
function Timer($el, options) {
	// Cache body
	var $$body = $$('body');

	// Get target from options
	var _options = options;
	var _currentDay;
	var _currentHour;
	var _currentMinute;
	var _currentSecond;

	var _dayFirstDigit;
	var _daySecondDigit;
	var _hourFirstDigit;
	var _hourSecondDigit;
	var _minuteFirstDigit;
	var _minuteSecondDigit;
	var _secondFirstDigit;
	var _secondSecondDigit;

	var _remainingDays;
	var _remainingHours;
	var _remainingMinutes;
	var _remainingSeconds;

	var _remainingDayFirstDigit;
	var _remainingDaySecondDigit;
	var _remainingHourFirstDigit;
	var _remainingHourSecondDigit;
	var _remainingMinuteFirstDigit;
	var _remainingMinuteSecondDigit;
	var _remainingSecondFirstDigit;
	var _remainingSecondSecondDigit;

	// Handle options if any (hour, minute, and second should all be passed)
	if (typeof _options !== 'undefined' && typeof _options.hour !== 'undefined') {
		_currentDay = _options.day;
		_currentHour = _options.hour;
		_currentMinute = _options.minute;
		_currentSecond = _options.second;

	// Search data attributes on the body
	} else if (typeof $$body.attr('data-currentday') !== 'undefined') {
		_currentDay = $$body.attr('data-currentday');
		_currentHour = $$body.attr('data-currenthour');
		_currentMinute = $$body.attr('data-currentminute');
		_currentSecond = $$body.attr('data-currentsecond');
	} else {
		// Use JavaScript to get minutes and seconds due to Shopify page caching giving incorrect time
		var myDate = new Date();

		_currentDay = myDate.getDay();
		_currentHour = myDate.getHours();
		_currentMinute = myDate.getMinutes();
		_currentSecond = myDate.getSeconds();
	}

	// Debugger override
	// _currentHour = '01';

	// Override them if URL param is passed (testing only) TODO: Remove this before 
	// pushing to production

	if (typeof(FLEX.queryVariables.get('timertestday')) !== 'undefined') {
		_currentDay = FLEX.queryVariables.get('timertestday')
	}
	
	if (typeof(FLEX.queryVariables.get('timertesthour')) !== 'undefined') {
		_currentHour = FLEX.queryVariables.get('timertesthour')
	}

	if (typeof(FLEX.queryVariables.get('timertestminute')) !== 'undefined') {
		_currentMinute = FLEX.queryVariables.get('timertestminute')
	}

	if (typeof(FLEX.queryVariables.get('timertestsecond')) !== 'undefined') {
		_currentSecond = FLEX.queryVariables.get('timertestsecond')
	}
	
	// Calculate remaining days
	// - Event is on the 12th, so check 12 - todays day
	_remainingDaySecondDigit = 12 - parseInt(_currentDay, 10);

	if (_remainingDaySecondDigit < 1) {
		_remainingDaySecondDigit = 0;
	}

	console.log('_currentDay: ', _currentDay);
	console.log('_remainingDaySecondDigit: ', _remainingDaySecondDigit);
	console.log('_currentHour: ', _currentHour);
	console.log('_currentMinute: ', _currentMinute);
	console.log('_currentSecond: ', _currentSecond);

	// function bindEvents() {
	// 	console.log('/src/scripts/FLEX.js', 'Timer.bindEvents(), _options: ', _options);
	// }

	function identifyActiveDigits() {
		_remainingHours = 24 - parseInt(_currentHour, 10);
		_remainingMinutes = 60 - parseInt(_currentMinute, 10);
		_remainingSeconds = 60 - parseInt(_currentSecond, 10);

		if (_remainingHours < 10) {
			_remainingHours = '0' + _remainingHours;
		}

		if (_remainingMinutes < 10) {
			_remainingMinutes = '0' + _remainingMinutes;
		}

		if (_remainingSeconds < 10) {
			_remainingSeconds = '0' + _remainingSeconds;
		}

		_remainingHourFirstDigit = ('' + _remainingHours).charAt(0);
		_remainingHourSecondDigit = ('' + _remainingHours).charAt(1);
		_remainingMinuteFirstDigit = ('' + _remainingMinutes).charAt(0);
		_remainingMinuteSecondDigit = ('' + _remainingMinutes).charAt(1);
		_remainingSecondFirstDigit = ('' + _remainingSeconds).charAt(0);
		_remainingSecondSecondDigit = ('' + _remainingSeconds).charAt(1);

		if (_remainingHourFirstDigit === '') {
			_remainingHourFirstDigit = '0';
		} else {
			_remainingHourFirstDigit = _remainingHourFirstDigit;
		}

		if (_remainingHourSecondDigit === '') {
			_remainingHourSecondDigit = '0';
		} else {
			_remainingHourSecondDigit = _remainingHourSecondDigit;
		}

		if (_remainingMinuteFirstDigit === '') {
			_remainingMinuteFirstDigit = '0';
		} else {
			_remainingMinuteFirstDigit = _remainingMinuteFirstDigit;
		}

		if (_remainingMinuteSecondDigit === '') {
			_remainingMinuteSecondDigit = '0';
		} else {
			_remainingMinuteSecondDigit = _remainingMinuteSecondDigit;
		}

		if (_remainingSecondFirstDigit === '') {
			_remainingSecondFirstDigit = '0';
		} else {
			_remainingSecondFirstDigit = _remainingSecondFirstDigit;
		}

		if (_remainingSecondSecondDigit === '') {
			_remainingSecondSecondDigit = '0';
		} else {
			_remainingSecondSecondDigit = _remainingSecondSecondDigit;
		}


		$('.component-timer').find('.timer-hours .digit').removeClass('active');
		$('.component-timer').find('.timer-minutes .digit').removeClass('active');
		$('.component-timer').find('.timer-seconds .digit').removeClass('active');

		$('.component-timer').find('.timer-hours .first-digit .digit-' + _remainingHourFirstDigit).addClass('active');
		$('.component-timer').find('.timer-hours .second-digit .digit-' + _remainingHourSecondDigit).addClass('active');
		$('.component-timer').find('.timer-minutes .first-digit .digit-' + _remainingMinuteFirstDigit).addClass('active');
		$('.component-timer').find('.timer-minutes .second-digit .digit-' + _remainingMinuteSecondDigit).addClass('active');
		$('.component-timer').find('.timer-seconds .first-digit .digit-' + _remainingSecondFirstDigit).addClass('active');
		$('.component-timer').find('.timer-seconds .second-digit .digit-' + _remainingSecondSecondDigit).addClass('active');
	}

	function insertTimerMarkup() {
		// Build HTML
		var markup = [];

		markup.push('<section class="timer-container-wrapper">');
			markup.push('<div class="timer-container">');
				// markup.push('<p><strong>Flash sale</strong>: 5% off, limited time only!</p>');
				// markup.push('<p>Buy One, Get One Free!</p>');
				// markup.push('<p class="code-heading">5% Discount! (Limited Time)<span class="hyphen"> — </span><span class="code-container">Use code: <span class="code">NOV-FLASH-SALE</span></span></p>');
				markup.push('<div class="digit-container">');
					markup.push('<ul><li class="timer-digits-container timer-days"><span class="first-digit">');
						markup.push('<span class="digit digit-0 active">0</span>');
						markup.push('<span class="digit digit-1 ">1</span>');
						markup.push('<span class="digit digit-2 ">2</span>');
						markup.push('<span class="digit digit-3 ">3</span>');
						markup.push('<span class="digit digit-4 ">4</span>');
						markup.push('<span class="digit digit-5 ">5</span>');
						markup.push('<span class="digit digit-6 ">6</span>');
						markup.push('<span class="digit digit-7 ">7</span>');
						markup.push('<span class="digit digit-8 ">8</span>');
						markup.push('<span class="digit digit-9 ">9</span>');
					markup.push('</span>');
					markup.push('<span class="second-digit">');
						markup.push('<span class="digit digit-0 active">0</span>');
						markup.push('<span class="digit digit-1 ">1</span>');
						markup.push('<span class="digit digit-2 ">2</span>');
						markup.push('<span class="digit digit-3 ">3</span>');
						markup.push('<span class="digit digit-4 ">4</span>');
						markup.push('<span class="digit digit-5 ">5</span>');
						markup.push('<span class="digit digit-6 ">6</span>');
						markup.push('<span class="digit digit-7 ">7</span>');
						markup.push('<span class="digit digit-8 ">8</span>');
						markup.push('<span class="digit digit-9 ">9</span>');
					markup.push('</span><span class="timer-digit-label position-bottom">DAYS</span></li></ul>');

					markup.push('<ul><li class="timer-digits-container timer-hours"><span class="first-digit">');
						markup.push('<span class="digit digit-0 active">0</span>');
						markup.push('<span class="digit digit-1 ">1</span>');
						markup.push('<span class="digit digit-2 ">2</span>');
						markup.push('<span class="digit digit-3 ">3</span>');
						markup.push('<span class="digit digit-4 ">4</span>');
						markup.push('<span class="digit digit-5 ">5</span>');
						markup.push('<span class="digit digit-6 ">6</span>');
						markup.push('<span class="digit digit-7 ">7</span>');
						markup.push('<span class="digit digit-8 ">8</span>');
						markup.push('<span class="digit digit-9 ">9</span>');
					markup.push('</span>');
					markup.push('<span class="second-digit">');
						markup.push('<span class="digit digit-0 active">0</span>');
						markup.push('<span class="digit digit-1 ">1</span>');
						markup.push('<span class="digit digit-2 ">2</span>');
						markup.push('<span class="digit digit-3 ">3</span>');
						markup.push('<span class="digit digit-4 ">4</span>');
						markup.push('<span class="digit digit-5 ">5</span>');
						markup.push('<span class="digit digit-6 ">6</span>');
						markup.push('<span class="digit digit-7 ">7</span>');
						markup.push('<span class="digit digit-8 ">8</span>');
						markup.push('<span class="digit digit-9 ">9</span>');
					markup.push('</span><span class="timer-digit-label position-bottom">HRS</span></li></ul>');

					markup.push('<ul><li class="timer-digits-container timer-minutes"><span class="first-digit">');
						markup.push('<span class="digit digit-0">0</span>');
						markup.push('<span class="digit digit-1">1</span>');
						markup.push('<span class="digit digit-2">2</span>');
						markup.push('<span class="digit digit-3">3</span>');
						markup.push('<span class="digit digit-4">4</span>');
						markup.push('<span class="digit digit-5 active">5</span>');
					markup.push('</span><span class="second-digit">');
						markup.push('<span class="digit digit-0">0</span>');
						markup.push('<span class="digit digit-1">1</span>');
						markup.push('<span class="digit digit-2">2</span>');
						markup.push('<span class="digit digit-3">3</span>');
						markup.push('<span class="digit digit-4">4</span>');
						markup.push('<span class="digit digit-5">5</span>');
						markup.push('<span class="digit digit-6">6</span>');
						markup.push('<span class="digit digit-7">7</span>');
						markup.push('<span class="digit digit-8">8</span>');
						markup.push('<span class="digit digit-9 active">9</span>');
					markup.push('</span><span class="timer-digit-label position-bottom">MIN</span></li></ul>');

					markup.push('<ul><li class="timer-digits-container timer-seconds"><span class="first-digit">');
						markup.push('<span class="digit digit-0">0</span>');
						markup.push('<span class="digit digit-1">1</span>');
						markup.push('<span class="digit digit-2">2</span>');
						markup.push('<span class="digit digit-3">3</span>');
						markup.push('<span class="digit digit-4">4</span>');
						markup.push('<span class="digit digit-5 active">5</span>');
					markup.push('</span><span class="second-digit">');
						markup.push('<span class="digit digit-0">0</span>');
						markup.push('<span class="digit digit-1">1</span>');
						markup.push('<span class="digit digit-2">2</span>');
						markup.push('<span class="digit digit-3">3</span>');
						markup.push('<span class="digit digit-4">4</span>');
						markup.push('<span class="digit digit-5">5</span>');
						markup.push('<span class="digit digit-6">6</span>');
						markup.push('<span class="digit digit-7">7</span>');
						markup.push('<span class="digit digit-8">8</span>');
						markup.push('<span class="digit digit-9 active">9</span>');
					markup.push('</span><span class="timer-digit-label position-bottom">SEC</span></li></ul>');
					// markup.push('<a class="btn btn--secondary" href="/collections/all">Shop now</a>');
				markup.push('</div>');
			markup.push('</div>');
		markup.push('</section>');

		var $markup = markup.join('');

		// Insert before $el
		// $('body').prepend($markup);
		// $($markup).insertAfter('#shopify-section-header');
		$el.append($markup);
	}

	function render() {
		var showTimer = false;

		// Insert the timer markup
		insertTimerMarkup();

		// Apply active timer digit values
		identifyActiveDigits();

		// Show timer if the time is right
		toggleTimerVisibility();

		// Start countdown animation if timer is visible
		// startTimerAnimation(toggleTimerVisibility);
		startTimerAnimation();
	}

	function startTimerAnimation() {
		if (!$('body').hasClass('showTimer')) {
			return;
		}

		var _animationCounter;

		// setInterval(function () {
		function animateTimer(timestamp) {
			if (_animationCounter === undefined) {
				_animationCounter = timestamp;
			}

			var elapsed = timestamp - _animationCounter;

			// Only trigger the animation every 1s (i.e., 1000ms)
			if (elapsed > 1000) {
				// Reset starting point
				_animationCounter += 1000;

				// If more than one second left
				if (_remainingSecondSecondDigit > 0 || _remainingSecondFirstDigit > 0 || _remainingMinuteSecondDigit > 0 || _remainingMinuteFirstDigit > 0 || _remainingHourSecondDigit > 0 || _remainingHourFirstDigit > 0 || _remainingDaySecondDigit > 0 || _remainingDayFirstDigit > 0) {
					// Reduce seconds
					_remainingSecondSecondDigit--;

					// Enforce bounds
					if (_remainingSecondSecondDigit < 0) {
						// Reset seconds
						_remainingSecondSecondDigit = 9;

						// If more than ten seconds left
						if (_remainingSecondFirstDigit > 0 || _remainingMinuteSecondDigit > 0 || _remainingMinuteFirstDigit > 0 || _remainingHourSecondDigit > 0 || _remainingHourFirstDigit > 0 || _remainingDaySecondDigit > 0 || _remainingDayFirstDigit > 0) {
							// Reduce ten seconds
							_remainingSecondFirstDigit--;

							// Enforce bounds
							if (_remainingSecondFirstDigit < 0) {
								// Reset tens seconds
								_remainingSecondFirstDigit = 5;

								// If more than one minute left
								if (_remainingMinuteSecondDigit > 0 || _remainingMinuteFirstDigit > 0 || _remainingHourSecondDigit > 0 || _remainingHourFirstDigit > 0 || _remainingDaySecondDigit > 0 || _remainingDayFirstDigit > 0) {
									// Reduce minutes
									_remainingMinuteSecondDigit--;

									// Enforce bounds
									if (_remainingMinuteSecondDigit < 0) {
										// Reset minutes
										_remainingMinuteSecondDigit = 9;

										// If more than ten minutes left
										if (_remainingMinuteSecondDigit > 0 || _remainingHourSecondDigit > 0 || _remainingHourFirstDigit > 0 || _remainingDaySecondDigit > 0 || _remainingDayFirstDigit > 0) {
											// Reduce tens minutes
											_remainingMinuteFirstDigit--;

											// Enforce bounds
											if (_remainingMinuteFirstDigit < 0) {
												// Reset tens minutes
												_remainingMinuteFirstDigit = 5;

												// If more than one hour left
												if (_remainingHourSecondDigit > 0 || _remainingHourFirstDigit > 0 || _remainingDaySecondDigit > 0 || _remainingDayFirstDigit > 0) {
													// Reduce hours
													_remainingHourSecondDigit--;

													// Enforce bounds
													if (_remainingHourSecondDigit < 0) {
														// Reset hours
														_remainingHourSecondDigit = 4;

														// If more than ten hours left
														if (_remainingHourSecondDigit > 0 || _remainingDaySecondDigit > 0 || _remainingDayFirstDigit > 0) {
															// Reduce tens hours
															_remainingHourFirstDigit--;

															// Enforce bounds
															if (_remainingHourFirstDigit < 0) {
																// Reset tens hours
																_remainingHourFirstDigit = 2;

																// If more than one day left
																if (_remainingDaySecondDigit > 0 || _remainingDayFirstDigit > 0) {
																	// Reduce days
																	_remainingDaySecondDigit--;

																	// Enforce bounds
																	if (_remainingDaySecondDigit < 0) {
																		// Reset days
																		_remainingDaySecondDigit = 9;

																		// If more than ten days left
																		if (_remainingDaySecondDigit > 0) {
																			// Reduce tens days
																			_remainingDayFirstDigit--;

																			// Enforce bounds
																			if (_remainingDayFirstDigit < 0) {
																				// Hold
																				 _remainingDayFirstDigit = 0;
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}

				// } else {
				// 	// Increase hour
				// 	if (_currentHour < 24) {
				// 		_currentHour++;
				// 	} else {
				// 		_currentHour = 0;
				// 	}
				// }

				// Hide timer once time has run out
				if (parseInt(_remainingSecondSecondDigit, 10) === 0 && parseInt(_remainingSecondFirstDigit, 10) === 0 && parseInt(_remainingMinuteSecondDigit, 10) === 0 && parseInt(_remainingMinuteFirstDigit, 10) === 0) {
					//$('body').removeClass('showTimer');
				}

				$('.component-timer').find('.timer-days .digit').removeClass('active');
				$('.component-timer').find('.timer-hours .digit').removeClass('active');
				$('.component-timer').find('.timer-minutes .digit').removeClass('active');
				$('.component-timer').find('.timer-seconds .digit').removeClass('active');

				$('.component-timer').find('.timer-days .second-digit .digit-' + _remainingDaySecondDigit).addClass('active');
				$('.component-timer').find('.timer-hours .first-digit .digit-' + _remainingHourFirstDigit).addClass('active');
				$('.component-timer').find('.timer-hours .second-digit .digit-' + _remainingHourSecondDigit).addClass('active');
				$('.component-timer').find('.timer-minutes .first-digit .digit-' + _remainingMinuteFirstDigit).addClass('active');
				$('.component-timer').find('.timer-minutes .second-digit .digit-' + _remainingMinuteSecondDigit).addClass('active');
				$('.component-timer').find('.timer-seconds .first-digit .digit-' + _remainingSecondFirstDigit).addClass('active');
				$('.component-timer').find('.timer-seconds .second-digit .digit-' + _remainingSecondSecondDigit).addClass('active');
			}

			// Iterates every ms
			window.requestAnimationFrame(animateTimer);
			// callback();
		}

		// Start the animation
		window.requestAnimationFrame(animateTimer);
	}

	function timerDiscountApplies() {
		// Comment this line out if intermittent timer is needed
		return true;

		// Set default to false
		var applies = false;
		
		// NOTE: Needs to be served from a non-cached backend so it's not dependent on the page load
		// var chance = 20; 

		// Never apply the discount to odd hours
		if (_currentHour % 2 === 0) {
			applies = true;
		}

		// Don't show the popup if there's less than 2 minutes left
		if (parseInt(_remainingMinuteFirstDigit, 10) === 0 && parseInt(_remainingMinuteSecondDigit, 10) < 2) {
			applies = false;
		}

		// Apply a 20% chance the discount will skip an even hour 
		// to add some randomness but prevent back to back timers
		// if (applies === true) {
		// 	// Apply chance
		// 	if (Math.round(Math.random() * 100) < chance) {
		// 		applies = false;
		// 	}
		// }

		return applies;
	}

	function toggleTimerVisibility() {
		// Determine whether the discount should be visible
		if (timerDiscountApplies()) {
			// Add CSS class to body to show the timer
			$('body').addClass('showTimer');
		} else {
			$('body').removeClass('showTimer');
		}
	}

	this.init = function ($el) {
		console.log('/FLEX\t/js\t/components\t/component_timer\t/timer.js', 'init()');

		// bindEvents();
		render();

		return this;
	}

	return this.init($el);
}

export default Timer;
