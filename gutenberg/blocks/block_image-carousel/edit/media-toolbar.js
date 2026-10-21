/**
 * Toolbar: "Edit gallery" (the media library's gallery frame: select,
 * reorder, remove) and "Add images" (append a multi-selection).
 * Images only, so videos cannot be selected.
 */
const { __ } = wp.i18n;
const { BlockControls, MediaUpload, MediaUploadCheck } = wp.blockEditor;
const { ToolbarButton, ToolbarGroup } = wp.components;

export const ALLOWED_TYPES = [ 'image' ];

/**
 * Turn a media-frame selection into slides, in the selected order, keeping
 * the alt / caption overrides of slides that stay.
 *
 * @param {Array}        slides    Current slides.
 * @param {Object|Array} selection Media frame selection.
 * @return {Array} New slides.
 */
export function slidesFromSelection( slides, selection ) {
	const previous = new Map( slides.map( ( slide ) => [ slide.id, slide ] ) );

	return []
		.concat( selection || [] )
		.filter(
			( media ) =>
				media && media.id && ( ! media.type || media.type === 'image' )
		)
		.map( ( media ) => previous.get( media.id ) || { id: media.id } );
}

/**
 * @param {Object}                  props
 * @param {Array}                   props.slides   Current slides.
 * @param {(slides: Array) => void} props.onChange Receives the new slides.
 * @return {Element} Toolbar controls.
 */
export default function MediaToolbar( { slides, onChange } ) {
	const ids = slides.map( ( slide ) => slide.id );

	const onAdd = ( selection ) => {
		const added = slidesFromSelection( [], selection ).filter(
			( slide ) => ! ids.includes( slide.id )
		);
		onChange( [ ...slides, ...added ] );
	};

	return (
		<BlockControls group="other">
			<MediaUploadCheck>
				<ToolbarGroup>
					<MediaUpload
						multiple
						gallery
						allowedTypes={ ALLOWED_TYPES }
						value={ ids }
						onSelect={ ( selection ) =>
							onChange( slidesFromSelection( slides, selection ) )
						}
						render={ ( { open } ) => (
							<ToolbarButton onClick={ open }>
								{ __( 'Edit gallery', 'flexlayout' ) }
							</ToolbarButton>
						) }
					/>
					<MediaUpload
						multiple
						allowedTypes={ ALLOWED_TYPES }
						onSelect={ onAdd }
						render={ ( { open } ) => (
							<ToolbarButton onClick={ open }>
								{ __( 'Add images', 'flexlayout' ) }
							</ToolbarButton>
						) }
					/>
				</ToolbarGroup>
			</MediaUploadCheck>
		</BlockControls>
	);
}
