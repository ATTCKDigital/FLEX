/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const {
	ColorPalette,
	PanelColorSettings,
	MediaUpload,
} = wp.editor;

const {
	Button,
	Dashicon,
	PanelBody,
	PanelRow,
	RangeControl,
	SelectControl,
} = wp.components;

/**
 * Internal dependencies
 */
import LogoColorOptionsAttributes from './attributes';
import LogoColorOptionsDataAttr from './data-attributes';
// import './editor.scss';

// Export for ease of importing in individual blocks.
export {
	LogoColorOptionsAttributes,
	LogoColorOptionsDataAttr,
};

function LogoColorOptions( props ) {
	const setLogoColor = value => props.setAttributes( { logoColor: value } );

	const logoColorSelect = () => {

		return (
			<div className="logo-color-wrapper">
				<div className="logo-color-inner-wrapper">
					<PanelRow>
						<SelectControl
							key="logo-color"
							label={__( 'Select Color', 'flexlayout' )}
							help={ __( 'If your theme supports a fixed nav, select whether the logo should be light or dark when over this row. Color will be reflective of branding.', 'flexlayout' )}
							value={ props.attributes.logoColor ? props.attributes.logoColor : '' }
							onChange={ setLogoColor }
							options={ [
								{
									label: __( 'Light' ),
									value: 'light',
								},
								{
									label: __( 'Dark' ),
									value: 'dark',
								},

							] }
						/>
					</PanelRow>
				</div>
			</div>
		);
	};

	return (
		<PanelBody
			title={ __( 'Logo Color' ) }
			className="flexlayout-logo-color-options"
			initialOpen={ false }
		>
			<PanelRow>
				{ logoColorSelect() }
			</PanelRow>
		</PanelBody>
	);
}

export default LogoColorOptions;
