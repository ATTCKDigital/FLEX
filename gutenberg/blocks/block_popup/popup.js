// Block dependencies
import classnames from 'classnames';
import metadata from './block.json';

// Internal block libraries
const { __ } = wp.i18n;

const { registerBlockType } = wp.blocks;

const { InspectorControls, InnerBlocks, useBlockProps, useInnerBlocksProps } =
	wp.blockEditor;

const { PanelBody, PanelRow, RangeControl, TextControl } = wp.components;

const { createHigherOrderComponent } = wp.compose;

// Internal dependencies
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
		attributes: {
			backgroundOpacity,
			dataComponentName,
			dataComponentOptions,
			popupName,
		},
		setAttributes,
	} = props;

	// As in v1: the block wrapper takes the popup classes (editor.BlockListBlock filter below)
	// and an inner div holds the background video, overlay and inner blocks.
	const blockProps = useBlockProps();
	const { children, ...innerBlocksProps } = useInnerBlocksProps( {
		className: `component-${ dataComponentName }`,
		'data-component-name': dataComponentName,
		'data-component-options': dataComponentOptions,
	} );

	return (
		<>
			<InspectorControls>
				<PanelRow>
					<TextControl
						label="Popup Name"
						value={ popupName }
						onChange={ ( nextPopupName ) =>
							setAttributes( { popupName: nextPopupName } )
						}
					/>
				</PanelRow>
				<PanelBody title={ __( 'Background Settings' ) }>
					<BackgroundOptions { ...props } />
					<PanelRow>
						<RangeControl
							label="Background Opacity"
							value={ ( backgroundOpacity ?? 1 ) * 100 }
							onChange={ ( nextOpacity ) =>
								setAttributes( {
									backgroundOpacity: nextOpacity / 100,
								} )
							}
							min={ 0 }
							max={ 100 }
						/>
					</PanelRow>
				</PanelBody>
				<ColumnOptions { ...props } />
				<BorderOptions { ...props } />
				<MarginOptions { ...props } />
				<PaddingOptions { ...props } />
				<DataComponentNameOptions { ...props } />
			</InspectorControls>
			<div { ...blockProps }>
				<div { ...innerBlocksProps }>
					{ BackgroundOptionsVideoOutput( props ) }
					<div
						className="popup-background-overlay"
						style={ {
							opacity: backgroundOpacity ?? 1,
							...BackgroundOptionsInlineStyles( props ),
						} }
					/>
					{ children }
				</div>
			</div>
		</>
	);
};

// Register block
export default registerBlockType( metadata, {
	icon: 'format-status',
	example: {},
	edit: Edit,

	save() {
		return <InnerBlocks.Content />;
	},
} );

const customClassName = createHigherOrderComponent( ( BlockListBlock ) => {
	return ( props ) => {
		if ( props.name === 'flexlayout/popup' ) {
			return (
				<BlockListBlock
					{ ...props }
					className={ classnames(
						'component-popup',
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
	'flexlayout/popup/customClassName',
	customClassName
);
