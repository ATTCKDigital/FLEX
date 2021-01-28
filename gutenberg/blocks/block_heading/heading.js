// Block dependencies
import classnames from 'classnames';
import HeadingToolbar from './heading-toolbar';
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
	InnerBlocks,
	InspectorControls,
	MediaUpload,
	RichText,
	URLInput,
} = wp.blockEditor;

const {
	Button,
	ButtonGroup,
	Dashicon,
	IconButton,
	PanelBody,
	PanelRow,
	TextControl,
	Toolbar,
	Tooltip,
} = wp.components;

// Internal dependencies
import MarginOptions, { MarginOptionsAttributes, MarginOptionsClasses } from '../../components/gb-component_margin';
import PaddingOptions, { PaddingOptionsAttributes, PaddingOptionsClasses } from '../../components/gb-component_padding';
import BorderOptions, { BorderOptionsAttributes, BorderOptionsClasses } from '../../components/gb-component_border';
import TextColorOptions, { TextColorAttributes, TextColorClasses, TextColorInlineStyles } from '../../components/gb-component_text-colors';
import BackgroundColorOptions, { BackgroundColorOptionsAttributes, BackgroundColorOptionsInlineStyles } from '../../components/gb-component_background-color';

// Register block
export default registerBlockType(
	'flexlayout/heading',
	{
		title: __( 'Heading' ),
		description: __( 'Introduce new sections and organize content to help visitors (and search engines) understand the structure of your content.' ),
		category: 'common',
		// icon: 'heading',
		icon: icons.heading,
		// parent: ['flexlayout/column'],
		keywords: [
			__( 'Text', 'flexlayout' ),
			__( 'Heading', 'flexlayout' ),
			__( 'Header', 'flexlayout' ),
		],
		attributes: {
			align: {
				type: 'string',
				default: 'left'
			},
			content: {
				type: 'string',
				default: '',
			},
			imgURL: {
				type: 'string',
			},
			imgID: {
				type: 'number',
			},
			level: {
				type: 'number',
				default: 2,
			},
			placeholder: {
				type: 'string',
			},
			url: {
				type: 'string',
			},
			...MarginOptionsAttributes,
			...PaddingOptionsAttributes,
			...BorderOptionsAttributes,
			...TextColorAttributes,
			...BackgroundColorOptionsAttributes
		},

		edit: props => {
			const {
                attributes: {
                	align,
                	content,
                	placeholder,
                	imgID,
                	imgURL,
                	isSelected,
                	level,
                	url
                },
				className,
				setAttributes
			} = props;

			const tagName = 'h' + level;

			const onChangeMessage = content => { 
				setAttributes( { 
					content 
				} ) 
			};

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
					<BackgroundColorOptions
						{ ...props }
					/>
					<TextColorOptions
						{ ...props }
					/>
					<BorderOptions
						{ ...props }
					/>
					<MarginOptions
						{ ...props }
					/>
					<PaddingOptions
						{ ...props }
					/>
					<PanelBody title={ __('Heading Settings' ) } initialOpen={ false }>
						<p>{ __( 'HTML Element' ) }</p>
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
						<p>{ __( 'Icon left of the Heading' ) }</p>
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
				</InspectorControls>,
				<div className={classnames(
					`component-heading`,
					className
				)}>
					<img
						src={ imgURL }
					/>
					<RichText
						className={ classnames(
							`text-align-${align}`,
							...BorderOptionsClasses( props ),
							...MarginOptionsClasses( props ),
							...PaddingOptionsClasses( props ),
							...TextColorClasses( props ),
						)}
						identifier="content"
						// onChange={ ( value ) => setAttributes( { content: value } ) }
						onChange={ onChangeMessage }
						onRemove={ () => onReplace( [] ) }
						placeholder={ placeholder || __( 'Heading text…' ) }
						style={ {
							textAlign: align,
							...TextColorInlineStyles( props ),
							...BackgroundColorOptionsInlineStyles( props )
						} }
						value={ content }
					/>
				</div>
			];

		},

		save() {
			return null;
		},

	},
);

// Add default styles
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
