/**
 * Legacy per-slide extras (peek layout): a click on a slide follows its first
 * link, and slides with an `.image-wrapper img` add a hover-background rule.
 */

/**
 * @param {Object} ctx Carousel instance context.
 */
export function bindSlideExtras( ctx ) {
	const { $el } = ctx;

	// Add pseudoelement styles for each carousel slide
	$( '.slide', $el ).each( function ( index, el ) {
		const thisSlideId = $( this ).attr( 'data-section-id' );
		const thisSlideThumbnailImage = $( '.image-wrapper img', this ).attr(
			'src'
		);

		// Add anchor link to entire element
		const anchorLink = $( 'a', this ).attr( 'href' );

		$( el ).on( 'click', function () {
			if ( typeof anchorLink !== 'undefined' ) {
				window.location.href = anchorLink;
			}
		} );

		// Swaps out background for thumbnail on hover
		if (
			thisSlideThumbnailImage !== 'none' &&
			typeof thisSlideThumbnailImage !== 'undefined'
		) {
			$( '<style>' )
				.attr( 'id', 'dynamic-style' )
				.html(
					`
						.component-background[data-section-id="${ thisSlideId }"]::before {
						background-image: url(${ thisSlideThumbnailImage });
						background-size: cover;
						background-position: center;
						content: "";
						position: absolute;
						top: 0; left: 0; right: 0; bottom: 0;
						opacity: 0;
						}
					`
				)
				.appendTo( 'head' );
		}
	} );
}
