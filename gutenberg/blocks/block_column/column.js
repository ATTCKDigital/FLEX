// Block dependencies
import classnames from 'classnames';
import icons from '../../../js/icons.js'

// Internal block libraries
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
	ButtonGroup,
	Dashicon,
	IconButton,
	PanelBody,
	PanelRow,
	Toolbar,
	Tooltip,
} = wp.components;

const {
	createHigherOrderComponent
} = wp.compose;

// Internal dependencies
import AnchorOptions, { AnchorOptionsAttributes } from '../../components/gb-component_anchor';
import BackgroundOptions, { BackgroundOptionsAttributes, BackgroundOptionsClasses, BackgroundOptionsInlineStyles, BackgroundOptionsVideoOutput } from '../../components/gb-component_background-options';
import BorderOptions, { BorderOptionsAttributes, BorderOptionsClasses } from '../../components/gb-component_border';
import DataComponentNameOptions, { DataComponentNameAttributes } from '../../components/gb-component_data-component-name';
import MarginOptions, { MarginOptionsAttributes, MarginOptionsClasses } from '../../components/gb-component_margin';
import PaddingOptions, { PaddingOptionsAttributes, PaddingOptionsClasses } from '../../components/gb-component_padding';
import ColumnOptions, { ColumnOptionsAttributes, ColumnOptionsClasses } from '../../components/gb-component_columns';

// Register block
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
			...BackgroundOptionsAttributes,
			...BorderOptionsAttributes,
			...DataComponentNameAttributes,
			...MarginOptionsAttributes,
			...PaddingOptionsAttributes,
			...ColumnOptionsAttributes,
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
					advancedId,
					dataComponentName,
					dataComponentOptions,
				},
				className,
				setAttributes,
			} = props;

			return [
				<InspectorControls>
					<BackgroundOptions
						{ ...props }
					/>
					<ColumnOptions
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
					<AnchorOptions
						{ ...props }
					/>
					<DataComponentNameOptions
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
						`column-align-${align}`,
						`component-${dataComponentName}`
					}
					style={ {
						...BackgroundOptionsInlineStyles( props ),
					} }
					data-component-name={ dataComponentName } 
					data-component-options={ dataComponentOptions }
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
								...BackgroundOptionsClasses( props ),
								...BorderOptionsClasses( props ),
								...MarginOptionsClasses( props ),
								...PaddingOptionsClasses( props ),
								...ColumnOptionsClasses( props ),
						) }
						data-component-name={ props.attributes.dataComponentName }
						data-component-options={ props.attributes.dataComponentOptions }
				/>;
		}
		
		return <BlockListBlock
				{ ...props }
		/>
	};
}, 'customClassName' );

wp.hooks.addFilter( 'editor.BlockListBlock', 'flexlayout/column/customClassName', customClassName );
