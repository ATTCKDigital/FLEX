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

/**
 * Internal dependencies
 */

// Import all of our Background Options requirements.
import BackgroundOptions, { BackgroundOptionsAttributes, BackgroundOptionsClasses, BackgroundOptionsInlineStyles, BackgroundOptionsVideoOutput } from '../../gb-components/gb-component_/background-options';
// Import all of our Padding Options requirements.
import PaddingOptions, { PaddingOptionsAttributes, PaddingOptionsClasses } from '../../gb-components/gb-component_/padding';
// Import all of our Scroller Options requirements.
import ScrollerOptions, { ScrollerOptionsAttributes, ScrollerOptionsOutput } from '../../gb-components/gb-component_/scroller';
// Import all of our Logo Color Options requirements.
import LogoColorOptions, { LogoColorOptionsAttributes, LogoColorOptionsDataAttr } from '../../gb-components/gb-component_/logo-color';
// Import all of our Row Height Options requirements.
import RowHeightOptions, { RowHeightOptionsAttributes, RowHeightOptionsClasses } from '../../gb-components/gb-component_/row-height';



/**
	* Register block
 */
export default registerBlockType(
	'flexls/row',

	{
		title: __( 'Row' ),
		description: __( 'Creates a row wrapper to support inner blocks with set column widths.', 'flexls' ),
		category: 'layout',
		icon: 'editor-table',
		keywords: [
			__( 'Flex', 'flexls' ),
			__( 'Layout', 'flexls' ),
		],
		supports: {
			anchor: true,
		},
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

			...BackgroundOptionsAttributes,
			...RowHeightOptionsAttributes,
			...PaddingOptionsAttributes,
			...ScrollerOptionsAttributes,
			...LogoColorOptionsAttributes,
		},

		getEditWrapperProps( attributes ) {
			const { blockAlignment } = attributes;
			if ( 'left' === blockAlignment || 'right' === blockAlignment || 'full' === blockAlignment || 'wide' === blockAlignment ) {
				return { 'data-align': blockAlignment };
			}
		},

		edit: props => {
			const { attributes: { reverseMobile, blockAlignment, verticalAligment },
				className, setAttributes } = props;
			const classes = classnames(
				className,
				{ 'component-row-reverse-mobile': reverseMobile },
				...BackgroundOptionsClasses( props ),
				...RowHeightOptionsClasses( props ),
				...PaddingOptionsClasses( props ),
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
					<ScrollerOptions
						{ ...props }
					/>
					<LogoColorOptions
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
						<Tooltip text={ __( 'Reverse column order in mobile', 'flexls' )  }>
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
							<Tooltip text={ __( 'Vertical align columns - Top', 'flexls' )  }>
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
							<Tooltip text={ __( 'Vertical align columns - Center', 'flexls' )  }>
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
							<Tooltip text={ __( 'Vertical align columns - Bottom', 'flexls' )  }>
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
							<Tooltip text={ __( 'Vertical align columns - Stretch', 'flexls' )  }>
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
						'pure-g',
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
