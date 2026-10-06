import 'FLEX/js/client-namespace';

// Block dependencies
import classnames from 'classnames';
import icons from '../../../js/icons.js';
import metadata from './block.json';

// Internal block libraries
const { __ } = wp.i18n;

// WordPress dependencies
const { registerBlockType } = wp.blocks;

const { AlignmentToolbar, BlockControls, InspectorControls, useBlockProps } =
	wp.blockEditor;

const { PanelBody, TextControl } = wp.components;

// Internal dependencies
import MarginOptions, {
	MarginOptionsClasses,
} from '../../components/gb-component_margin';
import PaddingOptions, {
	PaddingOptionsClasses,
} from '../../components/gb-component_padding';
import BackgroundColorOptions, {
	BackgroundColorOptionsInlineStyles,
} from '../../components/gb-component_background-color';

// Editor component (named so the react-hooks lint rule recognises useBlockProps).
const Edit = ( props ) => {
	const {
		attributes: { align, HRWidth },
		setAttributes,
	} = props;
	const blockProps = useBlockProps( {
		className: classnames(
			`component-hr`,
			`align-${ align }`,
			...MarginOptionsClasses( props ),
			...PaddingOptionsClasses( props )
		),
		style: {
			...BackgroundColorOptionsInlineStyles( props ),
		},
	} );
	return (
		<>
			<InspectorControls>
				<MarginOptions { ...props } />
				<PaddingOptions { ...props } />
				<BackgroundColorOptions { ...props } />
				<PanelBody title={ __( 'HR Line Settings', 'flexlayout' ) }>
					<p>{ __( 'Alignment', 'flexlayout' ) }</p>
					<AlignmentToolbar
						value={ align }
						onChange={ ( nextAlign ) => {
							setAttributes( { align: nextAlign } );
						} }
					/>
					<p>{ __( 'CSS Width (100%, 50px, auto, etc.)' ) }</p>
					<TextControl
						value={ HRWidth }
						onChange={ ( nextHRWidth ) => {
							setAttributes( { HRWidth: nextHRWidth } );
						} }
					/>
				</PanelBody>
			</InspectorControls>
			<BlockControls>
				<AlignmentToolbar
					value={ align }
					onChange={ ( nextAlign ) => {
						setAttributes( { align: nextAlign } );
					} }
				/>
			</BlockControls>
			<hr { ...blockProps } />
		</>
	);
};

// Register block
export default registerBlockType( metadata, {
	icon: icons.minus,
	example: {},
	edit: Edit,
	save() {
		return null;
	},
} );
