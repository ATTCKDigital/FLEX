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

const { Button, CheckboxControl, Dashicon, PanelBody, TextControl } =
	wp.components;

// Internal dependencies
import BorderOptions, {
	BorderOptionsClasses,
} from '../../components/gb-component_border';
import DataComponentNameOptions from '../../components/gb-component_data-component-name';
import MarginOptions, {
	MarginOptionsClasses,
} from '../../components/gb-component_margin';
import PaddingOptions, {
	PaddingOptionsClasses,
} from '../../components/gb-component_padding';

// Editor component (named so the react-hooks lint rule recognises useBlockProps).
const Edit = ( props ) => {
	const {
		attributes: {
			align,
			caption,
			CSSHeight,
			CSSWidth,
			dataComponentName,
			dataComponentOptions,
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

	const setOpenInNewWindow = ( value ) => {
		props.setAttributes( { opensNewWindow: value } );
	};

	const NewWindowCheckbox = () => {
		return (
			<CheckboxControl
				label="Open in new window."
				help=""
				checked={ props.attributes.opensNewWindow }
				onChange={ setOpenInNewWindow }
			/>
		);
	};

	const blockProps = useBlockProps( {
		className: classnames(
			`component-image`,
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
				<PanelBody title={ __( 'Image Settings', 'flexlayout' ) }>
					<p>{ __( 'Alignment', 'flexlayout' ) }</p>
					<AlignmentToolbar
						value={ align }
						onChange={ ( nextAlign ) => {
							setAttributes( { align: nextAlign } );
						} }
					/>
					<p>{ __( 'CSS Height (100%, 50px, auto, etc.)' ) }</p>
					<TextControl
						value={ CSSHeight }
						onChange={ ( nextCSSHeight ) => {
							setAttributes( { CSSHeight: nextCSSHeight } );
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
								{ __( 'Upload Image', 'flexlayout' ) }
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
								onClick={ onRemoveImage }
							>
								{ icons.remove } Remove image
							</Button>
						) : null }
						{ isSelected ? (
							<form
								className="block-library-button__inline-link"
								onSubmit={ ( event ) => event.preventDefault() }
							>
								<div className="margin-left-2x float-left">
									<Dashicon
										icon="admin-links"
										className="float-left"
									/>
									<URLInput
										value={ url }
										className="float-left"
										onChange={ ( value ) =>
											setAttributes( { url: value } )
										}
									/>
								</div>
								<div className="margin-left-2x float-left position-relative">
									<NewWindowCheckbox />
								</div>
								<Button
									className="block-align-right float-left clear-left"
									type="submit"
								>
									Apply changes
								</Button>
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
			</div>
		</>
	);
};

// Register image block
export default registerBlockType( metadata, {
	icon: 'format-image',
	example: {},
	edit: Edit,
	save() {
		return null;
	},
} );
