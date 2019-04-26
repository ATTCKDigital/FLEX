/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const {
	ColorPalette,
	PanelColorSettings,
} = wp.editor;

const {
	Button,
	Dashicon,
	PanelBody,
	PanelRow,
	SelectControl,
} = wp.components;

/**
 * Internal dependencies
 */
import TextColorAttributes from './attributes';
import TextColorClasses from './classes';
import TextColorInlineStyles from './inline-styles';
// import './editor.scss';

// Export for ease of importing in individual blocks.
export {
	TextColorAttributes,
	TextColorClasses,
	TextColorInlineStyles,
};

function TextColorOptions( props ) {
	const setTextColor = value => props.setAttributes( { textColor: value } );

	return (

		<PanelColorSettings
				title={ __( 'Text Color' ) }
				initialOpen={ false }
				colorSettings={ [
					{
						value: props.attributes.textColor,
						onChange: setTextColor,
						label: __( 'Text Color' ),
					}
				] }
			>
		</PanelColorSettings>

	);
}

export default TextColorOptions;
