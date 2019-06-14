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
	AlignmentToolbar,
	InspectorControls,
	MediaUpload,
	URLInput,
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
// Import all of our Text Color Options requirements.
import TextColorOptions, { TextColorAttributes, TextColorClasses, TextColorInlineStyles } from '../../components/gb-component_text-colors';


/**
	* Register block
 */
export default registerBlockType(
	'flexlayout/paragraph',
	{
		title: __( 'Paragraph' ),
		description: __( 'A text block' ),
		category: 'common',
		icon: 'editor-paragraph',
		parent: ['flexlayout/column'],
		keywords: [
			__( 'Text', 'flexlayout' ),
			__( 'Paragraph', 'flexlayout' ),
		],
		attributes: {
			content: {
				type: 'string',
				default: '',
			},

			placeholder: {
				type: 'string',
			},
			align: {
				type: 'string',
				default: 'left'
			},

			...MarginOptionsAttributes,
			...PaddingOptionsAttributes,
			...BorderOptionsAttributes,
			...TextColorAttributes

		},
		styles: [
			{ name: 'body1', label: __( 'Default', 'block style' ), isDefault: true },
			{ name: 'body2', label: __( 'Body 2', 'block style' ) },
			{ name: 'body3', label: __( 'Body 3', 'block style' ) },
			{ name: 'text-columns', label: __( '2 Column Text', 'block style' ) },
		],

		edit: props => {
			const { attributes: { content, placeholder, align}, setAttributes, className} = props;
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
					<PanelBody title={ __( 'Paragraph Alignment' ) }>
						<AlignmentToolbar
							value={ align }
							onChange={ ( nextAlign ) => {
								setAttributes( { align: nextAlign } );
							} }
						/>
					</PanelBody>
					<TextColorOptions
						{ ...props }
					/>
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
						identifier="content"
						value={ content }
						onChange={ onChangeMessage }
						style={ {
							textAlign: align,
							...TextColorInlineStyles( props )
						} }
						onRemove={ () => onReplace( [] ) }
						placeholder={ placeholder || __( 'Paragraph text…' ) }
						multiline='p'
						formattingControls = { ['bold', 'italic', 'strikethrough', 'link'] }
					/>
					
				</div>
			];

		},

		save() {
			return null;
		},

	},
);
