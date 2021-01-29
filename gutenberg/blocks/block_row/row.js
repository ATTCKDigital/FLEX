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
	RichText,
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

// Internal dependencies
import AnchorOptions, { AnchorOptionsAttributes } from '../../components/gb-component_anchor';
import BackgroundOptions, { BackgroundOptionsAttributes, BackgroundOptionsClasses, BackgroundOptionsInlineStyles, BackgroundOptionsVideoOutput, BackgroundOptionsImageWide } from '../../components/gb-component_background-options';
import BorderOptions, { BorderOptionsAttributes, BorderOptionsClasses } from '../../components/gb-component_border';
import DataComponentNameOptions, { DataComponentNameAttributes } from '../../components/gb-component_data-component-name';
import MarginOptions, { MarginOptionsAttributes, MarginOptionsClasses } from '../../components/gb-component_margin';
import PaddingOptions, { PaddingOptionsAttributes, PaddingOptionsClasses } from '../../components/gb-component_padding';
import RowHeightOptions, { RowHeightOptionsAttributes, RowHeightOptionsClasses } from '../../components/gb-component_row-height';
import LogoColorOptions, { LogoColorOptionsAttributes, LogoColorOptionsDataAttr } from '../../components/gb-component_logo-color';
import ScrollerOptions, { ScrollerOptionsAttributes, ScrollerOptionsOutput } from '../../components/gb-component_scroller';
import mt_rand from '../../../js/mt_rand';

// Register block
export default registerBlockType(
	'flexlayout/row',
	{
		title: __( 'Row' ),
		description: __( 'Creates a row wrapper to support inner blocks with set column widths.', 'flexlayout' ),
		category: 'layout',
		// icon: 'editor-table',
		icon: icons.rows,
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
			...BorderOptionsAttributes,
			...DataComponentNameAttributes,
			...MarginOptionsAttributes,
			...PaddingOptionsAttributes,
			...RowHeightOptionsAttributes,
			...LogoColorOptionsAttributes,
			...ScrollerOptionsAttributes,
		},

		getEditWrapperProps( attributes ) {
			const { 
				blockAlignment 
			} = attributes;
			
			if ( 'left' === blockAlignment || 'right' === blockAlignment || 'full' === blockAlignment || 'wide' === blockAlignment ) {
				return {
					'data-align': blockAlignment
				};
			}
		},

		edit: props => {
			const { 
				attributes: { 
					anchor, 
					blockAlignment,
					dataComponentName,
					dataComponentOptions,
					dataSectionId,
					reverseMobile, 
					verticalAligment, 
				}, 
				className, 
				setAttributes 
			} = props;

			const classes = classnames(
				className,
				{ 
					'component-row-reverse-mobile': reverseMobile 
				},
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
					<BorderOptions
						{ ...props }
					/>
					<MarginOptions
						{ ...props }
					/>
					<PaddingOptions
						{ ...props }
					/>
					<LogoColorOptions
						{ ...props }
					/>
					<ScrollerOptions
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
									{
										'is-active': reverseMobile
									},
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
									{ icons.alignTop }
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
									{ icons.alignCenter }
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
									{ icons.alignBottom }
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
									{ icons.appsSort }
								</Button>
							</Tooltip>
						</ButtonGroup>
					</Toolbar>
				</BlockControls>,
				<section
					id={ anchor }
					className={ 
						classes 
					}
					style={ {
						...BackgroundOptionsInlineStyles( props ),
					} }
					data-section-id={ props.attributes.dataSectionId = mt_rand(10, 1000) }
					data-component-name={ dataComponentName }
					data-component-options={ dataComponentOptions }
					data-logo-color={ LogoColorOptionsDataAttr( props ) }
				>
					{ BackgroundOptionsImageWide( props ) }
					{ BackgroundOptionsVideoOutput( props ) }
					{ ScrollerOptionsOutput( props ) }
					<div className={ classnames(
						'flex-grid',
						`component-alignment-${verticalAligment}`,
						dataComponentName && `component-${dataComponentName}`
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
