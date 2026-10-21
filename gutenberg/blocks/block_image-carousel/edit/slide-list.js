/**
 * Sidebar slide list: per slide a thumbnail, move up / down, replace,
 * remove, and plain-text alt and caption overrides. A soft notice above 20
 * slides.
 */
const { __, sprintf } = wp.i18n;
const { MediaUpload, MediaUploadCheck } = wp.blockEditor;
const { Button, Notice, TextControl } = wp.components;

import { ALLOWED_TYPES } from './media-toolbar';

const SOFT_LIMIT = 20;

/**
 * Keep only the stored keys; empty overrides are dropped (the server trims).
 *
 * @param {Object} slide Slide.
 * @return {Object} `{ id, alt?, caption? }`.
 */
export function cleanSlide( slide ) {
	const out = { id: slide.id };

	[ 'alt', 'caption' ].forEach( ( key ) => {
		if ( typeof slide[ key ] === 'string' && slide[ key ] !== '' ) {
			out[ key ] = slide[ key ];
		}
	} );

	return out;
}

/**
 * Move one item of a copy of `list` from `from` to `to`.
 *
 * @param {Array}  list List.
 * @param {number} from Index.
 * @param {number} to   Index.
 * @return {Array} New list.
 */
function move( list, from, to ) {
	const next = [ ...list ];
	const [ item ] = next.splice( from, 1 );
	next.splice( to, 0, item );

	return next;
}

/**
 * @param {Object}                  props
 * @param {Array}                   props.slides    Current slides.
 * @param {Object}                  props.media     Preview data keyed by ID.
 * @param {(slides: Array) => void} props.onChange  Receives the new slides.
 * @param {(index: number) => void} props.onPreview Shows a slide in the preview (not saved).
 * @return {Element} The list.
 */
export default function SlideList( { slides, media, onChange, onPreview } ) {
	const count = slides.length;

	const update = ( i, changes ) =>
		onChange(
			slides.map( ( slide, j ) =>
				j === i ? cleanSlide( { ...slide, ...changes } ) : slide
			)
		);

	const reorder = ( from, to ) => {
		onChange( move( slides, from, to ) );
		onPreview( to );
	};

	return (
		<div className="image-carousel-slide-list">
			{ count > SOFT_LIMIT && (
				<Notice status="warning" isDismissible={ false }>
					{ __(
						'More than 20 slides make the thumbnail row long and the page heavier. Consider splitting them.',
						'flexlayout'
					) }
				</Notice>
			) }
			<ol className="image-carousel-slide-list__items">
				{ slides.map( ( slide, i ) => {
					const item = media[ slide.id ] || {};
					const title = sprintf(
						/* translators: 1: slide number, 2: number of slides. */
						__( 'Slide %1$d of %2$d', 'flexlayout' ),
						i + 1,
						count
					);

					return (
						<li
							className="image-carousel-slide-list__item"
							key={ `${ slide.id }-${ i }` }
						>
							<button
								type="button"
								className="image-carousel-slide-list__thumb"
								onClick={ () => onPreview( i ) }
								aria-label={ sprintf(
									/* translators: %s: "Slide N of M". */
									__( 'Preview %s', 'flexlayout' ),
									title
								) }
							>
								{ item.thumbUrl && (
									<img src={ item.thumbUrl } alt="" />
								) }
							</button>
							<div className="image-carousel-slide-list__body">
								<strong>{ title }</strong>
								{ item.missing && (
									<p className="image-carousel-slide-list__missing">
										{ __(
											'Image missing: this slide is skipped on the site.',
											'flexlayout'
										) }
									</p>
								) }
								<div className="image-carousel-slide-list__actions">
									<Button
										size="small"
										icon="arrow-up-alt2"
										label={ __( 'Move up', 'flexlayout' ) }
										disabled={ i === 0 }
										onClick={ () => reorder( i, i - 1 ) }
									/>
									<Button
										size="small"
										icon="arrow-down-alt2"
										label={ __(
											'Move down',
											'flexlayout'
										) }
										disabled={ i === count - 1 }
										onClick={ () => reorder( i, i + 1 ) }
									/>
									<MediaUploadCheck>
										<MediaUpload
											allowedTypes={ ALLOWED_TYPES }
											value={ slide.id }
											onSelect={ ( picked ) =>
												picked &&
												picked.id &&
												update( i, { id: picked.id } )
											}
											render={ ( { open } ) => (
												<Button
													size="small"
													variant="secondary"
													onClick={ open }
												>
													{ __(
														'Replace',
														'flexlayout'
													) }
												</Button>
											) }
										/>
									</MediaUploadCheck>
									<Button
										size="small"
										icon="trash"
										isDestructive
										label={ __( 'Remove', 'flexlayout' ) }
										onClick={ () =>
											onChange(
												slides.filter(
													( s, j ) => j !== i
												)
											)
										}
									/>
								</div>
								<TextControl
									__nextHasNoMarginBottom
									__next40pxDefaultSize
									label={ __( 'Alt text', 'flexlayout' ) }
									help={ __(
										'Leave empty to use the media library alt text.',
										'flexlayout'
									) }
									placeholder={ item.alt || '' }
									value={ slide.alt || '' }
									onChange={ ( alt ) => update( i, { alt } ) }
								/>
								<TextControl
									__nextHasNoMarginBottom
									__next40pxDefaultSize
									label={ __( 'Caption', 'flexlayout' ) }
									value={ slide.caption || '' }
									onChange={ ( caption ) => {
										update( i, { caption } );
										onPreview( i );
									} }
								/>
							</div>
						</li>
					);
				} ) }
			</ol>
		</div>
	);
}
