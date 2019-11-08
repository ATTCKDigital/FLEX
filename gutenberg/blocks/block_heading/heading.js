/**
 * Block dependencies
 */
import classnames from 'classnames';
import HeadingToolbar from './heading-toolbar';
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
	AlignmentToolbar,
	BlockControls,
	BlockAlignmentToolbar,
	InspectorControls,
	InnerBlocks,
	URLInput,
	MediaUpload,
} = wp.editor;
const {
	Toolbar,
	Button,
	ButtonGroup,
	Tooltip,
	PanelBody,
	PanelRow,
	TextControl,
	Dashicon,
	IconButton,
} = wp.components;

/**
 * Internal dependencies
 */
// Import all of our Margin Options requirements.
import MarginOptions, { MarginOptionsAttributes, MarginOptionsClasses } from '../../components/gb-component_margin';
// Import all of our Text Color Options requirements.
import TextColorOptions, { TextColorAttributes, TextColorClasses, TextColorInlineStyles } from '../../components/gb-component_text-colors';
// Import all of our Border Options requirements.
import BorderOptions, { BorderOptionsAttributes, BorderOptionsClasses } from '../../components/gb-component_border';
// Import all of our Padding Options requirements.
import PaddingOptions, { PaddingOptionsAttributes, PaddingOptionsClasses } from '../../components/gb-component_padding';

/**
	* Register block
 */
export default registerBlockType(
	'flexlayout/heading',
	{
		title: __( 'Heading' ),
		description: __( 'Introduce new sections and organize content to help visitors (and search engines) understand the structure of your content.' ),
		category: 'common',
		icon: 'heading',
		parent: ['flexlayout/column'],
		keywords: [
			__( 'Text', 'flexlayout' ),
			__( 'Heading', 'flexlayout' ),
			__( 'Header', 'flexlayout' ),
		],
		attributes: {
			content: {
				type: 'string',
				default: '',
			},
			level: {
				type: 'number',
				default: 2,
			},
			align: {
				type: 'string',
				default: 'left'
			},
			placeholder: {
				type: 'string',
			},
			url: {
				type: 'string',
			},
			imgURL: {
				type: 'string',
			},
			imgID: {
				type: 'number',
			},
			...MarginOptionsAttributes,
			...PaddingOptionsAttributes,
			...BorderOptionsAttributes,
			...TextColorAttributes
		},

		edit: props => {
			const {
                attributes: {
                	content, 
                	level, 
                	align, 
                	placeholder, 
                	url, 
                	imgID, 
                	imgURL, 
                	isSelected
                },
				className, 
				setAttributes 
			} = props;

			const tagName = 'h' + level;
			const onSelectImage = img => {
				setAttributes({
					imgID: img.id,
					imgURL: img.url,
				});
			};

			const onRemoveImage = () => {
				setAttributes({
					imgID: null,
					imgURL: null,
				});
			}

			return [
				<InspectorControls>
					<PanelBody title={ __('Heading Settings' ) }>
						<p>{ __( 'Level' ) }</p>
						<HeadingToolbar minLevel={ 1 } maxLevel={ 7 } selectedLevel={ level } onChange={ ( newLevel ) => setAttributes( { level: newLevel } ) } />
						<p>{ __( 'Text Alignment' ) }</p>
						<AlignmentToolbar
							value={ align }
							onChange={ ( nextAlign ) => {
								setAttributes( { align: nextAlign } );
							} }
						/>
						<p>{ __( 'Optional URL' ) }</p>
						<form
							className="block-library-button__inline-link heading-url"
							onSubmit={ ( event ) => event.preventDefault() }>
							<URLInput
								value={ url }
								onChange={ ( value ) => setAttributes( { url: value } ) }
							/>
							<IconButton icon="editor-break" label={ __( 'Apply' ) } type="submit" />
						</form>
						<p>{ __( 'Icon Next to the Heading' ) }</p>
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


								<Button
									className="remove-image"
									onClick={ onRemoveImage }
								>
									{ icons.remove }
								</Button>
								
								<img
									src={ imgURL }
								/>
							</div>
						)}
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
					<TextColorOptions
						{ ...props }
					/>

								

				</InspectorControls>,
				<div className={classnames(
					`component-heading`
				)}>
					<img
						src={ imgURL }
					/>
					<RichText
						identifier="content"
						wrapperClassName=""
						value={ content }
						onChange={ ( value ) => setAttributes( { content: value } ) }
						onRemove={ () => onReplace( [] ) }
						style={ {
							textAlign: align,
							...TextColorInlineStyles( props )
						} }
						className={ classnames(
							className,
							`align-${align}`,
							...MarginOptionsClasses( props ),
							...PaddingOptionsClasses( props ),
							...BorderOptionsClasses( props ),
							...TextColorClasses( props ),
						)}
						placeholder={ placeholder || __( 'Write heading…' ) }
					/>
				</div>
			];

		},

		save() {
			return null;
		},

	},
);
//Add default styles
wp.blocks.registerBlockStyle( 'flexlayout/heading', {
    name: 'headline1',
    label: 'Headline 1'
} );

wp.blocks.registerBlockStyle( 'flexlayout/heading', {
    name: 'headline2',
    label: 'Headline 2'
} );

wp.blocks.registerBlockStyle( 'flexlayout/heading', {
    name: 'headline3',
    label: 'Headline 3'
} );

wp.blocks.registerBlockStyle( 'flexlayout/heading', {
    name: 'headline4',
    label: 'Headline 4'
} );

wp.blocks.registerBlockStyle( 'flexlayout/heading', {
    name: 'headline5',
    label: 'Headline 5'
} );

wp.blocks.registerBlockStyle( 'flexlayout/heading', {
    name: 'headline6',
    label: 'Headline 6'
} );
