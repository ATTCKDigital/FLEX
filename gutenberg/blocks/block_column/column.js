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

// Import all of our Padding Options requirements.
import PaddingOptions, { PaddingOptionsAttributes, PaddingOptionsClasses } from '../../components/gb-component_padding';
// Import all of our Column Options requirements.
import ColumnOptions, { ColumnOptionsAttributes, ColumnOptionsClasses } from '../../components/gb-component_columns';


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
		},
		supports: {
			anchor: true,
		},

		edit: props => {
			const { attributes: { advancedId },
				className, setAttributes } = props;

			return [
				<InspectorControls>

					<ColumnOptions
						{ ...props }
					/>

					<PaddingOptions
						{ ...props }
					/>

				</InspectorControls>,

				<div
					className={ className }

				>
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
														...PaddingOptionsClasses( props ),
														...ColumnOptionsClasses( props ),
												) }
										/>;
								}
								return <BlockListBlock
										{ ...props }
								/>
				};
}, 'customClassName' );

wp.hooks.addFilter( 'editor.BlockListBlock', 'flexls/column/customClassName', customClassName );
