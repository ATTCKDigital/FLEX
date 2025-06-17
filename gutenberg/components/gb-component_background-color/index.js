// WordPress dependencies
const { __ } = wp.i18n;

const {
	PanelColorSettings,
} = wp.blockEditor;

const {
	PanelBody,
	RangeControl
} = wp.components;

// Internal dependencies
import { Fragment } from '@wordpress/element';
import BackgroundColorOptionsAttributes from './attributes';
import BackgroundColorOptionsInlineStyles from './inline-styles';

// Export for ease of importing in individual blocks.
export {
	BackgroundColorOptionsAttributes,
	BackgroundColorOptionsInlineStyles,
};

function BackgroundColorOptions( props ) {
	const { attributes, setAttributes } = props;
	const { backgroundColor, backgroundOpacity = 100 } = attributes || {};

	// const setBackgroundColor = value => props.setAttributes( { backgroundColor: value } );
	const setBackgroundColor = (value) => setAttributes({ backgroundColor: value });
	
	return (
		<Fragment>
			<PanelColorSettings
				title={ __( 'Background Color' ) }
				initialOpen={ false }
				colorSettings={ [
					{
						value: backgroundColor,
						onChange: setBackgroundColor,
						label: __( 'Background Color' ),
					}
				] }
			>
			</PanelColorSettings>
			<PanelBody title={ __( 'Background Opacity' ) } initialOpen={false}>
				<RangeControl
					label={ __( 'Opacity (%)' ) }
					value={ backgroundOpacity }
					onChange={ (value) => setAttributes({ backgroundOpacity: value }) }
					min={ 0 }
					max={ 100 }
				/>
			</PanelBody>
		</Fragment>
	);
}

export default BackgroundColorOptions;
