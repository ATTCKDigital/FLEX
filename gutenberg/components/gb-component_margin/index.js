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
	RangeControl,
	SelectControl,
} = wp.components;

/**
 * Internal dependencies
 */
import MarginOptionsAttributes from './attributes';
import MarginOptionsClasses from './classes';
// import './editor.scss';

// Export for ease of importing in individual blocks.
export {
	MarginOptionsAttributes,
	MarginOptionsClasses,
};

function MarginOptions( props ) {
	const setMarginTop = value => props.setAttributes( { marginTop: value } );
	const setMarginRight = value => props.setAttributes( { marginRight: value } );
	const setMarginBottom = value => props.setAttributes( { marginBottom: value } );
	const setMarginLeft = value => props.setAttributes( { marginLeft: value } );
	const setMarginPhoneTop = value => props.setAttributes( { marginPhoneTop: value } );
	const setMarginPhoneRight = value => props.setAttributes( { marginPhoneRight: value } );
	const setMarginPhoneBottom = value => props.setAttributes( { marginPhoneBottom: value } );
	const setMarginPhoneLeft = value => props.setAttributes( { marginPhoneLeft: value } );
	const setMarginTabletPortraitTop = value => props.setAttributes( { marginTabletPortraitTop: value } );
	const setMarginTabletPortraitRight = value => props.setAttributes( { marginTabletPortraitRight: value } );
	const setMarginTabletPortraitBottom = value => props.setAttributes( { marginTabletPortraitBottom: value } );
	const setMarginTabletPortraitLeft = value => props.setAttributes( { marginTabletPortraitLeft: value } );
	const setMarginTabletLandscapeTop = value => props.setAttributes( { marginTabletLandscapeTop: value } );
	const setMarginTabletLandscapeRight = value => props.setAttributes( { marginTabletLandscapeRight: value } );
	const setMarginTabletLandscapeBottom = value => props.setAttributes( { marginTabletLandscapeBottom: value } );
	const setMarginTabletLandscapeLeft = value => props.setAttributes( { marginTabletLandscapeLeft: value } );
	const setMarginDesktopTop = value => props.setAttributes( { marginDesktopTop: value } );
	const setMarginDesktopRight = value => props.setAttributes( { marginDesktopRight: value } );
	const setMarginDesktopBottom = value => props.setAttributes( { marginDesktopBottom: value } );
	const setMarginDesktopLeft = value => props.setAttributes( { marginDesktopLeft: value } );

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
							onChange={ setMarginTop }
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
							onChange={ setMarginRight }
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
							onChange={ setMarginBottom }
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
							onChange={ setMarginLeft }
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
							onChange={ setMarginPhoneTop }
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
							onChange={ setMarginPhoneRight }
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
							onChange={ setMarginPhoneBottom }
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
							onChange={ setMarginPhoneLeft }
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
							onChange={ setMarginTabletPortraitTop }
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
							onChange={ setMarginTabletPortraitRight }
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
							onChange={ setMarginTabletPortraitBottom }
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
							onChange={ setMarginTabletPortraitLeft }
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
							onChange={ setMarginTabletLandscapeTop }
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
							onChange={ setMarginTabletLandscapeRight }
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
							onChange={ setMarginTabletLandscapeBottom }
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
							onChange={ setMarginTabletLandscapeLeft }
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
							onChange={ setMarginDesktopTop }
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
							onChange={ setMarginDesktopRight }
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
							onChange={ setMarginDesktopBottom }
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
							onChange={ setMarginDesktopLeft }
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
			title={ __( 'Block Margins' ) }
			className="flexlayout-margin-options"
			initialOpen={ false }
		>
			<PanelRow>
				{ marginSelect() }
			</PanelRow>
		</PanelBody>
	);
}

export default MarginOptions;
