// Block dependencies
import classnames from 'classnames';
import icons from '../../../js/icons.js'
import edit from './text-edit';

// Internal dependencies
const { wp } = window;
const { __ } = wp.i18n;

const { registerBlockType } = wp.blocks;

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
	ToolbarButton,
	Tooltip,
} = wp.components;

// Internal dependencies
import MarginOptions, { MarginOptionsAttributes, MarginOptionsClasses } from '../../components/gb-component_margin';
import BorderOptions, { BorderOptionsAttributes, BorderOptionsClasses } from '../../components/gb-component_border';
import PaddingOptions, { PaddingOptionsAttributes, PaddingOptionsClasses } from '../../components/gb-component_padding';
import TextColorOptions, { TextColorAttributes, TextColorClasses, TextColorInlineStyles } from '../../components/gb-component_text-colors';
import BackgroundColorOptions, { BackgroundColorOptionsAttributes, BackgroundColorOptionsInlineStyles } from '../../components/gb-component_background-color';

// Register block
export default registerBlockType(
	'flexlayout/text',
	{
		title: __( 'Text', 'Rich Text' ),
		description: __( 'Provides a rich-text editing toolbar' ),
		icon: icons.text,
		category: 'common',
		// parent: ['flexlayout/column'],
		keywords: [
			__( 'Text', 'flexlayout' ),
			__( 'WYSIWYG', 'flexlayout' ),
			__( 'TinyMCE', 'flexlayout' ),
			__( 'p', 'flexlayout' ),
		],
		attributes: {
			content: {
				type: 'string',
			},
			...MarginOptionsAttributes,
			...PaddingOptionsAttributes,
			...BorderOptionsAttributes,
			...BackgroundColorOptionsAttributes
		},
		innerBlocks: [],
		supports: {
			className: true,
			customClassName: true,
			// Hide 'Add to Reusable Blocks' on Classic blocks. Showing it causes a
			// confusing UX, because of its similarity to the 'Convert to Blocks' button.
			reusable: false,
		},

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

			const onChangeMessage = content => { 
				console.log('onChangeMessage: ', onChangeMessage);

				setAttributes( { 
					content 
				} ); 
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
					<PanelBody title={ __( 'Paragraph Alignment', 'flexlayout' ) } initialOpen={ false }>
						<p>{ __( ' Alignment', 'flexlayout' ) }</p>
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
							// `align-${align}`,
							// ...MarginOptionsClasses( props ),
							// ...PaddingOptionsClasses( props ),
							// ...BorderOptionsClasses( props ),
							...TextColorClasses( props ),
						)}
						identifier="content"
						formattingControls = { ['bold', 'italic', 'strikethrough', 'link'] }
						multiline='p' // <-- This is a critical differentiatorfrom the heading block
						onChange={ onChangeMessage }
						onRemove={ () => onReplace( [] ) }
						placeholder={ placeholder || __( 'Rich text…' ) }
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
			return <InnerBlocks.Content />;
		},
	},
);
