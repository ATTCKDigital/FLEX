/**
 * Stage-layout wiring (the Carousel block): one slide at a time, no width
 * maths, no transition lock, no slide extras; every new listener uses
 * addEventListener. Fewer than 2 slides: nothing is bound.
 */
import { initStage, showSlide, bindStageLayout } from './layout-stage';
import { bindDots, updateDots } from './nav-dots';
import { bindThumbs, updateThumbs } from './nav-thumbs';
import { bindStageArrows, updateStageArrows } from './nav-arrows';
import { bindSwipe } from './swipe';
import { startAutoplay } from './autoplay';

/**
 * Initialise one stage-layout instance.
 *
 * @param {Object} ctx Carousel instance context.
 */
export function initStageLayout( ctx ) {
	const { $el, state, options } = ctx;
	const thumbs = options.nav === 'thumbs';

	initStage( ctx );

	if ( state.count < 2 ) {
		return;
	}

	ctx.render = () => {
		showSlide( ctx );
		if ( thumbs ) {
			updateThumbs( ctx );
		} else {
			updateDots( ctx, state.index );
		}
		updateStageArrows( ctx );
		$( document.body ).trigger( 'FLEX.slideUpdate', {
			id: $el.attr( 'id' ),
			index: state.index,
		} );
	};

	$el.on( 'carousel.goPrev', () => ctx.api.step( -1 ) );
	$el.on( 'carousel.goNext', () => ctx.api.step( 1 ) );

	ctx.teardowns = [
		bindStageLayout( ctx ),
		thumbs ? bindThumbs( ctx ) : bindDots( ctx ),
		options.arrows ? bindStageArrows( ctx ) : null,
	].filter( Boolean );
	bindSwipe( ctx );
	startAutoplay( ctx );

	// Initial state (the server already marks slide 1); no announcement.
	showSlide( ctx, { instant: true } );
	if ( thumbs ) {
		updateThumbs( ctx );
	} else {
		updateDots( ctx, state.index );
	}
	updateStageArrows( ctx );

	// Controls become operable; `.is-ready` enables the fade. Focus stays put.
	$el[ 0 ]
		.querySelectorAll( '.nav[inert], .dots-component[inert]' )
		.forEach( ( control ) => control.removeAttribute( 'inert' ) );
	$el[ 0 ].classList.add( 'is-ready' );
}
