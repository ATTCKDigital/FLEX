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
	SelectControl,
	TextControl,
} = wp.components;

/**
 * Internal dependencies
 */
import BackgroundColorOptionsAttributes from './attributes';
import BackgroundColorOptionsInlineStyles from './inline-styles';

// Export for ease of importing in individual blocks.
export {
	BackgroundColorOptionsAttributes,
	BackgroundColorOptionsInlineStyles,
};

function BackgroundColorOptions( props ) {
	
	const setBackgroundColor = value => props.setAttributes( { backgroundColor: value } );



	const colorPanelSelect = () => {
		
		return (
			<PanelColorSettings
				title={ __( 'Background Color' ) }
				colorSettings={ [
						{
							value: props.attributes.backgroundColor,
							onChange: setBackgroundColor,
							label: __( 'Background Color' ),
						}
				] }
			>
			</PanelColorSettings>
		);
	};

	return (
		<PanelBody
			title={ __( 'Background Color' ) }
			className="wds-background-color-options"
			initialOpen={ false }
		>

			<PanelRow>
				{ colorPanelSelect() }
			</PanelRow>
		</PanelBody>
	);
}

export default BackgroundColorOptions;
