/**
 * Carousel component (orchestrator).
 *
 * Builds one instance context `{ $el, state, options, api }` and wires the
 * single-purpose modules in ./modules in the original init order:
 * properties → events → wcag → render.
 *
 * Public surface: the `carousel.goPrev` / `carousel.goNext` events on `$el`
 * and `FLEX.slideUpdate` on `document.body`.
 */
import { createOptions } from './modules/options';
import { createState, goNext, goPrev, goTo } from './modules/state';
import {
	getSlideProperties,
	bindPeekLayout,
	bindTransitionLock,
} from './modules/layout-peek';
import { setInitialSlideClasses } from './modules/slide-classes';
import { bindDots, showDots, updateDots } from './modules/nav-dots';
import { bindArrows, initArrows } from './modules/nav-arrows';
import { bindKeyboard } from './modules/keyboard';
import { bindSwipe } from './modules/swipe';
import { startAutoplay } from './modules/autoplay';
import { bindSlideExtras } from './modules/slide-extras';
import { registerInteractiveElements } from './modules/a11y';

/**
 * Carousel component
 * @param {jQuery} $el
 */
function Carousel( $el ) {
	const ctx = {
		$el,
		state: createState(),
		options: createOptions(),
	};

	// Navigation entry points for the modules. `el` is the element a request
	// came from; a disabled element ignores it.
	ctx.api = {
		goNext: ( el ) => goNext( ctx, el ),
		goPrev: ( el ) => goPrev( ctx, el ),
		goTo: ( index ) => goTo( ctx, index ),
	};

	function bindEvents() {
		// Public prev/next events
		$el.on( 'carousel.goPrev', function () {
			goPrev( ctx, this );
		} );
		$el.on( 'carousel.goNext', function () {
			goNext( ctx, this );
		} );

		bindDots( ctx );
		bindKeyboard( ctx );
		bindArrows( ctx );
		bindSwipe( ctx );
		bindPeekLayout( ctx );
		bindTransitionLock( ctx );
		startAutoplay( ctx );
		bindSlideExtras( ctx );
	}

	function render() {
		// Default set the prev nav item to disabled
		initArrows( ctx );

		// Hide dots if only one slide
		showDots( ctx );

		// Initializes all default active states
		setInitialSlideClasses( ctx );
		updateDots( ctx, 0 );
	}

	this.init = function () {
		getSlideProperties( ctx );
		bindEvents();
		registerInteractiveElements( ctx );
		render();

		return this;
	};

	return this.init( $el );
}

export default Carousel;
