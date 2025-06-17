console.log('FLEX/gutenberg/blocks/block_animated-gif/animated-gif.js');

// Block dependencies
import classnames from 'classnames';
import icons from '../../../js/icons.js'

// Internal block libraries
const { __ } = wp.i18n;

// WordPress dependencies
const { registerBlockType } = wp.blocks;

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
	Dashicon,
	IconButton,
	PanelBody,
	TextControl,
	Toolbar
} = wp.components;

// Internal dependencies
import DataComponentNameOptions, { DataComponentNameAttributes } from '../../components/gb-component_data-component-name';
import MarginOptions, { MarginOptionsAttributes, MarginOptionsClasses } from '../../components/gb-component_margin';
import BorderOptions, { BorderOptionsAttributes, BorderOptionsClasses } from '../../components/gb-component_border';
import PaddingOptions, { PaddingOptionsAttributes, PaddingOptionsClasses } from '../../components/gb-component_padding';

// Register image block
export default registerBlockType(
	'flexlayout/animated-gif',
	{
		title: __( 'Animated GIF', 'flexlayout' ),
		description: __( 'Swaps in large animated gif files on Scroll-In.', 'flexlayout'),
		category: 'common',
		// icon: icons.gif,
		icon: 'format-video',
		example: {},
		// parent: ['flexlayout/column'],
		keywords: [
			__( 'Image', 'flexlayout' ),
			__( 'MediaUpload', 'flexlayout' ),
		],
		attributes: {
			align: {
				type: 'string',
				default: 'center'
			},
			caption: {
				type: 'string',
			},
			CSSWidth: {
				type: 'string',
				default: ''
			},
			gifURL: {
				type: 'string',
			},
			gifID: {
				type: 'number',
			},
			imgURL: {
				type: 'string',
			},
			imgID: {
				type: 'number',
			},
			placeholder: {
				type: 'string',
			},
			url: {
				type: 'string',
			},
			...BorderOptionsAttributes,
			...DataComponentNameAttributes,
			...MarginOptionsAttributes,
			...PaddingOptionsAttributes,
		},
		edit: props => {
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
					url
				},
				className, 
				setAttributes, 
				isSelected 
			} = props;

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

			const onSelectGif = gif => {
				setAttributes( {
					gifID: gif.id,
					gifURL: gif.url,
				} );
			};

			const onRemoveGif = () => {
				setAttributes({
					gifID: null,
					gifURL: null,
				});
			}

			return [
				<InspectorControls>
					<BorderOptions
						{ ...props }
					/>
					<MarginOptions
						{ ...props }
					/>
					<PaddingOptions
						{ ...props }
					/>
					<PanelBody title={ __( 'Image Settings' ) }>
						<p>{ __( 'Alignment' ) }</p>
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
					<DataComponentNameOptions
						{ ...props }
					/>
				</InspectorControls>,
				<BlockControls>
					<AlignmentToolbar
						value={ align }
						onChange={ ( nextAlign ) => {
							setAttributes( { align: nextAlign } );
						} }
					/>
				</BlockControls>,
				<div 
					className={classnames(
						`component-image component-animated-gif`,
						`block-align-${align}`,
						...MarginOptionsClasses( props ),
						...PaddingOptionsClasses( props ),
						...BorderOptionsClasses( props ),
					)}
					data-component-name={ dataComponentName } 
					data-component-options={ dataComponentOptions }
				>
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
									{ __( ' Upload Placeholder Image', 'flexlayout' ) }
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
					{ ! gifID ? (
						<MediaUpload
							onSelect={ onSelectGif }
							type="image"
							value={ gifID }
							render={ ( { open } ) => (
								<Button
									className={ "button button-large" }
									onClick={ open }
								>
									{ icons.upload }
									{ __( ' Upload Animated GIF', 'flexlayout' ) }
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
									onClick={ onRemoveGif }
								>
									{ icons.remove }
								</Button>
							) : null }
							<img
								src={ gifURL }
							/>
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
