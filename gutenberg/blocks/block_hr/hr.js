/**
 * Block dependencies
 */
import classnames from 'classnames';
import icons from '../../../js/icons.js';

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;

const {
	registerBlockType,
} = wp.blocks;

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

/**
 * Internal dependencies
 */
// Import all of our Margin Options requirements.
import MarginOptions, { MarginOptionsAttributes, MarginOptionsClasses } from '../../components/gb-component_margin';

// Import all of our Padding Options requirements.
import PaddingOptions, { PaddingOptionsAttributes, PaddingOptionsClasses } from '../../components/gb-component_padding';

// Import all of our Background Options requirements.
import BackgroundColorOptions, { BackgroundColorOptionsAttributes, BackgroundColorOptionsInlineStyles } from '../../components/gb-component_background-color';

/**
 * Register image block
 */
export default registerBlockType(
	'flexlayout/hr',
	{
		title: __( 'Horizontal line', 'flexlayout' ),
		description: __( 'A horizontal line.', 'flexlayout'),
		category: 'common',
		icon: icons.minus,
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
				<div 
					className={classnames(
						`component-hr`,
						`align-${align}`,
						...MarginOptionsClasses( props ),
						...PaddingOptionsClasses( props )
					)}
					style={ {
						...BackgroundColorOptionsInlineStyles( props )
					} }
				>
				</div>
			];
		},
		save() {
			return null;
		},
	},
);
