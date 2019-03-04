/**
 * Block dependencies
 */
import classnames from 'classnames';
import icons from 'icons';

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
	RichText

} = wp.editor;
const {
	Toolbar,
	Button,
	Dashicon,
	IconButton
} = wp.components;

/**
 * Internal dependencies
 */
// Import all of our Margin Options requirements.
import MarginOptions, { MarginOptionsAttributes, MarginOptionsClasses } from '../../gb-components/gb-component_/margin';


/**
 * Register image block
 */
export default registerBlockType(
	'flexls/image',
	{
		title: __( 'Image', 'flexls' ),
		description: __( 'Upload an image.', 'flexls'),
		category: 'common',
		icon: icons.upload,  
		keywords: [
			__( 'Image', 'flexls' ),
			__( 'MediaUpload', 'flexls' ),
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
			...MarginOptionsAttributes

		},
		edit: props => {
			const { attributes: { imgID, imgURL, url, caption, placeholder},
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

					<MarginOptions
						{ ...props }
					/>
				</InspectorControls>,
				<div className={classnames(
					`component-image`,
					...MarginOptionsClasses( props ),
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
									{ __( ' Upload Image', 'flexls' ) }
								</Button>
							) }
						>
						</MediaUpload>

					) : (

						<div class="image-wrapper">

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
