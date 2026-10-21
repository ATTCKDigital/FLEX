/**
 * Stage layout: one slide at a time with a cross-fade (CSS, under `.is-ready`).
 * No width maths and no transition lock. The incoming slide loses `hidden`
 * before its fade starts; outgoing slides get `hidden` once their fade ends,
 * or at once under reduced motion (the CSS drops the fade there too).
 */
import { applySlideClasses } from './slide-classes';
import { loadSlide } from './lazy-images';
import { prefersReducedMotion } from './motion';

// Matches the 250 ms opacity transition in _image-carousel.scss, plus slack.
const HIDE_FALLBACK_MS = 300;

/**
 * Collect the slides; the server marks the first one `active`.
 *
 * @param {Object} ctx Carousel instance context.
 */
export function initStage( ctx ) {
	const { $el, state } = ctx;

	state.$dotsContainer = $( '.dots-component', $el );
	state.$slides = $( '.slides .slide', $el );
	state.slides = state.$slides.toArray();
	state.count = state.slides.length;
	// Index of the last slide (legacy naming, used by applySlideClasses).
	state.slidesLength = state.count - 1;

	const active = state.slides.findIndex( ( slide ) =>
		slide.classList.contains( 'active' )
	);
	state.index = Math.max( active, 0 );
	state.requested = state.index;
}

/**
 * Hide every slide except the active one.
 *
 * @param {Object} state Instance state.
 */
function hideInactive( state ) {
	state.slides.forEach( ( slide, i ) => {
		if ( i !== state.index ) {
			slide.hidden = true;
		}
	} );
}

/**
 * Show the current index: unhide it, set the classes, hide the rest later.
 *
 * @param {Object}  ctx            Carousel instance context.
 * @param {Object}  [opts]         Options.
 * @param {boolean} [opts.instant] Hide the outgoing slide at once (also under
 *                                 reduced motion).
 */
export function showSlide( ctx, { instant = false } = {} ) {
	const { $el, state } = ctx;
	const incoming = state.slides[ state.index ];

	loadSlide( ctx, state.index );

	if ( incoming.hidden ) {
		incoming.hidden = false;
		// Force a style flush so the opacity transition starts from 0.
		// eslint-disable-next-line no-unused-expressions
		incoming.offsetWidth;
	}

	applySlideClasses( ctx );

	clearTimeout( state.hideTimer );

	if (
		instant ||
		prefersReducedMotion() ||
		! $el[ 0 ].classList.contains( 'is-ready' )
	) {
		hideInactive( state );
		return;
	}

	state.hideTimer = setTimeout(
		() => hideInactive( state ),
		HIDE_FALLBACK_MS
	);
}

/**
 * Hide an outgoing slide as soon as its own fade ends.
 *
 * @param {Object} ctx Carousel instance context.
 * @return {() => void} Teardown.
 */
export function bindStageLayout( ctx ) {
	const { state } = ctx;
	const stage = ctx.$el[ 0 ].querySelector( '.slides' );

	if ( ! stage ) {
		return () => {};
	}

	const onTransitionEnd = ( event ) => {
		const i = state.slides.indexOf( event.target );

		if (
			i !== -1 &&
			i !== state.index &&
			event.propertyName === 'opacity'
		) {
			event.target.hidden = true;
		}
	};

	stage.addEventListener( 'transitionend', onTransitionEnd );

	return () => {
		stage.removeEventListener( 'transitionend', onTransitionEnd );
		clearTimeout( state.hideTimer );
	};
}
