/**
 * Block dependencies
 */
import classnames from 'classnames';

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
import MarginOptions, { MarginOptionsAttributes, MarginOptionsClasses } from '../../gb-components/gb-component_/margin';
// Import all of our Background Options requirements.
import BackgroundOptions, { BackgroundOptionsAttributes, BackgroundOptionsClasses, BackgroundOptionsInlineStyles, BackgroundOptionsVideoOutput } from '../../gb-components/gb-component_/background-options';


/**
	* Register block
 */
export default registerBlockType(
	'flexls/quote',
	{
		title: __( 'Quote' ),
		description: __( 'A stylized pull quote with a source' ),
		category: 'common',
		icon: 'editor-quote',
		parent: 'flexls/column',
		keywords: [
			__( 'Text', 'flexls' ),
			__( 'Quote', 'flexls' ),
		],
		attributes: {
			content: {
				type: 'string',
				default: '',
			},

			placeholder: {
				type: 'string',
			},

			contentSource: {
				type: 'string',
				default: '',
			},

			placeholderSource: {
				type: 'string',
			},
			...MarginOptionsAttributes,
			...BackgroundOptionsAttributes,

		},

		edit: props => {
			const { attributes: { content, placeholder, contentSource, placeholderSource},
				className, setAttributes } = props;

			return [

				<InspectorControls>
					<BackgroundOptions
						{ ...props }
					/>
					<MarginOptions
						{ ...props }
					/>
				</InspectorControls>,
				<div 
					className={ classnames(
						`component-quote`,
						...MarginOptionsClasses( props ),
						...BackgroundOptionsClasses( props ),

					)}
					style={ {
						...BackgroundOptionsInlineStyles( props ),
					} }
				>
					{ BackgroundOptionsVideoOutput( props ) }
					<RichText
						identifier="content"
						tagName={ 'h5' }
						value={ content }
						onChange={ ( value ) => setAttributes( { content: value } ) }
						onRemove={ () => onReplace( [] ) }
						className={ classnames(
							`quote-text`,
						)}
						placeholder={ placeholder || __( 'Quote text…' ) }
					/>
					<RichText
						identifier="contentSource"
						tagName={ 'cite' }
						value={ contentSource }
						onChange={ ( value ) => setAttributes( { contentSource: value } ) }
						onRemove={ () => onReplace( [] ) }
						className={ classnames(
							`quote-source`,
							...MarginOptionsClasses( props ),
						)}
						placeholder={ placeholderSource || __( 'Quote source' ) }
					/>
				</div>
			];

		},

		save() {
			return null;
		},

	},
);
