/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const {
	PanelBody,
	PanelRow,
	TextControl,
} = wp.components

/**
 * Internal dependencies
 */
import AnchorOptionsAttributes from './attributes';

// Export for ease of importing in individual blocks.
export {
	AnchorOptionsAttributes,
};

function AnchorOptions( props ) {
	const setAnchor = value => props.setAttributes( { anchor: value } );
	return (
		<PanelBody
			title={ __( 'HTML Anchor' ) }
			className="flexlayout-anchor-options"
			initialOpen={ false }
		>
			<PanelRow>
				<TextControl
						label="HTML Anchor"
						value={ props.attributes.anchor }
						onChange={ setAnchor }
				/>
			</PanelRow>
		</PanelBody>
	);
}

export default AnchorOptions;
