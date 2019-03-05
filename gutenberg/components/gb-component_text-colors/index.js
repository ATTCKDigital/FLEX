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
import './editor.scss';

// Export for ease of importing in individual blocks.
export {
	TextColorAttributes,
	TextColorClasses,
};

function TextColorOptions( props ) {
	const setTextColor = value => props.setAttributes( { textColor: value } );



	const colorPanelSelect = () => {

		return (
			<PanelColorSettings
				title={ __( 'Text Color' ) }
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
	};

	return (
		<PanelBody
			title={ __( 'Text Color' ) }
			className="text-color-options"
			initialOpen={ false }
		>
			<PanelRow>
				{ colorPanelSelect() }
			</PanelRow>
		</PanelBody>
	);
}

export default TextColorOptions;
