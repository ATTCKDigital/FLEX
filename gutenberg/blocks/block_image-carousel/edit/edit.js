/**
 * Carousel block editor: empty state (select images), toolbar, preview
 * (local preview index, never saved) and the sidebar.
 */
import classnames from 'classnames';

import { BorderOptionsClasses } from '../../../components/gb-component_border';
import { MarginOptionsClasses } from '../../../components/gb-component_margin';
import { PaddingOptionsClasses } from '../../../components/gb-component_padding';

import useSlideMedia from './use-slide-media';
import MediaToolbar, {
	ALLOWED_TYPES,
	slidesFromSelection,
} from './media-toolbar';
import SlideList, { cleanSlide } from './slide-list';
import Preview from './preview';
import Inspector from './inspector';

const { __ } = wp.i18n;
const { MediaPlaceholder, useBlockProps } = wp.blockEditor;
const { PanelBody } = wp.components;
const { useState } = wp.element;

const FIXED_RATIOS = {
	'16/9': '16 / 9',
	'4/3': '4 / 3',
	'1/1': '1 / 1',
	'3/4': '3 / 4',
};

/**
 * The stage ratio, as the server computes it: a valid override, else the
 * first slide with known dimensions, else 16 / 9.
 *
 * @param {string} aspectRatio Attribute.
 * @param {Array}  slides      Slides.
 * @param {Object} media       Preview data keyed by ID.
 * @return {string} "{w} / {h}".
 */
function stageRatio( aspectRatio, slides, media ) {
	if ( FIXED_RATIOS[ aspectRatio ] ) {
		return FIXED_RATIOS[ aspectRatio ];
	}

	const first = slides
		.map( ( slide ) => media[ slide.id ] || {} )
		.find( ( item ) => item.width > 0 && item.height > 0 );

	return first ? `${ first.width } / ${ first.height }` : '16 / 9';
}

/**
 * @param {Object} props Block edit props.
 * @return {Element} Editor.
 */
export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const slides = Array.isArray( attributes.slides ) ? attributes.slides : [];
	const media = useSlideMedia( slides );
	const [ previewIndex, setPreviewIndex ] = useState( 0 );
	const index = Math.min( previewIndex, Math.max( slides.length - 1, 0 ) );

	const setSlides = ( next ) =>
		setAttributes( { slides: next.map( cleanSlide ) } );

	const blockProps = useBlockProps( {
		className: classnames(
			'component-image-carousel',
			...MarginOptionsClasses( props ),
			...PaddingOptionsClasses( props ),
			...BorderOptionsClasses( props )
		),
		style: {
			'--image-carousel-ratio': stageRatio(
				attributes.aspectRatio,
				slides,
				media
			),
		},
	} );

	if ( ! slides.length ) {
		return (
			<div { ...blockProps }>
				<Inspector { ...props } />
				<MediaPlaceholder
					icon="images-alt2"
					labels={ {
						title: __( 'Carousel', 'flexlayout' ),
						instructions: __(
							'Select images from the media library, or upload them.',
							'flexlayout'
						),
					} }
					multiple
					allowedTypes={ ALLOWED_TYPES }
					onSelect={ ( selection ) =>
						setSlides( slidesFromSelection( [], selection ) )
					}
				/>
			</div>
		);
	}

	return (
		<>
			<MediaToolbar slides={ slides } onChange={ setSlides } />
			<Inspector { ...props }>
				<PanelBody title={ __( 'Slides', 'flexlayout' ) }>
					<SlideList
						slides={ slides }
						media={ media }
						onChange={ setSlides }
						onPreview={ setPreviewIndex }
					/>
				</PanelBody>
			</Inspector>
			<div { ...blockProps }>
				<Preview
					slides={ slides }
					media={ media }
					index={ index }
					onSelect={ setPreviewIndex }
					showArrows={ !! attributes.showArrows }
				/>
			</div>
		</>
	);
}
