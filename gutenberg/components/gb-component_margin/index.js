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
import MarginOptionsAttributes from './attributes';
import MarginOptionsClasses from './classes';
// import './editor.scss';

// Export for ease of importing in individual blocks.
export {
	MarginOptionsAttributes,
	MarginOptionsClasses,
};

function MarginOptions( props ) {
	// const setMarginTop = value => props.setAttributes( { marginTop: value } );
	// const setMarginRight = value => props.setAttributes( { marginRight: value } );
	// const setMarginBottom = value => props.setAttributes( { marginBottom: value } );
	// const setMarginLeft = value => props.setAttributes( { marginLeft: value } );
	
	// const setMarginPhoneTop = value => props.setAttributes( { marginPhoneTop: value } );
	// const setMarginPhoneRight = value => props.setAttributes( { marginPhoneRight: value } );
	// const setMarginPhoneBottom = value => props.setAttributes( { marginPhoneBottom: value } );
	// const setMarginPhoneLeft = value => props.setAttributes( { marginPhoneLeft: value } );
	
	// const setMarginPhonePlusTop = value => props.setAttributes( { marginPhonePlusTop: value } );
	// const setMarginPhonePlusRight = value => props.setAttributes( { marginPhonePlusRight: value } );
	// const setMarginPhonePlusBottom = value => props.setAttributes( { marginPhonePlusBottom: value } );
	// const setMarginPhonePlusLeft = value => props.setAttributes( { marginPhonePlusLeft: value } );
	
	// const setMarginTabletPortraitTop = value => props.setAttributes( { marginTabletPortraitTop: value } );
	// const setMarginTabletPortraitRight = value => props.setAttributes( { marginTabletPortraitRight: value } );
	// const setMarginTabletPortraitBottom = value => props.setAttributes( { marginTabletPortraitBottom: value } );
	// const setMarginTabletPortraitLeft = value => props.setAttributes( { marginTabletPortraitLeft: value } );
	
	// const setMarginTabletLandscapeTop = value => props.setAttributes( { marginTabletLandscapeTop: value } );
	// const setMarginTabletLandscapeRight = value => props.setAttributes( { marginTabletLandscapeRight: value } );
	// const setMarginTabletLandscapeBottom = value => props.setAttributes( { marginTabletLandscapeBottom: value } );
	// const setMarginTabletLandscapeLeft = value => props.setAttributes( { marginTabletLandscapeLeft: value } );
	
	// const setMarginDesktopTop = value => props.setAttributes( { marginDesktopTop: value } );
	// const setMarginDesktopRight = value => props.setAttributes( { marginDesktopRight: value } );
	// const setMarginDesktopBottom = value => props.setAttributes( { marginDesktopBottom: value } );
	// const setMarginDesktopLeft = value => props.setAttributes( { marginDesktopLeft: value } );

	const setMargin = (which, value) => {
		let marginEdited = '';
		let marginEditedCount = 0;

		// Save prop
		props.setAttributes( { [which]: value } );

		// Check local var since no callback after attribute 
		// has been set which the function below will find.
		// https://github.com/WordPress/gutenberg/issues/5596
		if (typeof value !== 'undefined' && value.toLowerCase() !== 'inherit') {
			marginEditedCount++;
		}

		// Loop over all padding options and 
		// check if any changed values aren't 'Inherit'
		for (const property in MarginOptionsAttributes) {
			if (typeof props.attributes[property] !== 'undefined' && props.attributes[property].toLowerCase() !== 'inherit') {
				marginEditedCount++;
			}
		}

		if (marginEditedCount > 0) {
			props.setAttributes( { marginEdited: `(${marginEditedCount} set)` } );
		}

		return '';
	}

	const svgHeight = {
		height: 0
	};

	const marginSelect = () => {
		return (
			<div className="margin-wrapper">
				<p>Inherit uses prev screen size setting.</p>
				<div className="margin-inner-wrapper">
					<h2 className="components-panel__body-title">Margin</h2>
					<PanelRow>
						<SelectControl
							key="margin-top"
							label={ __( 'Top' ) }
							value={ props.attributes.marginTop ? props.attributes.marginTop : '' }
							onChange={ (e) => setMargin('marginTop', e) }
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
							key="margin-right"
							label={ __( 'Right' ) }
							value={ props.attributes.marginRight ? props.attributes.marginRight : '' }
							onChange={ (e) => setMargin('marginRight', e) }
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
							key="margin-bottom"
							label={ __( 'Bottom' ) }
							value={ props.attributes.marginBottom ? props.attributes.marginBottom : '' }
							onChange={ (e) => setMargin('marginBottom', e) }
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
							key="margin-left"
							label={ __( 'Left' ) }
							value={ props.attributes.marginLeft ? props.attributes.marginLeft : '' }
							onChange={ (e) => setMargin('marginLeft', e) }
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
				<div className="margin-inner-wrapper">
					<h2 className="components-panel__body-title">Mobile Margin</h2>
					<PanelRow>
						<SelectControl
							key="margin-phone-top"
							label={ __( 'Top' ) }
							value={ props.attributes.marginPhoneTop ? props.attributes.marginPhoneTop : '' }
							onChange={ (e) => setMargin('marginPhoneTop', e) }
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
							key="margin-phone-right"
							label={ __( 'Right' ) }
							value={ props.attributes.marginPhoneRight ? props.attributes.marginPhoneRight : '' }
							onChange={ (e) => setMargin('marginPhoneRight', e) }
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
							key="margin-phone-bottom"
							label={ __( 'Bottom' ) }
							value={ props.attributes.marginPhoneBottom ? props.attributes.marginPhoneBottom : '' }
							onChange={ (e) => setMargin('marginPhoneBottom', e) }
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
							key="margin-phone-left"
							label={ __( 'Left' ) }
							value={ props.attributes.marginPhoneLeft ? props.attributes.marginPhoneLeft : '' }
							onChange={ (e) => setMargin('marginPhoneLeft', e) }
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
				<div className="margin-inner-wrapper">
					<h2 className="components-panel__body-title">Mobile Plus Margin</h2>
					<PanelRow>
						<SelectControl
							key="margin-phone-plus-top"
							label={ __( 'Top' ) }
							value={ props.attributes.marginPhonePlusTop ? props.attributes.marginPhonePlusTop : '' }
							onChange={ (e) => setMargin('marginPhonePlusTop', e) }
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
							key="margin-phone-plus-right"
							label={ __( 'Right' ) }
							value={ props.attributes.marginPhonePlusRight ? props.attributes.marginPhonePlusRight : '' }
							onChange={ (e) => setMargin('marginPhonePlusRight', e) }
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
							key="margin-phone-plus-bottom"
							label={ __( 'Bottom' ) }
							value={ props.attributes.marginPhonePlusBottom ? props.attributes.marginPhonePlusBottom : '' }
							onChange={ (e) => setMargin('marginPhonePlusBottom', e) }
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
							key="margin-phone-plus-left"
							label={ __( 'Left' ) }
							value={ props.attributes.marginPhonePlusLeft ? props.attributes.marginPhonePlusLeft : '' }
							onChange={ (e) => setMargin('marginPhonePlusLeft', e) }
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
				<div className="margin-inner-wrapper">
					<h2 className="components-panel__body-title">Tablet Portrait Margin</h2>
					<PanelRow>
						<SelectControl
							key="margin-tablet-portrait-top"
							label={ __( 'Top' ) }
							value={ props.attributes.marginTabletPortraitTop ? props.attributes.marginTabletPortraitTop : '' }
							onChange={ (e) => setMargin('marginTabletPortraitTop', e) }
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
							key="margin-tablet-portrait-right"
							label={ __( 'Right' ) }
							value={ props.attributes.marginTabletPortraitRight ? props.attributes.marginTabletPortraitRight : '' }
							onChange={ (e) => setMargin('marginTabletPortraitRight', e) }
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
							key="margin-tablet-portrait-bottom"
							label={ __( 'Bottom' ) }
							value={ props.attributes.marginTabletPortraitBottom ? props.attributes.marginTabletPortraitBottom : '' }
							onChange={ (e) => setMargin('marginTabletPortraitBottom', e) }
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
							key="margin-tablet-portrait-left"
							label={ __( 'Left' ) }
							value={ props.attributes.marginTabletPortraitLeft ? props.attributes.marginTabletPortraitLeft : '' }
							onChange={ (e) => setMargin('marginTabletPortraitLeft', e) }
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
				<div className="margin-inner-wrapper">
					<h2 className="components-panel__body-title">Tablet Landscape Margin</h2>
					<PanelRow>
						<SelectControl
							key="margin-tablet-landscape-top"
							label={ __( 'Top' ) }
							value={ props.attributes.marginTabletLandscapeTop ? props.attributes.marginTabletLandscapeTop : '' }
							onChange={ (e) => setMargin('marginTabletLandscapeTop', e) }
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
							key="margin-tablet-landscape-right"
							label={ __( 'Right' ) }
							value={ props.attributes.marginTabletLandscapeRight ? props.attributes.marginTabletLandscapeRight : '' }
							onChange={ (e) => setMargin('marginTabletLandscapeRight', e) }
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
							key="margin-tablet-landscape-bottom"
							label={ __( 'Bottom' ) }
							value={ props.attributes.marginTabletLandscapeBottom ? props.attributes.marginTabletLandscapeBottom : '' }
							onChange={ (e) => setMargin('marginTabletLandscapeBottom', e) }
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
							key="margin-tablet-landscape-left"
							label={ __( 'Left' ) }
							value={ props.attributes.marginTabletLandscapeLeft ? props.attributes.marginTabletLandscapeLeft : '' }
							onChange={ (e) => setMargin('marginTabletLandscapeLeft', e) }
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
				<div className="margin-inner-wrapper">
					<h2 className="components-panel__body-title">Desktop Margin</h2>
					<PanelRow>
						<SelectControl
							key="margin-desktop-top"
							label={ __( 'Top' ) }
							value={ props.attributes.marginDesktopTop ? props.attributes.marginDesktopTop : '' }
							onChange={ (e) => setMargin('marginDesktopTop', e) }
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
							key="margin-desktop-right"
							label={ __( 'Right' ) }
							value={ props.attributes.marginDesktopRight ? props.attributes.marginDesktopRight : '' }
							onChange={ (e) => setMargin('marginDesktopRight', e) }
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
							key="margin-desktop-bottom"
							label={ __( 'Bottom' ) }
							value={ props.attributes.marginDesktopBottom ? props.attributes.marginDesktopBottom : '' }
							onChange={ (e) => setMargin('marginDesktopBottom', e) }
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
							key="margin-desktop-left"
							label={ __( 'Left' ) }
							value={ props.attributes.marginDesktopLeft ? props.attributes.marginDesktopLeft : '' }
							onChange={ (e) => setMargin('marginDesktopLeft', e) }
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
			title={ __( 'Margin ' + ( props.attributes.marginEdited || setMargin() ) ) }
			className="flexlayout-margin-options"
			initialOpen={ false }
		>
		<img 
			// Use empty SVG to trigger onload event 
			// Onload hack fires when block is added
			className="onload-hack-pp"
			height="0"
			width="0"
			onLoad={ setMargin }
			src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1' %3E%3Cpath d=''/%3E%3C/svg%3E"
			style={ svgHeight }
			></img>
			<PanelRow>
				{ marginSelect() }
			</PanelRow>
		</PanelBody>
	);
}

export default MarginOptions;
