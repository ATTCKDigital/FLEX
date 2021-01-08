/**
 * WordPress dependencies
 */
import classnames from 'classnames';
import icons from '../../../js/icons.js'

/**
 * Internal dependencies
 */
const { wp } = window;
const { __ } = wp.i18n;

const {
	registerBlockType,
} = wp.blocks;

const {
	AlignmentToolbar,
	BlockControls,
	BlockAlignmentToolbar,
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

/**
 * Internal dependencies
 */
// Import all of our Margin Options requirements.
import MarginOptions, { MarginOptionsAttributes, MarginOptionsClasses } from '../../components/gb-component_margin';

// Import all of our Border Options requirements.
import PaddingOptions, { PaddingOptionsAttributes, PaddingOptionsClasses } from '../../components/gb-component_padding';

// Import all of our Text Color Options requirements.
import BorderOptions, { BorderOptionsAttributes, BorderOptionsClasses } from '../../components/gb-component_border';

// Import all of our Padding Options requirements.
import TextColorOptions, { TextColorAttributes, TextColorClasses, TextColorInlineStyles } from '../../components/gb-component_text-colors';

// Import all of our Background Options requirements.
import BackgroundColorOptions, { BackgroundColorOptionsAttributes, BackgroundColorOptionsInlineStyles } from '../../components/gb-component_background-color';

/**
 * Register block
 */
export default registerBlockType(
	'flexlayout/paragraph',
	{
		title: __( 'Paragraph' ),
		description: __( 'A simple text block' ),
		category: 'common',
		icon: 'editor-paragraph',
		// parent: ['flexlayout/column'],
		keywords: [
			__( 'Text', 'flexlayout' ),
			__( 'Paragraph', 'flexlayout' ),
			__( 'WYSIWYG', 'flexlayout' ),
			__( 'TinyMCE', 'flexlayout' ),
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
			placeholder: {
				type: 'string',
			},
			...MarginOptionsAttributes,
			...PaddingOptionsAttributes,
			...BorderOptionsAttributes,
			...TextColorAttributes,
			...BackgroundColorOptionsAttributes
		},

		styles: [
			{ name: 'body1', label: __( 'Default', 'block style' ), isDefault: true },
			{ name: 'body2', label: __( 'Body 2', 'block style' ) },
			{ name: 'body3', label: __( 'Body 3', 'block style' ) },
			{ name: 'text-columns', label: __( '2 Column Text', 'block style' ) },
		],

		edit: props => {
			const { 
				attributes: { 
					align,
					content, 
					placeholder
				}, 
				className,
				setAttributes
			} = props;

			const onChangeMessage = content => { setAttributes( { content } ) };
			
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
					<TextColorOptions
						{ ...props }
					/>
					<BackgroundColorOptions
						{ ...props }
					/>
					<PanelBody title={ __( 'Paragraph Alignment' ) } initialOpen={ false }>
						<AlignmentToolbar
							value={ align }
							initialOpen={ false }
							onChange={ ( nextAlign ) => {
								setAttributes( { align: nextAlign } );
							} }
						/>
					</PanelBody>
				</InspectorControls>,
				<div
					className={ classnames(
						`component-paragraph`,
						`align-${align}`,
						className,
						...MarginOptionsClasses( props ),
						...PaddingOptionsClasses( props ),
						...BorderOptionsClasses( props ),
						...TextColorClasses( props ),
					)}
				>
					<RichText
						className={ classnames(
							`align-${align}`,
							...MarginOptionsClasses( props ),
							...PaddingOptionsClasses( props ),
							...BorderOptionsClasses( props ),
							...TextColorClasses( props ),
						)}
						formattingControls = { ['bold', 'italic', 'strikethrough', 'link'] }
						identifier="content"
						multiline='p'
						onChange={ onChangeMessage }
						onRemove={ () => onReplace( [] ) }
						placeholder={ placeholder || __( 'Paragraph text…' ) }
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
