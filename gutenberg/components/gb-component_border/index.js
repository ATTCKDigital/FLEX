// WordPress dependencies
const { __ } = wp.i18n;

const {
	ColorPalette,
	PanelColorSettings,
	MediaUpload,
} = wp.blockEditor;

const {
	Button,
	Dashicon,
	PanelBody,
	PanelRow,
	SelectControl
} = wp.components;

// Internal dependencies
import BorderOptionsAttributes from './attributes';
import BorderOptionsClasses from './classes';

// Export for ease of importing in individual blocks.
export {
	BorderOptionsAttributes,
	BorderOptionsClasses,
};

function BorderOptions( props ) {
	const setBorder = (which, value) => {
		let borderEdited = '';
		let borderEditedCount = 0;

		// Save prop
		props.setAttributes( { [which]: value } );

		// Check local var since no callback after attribute 
		// has been set which the function below will find.
		// https://github.com/WordPress/gutenberg/issues/5596
		if (typeof value !== 'undefined' && value.toLowerCase() !== 'inherit') {
			borderEditedCount++;
		}

		// Loop over all padding options and 
		// check if any changed values aren't 'Inherit'
		for (const property in BorderOptionsAttributes) {
			if (typeof props.attributes[property] !== 'undefined' && props.attributes[property].toLowerCase() !== 'inherit') {
				borderEditedCount++;
			}
		}

		if (borderEditedCount > 0) {
			props.setAttributes( { borderEdited: `(${borderEditedCount} set)` } );
		}

		return '';
	}

	const svgHeight = {
		height: 0
	};

	const borderSelect = () => {
		return (
			<div className="border-wrapper">
				<div className="border-inner-wrapper">
					<PanelRow>
						<SelectControl
							key="border-top"
							label={ __( 'Top' ) }
							value={ props.attributes.borderTop ? props.attributes.borderTop : '' }
							onChange={ (e) => setBorder('borderTop', e) }
							options={ [
								{
									label: __ ( 'Choose border style' ),
									value: 'inherit',
								},
								{
									label: __( 'None' ),
									value: 'none',
								},
								{
									label: __( 'Default Gray' ),
									value: 'default',
								},
								{
									label: __( 'Black' ),
									value: 'black',
								},
								{
									label: __( 'White' ),
									value: 'white',
								},
								{
									label: __( 'Brand Primary Color' ),
									value: 'brand-primary',
								},
								{
									label: __( 'Brand Secondary Color' ),
									value: 'brand-secondary',
								},
								{
									label: __( 'Brand Accent Color' ),
									value: 'brand-accent',
								},
							] }
						/>
						<SelectControl
							key="border-right"
							label={ __( 'Right' ) }
							value={ props.attributes.borderRight ? props.attributes.borderRight : '' }
							onChange={ (e) => setBorder('borderRight', e) }
							options={ [
								{
									label: __ ( 'Choose border style' ),
									value: 'inherit',
								},
								{
									label: __( 'None' ),
									value: 'none',
								},
								{
									label: __( 'Default Gray' ),
									value: 'default',
								},
								{
									label: __( 'Black' ),
									value: 'black',
								},
								{
									label: __( 'White' ),
									value: 'white',
								},
								{
									label: __( 'Brand Primary Color' ),
									value: 'brand-primary',
								},
								{
									label: __( 'Brand Secondary Color' ),
									value: 'brand-secondary',
								},
								{
									label: __( 'Brand Accent Color' ),
									value: 'brand-accent',
								},
							] }
						/>
						<SelectControl
							key="border-bottom"
							label={ __( 'Bottom' ) }
							value={ props.attributes.borderBottom ? props.attributes.borderBottom : '' }
							onChange={ (e) => setBorder('borderBottom', e) }
							options={ [
								{
									label: __ ( 'Choose border style' ),
									value: 'inherit',
								},
								{
									label: __( 'None' ),
									value: 'none',
								},
								{
									label: __( 'Default Gray' ),
									value: 'default',
								},
								{
									label: __( 'Black' ),
									value: 'black',
								},
								{
									label: __( 'White' ),
									value: 'white',
								},
								{
									label: __( 'Brand Primary Color' ),
									value: 'brand-primary',
								},
								{
									label: __( 'Brand Secondary Color' ),
									value: 'brand-secondary',
								},
								{
									label: __( 'Brand Accent Color' ),
									value: 'brand-accent',
								},
							] }
						/>
						<SelectControl
							key="border-left"
							label={ __( 'Left' ) }
							value={ props.attributes.borderLeft ? props.attributes.borderLeft : '' }
							onChange={ (e) => setBorder('borderLeft', e) }
							options={ [
								{
									label: __ ( 'Choose border style' ),
									value: 'inherit',
								},
								{
									label: __( 'None' ),
									value: 'none',
								},
								{
									label: __( 'Default Gray' ),
									value: 'default',
								},
								{
									label: __( 'Black' ),
									value: 'black',
								},
								{
									label: __( 'White' ),
									value: 'white',
								},
								{
									label: __( 'Brand Primary Color' ),
									value: 'brand-primary',
								},
								{
									label: __( 'Brand Secondary Color' ),
									value: 'brand-secondary',
								},
								{
									label: __( 'Brand Accent Color' ),
									value: 'brand-accent',
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
			title={ __( 'Border' ) }
			title={ __( 'Border ' + ( props.attributes.borderEdited || setBorder() ) ) }
			className="flexlayout-border-options"
			initialOpen={ false }
		>
		<img 
			// Use empty SVG to trigger onload event 
			// Onload hack fires when block is added
			className="onload-hack-pp"
			height="0"
			width="0"
			onLoad={ setBorder }
			src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1' %3E%3Cpath d=''/%3E%3C/svg%3E"
			style={ svgHeight }
			></img>
			<PanelRow>
				{ borderSelect() }
			</PanelRow>
		</PanelBody>
	);
}

export default BorderOptions;
