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
	RichText,
	InspectorControls,
	MediaUpload,
	URLInput
} = wp.editor;
const {
	Button,
	PanelBody,
	PanelRow,
	TextControl,

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
// Import all of our Background Options requirements.
import BackgroundOptions, { BackgroundOptionsAttributes, BackgroundOptionsClasses, BackgroundOptionsInlineStyles, BackgroundOptionsVideoOutput } from '../../components/gb-component_background-options';
// Import all of our Text Color Options requirements.
import TextColorOptions, { TextColorAttributes, TextColorClasses } from '../../components/gb-component_text-colors';


/**
	* Register block
 */
export default registerBlockType(
	'flexlayout/quote',
	{
		title: __( 'Quote' ),
		description: __( 'A stylized pull quote with a source' ),
		category: 'common',
		icon: 'editor-quote',
		parent: ['flexlayout/column'],
		keywords: [
			__( 'Text', 'flexlayout' ),
			__( 'Quote', 'flexlayout' ),
		],
		attributes: {
			imgURL: {
				type: 'string',
			},
			
			imgID: {
				type: 'number',
			},

			content: {
				type: 'string',
				default: '',
			},

			placeholder: {
				type: 'string',
			},

			contentSource: {
				type: 'string',
				default: '',
			},

			contentCompany: {
				type: 'string',
				default: '',
			},

			placeholderSource: {
				type: 'string',
			},
			...MarginOptionsAttributes,
			...PaddingOptionsAttributes,
			...BorderOptionsAttributes,
			...BackgroundOptionsAttributes,
			...TextColorAttributes

		},

		edit: props => {
			const { attributes: { imgID, imgURL, content, placeholder, contentSource, contentCompany, placeholderSource},
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
					<BackgroundOptions
						{ ...props }
					/>
					<MarginOptions
						{ ...props }
					/>
					<TextColorOptions
						{ ...props }
					/>
				</InspectorControls>,
				<div
					className={ classnames(
						`component-quote`,
						...MarginOptionsClasses( props ),
						...PaddingOptionsClasses( props ),
						...BorderOptionsClasses( props ),						
						...BackgroundOptionsClasses( props ),
						...TextColorClasses( props ),

					)}
					style={ {
						...BackgroundOptionsInlineStyles( props ),
					} }
				>
					{ BackgroundOptionsVideoOutput( props ) }
					<RichText
						identifier="content"
						tagName={ 'h5' }
						value={ content }
						onChange={ ( value ) => setAttributes( { content: value } ) }
						onRemove={ () => onReplace( [] ) }
						className={ classnames(
							`quote-text`,
						)}
						placeholder={ placeholder || __( 'Quote text…' ) }
					/>
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
									{ __( 'Upload Image', 'flexlayout' ) }
								</Button>
							) }
						>
						</MediaUpload>

					) : (

						<div className={classnames(
							`image-wrapper`,
						)}>

							{ isSelected ? (

								<Button
									className="remove-image"
									onClick={ onRemoveImage }
								>
									{ icons.remove }
								</Button>
							) : null }
							
							<img
								src={ imgURL }
							/>
							
						</div>
					)}
					<RichText
						identifier="contentSource"
						tagName={ 'cite' }
						value={ contentSource }
						onChange={ ( value ) => setAttributes( { contentSource: value } ) }
						onRemove={ () => onReplace( [] ) }
						className={ classnames(
							`quote-source`,
						)}
						placeholder={ placeholderSource || __( 'Quote source' ) }
					/>
					<RichText
						identifier="contentCompany"
						tagName={ 'cite' }
						value={ contentCompany }
						onChange={ ( value ) => setAttributes( { contentCompany: value } ) }
						onRemove={ () => onReplace( [] ) }
						className={ classnames(
							`quote-company`,
						)}
						placeholder={ placeholderSource || __( 'Quote author company' ) }
					/>
				</div>
			];

		},

		save() {
			return null;
		},

	},
);
