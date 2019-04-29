/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const {
	PanelColorSettings,
} = wp.editor;

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
}

export default BackgroundColorOptions;
