/**
 * Block dependencies
 */
import classnames from 'classnames';
import icons from 'icons';

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
const {
	createHigherOrderComponent
} = wp.compose;

/**
 * Internal dependencies
 */
// Import all of our Background Options requirements.
import BackgroundOptions, { BackgroundOptionsAttributes, BackgroundOptionsClasses, BackgroundOptionsInlineStyles, BackgroundOptionsVideoOutput } from '../../components/gb-component_background-options';
// Import all of our Padding Options requirements.
import PaddingOptions, { PaddingOptionsAttributes, PaddingOptionsClasses } from '../../components/gb-component_padding';
// Import all of our Column Options requirements.
import ColumnOptions, { ColumnOptionsAttributes, ColumnOptionsClasses } from '../../components/gb-component_columns';
// Import all of our Border Options requirements.
import BorderOptions, { BorderOptionsAttributes, BorderOptionsClasses } from '../../components/gb-component_border';


/**
	* Register block
 */
export default registerBlockType(
	'flexls/column',
	{
		title: __( 'Column' ),
		description: __( 'Creates a column wrapper to support inner blocks.', 'flexls' ),
		category: 'layout',
		icon: 'columns',
		parent: 'flexls/row',
		keywords: [
			__( 'Flex', 'flexls' ),
			__( 'Layout', 'flexls' ),
			__( 'Column', 'flexls' ),
		],
		attributes: {

			...PaddingOptionsAttributes,
			...ColumnOptionsAttributes,
			...BorderOptionsAttributes,
			...BackgroundOptionsAttributes,
		},
		supports: {
			anchor: true,
		},

		edit: props => {
			const { attributes: { advancedId },
				className, setAttributes } = props;

			return [
				<InspectorControls>
					<BackgroundOptions
						{ ...props }
					/>
					<ColumnOptions
						{ ...props }
					/>

					<PaddingOptions
						{ ...props }
					/>

					<BorderOptions
						{ ...props }
					/>

				</InspectorControls>,

				<div
					className={ className }
					style={ {
						...BackgroundOptionsInlineStyles( props ),
					} }
				>
					{ BackgroundOptionsVideoOutput( props ) }
					<InnerBlocks />
				</div>
			];
		},

		save() {
			return (
				<InnerBlocks.Content />
			);
		},

	},
);

const customClassName = createHigherOrderComponent( ( BlockListBlock ) => {
	return ( props ) => {
		if (props.name === "flexls/column") {
				return <BlockListBlock
						{ ...props }
						className={ classnames(
								'component-column',
								...BorderOptionsClasses( props ),
								...PaddingOptionsClasses( props ),
								...ColumnOptionsClasses( props ),
								...BackgroundOptionsClasses( props ),

						) }
				/>;
		}
		return <BlockListBlock
				{ ...props }
		/>
	};
}, 'customClassName' );

wp.hooks.addFilter( 'editor.BlockListBlock', 'flexls/column/customClassName', customClassName );
