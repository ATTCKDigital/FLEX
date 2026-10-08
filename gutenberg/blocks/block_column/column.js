// Block dependencies
import classnames from 'classnames';
import icons from '../../../js/icons.js';
import metadata from './block.json';

// Internal block libraries
const { __ } = wp.i18n;

const { registerBlockType } = wp.blocks;

const {
	AlignmentToolbar,
	BlockControls,
	InspectorControls,
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
} = wp.blockEditor;

const { Button, ButtonGroup, Toolbar, Tooltip } = wp.components;

const { createHigherOrderComponent } = wp.compose;

// Internal dependencies
import AnchorOptions from '../../components/gb-component_anchor';
import BackgroundOptions, {
	BackgroundOptionsClasses,
	BackgroundOptionsInlineStyles,
	BackgroundOptionsVideoOutput,
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
import ColumnOptions, {
	ColumnOptionsClasses,
} from '../../components/gb-component_columns';

// Editor component (named so the react-hooks lint rule recognises the hooks).
const Edit = ( props ) => {
	const {
		attributes: { align, dataComponentName, dataComponentOptions },
		setAttributes,
	} = props;

	const blockProps = useBlockProps( {
		className: `component-${ dataComponentName }`,
		style: {
			...BackgroundOptionsInlineStyles( props ),
		},
		'data-component-name': dataComponentName,
		'data-component-options': dataComponentOptions,
	} );
	const { children, ...innerBlocksProps } = useInnerBlocksProps( blockProps );

	return (
		<>
			<InspectorControls>
				<BackgroundOptions { ...props } />
				<ColumnOptions { ...props } />
				<BorderOptions { ...props } />
				<MarginOptions { ...props } />
				<PaddingOptions { ...props } />
				<AnchorOptions { ...props } />
				<DataComponentNameOptions { ...props } />
			</InspectorControls>
			<BlockControls>
				<AlignmentToolbar
					value={ align }
					onChange={ ( nextAlign ) => {
						setAttributes( { align: nextAlign } );
					} }
				/>
				<Toolbar>
					<ButtonGroup>
						<Tooltip
							text={ __(
								'Vertical align content - Top',
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
								'Vertical align content - Center',
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
								'Vertical align content - Bottom',
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
					</ButtonGroup>
				</Toolbar>
			</BlockControls>
			<div { ...innerBlocksProps }>
				{ BackgroundOptionsVideoOutput( props ) }
				{ children }
			</div>
		</>
	);
};

// Register block
export default registerBlockType( metadata, {
	icon: icons.columns,
	edit: Edit,

	save() {
		return <InnerBlocks.Content />;
	},
} );

const customClassName = createHigherOrderComponent( ( BlockListBlock ) => {
	return ( props ) => {
		if ( props.name === 'flexlayout/column' ) {
			return (
				<BlockListBlock
					{ ...props }
					className={ classnames(
						'component-column',
						`column-align-${ props.attributes.align ?? '' }`,
						`component-column-verticalAlignment-${ props.attributes.verticalAlignment }`,
						...BackgroundOptionsClasses( props ),
						...BorderOptionsClasses( props ),
						...MarginOptionsClasses( props ),
						...PaddingOptionsClasses( props ),
						...ColumnOptionsClasses( props )
					) }
					data-component-name={ props.attributes.dataComponentName }
					data-component-options={
						props.attributes.dataComponentOptions
					}
				/>
			);
		}

		return <BlockListBlock { ...props } />;
	};
}, 'customClassName' );

wp.hooks.addFilter(
	'editor.BlockListBlock',
	'flexlayout/column/customClassName',
	customClassName
);
