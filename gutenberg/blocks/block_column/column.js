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
	InspectorControls,
	InnerBlocks,
} = wp.editor;
const {
	Toolbar,

} = wp.components;
const {
	createHigherOrderComponent
} = wp.compose;

/**
 * Internal dependencies
 */
// Import all of our Background Options requirements.
import AnchorOptions, { AnchorOptionsAttributes } from '../../components/gb-component_anchor';
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
	'flexlayout/column',
	{
		title: __( 'Column' ),
		description: __( 'Creates a column wrapper to support inner blocks.', 'flexlayout' ),
		category: 'layout',
		icon: 'columns',
		parent: ['flexlayout/row'],
		keywords: [
			__( 'Flex', 'flexlayout' ),
			__( 'Layout', 'flexlayout' ),
			__( 'Column', 'flexlayout' ),
		],
		attributes: {

			...AnchorOptionsAttributes,
			...PaddingOptionsAttributes,
			...ColumnOptionsAttributes,
			...BorderOptionsAttributes,
			...BackgroundOptionsAttributes,
		},
		// Forced to roll our own anchor support
		// Due to Gutenberg core issue
		// BUG: https://github.com/WordPress/gutenberg/issues/15240
		// TODO: reenable this when bug is fixed
		// supports: {
		// 	anchor: true,
		// },

		edit: props => {
			const { attributes: { anchor, advancedId },
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

					<AnchorOptions
						{ ...props }
					/>
				</InspectorControls>,

				<div
					id={ anchor }
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
		if (props.name === 'flexlayout/column') {
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

wp.hooks.addFilter( 'editor.BlockListBlock', 'flexlayout/column/customClassName', customClassName );
