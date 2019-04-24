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
	SelectControl
} = wp.components;

/**
 * Internal dependencies
 */
import BorderOptionsAttributes from './attributes';
import BorderOptionsClasses from './classes';

// Export for ease of importing in individual blocks.
export {
	BorderOptionsAttributes,
	BorderOptionsClasses,
};

function BorderOptions( props ) {
	const setBorderTop = value => props.setAttributes( { borderTop: value } );
	const setBorderRight = value => props.setAttributes( { borderRight: value } );
	const setBorderBottom = value => props.setAttributes( { borderBottom: value } );
	const setBorderLeft = value => props.setAttributes( { borderLeft: value } );

	const borderSelect = () => {

		return (
			<div className="border-wrapper">
				<div className="border-inner-wrapper">
					<PanelRow>
						<SelectControl
							key="border-top"
							label={ __( 'Top Border' ) }
							value={ props.attributes.borderTop ? props.attributes.borderTop : '' }
							onChange={ setBorderTop }
							options={ [
								{
									label: __( 'No border' ),
									value: 'none',
								},
								{
									label: __( 'Default Gray Border' ),
									value: 'default',
								},
								{
									label: __( 'Black Border' ),
									value: 'black',
								},
								{
									label: __( 'White Border' ),
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
							label={ __( 'Right Border' ) }
							value={ props.attributes.borderRight ? props.attributes.borderRight : '' }
							onChange={ setBorderRight }
							options={ [
								{
									label: __( 'No border' ),
									value: 'none',
								},
								{
									label: __( 'Default Gray Border' ),
									value: 'default',
								},
								{
									label: __( 'Black Border' ),
									value: 'black',
								},
								{
									label: __( 'White Border' ),
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
							label={ __( 'Bottom Border' ) }
							value={ props.attributes.borderBottom ? props.attributes.borderBottom : '' }
							onChange={ setBorderBottom }
							options={ [
								{
									label: __( 'No border' ),
									value: 'none',
								},
								{
									label: __( 'Default Gray Border' ),
									value: 'default',
								},
								{
									label: __( 'Black Border' ),
									value: 'black',
								},
								{
									label: __( 'White Border' ),
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
							label={ __( 'Left Border' ) }
							value={ props.attributes.borderLeft ? props.attributes.borderLeft : '' }
							onChange={ setBorderLeft }
							options={ [
								{
									label: __( 'No border' ),
									value: 'none',
								},
								{
									label: __( 'Default Gray Border' ),
									value: 'default',
								},
								{
									label: __( 'Black Border' ),
									value: 'black',
								},
								{
									label: __( 'White Border' ),
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
