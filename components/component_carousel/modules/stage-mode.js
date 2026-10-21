/**
 * Stage-layout wiring (the Carousel block): one slide at a time, no width
 * maths, no transition lock, no slide extras; every new listener uses
 * addEventListener and sits on the carousel root. Fewer than 2 slides:
 * nothing is bound.
 */
import { initStage, showSlide, bindStageLayout } from './layout-stage';
import { bindDots, updateDots } from './nav-dots';
import { bindThumbs, updateThumbs, scrollToActiveThumb } from './nav-thumbs';
import { bindStageArrows, updateStageArrows } from './nav-arrows';
import { bindStageKeyboard } from './keyboard';
import { bindSwipe } from './swipe';
import { startAutoplay } from './autoplay';
import { bindLazyImages, preloadNeighbour } from './lazy-images';
import { registerInteractiveElements, initLiveRegion, announce } from './a11y';

/**
 * Update the navigation for the current index.
 *
 * @param {Object}  ctx            Carousel instance context.
 * @param {Object}  [opts]         Options.
 * @param {boolean} [opts.instant] Scroll the thumbnail row without animation.
 */
function updateNav( ctx, { instant = false } = {} ) {
	if ( ctx.options.nav === 'thumbs' ) {
		updateThumbs( ctx );
		scrollToActiveThumb( ctx, { instant } );
	} else {
		updateDots( ctx, ctx.state.index );
	}
	updateStageArrows( ctx );
}

/**
 * Initialise one stage-layout instance.
 *
 * @param {Object} ctx Carousel instance context.
 */
export function initStageLayout( ctx ) {
	const { $el, state, options } = ctx;

	initStage( ctx );

	if ( state.count < 2 ) {
		return;
	}

	ctx.render = ( { from, source } = {} ) => {
		showSlide( ctx );
		updateNav( ctx );
		$( document.body ).trigger( 'FLEX.slideUpdate', {
			id: $el.attr( 'id' ),
			index: state.index,
		} );
		announce( ctx, source );
		preloadNeighbour( ctx, from );
	};

	$el.on( 'carousel.goPrev', () => ctx.api.step( -1 ) );
	$el.on( 'carousel.goNext', () => ctx.api.step( 1 ) );

	initLiveRegion( ctx );

	ctx.teardowns = [
		bindLazyImages( ctx ),
		bindStageLayout( ctx ),
		options.nav === 'thumbs' ? bindThumbs( ctx ) : bindDots( ctx ),
		options.arrows ? bindStageArrows( ctx ) : null,
		bindStageKeyboard( ctx ),
		bindSwipe( ctx ),
		startAutoplay( ctx ),
	].filter( ( teardown ) => typeof teardown === 'function' );

	// Legacy `li.dot` / `a.nav` only; the block's native buttons are skipped.
	registerInteractiveElements( ctx );

	// Initial state (the server already marks slide 1); no announcement.
	showSlide( ctx, { instant: true } );
	updateNav( ctx, { instant: true } );

	// Controls become operable; `.is-ready` enables the fade. Focus stays put.
	$el[ 0 ]
		.querySelectorAll( '.nav[inert], .dots-component[inert]' )
		.forEach( ( control ) => control.removeAttribute( 'inert' ) );
	$el[ 0 ].classList.add( 'is-ready' );
}
