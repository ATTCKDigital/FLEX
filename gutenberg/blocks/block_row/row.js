// Block dependencies
import classnames from 'classnames';
import icons from '../../../js/icons.js';
import metadata from './block.json';

// Internal block libraries
const { __ } = wp.i18n;

const { registerBlockType } = wp.blocks;

const {
	BlockAlignmentToolbar,
	BlockControls,
	InspectorControls,
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
} = wp.blockEditor;

const { useInstanceId } = wp.compose;

const { Button, ButtonGroup, Toolbar, Tooltip } = wp.components;

// Internal dependencies
import AnchorOptions from '../../components/gb-component_anchor';
import BackgroundOptions, {
	BackgroundOptionsClasses,
	BackgroundOptionsInlineStyles,
	BackgroundOptionsVideoOutput,
	BackgroundOptionsImageWide,
} from '../../components/gb-component_background-options';
import BorderOptions, {
	BorderOptionsClasses,
} from '../../components/gb-component_border';
import DataComponentNameOptions from '../../components/gb-component_data-component-name';
import MarginOptions, {
	MarginOptionsClasses,
} from '../../components/gb-component_margin';
import PaddingOptions, {
	PaddingOptionsClasses,
} from '../../components/gb-component_padding';
import RowHeightOptions, {
	RowHeightOptionsClasses,
} from '../../components/gb-component_row-height';
import LogoColorOptions, {
	LogoColorOptionsDataAttr,
} from '../../components/gb-component_logo-color';
import ScrollerOptions, {
	ScrollerOptionsOutput,
} from '../../components/gb-component_scroller';

// Editor component (named so the react-hooks lint rule recognises the hooks).
const Edit = ( props ) => {
	const {
		attributes: {
			blockAlignment,
			dataComponentName,
			dataComponentOptions,
			reverseMobile,
			verticalAlignment,
		},
		setAttributes,
	} = props;

	// Stable per-instance id scoping the editor-only wide-image <style>; replaces the
	// random dataSectionId that used to be written into the attributes on every render.
	const sectionId = useInstanceId( Edit );

	const classes = classnames(
		{
			'component-row-reverse-mobile': reverseMobile,
		},
		...BackgroundOptionsClasses( props ),
		...RowHeightOptionsClasses( props ),
		...PaddingOptionsClasses( props ),
		...MarginOptionsClasses( props ),
		...BorderOptionsClasses( props )
	);

	const blockProps = useBlockProps( {
		className: classes,
		style: {
			...BackgroundOptionsInlineStyles( props ),
		},
		'data-section-id': sectionId,
		'data-component-name': dataComponentName,
		'data-component-options': dataComponentOptions,
		'data-logo-color': LogoColorOptionsDataAttr( props ),
	} );
	const innerBlocksProps = useInnerBlocksProps( {
		className: classnames(
			'flex-grid',
			`component-row-verticalAlignment-${ verticalAlignment }`,
			dataComponentName && `component-${ dataComponentName }`
		),
	} );

	return (
		<>
			<InspectorControls>
				<BackgroundOptions { ...props } />
				<RowHeightOptions { ...props } />
				<BorderOptions { ...props } />
				<MarginOptions { ...props } />
				<PaddingOptions { ...props } />
				<LogoColorOptions { ...props } />
				<ScrollerOptions { ...props } />
				<AnchorOptions { ...props } />
				<DataComponentNameOptions { ...props } />
			</InspectorControls>
			<BlockControls>
				<BlockAlignmentToolbar
					value={ blockAlignment }
					onChange={ ( nextBlockAlignment ) =>
						setAttributes( { blockAlignment: nextBlockAlignment } )
					}
					controls={ [ 'full' ] }
				/>
				<Toolbar>
					<Tooltip
						text={ __(
							'Reverse column order in mobile',
							'flexlayout'
						) }
					>
						<Button
							className={ classnames(
								'components-icon-button',
								'components-toolbar__control',
								{
									'is-active': reverseMobile,
								}
							) }
							onClick={ () =>
								setAttributes( {
									reverseMobile: ! reverseMobile,
								} )
							}
						>
							{ icons.reverseMobile }
						</Button>
					</Tooltip>
				</Toolbar>
				<Toolbar>
					<ButtonGroup>
						<Tooltip
							text={ __(
								'Vertical align columns - Top',
								'flexlayout'
							) }
						>
							<Button
								className={ classnames(
									'components-icon-button',
									'components-toolbar__control',
									{
										'is-active':
											props.attributes
												.verticalAlignment === 'top',
									}
								) }
								onClick={ () =>
									setAttributes( {
										verticalAlignment: 'top',
									} )
								}
							>
								{ icons.alignTop }
							</Button>
						</Tooltip>
						<Tooltip
							text={ __(
								'Vertical align columns - Center',
								'flexlayout'
							) }
						>
							<Button
								className={ classnames(
									'components-icon-button',
									'components-toolbar__control',
									{
										'is-active':
											props.attributes
												.verticalAlignment === 'center',
									}
								) }
								onClick={ () =>
									setAttributes( {
										verticalAlignment: 'center',
									} )
								}
							>
								{ icons.alignCenter }
							</Button>
						</Tooltip>
						<Tooltip
							text={ __(
								'Vertical align columns - Bottom',
								'flexlayout'
							) }
						>
							<Button
								className={ classnames(
									'components-icon-button',
									'components-toolbar__control',
									{
										'is-active':
											props.attributes
												.verticalAlignment === 'bottom',
									}
								) }
								onClick={ () =>
									setAttributes( {
										verticalAlignment: 'bottom',
									} )
								}
							>
								{ icons.alignBottom }
							</Button>
						</Tooltip>
						<Tooltip
							text={ __(
								'Vertical align columns - Stretch',
								'flexlayout'
							) }
						>
							<Button
								className={ classnames(
									'components-icon-button',
									'components-toolbar__control',
									{
										'is-active':
											props.attributes
												.verticalAlignment ===
											'stretch',
									}
								) }
								onClick={ () =>
									setAttributes( {
										verticalAlignment: 'stretch',
									} )
								}
							>
								{ icons.appsSort }
							</Button>
						</Tooltip>
					</ButtonGroup>
				</Toolbar>
			</BlockControls>
			<section { ...blockProps }>
				{ BackgroundOptionsImageWide( props, sectionId ) }
				{ BackgroundOptionsVideoOutput( props ) }
				{ ScrollerOptionsOutput( props ) }
				<div { ...innerBlocksProps } />
			</section>
		</>
	);
};

// Register block
export default registerBlockType( metadata, {
	icon: icons.rows,
	// Anchor support is rolled by hand (Gutenberg issue #15240), so core's anchor
	// attribute filter is removed below.
	getEditWrapperProps( attributes ) {
		const { blockAlignment } = attributes;

		if (
			'left' === blockAlignment ||
			'right' === blockAlignment ||
			'full' === blockAlignment ||
			'wide' === blockAlignment
		) {
			return {
				'data-align': blockAlignment,
			};
		}
	},
	edit: Edit,

	save() {
		return <InnerBlocks.Content />;
	},
} );

wp.hooks.removeFilter( 'blocks.registerBlockType', 'core/anchor/attribute' );
