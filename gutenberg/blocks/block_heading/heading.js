console.log('FLEX/gutenberg/blocks/block_heading/heading.js');

// Block dependencies
import classnames from 'classnames';
import HeadingToolbar from './heading-toolbar';
import icons from '../../../js/icons.js';

// Internal block libraries
const { __ } = wp.i18n;

// WordPress dependencies
const { registerBlockType } = wp.blocks;

// Added 3/26/20 - https://ibenic.com/enable-inner-blocks-gutenberg/
// wp.editor.InnerBlocks.Content is deprecated. 
// Please use wp.blockEditor.InnerBlocks.Content instead.
// const { InnerBlocks } = wp.editor;

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
	CheckboxControl,
	Dashicon,
	PanelBody,
	PanelRow,
	TextControl,
	Toolbar,
	ToolbarButton,
	Tooltip,
} = wp.components;

const { 
	setState, 
	withSelect, 
	withDispatch 
} = wp.data;

// Internal dependencies
import BackgroundColorOptions, { BackgroundColorOptionsAttributes, BackgroundColorOptionsInlineStyles } from '../../components/gb-component_background-color';
import BorderOptions, { BorderOptionsAttributes, BorderOptionsClasses } from '../../components/gb-component_border';
import DataComponentNameOptions, { DataComponentNameAttributes } from '../../components/gb-component_data-component-name';
import MarginOptions, { MarginOptionsAttributes, MarginOptionsClasses } from '../../components/gb-component_margin';
import PaddingOptions, { PaddingOptionsAttributes, PaddingOptionsClasses } from '../../components/gb-component_padding';
import TextColorOptions, { TextColorAttributes, TextColorClasses, TextColorInlineStyles } from '../../components/gb-component_text-colors';

// Register block
export default registerBlockType(
	'flexlayout/heading',
	{
		'title': __( 'Heading', 'flexlayout' ),
		'description': __( 'Introduce new sections and organize content to help visitors (and search engines) understand the structure of your content.', 'flexlayout' ),
		'category': 'common',
		'icon': icons.heading,
		'keywords': [
			__( 'Text', 'flexlayout' ),
			__( 'Heading', 'flexlayout' ),
			__( 'Header', 'flexlayout' ),
		],
		'attributes': {
			'align': {
				'type': 'string',
				'default': 'left'
			},
			'content': {
				'type': 'string',
				'default': ''
			},
			'hangingQuote': {
				'type': 'boolean',
				'default': false
			},
			'hangingQuoteClass': {
				'type': 'string',
				'default': 'hide-hanging-quote'
			},
			'imgID': {
				'type': 'number',
			},
			'imgURL': {
				'type': 'string',
			},
			'isSelected': {
				'type': 'boolean',
			},
			'level': {
				'type': 'number',
				'default': 2,
			},
			'placeholder': {
				'type': 'string',
			},
			'url': {
				'type': 'string',
			},
			...BackgroundColorOptionsAttributes,
			...BorderOptionsAttributes,
			...DataComponentNameAttributes,
			...MarginOptionsAttributes,
			...PaddingOptionsAttributes,
			...TextColorAttributes
		},

		innerBlocks: [],

		styles: [
			{ 'name': 'headline1', 'label': __('Headline 1', 'block style'), 'isDefault': true },
			{ 'name': 'headline2', 'label': __('Headline 2', 'block style') },
			{ 'name': 'headline3', 'label': __('Headline 3', 'block style') },
			{ 'name': 'headline4', 'label': __('Headline 4', 'block style') },
			{ 'name': 'headline5', 'label': __('Headline 5', 'block style') },
			{ 'name': 'headline6', 'label': __('Headline 6', 'block style') }
		],

		supports: {
			// Turn off ability to edit HTML of block content
			html: false,
		},

		edit: props => {
			const {
				attributes: {
					align,
					content,
					dataComponentName,
					dataComponentOptions,
					hangingQuote,
					hangingQuoteClass,
					imgID,
					imgURL,
					isSelected,
					level,
					placeholder,
					url
				},
				className,
				setAttributes
			} = props;

			const tagName = 'h' + level;

			const HangingQuoteCheckbox = (a, b) => {
				// console.log('HangingQuoteCheckbox, props.attributes.hangingQuote: a: b: ', props.attributes.hangingQuote, typeof props.attributes.hangingQuote, a, b);

				return (
					<CheckboxControl
						label="Show hanging quote"
						help="Adds a left-hanging quote graphic"
						checked={ props.attributes.hangingQuote }
						onChange={ setHangingQuote }
					/>
				)
			};

			const onChangeMessage = content => { 
				setAttributes({
					content
				});
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
			};

			const setHangingQuote = (value) => {
				// console.log('HangingQuoteCheckbox, value: ', value, typeof value, value === true);

				if (value === true) {
					// console.log('show');
					props.setAttributes( { hangingQuoteClass: 'show-hanging-quote' } );
				} else {
					// console.log('hide');
					value = false;
					props.setAttributes( { hangingQuoteClass: 'hide-hanging-quote' } );
				}

				// console.log('value: ', value);

				props.setAttributes( { hangingQuote: value } );
			}

			const svgHeight = {
				height: 0
			};

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
						<HeadingToolbar 
							minLevel={ 1 } 
							maxLevel={ 7 } 
							selectedLevel={ level } 
							onChange={ ( newLevel ) => setAttributes( { 'level': newLevel } ) } 
						/>
						<hr />
						<p>{ __( 'Text Alignment' ) }</p>
						<AlignmentToolbar
							value={ align }
							onChange={ ( nextAlign ) => {
								setAttributes( { 'align': nextAlign } );
							} }
						/>
						<hr />
						<p>
							<HangingQuoteCheckbox />
						</p>
						<hr />
						<p>{ __( 'Optional URL' ) }</p>
						<form
							className="block-library-button__inline-link heading-url"
							onSubmit={ ( event ) => event.preventDefault() }>
							<URLInput
								value={ url }
								onChange={ ( value ) => setAttributes( { 'url': value } ) }
							/>
							<Button 
								icon="editor-break" 
								text={ __( 'Apply' ) } 
								// type="submit" 
							/>
						</form>
						<hr />
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
								`text-align-${align}`,
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
					<DataComponentNameOptions
						{ ...props }
					/>
				</InspectorControls>,
				<div 
					className={classnames(
						`component-heading`,
						`${hangingQuoteClass}`,
						className
					)}
					data-component-name={ props.attributes.dataComponentName }
					data-component-options={ props.attributes.dataComponentOptions }
				>
					<img 
						// Use empty SVG to trigger onload event 
						// Onload hack fires when block is added
						className="onload-hack-pp"
						height="0"
						width="0"
						onLoad={ setHangingQuote }
						src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1' %3E%3Cpath d=''/%3E%3C/svg%3E"
						style={ svgHeight }
					/>
					<img
						src={ imgURL }
					/>
					<RichText
						className={ classnames(
							`text-align-${align}`,
							`${hangingQuoteClass}`,
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
							// textAlign: align,
							...TextColorInlineStyles( props ),
							...BackgroundColorOptionsInlineStyles( props )
						} }
						value={ content }
					/>
				</div>
			];
		},

		save(data) {
			// console.log('heading.js > save(data:) "', data.attributes.content, '" ', data);

			return null;
		},
		// save(data) {
		// 	return null;
		// },
	},
);


// Add default styles
// wp.blocks.registerBlockStyle( 'flexlayout/heading', {
//     name: 'headline1',
//     label: 'Headline 1'
// } );

// wp.blocks.registerBlockStyle( 'flexlayout/heading', {
//     name: 'headline2',
//     label: 'Headline 2'
// } );

// wp.blocks.registerBlockStyle( 'flexlayout/heading', {
//     name: 'headline3',
//     label: 'Headline 3'
// } );

// wp.blocks.registerBlockStyle( 'flexlayout/heading', {
//     name: 'headline4',
//     label: 'Headline 4'
// } );

// wp.blocks.registerBlockStyle( 'flexlayout/heading', {
//     name: 'headline5',
//     label: 'Headline 5'
// } );

// wp.blocks.registerBlockStyle( 'flexlayout/heading', {
//     name: 'headline6',
//     label: 'Headline 6'
// } );