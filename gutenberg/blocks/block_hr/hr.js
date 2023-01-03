console.log('loaded', '/FLEX\t/gutenberg\t/blocks\t/block_hr\t/hr.js');

// Block dependencies
import classnames from 'classnames';
import icons from '../../../js/icons.js';

// Internal block libraries
const { __ } = wp.i18n;

// WordPress dependencies
const { registerBlockType } = wp.blocks;

const {
	AlignmentToolbar,
	BlockControls,
	BlockAlignmentToolbar,
	Editable,
	InnerBlocks,
	InspectorControls,
} = wp.blockEditor;

const {
	Dashicon,
	IconButton,
	PanelBody,
	PanelRow,
	TextControl,
	Toolbar,
	Tooltip,
} = wp.components;

// Internal dependencies
import MarginOptions, { MarginOptionsAttributes, MarginOptionsClasses } from '../../components/gb-component_margin';
import PaddingOptions, { PaddingOptionsAttributes, PaddingOptionsClasses } from '../../components/gb-component_padding';
import BackgroundColorOptions, { BackgroundColorOptionsAttributes, BackgroundColorOptionsInlineStyles } from '../../components/gb-component_background-color';

// Register block
export default registerBlockType(
	'flexlayout/hr',
	{
		title: __( 'Horizontal line', 'flexlayout' ),
		description: __( 'A horizontal line.', 'flexlayout'),
		category: 'common',
		icon: icons.minus,
		example: {},
		// icon: 'heading',
		// parent: ['flexlayout/column'],
		keywords: [
			__( 'line', 'flexlayout' ),
			__( 'hr', 'flexlayout' ),
		],
		attributes: {
			align: {
				type: 'string'
			},
			color: {
				type: 'number',
			},
			HRWidth: {
				type: 'string'
			},
			...MarginOptionsAttributes,
			...PaddingOptionsAttributes,
			...BackgroundColorOptionsAttributes
		},
		edit: props => {
			const {
				attributes: {
					align,
					color,
					HRWidth
				},
				className,
				setAttributes
			} = props;
			return [
				<InspectorControls>
					<MarginOptions
						{ ...props }
					/>
					<PaddingOptions
						{ ...props }
					/>
					<BackgroundColorOptions
						{ ...props }
					/>
					<PanelBody title={ __( 'HR Line Settings', 'flexlayout' ) }>
						<p>{ __( ' Alignment', 'flexlayout' ) }</p>
						<AlignmentToolbar
							value={ align }
							onChange={ ( nextAlign ) => {
								setAttributes( { align: nextAlign } );
							} }
						/>
						<p>{ __( ' CSS Width (100%, 50px, auto, etc.)' ) }</p>
						<TextControl
							value={ HRWidth }
							onChange={ ( nextHRWidth ) => {
								setAttributes( { HRWidth: nextHRWidth } );
							} }
						/>
					</PanelBody>
				</InspectorControls>,
				<BlockControls>
					<AlignmentToolbar
						value={ align }
						onChange={ ( nextAlign ) => {
							setAttributes( { align: nextAlign } );
						} }
					/>
				</BlockControls>,
				<hr 
					className={classnames(
						`component-hr`,
						`align-${align}`,
						...MarginOptionsClasses( props ),
						...PaddingOptionsClasses( props )
					)}
					style={ {
						...BackgroundColorOptionsInlineStyles( props )
					} }
				/>
			];
		},
		save() {
			return null;
		},
	},
);
