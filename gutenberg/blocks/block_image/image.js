// Block dependencies
import classnames from 'classnames';
import icons from '../../../js/icons.js';

// Internal block libraries
const { __ } = wp.i18n;

const {
	registerBlockType,
} = wp.blocks;

const {
	AlignmentToolbar,
	BlockAlignmentToolbar,
	BlockControls,
	Editable,
	InspectorControls,
	MediaUpload,
	RichText,
	URLInput
} = wp.blockEditor;

const {
	Button,
	CheckboxControl,
	Dashicon,
	IconButton,
	PanelBody,
	TextControl,
	Toolbar
} = wp.components;

// Internal dependencies
import MarginOptions, { MarginOptionsAttributes, MarginOptionsClasses } from '../../components/gb-component_margin';
import BorderOptions, { BorderOptionsAttributes, BorderOptionsClasses } from '../../components/gb-component_border';
import PaddingOptions, { PaddingOptionsAttributes, PaddingOptionsClasses } from '../../components/gb-component_padding';

// Register image block
export default registerBlockType(
	'flexlayout/image',
	{
		title: __( 'Image', 'flexlayout' ),
		description: __( 'Upload an image.', 'flexlayout'),
		category: 'common',
		// icon: icons.upload,
		icon: 'format-image',
		// parent: ['flexlayout/column'],
		keywords: [
			__( 'Image', 'flexlayout' ),
			__( 'MediaUpload', 'flexlayout' )
		],
		attributes: {
			imgURL: {
				type: 'string'
			},
			imgID: {
				type: 'number'
			},
			url: {
				type: 'string'
			},
			caption: {
				type: 'string'
			},
			placeholder: {
				type: 'string'
			},
			align: {
				type: 'string',
				default: 'center'
			},
			CSSWidth: {
				type: 'string',
				default: ''
			},
			opensNewWindow: {
				type: 'boolean',
				default: false
			},
			...MarginOptionsAttributes,
			...PaddingOptionsAttributes,
			...BorderOptionsAttributes
		},
		edit: props => {
			const {
				attributes: {
					align,
					caption,
					CSSWidth,
					imgID,
					imgURL,
					placeholder,
					url
				},
				className,
				setAttributes,
				isSelected
			} = props;

			const onSelectImage = img => {
				setAttributes( {
					imgID: img.id,
					imgURL: img.url
				} );
			};

			const onRemoveImage = () => {
				setAttributes({
					imgID: null,
					imgURL: null
				});
			}

			const setOpenInNewWindow = value => {
				props.setAttributes( { opensNewWindow: value } );
			}

			const NewWindowCheckbox = (a, b) => {
				return (
					<CheckboxControl
						label='Open in new window.'
						help=''
						checked={ props.attributes.opensNewWindow }
						onChange={ setOpenInNewWindow }
					/>
				)
			};

			return [
				<InspectorControls>
					<MarginOptions
						{ ...props }
					/>
					<PaddingOptions
						{ ...props }
					/>
					<BorderOptions
						{ ...props }
					/>
					<PanelBody title={ __( 'Image Settings', 'flexlayout' ) }>
						<p>{ __( ' Alignment', 'flexlayout' ) }</p>
						<AlignmentToolbar
							value={ align }
							onChange={ ( nextAlign ) => {
								setAttributes( { align: nextAlign } );
							} }
						/>
						<p>{ __( ' CSS Width (100%, 50px, auto, etc.)' ) }</p>
						<TextControl
							value={ CSSWidth }
							onChange={ ( nextCSSWidth ) => {
								setAttributes( { CSSWidth: nextCSSWidth } );
							} }
						/>
					</PanelBody>
				</InspectorControls>,
				<BlockControls>
					<AlignmentToolbar
						value={ align }
						onChange={ ( nextAlign ) => {
							setAttributes( { align: nextAlign } );
						} }
					/>
				</BlockControls>,
				<div className={classnames(
					`component-image`,
					`block-align-${align}`,
					...MarginOptionsClasses( props ),
					...PaddingOptionsClasses( props ),
					...BorderOptionsClasses( props )
				)}>
					{ ! imgID ? (
						<MediaUpload
							onSelect={ onSelectImage }
							type="image"
							value={ imgID }
							render={ ( { open } ) => (
								<Button
									className={ "button button-large" }
									onClick={ open }
								>
									{ icons.upload }
									{ __( ' Upload Image', 'flexlayout' ) }
								</Button>
							) }
						>
						</MediaUpload>
					) : (
						<div className={classnames(
							`image-wrapper`,
							`block-align-${align}`,
						)}>
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
									onSubmit={ ( event ) => event.preventDefault() }>
									<div class="margin-left-2x float-left">
										<Dashicon icon="admin-links" className="float-left" />
										<URLInput
											value={ url }
											className="float-left"
											onChange={ ( value ) => setAttributes( { url: value } ) }
											/>
									</div>
									<div class="margin-left-2x float-left position-relative">
										<NewWindowCheckbox />
									</div>
									<Button 
										className="block-align-right float-left clear-left"
										// icon="editor-break" 
										type="submit" 
										>
										Apply changes
									</Button>
								</form>
							) : null }
							<img
								src={ imgURL }
							/>
							{ isSelected ? (
								<RichText
									identifier="caption"
									wrapperClassName="image-caption"
									tagName={ 'figcaption' }
									value={ caption }
									onChange={ ( value ) => setAttributes( { caption: value } ) }
									onRemove={ () => onReplace( [] ) }
									className={ classnames('caption')}
									placeholder={ placeholder || __( 'Write caption' ) }
								/>
							) : null }
						</div>
					)}
				</div>
			];
		},
		save() {
			return null;
		},
	},
);
