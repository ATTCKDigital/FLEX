/**
 * Keyboard navigation, scoped to the focused carousel (feature 019, J-1):
 * the keydown listener sits on the carousel root, so ← / → act only when
 * focus is inside it (v5.8.5 listened on `body`, so the keys moved every
 * carousel on the page). Keys with a modifier held, and keys typed in form
 * fields, are ignored.
 *
 * - Legacy `peek` layout: ← / → click this carousel's `.nav.prev` / `.nav.next`
 *   (so a `.disabled` arrow still ignores them, as before).
 * - `stage` layout: ← / → step (wrap or clamp per `loop`); with
 *   `nav: "thumbs"`, Home / End go to the first / last slide, and when focus
 *   is on a thumbnail it follows the new active thumbnail (J-2).
 */
import { getThumbs } from './nav-thumbs';

const FORM_FIELD = 'input, textarea, select';

/**
 * Whether a keydown should be ignored.
 *
 * @param {KeyboardEvent} event The event.
 * @return {boolean} True for modifier chords and form-field typing.
 */
function ignoreKey( event ) {
	if ( event.altKey || event.ctrlKey || event.metaKey || event.shiftKey ) {
		return true;
	}

	const target = event.target;

	return !! (
		target &&
		( target.isContentEditable ||
			( target.closest && target.closest( FORM_FIELD ) ) )
	);
}

/**
 * Legacy `peek` layout.
 *
 * @param {Object} ctx Carousel instance context.
 */
export function bindKeyboard( ctx ) {
	const { $el } = ctx;

	$el.on( 'keydown', function ( e ) {
		if ( ignoreKey( e.originalEvent || e ) ) {
			return;
		}

		// Left arrow key
		if ( e.keyCode === 37 ) {
			$( '.nav.prev', $el ).click();
		}

		// Right arrow key
		if ( e.keyCode === 39 ) {
			$( '.nav.next', $el ).click();
		}
	} );
}

/**
 * The slide a key asks for, or null when the key is not ours.
 *
 * @param {Object}  ctx    Carousel instance context.
 * @param {string}  key    `KeyboardEvent.key`.
 * @param {boolean} thumbs Whether Home / End apply (`nav: "thumbs"`).
 * @return {{delta?: number, index?: number}|null} The request.
 */
function requestFor( ctx, key, thumbs ) {
	switch ( key ) {
		case 'ArrowLeft':
			return { delta: -1 };
		case 'ArrowRight':
			return { delta: 1 };
		case 'Home':
			return thumbs ? { index: 0 } : null;
		case 'End':
			return thumbs ? { index: ctx.state.count - 1 } : null;
		default:
			return null;
	}
}

/**
 * `stage` layout.
 *
 * @param {Object} ctx Carousel instance context.
 * @return {() => void} Teardown.
 */
export function bindStageKeyboard( ctx ) {
	const root = ctx.$el[ 0 ];
	const thumbs = ctx.options.nav === 'thumbs';

	const onKeydown = ( event ) => {
		if ( ignoreKey( event ) ) {
			return;
		}

		const request = requestFor( ctx, event.key, thumbs );

		if ( ! request ) {
			return;
		}

		event.preventDefault();

		const onThumb = !! event.target.closest( '.dot__thumb' );
		const opts = { source: 'key' };

		if ( request.index !== undefined ) {
			ctx.api.goTo( request.index, opts );
		} else {
			ctx.api.step( request.delta, opts );
		}

		if ( onThumb ) {
			const active = getThumbs( ctx )[ ctx.state.index ];

			if ( active && active !== root.ownerDocument.activeElement ) {
				active.focus( { preventScroll: true } );
			}
		}
	};

	root.addEventListener( 'keydown', onKeydown );

	return () => root.removeEventListener( 'keydown', onKeydown );
}
