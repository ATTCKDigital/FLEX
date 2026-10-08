/**
 * Block dependencies
 */
import classnames from 'classnames';
import icons from '../../../js/icons.js';
import metadata from './block.json';

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls, MediaUpload, useBlockProps } =
	wp.blockEditor;
const { Button } = wp.components;

/**
 * Internal dependencies
 */
// Import all of our Margin Options requirements.
import MarginOptions, {
	MarginOptionsClasses,
} from '../../components/gb-component_margin';
// Import all of our Border Options requirements.
import { BorderOptionsClasses } from '../../components/gb-component_border';
// Import all of our Padding Options requirements.
import { PaddingOptionsClasses } from '../../components/gb-component_padding';
// Import all of our Background Options requirements.
import BackgroundOptions, {
	BackgroundOptionsClasses,
	BackgroundOptionsInlineStyles,
	BackgroundOptionsVideoOutput,
} from '../../components/gb-component_background-options';
// Import all of our Text Color Options requirements.
import TextColorOptions, {
	TextColorClasses,
} from '../../components/gb-component_text-colors';

// Editor component (named so the react-hooks lint rule recognises useBlockProps).
const Edit = ( props ) => {
	const {
		attributes: {
			imgID,
			imgURL,
			content,
			placeholder,
			contentSource,
			contentCompany,
			placeholderSource,
		},
		onReplace,
		setAttributes,
		isSelected,
	} = props;
	const onSelectImage = ( img ) => {
		setAttributes( {
			imgID: img.id,
			imgURL: img.url,
		} );
	};
	const onRemoveImage = () => {
		setAttributes( {
			imgID: null,
			imgURL: null,
		} );
	};

	const blockProps = useBlockProps( {
		className: classnames(
			`component-quote`,
			...MarginOptionsClasses( props ),
			...PaddingOptionsClasses( props ),
			...BorderOptionsClasses( props ),
			...BackgroundOptionsClasses( props ),
			...TextColorClasses( props )
		),
		style: {
			...BackgroundOptionsInlineStyles( props ),
		},
	} );

	return (
		<>
			<InspectorControls>
				<BackgroundOptions { ...props } />
				<MarginOptions { ...props } />
				<TextColorOptions { ...props } />
			</InspectorControls>
			<div { ...blockProps }>
				{ BackgroundOptionsVideoOutput( props ) }
				<RichText
					identifier="content"
					tagName={ 'h5' }
					value={ content }
					onChange={ ( value ) =>
						setAttributes( { content: value } )
					}
					onRemove={ () => onReplace( [] ) }
					className={ classnames( `quote-text` ) }
					placeholder={ placeholder || __( 'Quote text…' ) }
				/>
				{ ! imgID ? (
					<MediaUpload
						onSelect={ onSelectImage }
						type="image"
						value={ imgID }
						render={ ( { open } ) => (
							<Button
								className={ 'button button-large' }
								onClick={ open }
							>
								{ icons.upload }
								{ __( 'Upload Image', 'flexlayout' ) }
							</Button>
						) }
					></MediaUpload>
				) : (
					<div className={ classnames( `image-wrapper` ) }>
						{ isSelected ? (
							<Button
								className="remove-image"
								onClick={ onRemoveImage }
							>
								{ icons.remove }
							</Button>
						) : null }

						<img src={ imgURL } alt="" />
					</div>
				) }
				<RichText
					identifier="contentSource"
					tagName={ 'cite' }
					value={ contentSource }
					onChange={ ( value ) =>
						setAttributes( { contentSource: value } )
					}
					onRemove={ () => onReplace( [] ) }
					className={ classnames( `quote-source` ) }
					placeholder={ placeholderSource || __( 'Quote source' ) }
				/>
				<RichText
					identifier="contentCompany"
					tagName={ 'cite' }
					value={ contentCompany }
					onChange={ ( value ) =>
						setAttributes( { contentCompany: value } )
					}
					onRemove={ () => onReplace( [] ) }
					className={ classnames( `quote-company` ) }
					placeholder={
						placeholderSource || __( 'Quote author company' )
					}
				/>
			</div>
		</>
	);
};

/**
 * Register block
 */
export default registerBlockType( metadata, {
	icon: 'format-quote',
	example: {},
	edit: Edit,
	save() {
		return null;
	},
} );
