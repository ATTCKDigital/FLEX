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
	RangeControl,
	SelectControl,
} = wp.components;

// Internal dependencies
import PaddingOptionsAttributes from './attributes';
import PaddingOptionsClasses from './classes';
// import './editor.scss';

// Export for ease of importing in individual blocks.
export {
	PaddingOptionsAttributes,
	PaddingOptionsClasses,
};

function PaddingOptions( props ) {
	const setPadding = (which, value) => {
		let paddingEdited = '';
		let paddingEditedCount = 0;

		// Save prop
		props.setAttributes( { [which]: value } );

		// Check local var since no callback after attribute 
		// has been set which the function below will find.
		// https://github.com/WordPress/gutenberg/issues/5596
		if (typeof value !== 'undefined' && value.toLowerCase() !== 'inherit') {
			paddingEditedCount++;
		}

		// Loop over all padding options and 
		// check if any changed values aren't 'Inherit'
		for (const property in PaddingOptionsAttributes) {
			if (typeof props.attributes[property] !== 'undefined' && props.attributes[property].toLowerCase() !== 'inherit') {
				paddingEditedCount++;
			}
		}

		if (paddingEditedCount > 0) {
			props.setAttributes( { paddingEdited: `(${paddingEditedCount} set)` } );
		}

		return '';
	}

	const svgHeight = {
		height: 0
	};

	const paddingSelect = () => {
		return (
			<div className="padding-wrapper">
				<p>Inherit uses prev screen size setting.</p>
				<div className="padding-inner-wrapper">
					<h2 className="components-panel__body-title">Default Padding</h2>
					<PanelRow>
						<SelectControl
							key="padding-top"
							label={ __( 'Top' ) }
							value={ props.attributes.paddingTop ? props.attributes.paddingTop : '' }
							onChange={ (e) => setPadding('paddingTop', e) }
							options={ [
								{
									label: __( 'Inherit' ),
									value: 'inherit',
								},
								{
									label: __( '0' ),
									value: '0x',
								},
								{
									label: __( '1x' ),
									value: '1x',
								},
								{
									label: __( '2x' ),
									value: '2x',
								},
								{
									label: __( '4x' ),
									value: '4x',
								},
								{
									label: __( '8x' ),
									value: '8x',
								},
								{
									label: __( '16x' ),
									value: '16x',
								},
							] }
						/>
					</PanelRow>
					<PanelRow>
						<SelectControl
							key="padding-right"
							label={ __( 'Right' ) }
							value={ props.attributes.paddingRight ? props.attributes.paddingRight : '' }
							onChange={ (e) => setPadding('paddingRight', e) }
							options={ [
								{
									label: __( 'Inherit' ),
									value: 'inherit',
								},
								{
									label: __( '0' ),
									value: '0x',
								},
								{
									label: __( '1x' ),
									value: '1x',
								},
								{
									label: __( '2x' ),
									value: '2x',
								},
								{
									label: __( '4x' ),
									value: '4x',
								},
								{
									label: __( '8x' ),
									value: '8x',
								},
								{
									label: __( '16x' ),
									value: '16x',
								},
							] }
						/>
					</PanelRow>
					<PanelRow>
						<SelectControl
							key="padding-bottom"
							label={ __( 'Bottom' ) }
							value={ props.attributes.paddingBottom ? props.attributes.paddingBottom : '' }
							onChange={ (e) => setPadding('paddingBottom', e) }
							options={ [
								{
									label: __( 'Inherit' ),
									value: 'inherit',
								},
								{
									label: __( '0' ),
									value: '0x',
								},
								{
									label: __( '1x' ),
									value: '1x',
								},
								{
									label: __( '2x' ),
									value: '2x',
								},
								{
									label: __( '4x' ),
									value: '4x',
								},
								{
									label: __( '8x' ),
									value: '8x',
								},
								{
									label: __( '16x' ),
									value: '16x',
								},
							] }
						/>
					</PanelRow>
					<PanelRow>
						<SelectControl
							key="padding-left"
							label={ __( 'Left' ) }
							value={ props.attributes.paddingLeft ? props.attributes.paddingLeft : '' }
							onChange={ (e) => setPadding('paddingLeft', e) }
							options={ [
								{
									label: __( 'Inherit' ),
									value: 'inherit',
								},
								{
									label: __( '0' ),
									value: '0x',
								},
								{
									label: __( '1x' ),
									value: '1x',
								},
								{
									label: __( '2x' ),
									value: '2x',
								},
								{
									label: __( '4x' ),
									value: '4x',
								},
								{
									label: __( '8x' ),
									value: '8x',
								},
								{
									label: __( '16x' ),
									value: '16x',
								},
							] }
						/>
					</PanelRow>
				</div>
				<div className="padding-inner-wrapper">
					<h2 className="components-panel__body-title">Phone Padding</h2>
					<PanelRow>
						<SelectControl
							key="padding-phone-top"
							label={ __( 'Top' ) }
							value={ props.attributes.paddingPhoneTop ? props.attributes.paddingPhoneTop : '' }
							onChange={ (e) => setPadding('paddingPhoneTop', e) }
							options={ [
								{
									label: __( 'Inherit' ),
									value: 'inherit',
								},
								{
									label: __( '0' ),
									value: '0x',
								},
								{
									label: __( '1x' ),
									value: '1x',
								},
								{
									label: __( '2x' ),
									value: '2x',
								},
								{
									label: __( '4x' ),
									value: '4x',
								},
								{
									label: __( '8x' ),
									value: '8x',
								},
								{
									label: __( '16x' ),
									value: '16x',
								},
							] }
						/>
					</PanelRow>
					<PanelRow>
						<SelectControl
							key="padding-phone-right"
							label={ __( 'Right' ) }
							value={ props.attributes.paddingPhoneRight ? props.attributes.paddingPhoneRight : '' }
							onChange={ (e) => setPadding('paddingPhoneRight', e) }
							options={ [
								{
									label: __( 'Inherit' ),
									value: 'inherit',
								},
								{
									label: __( '0' ),
									value: '0x',
								},
								{
									label: __( '1x' ),
									value: '1x',
								},
								{
									label: __( '2x' ),
									value: '2x',
								},
								{
									label: __( '4x' ),
									value: '4x',
								},
								{
									label: __( '8x' ),
									value: '8x',
								},
								{
									label: __( '16x' ),
									value: '16x',
								},
							] }
						/>
					</PanelRow>
					<PanelRow>
						<SelectControl
							key="padding-phone-bottom"
							label={ __( 'Bottom' ) }
							value={ props.attributes.paddingPhoneBottom ? props.attributes.paddingPhoneBottom : '' }
							onChange={ (e) => setPadding('paddingPhoneBottom', e) }
							options={ [
								{
									label: __( 'Inherit' ),
									value: 'inherit',
								},
								{
									label: __( '0' ),
									value: '0x',
								},
								{
									label: __( '1x' ),
									value: '1x',
								},
								{
									label: __( '2x' ),
									value: '2x',
								},
								{
									label: __( '4x' ),
									value: '4x',
								},
								{
									label: __( '8x' ),
									value: '8x',
								},
								{
									label: __( '16x' ),
									value: '16x',
								},
							] }
						/>
					</PanelRow>
					<PanelRow>
						<SelectControl
							key="padding-phone-left"
							label={ __( 'Left' ) }
							value={ props.attributes.paddingPhoneLeft ? props.attributes.paddingPhoneLeft : '' }
							onChange={ (e) => setPadding('paddingPhoneLeft', e) }
							options={ [
								{
									label: __( 'Inherit' ),
									value: 'inherit',
								},
								{
									label: __( '0' ),
									value: '0x',
								},
								{
									label: __( '1x' ),
									value: '1x',
								},
								{
									label: __( '2x' ),
									value: '2x',
								},
								{
									label: __( '4x' ),
									value: '4x',
								},
								{
									label: __( '8x' ),
									value: '8x',
								},
								{
									label: __( '16x' ),
									value: '16x',
								},
							] }
						/>
					</PanelRow>
				</div>

				<div className="padding-inner-wrapper">
					<h2 className="components-panel__body-title">Phone-Plus Padding</h2>
					<PanelRow>
						<SelectControl
							key="padding-phone-plus-top"
							label={ __( 'Top' ) }
							value={ props.attributes.paddingPhonePlusTop ? props.attributes.paddingPhonePlusTop : '' }
							onChange={ (e) => setPadding('paddingPhonePlusTop', e) }
							options={ [
								{
									label: __( 'Inherit' ),
									value: 'inherit',
								},
								{
									label: __( '0' ),
									value: '0x',
								},
								{
									label: __( '1x' ),
									value: '1x',
								},
								{
									label: __( '2x' ),
									value: '2x',
								},
								{
									label: __( '4x' ),
									value: '4x',
								},
								{
									label: __( '8x' ),
									value: '8x',
								},
								{
									label: __( '16x' ),
									value: '16x',
								},
							] }
						/>
					</PanelRow>
					<PanelRow>
						<SelectControl
							key="padding-phone-plus-right"
							label={ __( 'Right' ) }
							value={ props.attributes.paddingPhonePlusRight ? props.attributes.paddingPhonePlusRight : '' }
							onChange={ (e) => setPadding('paddingPhonePlusRight', e) }
							options={ [
								{
									label: __( 'Inherit' ),
									value: 'inherit',
								},
								{
									label: __( '0' ),
									value: '0x',
								},
								{
									label: __( '1x' ),
									value: '1x',
								},
								{
									label: __( '2x' ),
									value: '2x',
								},
								{
									label: __( '4x' ),
									value: '4x',
								},
								{
									label: __( '8x' ),
									value: '8x',
								},
								{
									label: __( '16x' ),
									value: '16x',
								},
							] }
						/>
					</PanelRow>
					<PanelRow>
						<SelectControl
							key="padding-phone-plus-bottom"
							label={ __( 'Bottom' ) }
							value={ props.attributes.paddingPhonePlusBottom ? props.attributes.paddingPhonePlusBottom : '' }
							onChange={ (e) => setPadding('paddingPhonePlusBottom', e) }
							options={ [
								{
									label: __( 'Inherit' ),
									value: 'inherit',
								},
								{
									label: __( '0' ),
									value: '0x',
								},
								{
									label: __( '1x' ),
									value: '1x',
								},
								{
									label: __( '2x' ),
									value: '2x',
								},
								{
									label: __( '4x' ),
									value: '4x',
								},
								{
									label: __( '8x' ),
									value: '8x',
								},
								{
									label: __( '16x' ),
									value: '16x',
								},
							] }
						/>
					</PanelRow>
					<PanelRow>
						<SelectControl
							key="padding-phone-plus-left"
							label={ __( 'Left' ) }
							value={ props.attributes.paddingPhonePlusLeft ? props.attributes.paddingPhonePlusLeft : '' }
							onChange={ (e) => setPadding('paddingPhonePlusLeft', e) }
							options={ [
								{
									label: __( 'Inherit' ),
									value: 'inherit',
								},
								{
									label: __( '0' ),
									value: '0x',
								},
								{
									label: __( '1x' ),
									value: '1x',
								},
								{
									label: __( '2x' ),
									value: '2x',
								},
								{
									label: __( '4x' ),
									value: '4x',
								},
								{
									label: __( '8x' ),
									value: '8x',
								},
								{
									label: __( '16x' ),
									value: '16x',
								},
							] }
						/>
					</PanelRow>
				</div>

				<div className="padding-inner-wrapper">
					<h2 className="components-panel__body-title">Tablet-Portrait Padding</h2>
					<PanelRow>
						<SelectControl
							key="padding-tablet-portrait-top"
							label={ __( 'Top' ) }
							value={ props.attributes.paddingTabletPortraitTop ? props.attributes.paddingTabletPortraitTop : '' }
							onChange={ (e) => setPadding('paddingTabletPortraitTop', e) }
							options={ [
								{
									label: __( 'Inherit' ),
									value: 'inherit',
								},
								{
									label: __( '0' ),
									value: '0x',
								},
								{
									label: __( '1x' ),
									value: '1x',
								},
								{
									label: __( '2x' ),
									value: '2x',
								},
								{
									label: __( '4x' ),
									value: '4x',
								},
								{
									label: __( '8x' ),
									value: '8x',
								},
								{
									label: __( '16x' ),
									value: '16x',
								},
							] }
						/>
					</PanelRow>
					<PanelRow>
						<SelectControl
							key="padding-tablet-portrait-right"
							label={ __( 'Right' ) }
							value={ props.attributes.paddingTabletPortraitRight ? props.attributes.paddingTabletPortraitRight : '' }
							onChange={ (e) => setPadding('paddingTabletPortraitRight', e) }
							options={ [
								{
									label: __( 'Inherit' ),
									value: 'inherit',
								},
								{
									label: __( '0' ),
									value: '0x',
								},
								{
									label: __( '1x' ),
									value: '1x',
								},
								{
									label: __( '2x' ),
									value: '2x',
								},
								{
									label: __( '4x' ),
									value: '4x',
								},
								{
									label: __( '8x' ),
									value: '8x',
								},
								{
									label: __( '16x' ),
									value: '16x',
								},
							] }
						/>
					</PanelRow>
					<PanelRow>
						<SelectControl
							key="padding-tablet-portrait-bottom"
							label={ __( 'Bottom' ) }
							value={ props.attributes.paddingTabletPortraitBottom ? props.attributes.paddingTabletPortraitBottom : '' }
							onChange={ (e) => setPadding('paddingTabletPortraitBottom', e) }
							options={ [
								{
									label: __( 'Inherit' ),
									value: 'inherit',
								},
								{
									label: __( '0' ),
									value: '0x',
								},
								{
									label: __( '1x' ),
									value: '1x',
								},
								{
									label: __( '2x' ),
									value: '2x',
								},
								{
									label: __( '4x' ),
									value: '4x',
								},
								{
									label: __( '8x' ),
									value: '8x',
								},
								{
									label: __( '16x' ),
									value: '16x',
								},
							] }
						/>
					</PanelRow>
					<PanelRow>
						<SelectControl
							key="padding-tablet-portrait-left"
							label={ __( 'Left' ) }
							value={ props.attributes.paddingTabletPortraitLeft ? props.attributes.paddingTabletPortraitLeft : '' }
							onChange={ (e) => setPadding('paddingTabletPortraitLeft', e) }
							options={ [
								{
									label: __( 'Inherit' ),
									value: 'inherit',
								},
								{
									label: __( '0' ),
									value: '0x',
								},
								{
									label: __( '1x' ),
									value: '1x',
								},
								{
									label: __( '2x' ),
									value: '2x',
								},
								{
									label: __( '4x' ),
									value: '4x',
								},
								{
									label: __( '8x' ),
									value: '8x',
								},
								{
									label: __( '16x' ),
									value: '16x',
								},
							] }
						/>
					</PanelRow>
				</div>
				<div className="padding-inner-wrapper">
					<h2 className="components-panel__body-title">Tablet-Landscape Padding</h2>
					<PanelRow>
						<SelectControl
							key="padding-tablet-landscape-top"
							label={ __( 'Top' ) }
							value={ props.attributes.paddingTabletLandscapeTop ? props.attributes.paddingTabletLandscapeTop : '' }
							onChange={ (e) => setPadding('paddingTabletLandscapeTop', e) }
							options={ [
								{
									label: __( 'Inherit' ),
									value: 'inherit',
								},
								{
									label: __( '0' ),
									value: '0x',
								},
								{
									label: __( '1x' ),
									value: '1x',
								},
								{
									label: __( '2x' ),
									value: '2x',
								},
								{
									label: __( '4x' ),
									value: '4x',
								},
								{
									label: __( '8x' ),
									value: '8x',
								},
								{
									label: __( '16x' ),
									value: '16x',
								},
							] }
						/>
					</PanelRow>
					<PanelRow>
						<SelectControl
							key="padding-tablet-landscape-right"
							label={ __( 'Right' ) }
							value={ props.attributes.paddingTabletLandscapeRight ? props.attributes.paddingTabletLandscapeRight : '' }
							onChange={ (e) => setPadding('paddingTabletLandscapeRight', e) }
							options={ [
								{
									label: __( 'Inherit' ),
									value: 'inherit',
								},
								{
									label: __( '0' ),
									value: '0x',
								},
								{
									label: __( '1x' ),
									value: '1x',
								},
								{
									label: __( '2x' ),
									value: '2x',
								},
								{
									label: __( '4x' ),
									value: '4x',
								},
								{
									label: __( '8x' ),
									value: '8x',
								},
								{
									label: __( '16x' ),
									value: '16x',
								},
							] }
						/>
					</PanelRow>
					<PanelRow>
						<SelectControl
							key="padding-tablet-landscape-bottom"
							label={ __( 'Bottom' ) }
							value={ props.attributes.paddingTabletLandscapeBottom ? props.attributes.paddingTabletLandscapeBottom : '' }
							onChange={ (e) => setPadding('paddingTabletLandscapeBottom', e) }
							options={ [
								{
									label: __( 'Inherit' ),
									value: 'inherit',
								},
								{
									label: __( '0' ),
									value: '0x',
								},
								{
									label: __( '1x' ),
									value: '1x',
								},
								{
									label: __( '2x' ),
									value: '2x',
								},
								{
									label: __( '4x' ),
									value: '4x',
								},
								{
									label: __( '8x' ),
									value: '8x',
								},
								{
									label: __( '16x' ),
									value: '16x',
								},
							] }
						/>
					</PanelRow>
					<PanelRow>
						<SelectControl
							key="padding-tablet-landscape-left"
							label={ __( 'Left' ) }
							value={ props.attributes.paddingTabletLandscapeLeft ? props.attributes.paddingTabletLandscapeLeft : '' }
							onChange={ (e) => setPadding('paddingTabletLandscapeLeft', e) }
							options={ [
								{
									label: __( 'Inherit' ),
									value: 'inherit',
								},
								{
									label: __( '0' ),
									value: '0x',
								},
								{
									label: __( '1x' ),
									value: '1x',
								},
								{
									label: __( '2x' ),
									value: '2x',
								},
								{
									label: __( '4x' ),
									value: '4x',
								},
								{
									label: __( '8x' ),
									value: '8x',
								},
								{
									label: __( '16x' ),
									value: '16x',
								},
							] }
						/>
					</PanelRow>
				</div>
				<div className="padding-inner-wrapper">
					<h2 className="components-panel__body-title">Desktop Padding</h2>
					<PanelRow>
						<SelectControl
							key="padding-desktop-top"
							label={ __( 'Top' ) }
							value={ props.attributes.paddingDesktopTop ? props.attributes.paddingDesktopTop : '' }
							onChange={ (e) => setPadding('paddingDesktopTop', e) }
							options={ [
								{
									label: __( 'Inherit' ),
									value: 'inherit',
								},
								{
									label: __( '0' ),
									value: '0x',
								},
								{
									label: __( '1x' ),
									value: '1x',
								},
								{
									label: __( '2x' ),
									value: '2x',
								},
								{
									label: __( '4x' ),
									value: '4x',
								},
								{
									label: __( '8x' ),
									value: '8x',
								},
								{
									label: __( '16x' ),
									value: '16x',
								},
							] }
						/>
					</PanelRow>
					<PanelRow>
						<SelectControl
							key="padding-desktop-right"
							label={ __( 'Right' ) }
							value={ props.attributes.paddingDesktopRight ? props.attributes.paddingDesktopRight : '' }
							onChange={ (e) => setPadding('paddingDesktopRight', e) }
							options={ [
								{
									label: __( 'Inherit' ),
									value: 'inherit',
								},
								{
									label: __( '0' ),
									value: '0x',
								},
								{
									label: __( '1x' ),
									value: '1x',
								},
								{
									label: __( '2x' ),
									value: '2x',
								},
								{
									label: __( '4x' ),
									value: '4x',
								},
								{
									label: __( '8x' ),
									value: '8x',
								},
								{
									label: __( '16x' ),
									value: '16x',
								},
							] }
						/>
					</PanelRow>
					<PanelRow>
						<SelectControl
							key="padding-desktop-bottom"
							label={ __( 'Bottom' ) }
							value={ props.attributes.paddingDesktopBottom ? props.attributes.paddingDesktopBottom : '' }
							onChange={ (e) => setPadding('paddingDesktopBottom', e) }
							options={ [
								{
									label: __( 'Inherit' ),
									value: 'inherit',
								},
								{
									label: __( '0' ),
									value: '0x',
								},
								{
									label: __( '1x' ),
									value: '1x',
								},
								{
									label: __( '2x' ),
									value: '2x',
								},
								{
									label: __( '4x' ),
									value: '4x',
								},
								{
									label: __( '8x' ),
									value: '8x',
								},
								{
									label: __( '16x' ),
									value: '16x',
								},
							] }
						/>
					</PanelRow>
					<PanelRow>
						<SelectControl
							key="padding-desktop-left"
							label={ __( 'Left' ) }
							value={ props.attributes.paddingDesktopLeft ? props.attributes.paddingDesktopLeft : '' }
							onChange={ (e) => setPadding('paddingDesktopLeft', e) }
							options={ [
								{
									label: __( 'Inherit' ),
									value: 'inherit',
								},
								{
									label: __( '0' ),
									value: '0x',
								},
								{
									label: __( '1x' ),
									value: '1x',
								},
								{
									label: __( '2x' ),
									value: '2x',
								},
								{
									label: __( '4x' ),
									value: '4x',
								},
								{
									label: __( '8x' ),
									value: '8x',
								},
								{
									label: __( '16x' ),
									value: '16x',
								},
							] }
						/>
					</PanelRow>
				</div>
				<div className="padding-inner-wrapper">
					<h2 className="components-panel__body-title">Xl Padding</h2>
					<PanelRow>
						<SelectControl
							key="padding-xl-top"
							label={ __( 'Top' ) }
							value={ props.attributes.paddingXlTop ? props.attributes.paddingXlTop : '' }
							onChange={ (e) => setPadding('paddingXlTop', e) }
							options={ [
								{
									label: __( 'Inherit' ),
									value: 'inherit',
								},
								{
									label: __( '0' ),
									value: '0x',
								},
								{
									label: __( '1x' ),
									value: '1x',
								},
								{
									label: __( '2x' ),
									value: '2x',
								},
								{
									label: __( '4x' ),
									value: '4x',
								},
								{
									label: __( '8x' ),
									value: '8x',
								},
								{
									label: __( '16x' ),
									value: '16x',
								},
							] }
						/>
					</PanelRow>
					<PanelRow>
						<SelectControl
							key="padding-xl-right"
							label={ __( 'Right' ) }
							value={ props.attributes.paddingXlRight ? props.attributes.paddingXlRight : '' }
							onChange={ (e) => setPadding('paddingXlRight', e) }
							options={ [
								{
									label: __( 'Inherit' ),
									value: 'inherit',
								},
								{
									label: __( '0' ),
									value: '0x',
								},
								{
									label: __( '1x' ),
									value: '1x',
								},
								{
									label: __( '2x' ),
									value: '2x',
								},
								{
									label: __( '4x' ),
									value: '4x',
								},
								{
									label: __( '8x' ),
									value: '8x',
								},
								{
									label: __( '16x' ),
									value: '16x',
								},
							] }
						/>
					</PanelRow>
					<PanelRow>
						<SelectControl
							key="padding-xl-bottom"
							label={ __( 'Bottom' ) }
							value={ props.attributes.paddingXlBottom ? props.attributes.paddingXlBottom : '' }
							onChange={ (e) => setPadding('paddingXlBottom', e) }
							options={ [
								{
									label: __( 'Inherit' ),
									value: 'inherit',
								},
								{
									label: __( '0' ),
									value: '0x',
								},
								{
									label: __( '1x' ),
									value: '1x',
								},
								{
									label: __( '2x' ),
									value: '2x',
								},
								{
									label: __( '4x' ),
									value: '4x',
								},
								{
									label: __( '8x' ),
									value: '8x',
								},
								{
									label: __( '16x' ),
									value: '16x',
								},
							] }
						/>
					</PanelRow>
					<PanelRow>
						<SelectControl
							key="padding-xl-left"
							label={ __( 'Left' ) }
							value={ props.attributes.paddingXlLeft ? props.attributes.paddingXlLeft : '' }
							onChange={ (e) => setPadding('paddingXlLeft', e) }
							options={ [
								{
									label: __( 'Inherit' ),
									value: 'inherit',
								},
								{
									label: __( '0' ),
									value: '0x',
								},
								{
									label: __( '1x' ),
									value: '1x',
								},
								{
									label: __( '2x' ),
									value: '2x',
								},
								{
									label: __( '4x' ),
									value: '4x',
								},
								{
									label: __( '8x' ),
									value: '8x',
								},
								{
									label: __( '16x' ),
									value: '16x',
								},
							] }
						/>
					</PanelRow>
				</div>
				<div className="padding-inner-wrapper">
					<h2 className="components-panel__body-title">Xl2 Padding</h2>
					<PanelRow>
						<SelectControl
							key="padding-xl2-top"
							label={ __( 'Top' ) }
							value={ props.attributes.paddingXl2Top ? props.attributes.paddingXl2Top : '' }
							onChange={ (e) => setPadding('paddingXl2Top', e) }
							options={ [
								{
									label: __( 'Inherit' ),
									value: 'inherit',
								},
								{
									label: __( '0' ),
									value: '0x',
								},
								{
									label: __( '1x' ),
									value: '1x',
								},
								{
									label: __( '2x' ),
									value: '2x',
								},
								{
									label: __( '4x' ),
									value: '4x',
								},
								{
									label: __( '8x' ),
									value: '8x',
								},
								{
									label: __( '16x' ),
									value: '16x',
								},
							] }
						/>
					</PanelRow>
					<PanelRow>
						<SelectControl
							key="padding-xl2-right"
							label={ __( 'Right' ) }
							value={ props.attributes.paddingXl2Right ? props.attributes.paddingXl2Right : '' }
							onChange={ (e) => setPadding('paddingXl2Right', e) }
							options={ [
								{
									label: __( 'Inherit' ),
									value: 'inherit',
								},
								{
									label: __( '0' ),
									value: '0x',
								},
								{
									label: __( '1x' ),
									value: '1x',
								},
								{
									label: __( '2x' ),
									value: '2x',
								},
								{
									label: __( '4x' ),
									value: '4x',
								},
								{
									label: __( '8x' ),
									value: '8x',
								},
								{
									label: __( '16x' ),
									value: '16x',
								},
							] }
						/>
					</PanelRow>
					<PanelRow>
						<SelectControl
							key="padding-xl2-bottom"
							label={ __( 'Bottom' ) }
							value={ props.attributes.paddingXl2Bottom ? props.attributes.paddingXl2Bottom : '' }
							onChange={ (e) => setPadding('paddingXl2Bottom', e) }
							options={ [
								{
									label: __( 'Inherit' ),
									value: 'inherit',
								},
								{
									label: __( '0' ),
									value: '0x',
								},
								{
									label: __( '1x' ),
									value: '1x',
								},
								{
									label: __( '2x' ),
									value: '2x',
								},
								{
									label: __( '4x' ),
									value: '4x',
								},
								{
									label: __( '8x' ),
									value: '8x',
								},
								{
									label: __( '16x' ),
									value: '16x',
								},
							] }
						/>
					</PanelRow>
					<PanelRow>
						<SelectControl
							key="padding-xl2-left"
							label={ __( 'Left' ) }
							value={ props.attributes.paddingXl2Left ? props.attributes.paddingXl2Left : '' }
							onChange={ (e) => setPadding('paddingXl2Left', e) }
							options={ [
								{
									label: __( 'Inherit' ),
									value: 'inherit',
								},
								{
									label: __( '0' ),
									value: '0x',
								},
								{
									label: __( '1x' ),
									value: '1x',
								},
								{
									label: __( '2x' ),
									value: '2x',
								},
								{
									label: __( '4x' ),
									value: '4x',
								},
								{
									label: __( '8x' ),
									value: '8x',
								},
								{
									label: __( '16x' ),
									value: '16x',
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
			title={ __( 'Padding ' + ( props.attributes.paddingEdited || setPadding() ) ) }
			className="flexlayout-padding-options"
			initialOpen={ false }
		>
		<img 
			// Use empty SVG to trigger onload event 
			// Onload hack fires when block is added
			className="onload-hack-pp"
			height="0"
			width="0"
			onLoad={ setPadding }
			src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1' %3E%3Cpath d=''/%3E%3C/svg%3E"
			style={ svgHeight }
			></img>
			<PanelRow>
				{ paddingSelect() }
			</PanelRow>
		</PanelBody>
	);
}

export default PaddingOptions;
