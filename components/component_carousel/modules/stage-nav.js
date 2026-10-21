/**
 * Stage-layout navigation: `loop` wraps, `loop: false` clamps, `loop` unset
 * keeps the legacy edge rules (next past the end wraps to 0, prev stops at 0).
 * There is no transition lock: the last request always wins.
 */

/**
 * Resolve a requested index for a carousel of `count` slides.
 *
 * @param {number}            count  Number of slides (> 0).
 * @param {number}            target Requested index.
 * @param {boolean|undefined} loop   The `loop` option.
 * @return {number|null} The index to show, or null for an invalid request.
 */
export function resolveIndex( count, target, loop ) {
	const index = Math.trunc( Number( target ) );

	if ( ! count || ! Number.isFinite( index ) ) {
		return null;
	}

	if ( loop === true ) {
		return ( ( index % count ) + count ) % count;
	}

	return Math.min( Math.max( index, 0 ), count - 1 );
}

/**
 * Show `target` (resolved per `loop`) and render through `ctx.render`.
 *
 * @param {Object} ctx                 Carousel instance context.
 * @param {number} target              Requested index.
 * @param {Object} [opts]              Options.
 * @param {string} [opts.source='api'] What asked for the change.
 * @return {boolean} Whether the slide changed.
 */
export function stageGoTo( ctx, target, { source = 'api' } = {} ) {
	const { state, options } = ctx;
	const index = resolveIndex( state.count, target, options.loop );

	if ( index === null ) {
		return false;
	}

	state.requested = index;

	if ( index === state.index ) {
		return false;
	}

	const from = state.index;
	state.index = index;
	ctx.render( { from, source } );

	return true;
}

/**
 * Step by `delta` slides (arrows, keys, swipe, autoplay, public events).
 *
 * @param {Object} ctx    Carousel instance context.
 * @param {number} delta  +1 next, -1 previous.
 * @param {Object} [opts] Passed to stageGoTo().
 * @return {boolean} Whether the slide changed.
 */
export function stageStep( ctx, delta, opts ) {
	const { state, options } = ctx;
	let target = state.index + delta;

	// Legacy rule when `loop` is unset: next on the last slide goes to 0.
	if ( options.loop === undefined && target > state.count - 1 ) {
		target = 0;
	}

	return stageGoTo( ctx, target, opts );
}
