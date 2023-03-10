import $ from 'jquery';
import FLEX from 'FLEX/js/client-namespace';

if (!FLEX.isProd) { console.log('loaded', '/FLEX\t/js\t/components\t/component_nav\t/nav.js'); }

// Global Nav & Header behavior
function Nav($el) {
	console.log('/FLEX/\tcomponents/\tcomponent-nav/\tnav.js', 'Nav()');

	// Cache the body
	var $body = $('body');

	function navToggle(e) {
		console.log('/FLEX/\tcomponents/\tcomponent-nav/\tnav.js', 'navToggle()');

		// Open nav on hamburger click or enter press when tab focused
		var keyCode = e.keyCode || e.which;

		// Detect enter key press
		// 9 = tab
		// 13 = enter
		if (e.type === 'keyup' && typeof keyCode !== 'undefined' && keyCode !== 13) {
			console.log('exiting, pressed the  ' + e.key + ' key ', keyCode);
			return;
		} else {
			console.log('/FLEX/\tcomponents/\tcomponent-nav/\tnav.js', 'navToggle(), keyCode: ', keyCode, 'key: ', e.key, 'event: ', e);
		}

		// Open nav on hamburger click
		$body.toggleClass('navOpen');
		$el.find('.openNav').removeClass('openSubNav');
		$el.find('.menu-back').removeClass('openSubNav');
		$body.removeClass('searchOpen');

		// If nav is open and hamburger is visible, 
		// add tabindex attributes to nav links
		if ($('.hamburger-wrapper').is(':visible') && $('body').hasClass('navOpen')) {
			$('nav.main-nav .menu-item a').prop('tabindex', '0');
		} else {
			// Otherwise, remove them (i.e., make them not tabbable).
			$('nav.main-nav .menu-item a').prop('tabindex', '-1');
		}
	}

	function searchToggle() {
		console.log('/FLEX/\tcomponents/\tcomponent-nav/\tnav.js', 'searchToggle()');

		// Open search on click
		$body.toggleClass('searchOpen');
		$body.removeClass('navOpen');
	}

	function toggleSubNav(e) {
		console.log('/FLEX/\tcomponents/\tcomponent-nav/\tnav.js', 'toggleSubNav()');

		e.preventDefault();
		$(this).parent().toggleClass('openSubNav').siblings().removeClass('openSubNav');
		$body.toggleClass('openSubNav');
	}

	function openSubNav(e) {
		console.log('/FLEX/\tcomponents/\tcomponent-nav/\tnav.js', 'openSubNav()');

		e.preventDefault();
		$(this).addClass('openSubNav').siblings().removeClass('openSubNav');
		$body.addClass('openSubNav');
	}

	function closeSubNav() {
		console.log('/FLEX/\tcomponents/\tcomponent-nav/\tnav.js', 'closeSubNav()');

		$el.find('.menu-item-has-children').removeClass('openSubNav');
		$body.removeClass('openSubNav');
	}

	function userScrolled() {
		console.log('/FLEX/\tcomponents/\tcomponent-nav/\tnav.js', 'userScrolled()');

		// Check if user is scrolled on page load so that the nav is hidden when they refresh the page
		if ($(window).scrollTop() >= 10) {
			$('body').addClass('hideNav');
		}
	}

	function scrolledNav($el) {
		console.log('/FLEX/\tcomponents/\tcomponent-nav/\tnav.js', 'scrolledNav()');

		// Bind to scroll
		$(document.body).bind('FLEX.scroll', function (e, data) {
			// console.log('/FLEX/\tcomponents/\tcomponent-nav/\tnav.js, scrolledNav', 'FLEX.scroll(e:)');

			// Show/hide nav bar background color
			var scroll = data.currentScrollTop;

			// Add a class after short scroll to add background color etc
			if (scroll >= 10) {
				if (!$('body').hasClass('backgroundNav')) {
					$('body').addClass('backgroundNav');
				}
			}

			// Hide nav entirely once scrolled past a certain distance
			if (scroll >= 300) {
				if (!$('body').hasClass('hideNav')) {
					$('body').addClass('hideNav');
				}
			}

			// Show again as soon as they start scrolling back up
			if (data.scrollDirection === 'up') {
				$('body').removeClass('hideNav');
			}

			// Show again as soon as they start scrolling back up
			if (data.scrollDirection === 'up' && scroll <= 10) {
				$('body').removeClass('hideNav backgroundNav');
			}
		});
	}

	function changeLogoColorOnScroll($el) {
		console.log('/FLEX/\tcomponents/\tcomponent-nav/\tnav.js', 'logoColor()');

		// Change the logo color as you scroll down the page. Can also be used to change the hamburger color. 
		// Make color changes using CSS.
		var row = $('.component-row');
		var footer = $('.component-footer').eq(0).offset().top

		$(document.body).bind('FLEX.scroll', function (e, data) {
			var viewportHeight = data.viewportHeight;
			var scrollTop = data.currentScrollTop;

			$(row).each(function () {
				var rowTop = $(this).offset().top;
				var logoColor = $(this).data('logo-color');

				// console.log('logoColor: ', logoColor);

				if (rowTop <= scrollTop + 20) {
					if (logoColor == 'logo-color-white') {
						$body.addClass('logoLight').removeClass('logoDark');
					}

					if (logoColor == 'logo-color-dark') {
						$body.addClass('logoDark').removeClass('logoLight');
					}
				}

				if (scrollTop == 0) {
					$body.removeClass('logoDark logoLight');
				}
			});

			if (scrollTop >= footer) {
					$body.addClass('logoLight').removeClass('logoDark');
			}
		});
	}

	function bindEvents() {
		console.log('/FLEX/\tcomponents/\tcomponent-nav/\tnav.js', 'bindEvents()');

		$el = $el;
		$el.find('.hamburger-wrapper').on('click', navToggle);

		changeLogoColorOnScroll();
		scrolledNav();

		// Use this if subnav is triggered on hover
		if ($(window).width() > 1024) {
			$el.find('.menu-items > .menu-item-has-children').on('mouseenter', openSubNav);

			// If we're hovering outside the nav, close the nav.
			$(document).on('mouseover',function (e) {
				// But, only if the nav is already open
				if (!$body.hasClass('openSubNav')) {
					return;
				}

				let $target = $(e.target);

				if (!$target.is('.main-header') && !$target.closest('.main-header').length) {
					closeSubNav(e);
				}

				if (!$target.is('.menu-item-has-children') && !$target.closest('.menu-item-has-children').length) {
					closeSubNav(e);
				}
			});
		} else {
			$el.find('.menu-item-has-children > a').on('click', toggleSubNav);

		}
	}

	this.init = function ($el) {
		console.log('/FLEX/\tcomponents/\tcomponent-nav/\tnav.js', 'init()');

		bindEvents();

		return this;
	}

	return this.init($el);
}

export default Nav;
