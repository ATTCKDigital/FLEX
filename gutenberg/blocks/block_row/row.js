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
} = wp.components;

/**
 * Internal dependencies
 */

// Import all of our Background Options requirements.
import BackgroundOptions, { BackgroundOptionsAttributes, BackgroundOptionsClasses, BackgroundOptionsInlineStyles, BackgroundOptionsVideoOutput } from '../../components/gb-component_background-options';
// Import all of our Padding Options requirements.
import PaddingOptions, { PaddingOptionsAttributes, PaddingOptionsClasses } from '../../components/gb-component_padding';
// Import all of our Margin Options requirements.
import MarginOptions, { MarginOptionsAttributes, MarginOptionsClasses } from '../../components/gb-component_margin';
// Import all of our Scroller Options requirements.
import ScrollerOptions, { ScrollerOptionsAttributes, ScrollerOptionsOutput } from '../../components/gb-component_scroller';
// Import all of our Logo Color Options requirements.
import LogoColorOptions, { LogoColorOptionsAttributes, LogoColorOptionsDataAttr } from '../../components/gb-component_logo-color';
// Import all of our Row Height Options requirements.
import RowHeightOptions, { RowHeightOptionsAttributes, RowHeightOptionsClasses } from '../../components/gb-component_row-height';
// Import all of our Border Options requirements.
import BorderOptions, { BorderOptionsAttributes, BorderOptionsClasses } from '../../components/gb-component_border';
import AnchorOptions, { AnchorOptionsAttributes } from '../../components/gb-component_anchor';



/**
	* Register block
 */
export default registerBlockType(
	'flexlayout/row',

	{
		title: __( 'Row' ),
		description: __( 'Creates a row wrapper to support inner blocks with set column widths.', 'flexlayout' ),
		category: 'layout',
		icon: 'editor-table',
		keywords: [
			__( 'Flex', 'flexlayout' ),
			__( 'Layout', 'flexlayout' ),
		],
		// Forced to roll our own anchor support
		// Due to Gutenberg core issue
		// BUG: https://github.com/WordPress/gutenberg/issues/15240
		// TODO: reenable this when bug is fixed
		// supports: {
		// 	anchor: true,
		// },
		attributes: {
			blockAlignment: {
				type: 'string',
				default: 'wide',
			},
			reverseMobile: {
				type: 'boolean',
				default: false,
			},
			verticalAligment: {
				type: 'string',
				default: 'top',
			},

			...AnchorOptionsAttributes,
			...BackgroundOptionsAttributes,
			...RowHeightOptionsAttributes,
			...PaddingOptionsAttributes,
			...MarginOptionsAttributes,
			...ScrollerOptionsAttributes,
			...LogoColorOptionsAttributes,
			...BorderOptionsAttributes,
		},

		getEditWrapperProps( attributes ) {
			const { blockAlignment } = attributes;
			if ( 'left' === blockAlignment || 'right' === blockAlignment || 'full' === blockAlignment || 'wide' === blockAlignment ) {
				return { 'data-align': blockAlignment };
			}
		},

		edit: props => {
			const { attributes: { anchor, reverseMobile, blockAlignment, verticalAligment }, className, setAttributes } = props;
			const classes = classnames(
				className,
				{ 'component-row-reverse-mobile': reverseMobile },
				...BackgroundOptionsClasses( props ),
				...RowHeightOptionsClasses( props ),
				...PaddingOptionsClasses( props ),
				...MarginOptionsClasses( props ),
				...BorderOptionsClasses( props ),
			);

			return [
				<InspectorControls>
					<BackgroundOptions
						{ ...props }
					/>
					<RowHeightOptions
						{ ...props }
					/>
					<PaddingOptions
						{ ...props }
					/>
					<MarginOptions
						{ ...props }
					/>
					<BorderOptions
						{ ...props }
					/>
					<ScrollerOptions
						{ ...props }
					/>
					<LogoColorOptions
						{ ...props }
					/>
					<AnchorOptions
						{ ...props }
					/>
				</InspectorControls>,
				<BlockControls>
					<BlockAlignmentToolbar
						value={ blockAlignment }
						onChange={ blockAlignment => setAttributes( { blockAlignment } ) }
						controls={['full']}
					/>
					<Toolbar>
						<Tooltip text={ __( 'Reverse column order in mobile', 'flexlayout' )  }>
							<Button
								className={ classnames(
									'components-icon-button',
									'components-toolbar__control',
									{ 'is-active': reverseMobile },
								) }
								onClick={ () => setAttributes( { reverseMobile: ! reverseMobile } ) }
							>
								{ icons.reverseMobile }
							</Button>
						</Tooltip>
					</Toolbar>
					<Toolbar>
						<ButtonGroup>
							<Tooltip text={ __( 'Vertical align columns - Top', 'flexlayout' )  }>
								<Button
									className={ classnames(
										'components-icon-button',
										'components-toolbar__control',
										{ 'is-active': props.attributes.verticalAligment === 'top' },
									) }
									onClick={ () => setAttributes( { verticalAligment: 'top' } ) }
								>
									{ icons.topAlign }
								</Button>
							</Tooltip>
							<Tooltip text={ __( 'Vertical align columns - Center', 'flexlayout' )  }>
								<Button
									className={ classnames(
										'components-icon-button',
										'components-toolbar__control',
										{ 'is-active': props.attributes.verticalAligment === 'center' },
									) }
									onClick={ () => setAttributes( { verticalAligment: 'center' } ) }
								>
									{ icons.centerAlign }
								</Button>
							</Tooltip>
							<Tooltip text={ __( 'Vertical align columns - Bottom', 'flexlayout' )  }>
								<Button
									className={ classnames(
										'components-icon-button',
										'components-toolbar__control',
										{ 'is-active': props.attributes.verticalAligment === 'bottom' },
									) }
									onClick={ () => setAttributes( { verticalAligment: 'bottom' } ) }
								>
									{ icons.bottomAlign }
								</Button>
							</Tooltip>
							<Tooltip text={ __( 'Vertical align columns - Stretch', 'flexlayout' )  }>
								<Button
									className={ classnames(
										'components-icon-button',
										'components-toolbar__control',
										{ 'is-active': props.attributes.verticalAligment === 'stretch' },
									) }
									onClick={ () => setAttributes( { verticalAligment: 'stretch' } ) }
								>
									{ icons.stretchAlign }
								</Button>
							</Tooltip>
						</ButtonGroup>
					</Toolbar>
				</BlockControls>,
				<section
					className={ classes }
					id={ anchor }
					style={ {
						...BackgroundOptionsInlineStyles( props ),
					} }
					data-logo-color={
						LogoColorOptionsDataAttr( props )
					}
				>
					{ BackgroundOptionsVideoOutput( props ) }
					{ ScrollerOptionsOutput( props ) }
					<div className={ classnames(
						'flex-grid',
						`component-alignment-${verticalAligment}`,
					) }>
						<InnerBlocks />
					</div>
				</section>
			];
		},

		save() {
			return (
				<InnerBlocks.Content />
			);
		},

	},
);

wp.hooks.removeFilter( 'blocks.registerBlockType', 'core/anchor/attribute' );
