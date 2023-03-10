console.log('FLEX/gutenberg/blocks/block_text/text.js');

// Block dependencies
import classnames from 'classnames';
import icons from '../../../js/icons.js'
import edit from './text-edit';

// Internal dependencies
const { wp } = window;
const { __ } = wp.i18n;

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
	Dashicon,
	IconButton,
	PanelBody,
	PanelRow,
	TextControl,
	Toolbar,
	ToolbarButton,
	Tooltip,
} = wp.components;

// const {
// 	InspectorControls,
// 	InnerBlocks,
// } = wp.editor;

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
		title: __( 'Text', 'flexlayout' ),
		description: __( 'Provides a rich-text editing toolbar' ),
		category: 'common',
		icon: icons.text,
		example: {},
		// parent: ['flexlayout/column'],
		keywords: [
			__( 'Text', 'flexlayout' ),
			__( 'WYSIWYG', 'flexlayout' ),
			__( 'TinyMCE', 'flexlayout' ),
			__( 'p', 'flexlayout' ),
		],
		attributes: {
			align: {
				type: 'string',
				default: 'left',
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

		innerBlocks: [],

		// styles: [
		// 	{ name: 'body1', label: __( 'Default', 'block style' ), isDefault: true },
		// 	{ name: 'body2', label: __( 'Body 2', 'block style' ) },
		// 	{ name: 'body3', label: __( 'Body 3', 'block style' ) },
		// 	{ name: 'subheadline1', label: __( 'Subheadline 1', 'block style' ) },
		// 	{ name: 'subheadline2', label: __( 'Subheadline 2', 'block style' ) },
		// 	{ name: 'text-columns', label: __( '2 Column Text', 'block style' ) },
		// ],

		edit,

		xedit: props => {
			console.log('text.js > edit, props.attributes: ', props.attributes);
			console.log('text.js > edit, props: ');
			console.table(props);

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
				console.log('text.js > edit, onChangeMessage: ', onChangeMessage);

				setAttributes({
					content 
				});
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
						`component-text`,
						`align-${align}`,
						className,
						...MarginOptionsClasses(props),
						...PaddingOptionsClasses(props),
						...BorderOptionsClasses(props),
						...TextColorClasses(props),
					)}
				>
					<RichText
						className={ classnames(
							// `align-${align}`,
							// ...MarginOptionsClasses(props),
							// ...PaddingOptionsClasses(props),
							// ...BorderOptionsClasses(props),
							...TextColorClasses(props),
						)}
						identifier="content"
						formattingControls = { ['bold', 'italic', 'strikethrough', 'link'] }
						multiline='p' // <-- This is a critical differentiatorfrom the heading block
						onChange={ onChangeMessage }
						onRemove={ () => onReplace( [] ) }
						placeholder={ placeholder || __( 'Rich text…' ) }
						// style={{
						// 	textAlign: align,
						// 	...TextColorInlineStyles(props),
						// 	...BackgroundColorOptionsInlineStyles(props)
						// }}
						value={ content }
					/>
				</div>
			];
		},

		save(data) {
			console.log('text.js > save(data:) "');
			console.log(data.attributes.content, '" ', data);

			// return <InnerBlocks.Content />;
			return null;
		},
	},
);
