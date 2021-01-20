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
	const setBorderTop = value => {
		// if (value !== 'choose') {
			props.setAttributes( { borderTop: value } );
		// }
	}

	const setBorderRight = value => {
		// if (value !== 'choose') {
			props.setAttributes( { borderRight: value } );
		// }
	}

	const setBorderBottom = value => {
		// if (value !== 'choose') {
			props.setAttributes( { borderBottom: value } );
		// }
	}

	const setBorderLeft = value => {
		// if (value !== 'choose') {
			props.setAttributes( { borderLeft: value } );
		// }
	}

	const borderSelect = () => {
		return (
			<div className="border-wrapper">
				<div className="border-inner-wrapper">
					<PanelRow>
						<SelectControl
							key="border-top"
							label={ __( 'Top' ) }
							value={ props.attributes.borderTop ? props.attributes.borderTop : '' }
							onChange={ setBorderTop }
							options={ [
								{
									label: __ ( 'Choose border style' ),
									// value: null,
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
							onChange={ setBorderRight }
							options={ [
								{
									label: __ ( 'Choose border style' ),
									value: null,
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
							onChange={ setBorderBottom }
							options={ [
								{
									label: __ ( 'Choose border style' ),
									value: null,
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
							onChange={ setBorderLeft }
							options={ [
								{
									label: __ ( 'Choose border style' ),
									value: null,
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
			className="flexlayout-border-options"
			initialOpen={ false }
		>
			<PanelRow>
				{ borderSelect() }
			</PanelRow>
		</PanelBody>
	);
}

export default BorderOptions;
