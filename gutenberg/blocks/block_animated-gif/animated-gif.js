// Block dependencies
import classnames from 'classnames';
import icons from '../../../js/icons.js';
import metadata from './block.json';

// Internal block libraries
const { __ } = wp.i18n;

// WordPress dependencies
const { registerBlockType } = wp.blocks;

const {
	AlignmentToolbar,
	BlockControls,
	InspectorControls,
	MediaUpload,
	RichText,
	URLInput,
	useBlockProps,
} = wp.blockEditor;

const { Button, Dashicon, IconButton, PanelBody, TextControl } = wp.components;

// Internal dependencies
import DataComponentNameOptions from '../../components/gb-component_data-component-name';
import MarginOptions, {
	MarginOptionsClasses,
} from '../../components/gb-component_margin';
import BorderOptions, {
	BorderOptionsClasses,
} from '../../components/gb-component_border';
import PaddingOptions, {
	PaddingOptionsClasses,
} from '../../components/gb-component_padding';

// Editor component (named so the react-hooks lint rule recognises useBlockProps).
const Edit = ( props ) => {
	const {
		attributes: {
			align,
			caption,
			CSSWidth,
			dataComponentName,
			dataComponentOptions,
			gifID,
			gifURL,
			imgID,
			imgURL,
			placeholder,
			url,
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

	const onSelectGif = ( gif ) => {
		setAttributes( {
			gifID: gif.id,
			gifURL: gif.url,
		} );
	};

	const onRemoveGif = () => {
		setAttributes( {
			gifID: null,
			gifURL: null,
		} );
	};

	const blockProps = useBlockProps( {
		className: classnames(
			`component-image component-animated-gif`,
			`block-align-${ align }`,
			...MarginOptionsClasses( props ),
			...PaddingOptionsClasses( props ),
			...BorderOptionsClasses( props )
		),
		'data-component-name': dataComponentName,
		'data-component-options': dataComponentOptions,
	} );

	return (
		<>
			<InspectorControls>
				<BorderOptions { ...props } />
				<MarginOptions { ...props } />
				<PaddingOptions { ...props } />
				<PanelBody title={ __( 'Image Settings' ) }>
					<p>{ __( 'Alignment' ) }</p>
					<AlignmentToolbar
						value={ align }
						onChange={ ( nextAlign ) => {
							setAttributes( { align: nextAlign } );
						} }
					/>
					<p>{ __( 'CSS Width (100%, 50px, auto, etc.)' ) }</p>
					<TextControl
						value={ CSSWidth }
						onChange={ ( nextCSSWidth ) => {
							setAttributes( { CSSWidth: nextCSSWidth } );
						} }
					/>
				</PanelBody>
				<DataComponentNameOptions { ...props } />
			</InspectorControls>
			<BlockControls>
				<AlignmentToolbar
					value={ align }
					onChange={ ( nextAlign ) => {
						setAttributes( { align: nextAlign } );
					} }
				/>
			</BlockControls>
			<div { ...blockProps }>
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
								{ icons.upload }{ ' ' }
								{ __(
									'Upload Placeholder Image',
									'flexlayout'
								) }
							</Button>
						) }
					></MediaUpload>
				) : (
					<div
						className={ classnames(
							`image-wrapper`,
							`align-${ align }`
						) }
					>
						{ isSelected ? (
							<Button
								className="remove-image"
								onClick={ onRemoveImage }
							>
								{ icons.remove }
							</Button>
						) : null }
						{ isSelected ? (
							<form
								className="block-library-button__inline-link"
								onSubmit={ ( event ) => event.preventDefault() }
							>
								<Dashicon icon="admin-links" />
								<URLInput
									value={ url }
									onChange={ ( value ) =>
										setAttributes( { url: value } )
									}
								/>
								<IconButton
									icon="editor-break"
									label={ __( 'Apply' ) }
									type="submit"
								/>
							</form>
						) : null }
						<img src={ imgURL } alt="" />
						{ isSelected ? (
							<RichText
								identifier="caption"
								wrapperClassName="image-caption"
								tagName={ 'figcaption' }
								value={ caption }
								onChange={ ( value ) =>
									setAttributes( { caption: value } )
								}
								onRemove={ () => onReplace( [] ) }
								className={ classnames( 'caption' ) }
								placeholder={
									placeholder || __( 'Write caption' )
								}
							/>
						) : null }
					</div>
				) }
				{ ! gifID ? (
					<MediaUpload
						onSelect={ onSelectGif }
						type="image"
						value={ gifID }
						render={ ( { open } ) => (
							<Button
								className={ 'button button-large' }
								onClick={ open }
							>
								{ icons.upload }{ ' ' }
								{ __( 'Upload Animated GIF', 'flexlayout' ) }
							</Button>
						) }
					></MediaUpload>
				) : (
					<div
						className={ classnames(
							`image-wrapper`,
							`block-align-${ align }`
						) }
					>
						{ isSelected ? (
							<Button
								className="remove-image"
								onClick={ onRemoveGif }
							>
								{ icons.remove }
							</Button>
						) : null }
						<img src={ gifURL } alt="" />
					</div>
				) }
			</div>
		</>
	);
};

// Register image block
export default registerBlockType( metadata, {
	icon: 'format-video',
	example: {},
	edit: Edit,
	save() {
		return null;
	},
} );
