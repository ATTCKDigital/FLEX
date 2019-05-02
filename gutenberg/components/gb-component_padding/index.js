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
import PaddingOptionsAttributes from './attributes';
import PaddingOptionsClasses from './classes';
// import './editor.scss';

// Export for ease of importing in individual blocks.
export {
	PaddingOptionsAttributes,
	PaddingOptionsClasses,
};

function PaddingOptions( props ) {
	const setPaddingTop = value => props.setAttributes( { paddingTop: value } );
	const setPaddingRight = value => props.setAttributes( { paddingRight: value } );
	const setPaddingBottom = value => props.setAttributes( { paddingBottom: value } );
	const setPaddingLeft = value => props.setAttributes( { paddingLeft: value } );
	const setPaddingPhoneTop = value => props.setAttributes( { paddingPhoneTop: value } );
	const setPaddingPhoneRight = value => props.setAttributes( { paddingPhoneRight: value } );
	const setPaddingPhoneBottom = value => props.setAttributes( { paddingPhoneBottom: value } );
	const setPaddingPhoneLeft = value => props.setAttributes( { paddingPhoneLeft: value } );
	const setPaddingTabletPortraitTop = value => props.setAttributes( { paddingTabletPortraitTop: value } );
	const setPaddingTabletPortraitRight = value => props.setAttributes( { paddingTabletPortraitRight: value } );
	const setPaddingTabletPortraitBottom = value => props.setAttributes( { paddingTabletPortraitBottom: value } );
	const setPaddingTabletPortraitLeft = value => props.setAttributes( { paddingTabletPortraitLeft: value } );
	const setPaddingTabletLandscapeTop = value => props.setAttributes( { paddingTabletLandscapeTop: value } );
	const setPaddingTabletLandscapeRight = value => props.setAttributes( { paddingTabletLandscapeRight: value } );
	const setPaddingTabletLandscapeBottom = value => props.setAttributes( { paddingTabletLandscapeBottom: value } );
	const setPaddingTabletLandscapeLeft = value => props.setAttributes( { paddingTabletLandscapeLeft: value } );
	const setPaddingDesktopTop = value => props.setAttributes( { paddingDesktopTop: value } );
	const setPaddingDesktopRight = value => props.setAttributes( { paddingDesktopRight: value } );
	const setPaddingDesktopBottom = value => props.setAttributes( { paddingDesktopBottom: value } );
	const setPaddingDesktopLeft = value => props.setAttributes( { paddingDesktopLeft: value } );

	const paddingSelect = () => {

		return (
			<div className="padding-wrapper">
				<p>Inherit uses prev screen size setting.</p>
				<div className="padding-inner-wrapper">
					<h2 className="components-panel__body-title">Padding</h2>
					<PanelRow>
						<SelectControl
							key="padding-top"
							label={ __( 'Top' ) }
							value={ props.attributes.paddingTop ? props.attributes.paddingTop : '' }
							onChange={ setPaddingTop }
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
							onChange={ setPaddingRight }
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
							onChange={ setPaddingBottom }
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
							onChange={ setPaddingLeft }
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
					<h2 className="components-panel__body-title">Mobile Padding</h2>
					<PanelRow>
						<SelectControl
							key="padding-phone-top"
							label={ __( 'Top' ) }
							value={ props.attributes.paddingPhoneTop ? props.attributes.paddingPhoneTop : '' }
							onChange={ setPaddingPhoneTop }
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
							onChange={ setPaddingPhoneRight }
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
							onChange={ setPaddingPhoneBottom }
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
							onChange={ setPaddingPhoneLeft }
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
					<h2 className="components-panel__body-title">Tablet Portrait Padding</h2>
					<PanelRow>
						<SelectControl
							key="padding-tablet-portrait-top"
							label={ __( 'Top' ) }
							value={ props.attributes.paddingTabletPortraitTop ? props.attributes.paddingTabletPortraitTop : '' }
							onChange={ setPaddingTabletPortraitTop }
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
							onChange={ setPaddingTabletPortraitRight }
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
							onChange={ setPaddingTabletPortraitBottom }
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
							onChange={ setPaddingTabletPortraitLeft }
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
					<h2 className="components-panel__body-title">Tablet Landscape Padding</h2>
					<PanelRow>
						<SelectControl
							key="padding-tablet-landscape-top"
							label={ __( 'Top' ) }
							value={ props.attributes.paddingTabletLandscapeTop ? props.attributes.paddingTabletLandscapeTop : '' }
							onChange={ setPaddingTabletLandscapeTop }
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
							onChange={ setPaddingTabletLandscapeRight }
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
							onChange={ setPaddingTabletLandscapeBottom }
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
							onChange={ setPaddingTabletLandscapeLeft }
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
							onChange={ setPaddingDesktopTop }
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
							onChange={ setPaddingDesktopRight }
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
							onChange={ setPaddingDesktopBottom }
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
							onChange={ setPaddingDesktopLeft }
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
			title={ __( 'Block Padding' ) }
			className="flexlayout-padding-options"
			initialOpen={ false }
		>
			<PanelRow>
				{ paddingSelect() }
			</PanelRow>
		</PanelBody>
	);
}

export default PaddingOptions;
