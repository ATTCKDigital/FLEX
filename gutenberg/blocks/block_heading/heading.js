/**
 * Block dependencies
 */
import classnames from 'classnames';
import HeadingToolbar from './heading-toolbar';

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
} = wp.editor;
const {
	Toolbar,
	Button,
	ButtonGroup,
	Tooltip,
	PanelBody,
	PanelRow,
	TextControl,

} = wp.components;

/**
 * Internal dependencies
 */
// Import all of our Margin Options requirements.
import MarginOptions, { MarginOptionsAttributes, MarginOptionsClasses } from '../../components/gb-component_margin';
// Import all of our Text Color Options requirements.
import TextColorOptions, { TextColorAttributes, TextColorClasses } from '../../components/gb-component_text-colors';
// Import all of our Border Options requirements.
import BorderOptions, { BorderOptionsAttributes, BorderOptionsClasses } from '../../components/gb-component_border';
// Import all of our Padding Options requirements.
import PaddingOptions, { PaddingOptionsAttributes, PaddingOptionsClasses } from '../../components/gb-component_padding';

/**
	* Register block
 */
export default registerBlockType(
	'flexls/heading',
	{
		title: __( 'Heading' ),
		description: __( 'Introduce new sections and organize content to help visitors (and search engines) understand the structure of your content.' ),
		category: 'common',
		icon: 'heading',
		parent: 'flexls/column',
		keywords: [
			__( 'Text', 'flexls' ),
			__( 'Heading', 'flexls' ),
			__( 'Header', 'flexls' ),
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
			...MarginOptionsAttributes,
			...PaddingOptionsAttributes,
			...BorderOptionsAttributes,
			...TextColorAttributes
		},

		edit: props => {
			const { attributes: { content, level, align, placeholder},
				className, setAttributes } = props;
			const tagName = 'h' + level;

			return [

				<InspectorControls>
					<PanelBody title={ __( 'Heading Settings' ) }>
						<p>{ __( 'Level' ) }</p>
						<HeadingToolbar minLevel={ 1 } maxLevel={ 7 } selectedLevel={ level } onChange={ ( newLevel ) => setAttributes( { level: newLevel } ) } />
						<p>{ __( 'Text Alignment' ) }</p>
						<AlignmentToolbar
							value={ align }
							onChange={ ( nextAlign ) => {
								setAttributes( { align: nextAlign } );
							} }
						/>
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
				<RichText
					identifier="content"
					wrapperClassName="component-heading"
					tagName={ tagName }
					value={ content }
					onChange={ ( value ) => setAttributes( { content: value } ) }
					onRemove={ () => onReplace( [] ) }
					style={ { textAlign: align } }
					className={ classnames(
						`headline${level}`,
						`align-${align}`,
						...MarginOptionsClasses( props ),
						...PaddingOptionsClasses( props ),
						...BorderOptionsClasses( props ),
						...TextColorClasses( props ),
					)}
					placeholder={ placeholder || __( 'Write heading…' ) }
				/>
			];

		},

		save() {
			return null;
		},

	},
);
