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
	'flexlayout/list',
	{
		title: __( 'List' ),
		description: __( 'A text list block' ),
		category: 'common',
		icon: 'list-view',
		parent: ['flexlayout/column'],
		keywords: [
			__( 'Text', 'flexlayout' ),
			__( 'List', 'flexlayout' ),
		],
		attributes: {
			ordered: {
				type: 'boolean',
				default: false,
			},
			content: {
				type: 'string',
				default: ''
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
			{ name: 'default', label: __( 'Default', 'block style' ), isDefault: true },
			{ name: 'list-columns', label: __( '2 Column List', 'block style' ) },
		],

		edit: props => {
			const { attributes: { content, placeholder, align, ordered }, setAttributes, className, onTagNameChange} = props;
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
					<PanelBody title={ __( 'List Alignment' ) }>
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
						`component-list`,
						`align-${align}`,
						className,
						...MarginOptionsClasses( props ),
						...PaddingOptionsClasses( props ),
						...BorderOptionsClasses( props ),						
						...TextColorClasses( props ),

					)}
				>
					<RichText
						multiline="li"
						tagName={ ordered ? 'ol' : 'ul' }
						onChange={ ( nextValues ) => setAttributes( { content: nextValues } ) }
						value={ content }
						style={ {
							textAlign: align,
							...TextColorInlineStyles( props )
						} }
						placeholder={ __( 'Write list…' ) }
						onRemove={ () => onReplace( [] ) }
						onTagNameChange={ ( tag ) => setAttributes( { ordered: tag === 'ol' } ) }
					/>
					
				</div>
			];

		},

		save() {
			return null;
		},

	},
);
