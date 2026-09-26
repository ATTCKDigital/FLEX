/**
 * The animation loop and its page lifecycle: pause into the back/forward
 * cache, resume from it, release everything when the page is really left, and
 * pause while the WebGL context is lost. Leaving is detected with pagehide, as
 * page-unload listeners would keep the page out of the back/forward cache.
 */

/**
 * Creates a requestAnimationFrame loop that never runs twice at once.
 *
 * @param {() => void} renderFrame Called once per frame.
 * @return {{start: () => void, pause: () => void, stop: () => void}} Loop controls;
 *   `stop` ends the loop for good.
 */
export function createLoop( renderFrame ) {
	let animationId = null;
	let running = false;
	let stopped = false;

	const tick = () => {
		animationId = window.requestAnimationFrame( tick );
		renderFrame();
	};

	const pause = () => {
		if ( ! running ) {
			return;
		}
		window.cancelAnimationFrame( animationId );
		running = false;
	};

	return {
		start() {
			if ( running || stopped ) {
				return;
			}
			running = true;
			tick();
		},
		pause,
		stop() {
			pause();
			stopped = true;
		},
	};
}

/**
 * Ties the loop to the page lifecycle and the WebGL context.
 *
 * @param {Object}            options         Lifecycle wiring.
 * @param {HTMLCanvasElement} options.canvas  The renderer's canvas.
 * @param {Object}            options.loop    Controls from createLoop().
 * @param {() => void}        options.release Removes the scene's own listeners
 *                                            and disposes its GPU resources.
 */
export function bindLifecycle( { canvas, loop, release } ) {
	const onContextLost = ( event ) => {
		// Allows the browser to restore the context later.
		event.preventDefault();
		loop.pause();
	};
	const onContextRestored = () => loop.start();
	const onPageShow = ( event ) => {
		if ( event.persisted ) {
			loop.start();
		}
	};
	const onPageHide = ( event ) => {
		if ( event.persisted ) {
			loop.pause();
			return;
		}
		loop.stop();
		window.removeEventListener( 'pagehide', onPageHide );
		window.removeEventListener( 'pageshow', onPageShow );
		canvas.removeEventListener( 'webglcontextlost', onContextLost );
		canvas.removeEventListener( 'webglcontextrestored', onContextRestored );
		release();
	};

	window.addEventListener( 'pagehide', onPageHide );
	window.addEventListener( 'pageshow', onPageShow );
	canvas.addEventListener( 'webglcontextlost', onContextLost );
	canvas.addEventListener( 'webglcontextrestored', onContextRestored );
}
