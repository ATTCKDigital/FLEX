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
	RangeControl,
} = wp.components;

const {
	createHigherOrderComponent
} = wp.compose;

// Internal dependencies
import BackgroundOptions, { BackgroundOptionsAttributes, BackgroundOptionsClasses, BackgroundOptionsInlineStyles, BackgroundOptionsVideoOutput } from '../../components/gb-component_background-options';
import BorderOptions, { BorderOptionsAttributes, BorderOptionsClasses } from '../../components/gb-component_border';
import DataComponentNameOptions, { DataComponentNameAttributes } from '../../components/gb-component_data-component-name';
import MarginOptions, { MarginOptionsAttributes, MarginOptionsClasses } from '../../components/gb-component_margin';
import PaddingOptions, { PaddingOptionsAttributes, PaddingOptionsClasses } from '../../components/gb-component_padding';
import ColumnOptions, { ColumnOptionsAttributes, ColumnOptionsClasses } from '../../components/gb-component_columns';

// Register block
export default registerBlockType(
	'flexlayout/popup',
	{
		title: __( 'Popup' ),
		description: __( 'Creates a popup to support popup buttons.', 'flexlayout' ),
		category: 'layout',
		// icon: 'columns',
		icon: icons.columns,
		keywords: [
			__( 'Popup', 'flexlayout' ),
		],
		attributes: {
			align: {
				type: 'string',
				default: ''
			},
			backgroundOpacity: {
				type: Number,
				default: 1
			},
			...BackgroundOptionsAttributes,
			...BorderOptionsAttributes,
			...DataComponentNameAttributes,
			...MarginOptionsAttributes,
			...PaddingOptionsAttributes,
			...ColumnOptionsAttributes,
		},
		edit: props => {
			const {
				attributes: {
					align,
					advancedId,
					dataComponentName,
					dataComponentOptions,
					backgroundOpacity,
				},
				className,
				setAttributes,
			} = props;

			return [
				<InspectorControls>
					<PanelBody title={__('Background Settings')}>
						<BackgroundOptions
							{ ...props }
						/>
						<PanelRow>
							<RangeControl
								label="Background Opacity"
								value={ ( backgroundOpacity ?? 1 ) * 100 }
								onChange={ backgroundOpacity => setAttributes( { backgroundOpacity: (backgroundOpacity / 100) } ) }
								min={ 0 }
								max={ 100 }
							/>
						</PanelRow>
					</PanelBody>
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
					className={
						className,
						`column-align-${align}`,
						`component-${dataComponentName}`
					}
					style={{position: 'relative'}}
					data-component-name={ dataComponentName } 
					data-component-options={ dataComponentOptions }
				>
					{ BackgroundOptionsVideoOutput( props ) }
					<div 
						class="popup-background-overlay" 
						style={{
							opacity: backgroundOpacity ?? 1,
							...BackgroundOptionsInlineStyles( props ),
						}}
					/>
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
		if (props.name === 'flexlayout/popup') {
				return <BlockListBlock
						{ ...props }
						className={ classnames(
								'component-popup',
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

wp.hooks.addFilter( 'editor.BlockListBlock', 'flexlayout/popup/customClassName', customClassName );
