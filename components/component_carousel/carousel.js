/**
 * Carousel component (orchestrator).
 *
 * Builds one instance context `{ $el, state, options, api }` and wires the
 * single-purpose modules in ./modules. Option-less markup gets the legacy
 * `peek` layout in the original init order (properties → events → wcag →
 * render). `layout: "stage"` (the Carousel block) shows one slide at a time;
 * with `nav: "thumbs"` the thumbnails are the dots.
 *
 * Public surface: the `carousel.goPrev` / `carousel.goNext` events on `$el`,
 * `FLEX.slideUpdate` on `document.body`, and `instance.goTo()`,
 * `instance.index`, `instance.count`, `instance.layout`.
 */
import { createOptions } from './modules/options';
import { createState, goNext, goPrev, goTo } from './modules/state';
import { stageGoTo, stageStep } from './modules/stage-nav';
import { initStageLayout } from './modules/stage-mode';
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
import {
	registerInteractiveElements,
	initLiveRegion,
	withSource,
	addLegacyTabStops,
} from './modules/a11y';

/**
 * Legacy `peek` layout: today's behaviour, unchanged.
 *
 * @param {Object} ctx Carousel instance context.
 */
function initPeek( ctx ) {
	const { $el } = ctx;

	getSlideProperties( ctx );

	// Public prev/next events
	$el.on( 'carousel.goPrev', function () {
		goPrev( ctx, this );
	} );
	$el.on( 'carousel.goNext', function () {
		goNext( ctx, this );
	} );

	bindDots( ctx );
	bindKeyboard( ctx );
	if ( ctx.options.arrows ) {
		bindArrows( ctx );
	}
	bindSwipe( ctx );
	bindPeekLayout( ctx );
	bindTransitionLock( ctx );
	startAutoplay( ctx );
	bindSlideExtras( ctx );

	registerInteractiveElements( ctx );
	initLiveRegion( ctx );

	// Default set the prev nav item to disabled; hide dots if only one slide;
	// initialise the active states.
	initArrows( ctx );
	showDots( ctx );
	setInitialSlideClasses( ctx );
	updateDots( ctx, 0 );
}

/**
 * Carousel component
 * @param {jQuery} $el      Carousel root.
 * @param {Object} [params] `data-component-options`.
 */
function Carousel( $el, params ) {
	const ctx = {
		$el,
		state: createState(),
		options: createOptions( params ),
	};
	const isStage = ctx.options.layout === 'stage';

	// Navigation entry points for the modules. `el` is the element a request
	// came from (a disabled element ignores it, legacy); `opts.source` says
	// what asked (only user sources are announced).
	ctx.api = isStage
		? {
				goNext: ( el, opts ) => stageStep( ctx, 1, opts ),
				goPrev: ( el, opts ) => stageStep( ctx, -1, opts ),
				goTo: ( index, opts ) => stageGoTo( ctx, index, opts ),
				step: ( delta, opts ) => stageStep( ctx, delta, opts ),
			}
		: {
				goNext: ( el, { source } = {} ) =>
					withSource( ctx, source, () => goNext( ctx, el ) ),
				goPrev: ( el, { source } = {} ) =>
					withSource( ctx, source, () => goPrev( ctx, el ) ),
				goTo: ( index, { source } = {} ) =>
					withSource( ctx, source, () => goTo( ctx, index ) ),
			};

	Object.defineProperties( this, {
		index: { get: () => ctx.state.index },
		count: { get: () => ( ctx.state.$slides || [] ).length },
		layout: { get: () => ctx.options.layout },
	} );

	this.goTo = ( index, { source = 'api' } = {} ) =>
		ctx.api.goTo( index, { source } );

	this.init = function () {
		if ( isStage ) {
			initStageLayout( ctx );
		} else {
			initPeek( ctx );
		}

		return this;
	};

	return this.init( $el );
}

// Used by carousel-loader.js once this chunk has initialised an instance.
export { addLegacyTabStops };

export default Carousel;
