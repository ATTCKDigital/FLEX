/**
 * Editor preview: the stage and thumbnail row with the front end's class
 * names (contracts/rendered-markup.md C-M1), so the shared partial styles
 * both. Switching slides here is local state only: it never calls
 * setAttributes and never loads component_carousel (C-J4).
 */
const { __, sprintf } = wp.i18n;

/**
 * One slide's image, or a placeholder for a missing / loading attachment.
 *
 * @param {Object} props
 * @param {Object} props.slide Slide.
 * @param {Object} props.item  Preview data.
 * @return {Element} Image or placeholder.
 */
function SlideImage( { slide, item } ) {
	if ( ! item.url ) {
		return (
			<div className="component-image-carousel__image component-image-carousel__placeholder">
				{ item.missing
					? __( 'Image missing', 'flexlayout' )
					: __( 'Loading…', 'flexlayout' ) }
			</div>
		);
	}

	return (
		<img
			className="component-image-carousel__image"
			src={ item.url }
			width={ item.width || undefined }
			height={ item.height || undefined }
			alt={ slide.alt || item.alt || '' }
		/>
	);
}

/**
 * @param {Object}                  props
 * @param {Array}                   props.slides     Slides.
 * @param {Object}                  props.media      Preview data keyed by ID.
 * @param {number}                  props.index      Previewed slide.
 * @param {(index: number) => void} props.onSelect   Sets the previewed slide (local state).
 * @param {boolean}                 props.showArrows Whether arrows are shown.
 * @return {Element} Preview.
 */
export default function Preview( {
	slides,
	media,
	index,
	onSelect,
	showArrows,
} ) {
	const count = slides.length;
	const step = ( delta ) => onSelect( ( index + delta + count ) % count );

	return (
		<div className="component-carousel">
			<div className="slides">
				{ slides.map( ( slide, i ) => (
					<figure
						key={ `${ slide.id }-${ i }` }
						className={ i === index ? 'slide active' : 'slide' }
						hidden={ i !== index }
					>
						<SlideImage
							slide={ slide }
							item={ media[ slide.id ] || {} }
						/>
						{ slide.caption && slide.caption.trim() && (
							<figcaption className="component-image-carousel__caption">
								{ slide.caption.trim() }
							</figcaption>
						) }
					</figure>
				) ) }
			</div>
			{ showArrows && count > 1 && (
				<>
					<button
						type="button"
						className="nav prev"
						aria-label={ __( 'Previous slide', 'flexlayout' ) }
						onClick={ () => step( -1 ) }
					/>
					<button
						type="button"
						className="nav next"
						aria-label={ __( 'Next slide', 'flexlayout' ) }
						onClick={ () => step( 1 ) }
					/>
				</>
			) }
			{ count > 1 && (
				<ul className="dots-component dots-component--thumbs">
					{ slides.map( ( slide, i ) => {
						const item = media[ slide.id ] || {};

						return (
							<li
								key={ `${ slide.id }-${ i }` }
								className={ i === index ? 'dot active' : 'dot' }
							>
								<button
									type="button"
									className="dot__thumb"
									aria-current={
										i === index ? 'true' : undefined
									}
									aria-label={ sprintf(
										/* translators: 1: slide number, 2: number of slides. */
										__(
											'Show slide %1$d of %2$d',
											'flexlayout'
										),
										i + 1,
										count
									) }
									onClick={ () => onSelect( i ) }
								>
									{ item.thumbUrl ? (
										<img
											src={ item.thumbUrl }
											alt=""
											width={ item.width || undefined }
											height={ item.height || undefined }
										/>
									) : (
										<span className="component-image-carousel__thumb-placeholder" />
									) }
								</button>
							</li>
						);
					} ) }
				</ul>
			) }
		</div>
	);
}
