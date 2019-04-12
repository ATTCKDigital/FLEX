/**
 * Block dependencies
 */
import classnames from 'classnames';
import icons from '../../../js/icons.js'

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const {
	registerBlockType,
} = wp.blocks;
const {
	Editable,
	MediaUpload,
	InspectorControls,
	URLInput,
	RichText,
	AlignmentToolbar

} = wp.editor;
const {
	Toolbar,
	Button,
	Dashicon,
	IconButton,
	PanelBody
} = wp.components;

/**
 * Internal dependencies
 */
// Import all of our Margin Options requirements.
import MarginOptions, { MarginOptionsAttributes, MarginOptionsClasses } from '../../components/gb-component_margin';
// Import all of our Border Options requirements.
import BorderOptions, { BorderOptionsAttributes, BorderOptionsClasses } from '../../components/gb-component_border';
// Import all of our Padding Options requirements.
import PaddingOptions, { PaddingOptionsAttributes, PaddingOptionsClasses } from '../../components/gb-component_padding';


/**
 * Register image block
 */
export default registerBlockType(
	'flexlayout/image',
	{
		title: __( 'Image', 'flexlayout' ),
		description: __( 'Upload an image.', 'flexlayout'),
		category: 'common',
		icon: icons.upload,
		parent: ['flexlayout/column'],
		keywords: [
			__( 'Image', 'flexlayout' ),
			__( 'MediaUpload', 'flexlayout' ),
		],
		attributes: {
			imgURL: {
				type: 'string',
			},
			imgID: {
				type: 'number',
			},
			url: {
				type: 'string',
			},
			caption: {
				type: 'string',
			},
			placeholder: {
				type: 'string',
			},
			align: {
				type: 'string',
				default: 'center'
			},
			...MarginOptionsAttributes,
			...PaddingOptionsAttributes,
			...BorderOptionsAttributes,

		},
		edit: props => {
			const { attributes: { imgID, imgURL, url, caption, align, placeholder},
				className, setAttributes, isSelected } = props;
			const onSelectImage = img => {
				setAttributes( {
					imgID: img.id,
					imgURL: img.url,
				} );
			};
			const onRemoveImage = () => {
				setAttributes({
					imgID: null,
					imgURL: null,
				});
			}
			return [
				<InspectorControls>
					<PanelBody title={ __( 'Heading Settings' ) }>
						<p>{ __( 'Image Alignment' ) }</p>
						<AlignmentToolbar
							value={ align }
							onChange={ ( nextAlign ) => {
								setAttributes( { align: nextAlign } );
							} }
						/>
					</PanelBody>
					<MarginOptions
						{ ...props }
					/>
					<PaddingOptions
						{ ...props }
					/>
					<BorderOptions
						{ ...props }
					/>
				</InspectorControls>,
				<div className={classnames(
					`component-image`,
					`align-${align}`,
					...MarginOptionsClasses( props ),
					...PaddingOptionsClasses( props ),
					...BorderOptionsClasses( props ),
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
							`align-${align}`,
						)}>

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
									onSubmit={ ( event ) => event.preventDefault() }>
									<Dashicon icon="admin-links" />
									<URLInput
										value={ url }
										onChange={ ( value ) => setAttributes( { url: value } ) }
									/>
									<IconButton icon="editor-break" label={ __( 'Apply' ) } type="submit" />
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
