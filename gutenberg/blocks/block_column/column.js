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
	AlignmentToolbar,
	BlockAlignmentToolbar,
	BlockControls,
	InspectorControls,
	InnerBlocks,
} = wp.blockEditor;

const {
	Button,
	Dashicon,
	IconButton,
	PanelBody,
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
		// parent: ['flexlayout/row'],
		keywords: [
			__( 'Flex', 'flexlayout' ),
			__( 'Layout', 'flexlayout' ),
			__( 'Column', 'flexlayout' )
		],
		attributes: {
			align: {
				type: 'string',
				default: ''
			},
			...AnchorOptionsAttributes,
			...PaddingOptionsAttributes,
			...ColumnOptionsAttributes,
			...BorderOptionsAttributes,
			...BackgroundOptionsAttributes
		},

		// Forced to roll our own anchor support
		// Due to Gutenberg core issue
		// BUG: https://github.com/WordPress/gutenberg/issues/15240
		// TODO: reenable this when bug is fixed
		// supports: {
		// 	anchor: true,
		// },

		edit: props => {
			const {
				attributes: {
					align,
					anchor,
					advancedId
				},
				className,
				setAttributes
			} = props;

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
				<BlockControls>
					<AlignmentToolbar
						value={ align }
						onChange={ ( nextAlign ) => {
							setAttributes( { align: nextAlign } );
						} }
					/>
				</BlockControls>,
				<div
					id={ anchor }
					className={
						className,
						`column-align-${align}`
					}
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
								`column-align-${props.attributes.align}`,
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
