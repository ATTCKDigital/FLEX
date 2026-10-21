/**
 * Reduced-motion preference, kept live: the media query is read on every
 * call, so a change in the OS setting applies to the next slide change, the
 * next thumbnail scroll and the next autoplay tick without a reload.
 */

const QUERY = '(prefers-reduced-motion: reduce)';

/**
 * @return {boolean} True when the visitor asked for reduced motion.
 */
export function prefersReducedMotion() {
	if ( typeof window === 'undefined' || ! window.matchMedia ) {
		return false;
	}

	return window.matchMedia( QUERY ).matches;
}

/**
 * @return {'auto'|'smooth'} The scroll behaviour to use for programmatic scrolls.
 */
export function scrollBehavior() {
	return prefersReducedMotion() ? 'auto' : 'smooth';
}
