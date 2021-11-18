// WordPress dependencies
const { __ } = wp.i18n;

const {
	PanelBody,
	PanelRow,
	TextControl,
} = wp.components

// Internal dependencies
import DataComponentNameAttributes from './attributes';

// Export for ease of importing in individual blocks.
export {
	DataComponentNameAttributes,
};

function DataComponentNameOptions( props ) {
	const setComponentName = value => props.setAttributes( { dataComponentName: value } );
	const setComponentOptions = value => props.setAttributes( { dataComponentOptions: value } );
	
	return (
		<PanelBody
			title={ __( 'FLEX Component' ) }
			className="flexlayout-componentname-options"
			initialOpen={ false }
		>
			<PanelRow>
				<TextControl
						label="Component Name(s) (e.g., Carousel, ColorTile, CopyLink, DropdownSection, Newsletter, VideoPopup), & remember to add 'component' to Additional CSS class(es) below."
						value={ props.attributes.dataComponentName }
						onChange={ setComponentName }
				/>
				<TextControl
						label="Component Options JSON (e.g., { 'loop': true })"
						value={ props.attributes.dataComponentOptions }
						onChange={ setComponentOptions }
				/>
			</PanelRow>
		</PanelBody>
	);
}

export default DataComponentNameOptions;
