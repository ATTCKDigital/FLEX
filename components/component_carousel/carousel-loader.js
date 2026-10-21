/**
 * Carousel loader stub (in main.js).
 *
 * Registered as the `Carousel` component; the real component and its modules
 * load on demand as the `carousel` chunk (once per page, whatever the number
 * of instances). `carousel.goPrev` / `carousel.goNext` triggered before the
 * chunk arrives are queued and replayed. If the chunk fails, the static
 * markup stays as rendered.
 *
 * @param {jQuery} $el    Carousel root.
 * @param {Object} params `data-component-options`.
 */
function Carousel( $el, params ) {
	const pending = [];
	const queue = ( name ) => () => pending.push( name );

	$el.on( 'carousel.goPrev.pending', queue( 'carousel.goPrev' ) ).on(
		'carousel.goNext.pending',
		queue( 'carousel.goNext' )
	);

	import( /* webpackChunkName: "carousel" */ './carousel' )
		.then( ( { default: RealCarousel, addLegacyTabStops } ) => {
			$el.off( '.pending' );
			this.instance = new RealCarousel( $el, params );
			addLegacyTabStops( $el );
			pending.forEach( ( name ) => $el.trigger( name ) );
		} )
		.catch( () => {} );
}

export default Carousel;
