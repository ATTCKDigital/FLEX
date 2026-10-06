// Block dependencies
import classnames from 'classnames';
import metadata from './block.json';

// Internal block libraries
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { PlainText, InspectorControls, useBlockProps } = wp.blockEditor;

// Internal dependencies
import MarginOptions, {
	MarginOptionsClasses,
} from '../../components/gb-component_margin';
import BorderOptions, {
	BorderOptionsClasses,
} from '../../components/gb-component_border';
import PaddingOptions, {
	PaddingOptionsClasses,
} from '../../components/gb-component_padding';

// Editor component (named so the react-hooks lint rule recognises useBlockProps).
const Edit = ( props ) => {
	const {
		attributes: { content },
		setAttributes,
	} = props;

	const blockProps = useBlockProps( {
		className: classnames(
			`component-shortcode`,
			...MarginOptionsClasses( props ),
			...PaddingOptionsClasses( props ),
			...BorderOptionsClasses( props )
		),
	} );

	return (
		<>
			<InspectorControls>
				<MarginOptions { ...props } />
				<PaddingOptions { ...props } />
				<BorderOptions { ...props } />
			</InspectorControls>
			<div { ...blockProps }>
				<PlainText
					value={ content }
					onChange={ ( nextContent ) =>
						setAttributes( { content: nextContent } )
					}
					placeholder={ __( 'Paste shortcode…' ) }
					aria-label={ __( 'shortcode' ) }
				/>
			</div>
		</>
	);
};

// Register block
export default registerBlockType( metadata, {
	icon: 'shortcode',
	example: {},
	edit: Edit,
	save() {
		return null;
	},
} );
