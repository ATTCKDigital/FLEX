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
				<div className="margin-inner-wrapper">
					<h2 className="components-panel__body-title">Mobile Margin</h2>
					<PanelRow>
						<SelectControl
							key="margin-small-top"
							label={ __( 'Top' ) }
							value={ props.attributes.marginTop ? props.attributes.marginTop : '' }
							onChange={ setMarginTop }
							options={ [
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
									label: __( '3x' ),
									value: '3x',
								},
								{
									label: __( '4x' ),
									value: '4x',
								},
								{
									label: __( '5x' ),
									value: '5x',
								},
								{
									label: __( '6x' ),
									value: '6x',
								},
								{
									label: __( '7x' ),
									value: '7x',
								},
								{
									label: __( '8x' ),
									value: '8x',
								},
								{
									label: __( '9x' ),
									value: '9x',
								},
								{
									label: __( '10x' ),
									value: '10x',
								},
								{
									label: __( '11x' ),
									value: '11x',
								},
								{
									label: __( '12x' ),
									value: '12x',
								},
								{
									label: __( '13x' ),
									value: '13x',
								},
								{
									label: __( '14x' ),
									value: '14x',
								},
								{
									label: __( '15x' ),
									value: '15x',
								},

							] }
						/>
					</PanelRow>
					<PanelRow>
						<SelectControl
							key="margin-small-right"
							label={ __( 'Right' ) }
							value={ props.attributes.marginRight ? props.attributes.marginRight : '' }
							onChange={ setMarginRight }
													options={ [
								{
									label: __( '0' ),
									value: '0',
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
									label: __( '3x' ),
									value: '3x',
								},
								{
									label: __( '4x' ),
									value: '4x',
								},
								{
									label: __( '5x' ),
									value: '5x',
								},
								{
									label: __( '6x' ),
									value: '6x',
								},
								{
									label: __( '7x' ),
									value: '7x',
								},
								{
									label: __( '8x' ),
									value: '8x',
								},
								{
									label: __( '9x' ),
									value: '9x',
								},
								{
									label: __( '10x' ),
									value: '10x',
								},
								{
									label: __( '11x' ),
									value: '11x',
								},
								{
									label: __( '12x' ),
									value: '12x',
								},
								{
									label: __( '13x' ),
									value: '13x',
								},
								{
									label: __( '14x' ),
									value: '14x',
								},
								{
									label: __( '15x' ),
									value: '15x',
								},

							] }
						/>
					</PanelRow>
					<PanelRow>
						<SelectControl
							key="margin-small-bottom"
							label={ __( 'Bottom' ) }
							value={ props.attributes.marginBottom ? props.attributes.marginBottom : '' }
							onChange={ setMarginBottom }
													options={ [
								{
									label: __( '0' ),
									value: '0',
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
									label: __( '3x' ),
									value: '3x',
								},
								{
									label: __( '4x' ),
									value: '4x',
								},
								{
									label: __( '5x' ),
									value: '5x',
								},
								{
									label: __( '6x' ),
									value: '6x',
								},
								{
									label: __( '7x' ),
									value: '7x',
								},
								{
									label: __( '8x' ),
									value: '8x',
								},
								{
									label: __( '9x' ),
									value: '9x',
								},
								{
									label: __( '10x' ),
									value: '10x',
								},
								{
									label: __( '11x' ),
									value: '11x',
								},
								{
									label: __( '12x' ),
									value: '12x',
								},
								{
									label: __( '13x' ),
									value: '13x',
								},
								{
									label: __( '14x' ),
									value: '14x',
								},
								{
									label: __( '15x' ),
									value: '15x',
								},

							] }
						/>
					</PanelRow>
					<PanelRow>
						<SelectControl
							key="margin-small-left"
							label={ __( 'Left' ) }
							value={ props.attributes.marginLeft ? props.attributes.marginLeft : '' }
							onChange={ setMarginLeft }
													options={ [
								{
									label: __( '0' ),
									value: '0',
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
									label: __( '3x' ),
									value: '3x',
								},
								{
									label: __( '4x' ),
									value: '4x',
								},
								{
									label: __( '5x' ),
									value: '5x',
								},
								{
									label: __( '6x' ),
									value: '6x',
								},
								{
									label: __( '7x' ),
									value: '7x',
								},
								{
									label: __( '8x' ),
									value: '8x',
								},
								{
									label: __( '9x' ),
									value: '9x',
								},
								{
									label: __( '10x' ),
									value: '10x',
								},
								{
									label: __( '11x' ),
									value: '11x',
								},
								{
									label: __( '12x' ),
									value: '12x',
								},
								{
									label: __( '13x' ),
									value: '13x',
								},
								{
									label: __( '14x' ),
									value: '14x',
								},
								{
									label: __( '15x' ),
									value: '15x',
								},

							] }
						/>
					</PanelRow>
				</div>
				<div className="margin-inner-wrapper">
					<h2 className="components-panel__body-title">Tablet Portrait Margin</h2>
					<PanelRow>
						<SelectControl
							key="margin-medium-top"
							label={ __( 'Top' ) }
							value={ props.attributes.marginTabletPortraitTop ? props.attributes.marginTabletPortraitTop : '' }
							onChange={ setMarginTabletPortraitTop }
							options={ [
								{
									label: __( '0' ),
									value: '0',
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
									label: __( '3x' ),
									value: '3x',
								},
								{
									label: __( '4x' ),
									value: '4x',
								},
								{
									label: __( '5x' ),
									value: '5x',
								},
								{
									label: __( '6x' ),
									value: '6x',
								},
								{
									label: __( '7x' ),
									value: '7x',
								},
								{
									label: __( '8x' ),
									value: '8x',
								},
								{
									label: __( '9x' ),
									value: '9x',
								},
								{
									label: __( '10x' ),
									value: '10x',
								},
								{
									label: __( '11x' ),
									value: '11x',
								},
								{
									label: __( '12x' ),
									value: '12x',
								},
								{
									label: __( '13x' ),
									value: '13x',
								},
								{
									label: __( '14x' ),
									value: '14x',
								},
								{
									label: __( '15x' ),
									value: '15x',
								},

							] }
						/>
					</PanelRow>
					<PanelRow>
						<SelectControl
							key="margin-medium-right"
							label={ __( 'Right' ) }
							value={ props.attributes.marginTabletPortraitRight ? props.attributes.marginTabletPortraitRight : '' }
							onChange={ setMarginTabletPortraitRight }
													options={ [
								{
									label: __( '0' ),
									value: '0',
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
									label: __( '3x' ),
									value: '3x',
								},
								{
									label: __( '4x' ),
									value: '4x',
								},
								{
									label: __( '5x' ),
									value: '5x',
								},
								{
									label: __( '6x' ),
									value: '6x',
								},
								{
									label: __( '7x' ),
									value: '7x',
								},
								{
									label: __( '8x' ),
									value: '8x',
								},
								{
									label: __( '9x' ),
									value: '9x',
								},
								{
									label: __( '10x' ),
									value: '10x',
								},
								{
									label: __( '11x' ),
									value: '11x',
								},
								{
									label: __( '12x' ),
									value: '12x',
								},
								{
									label: __( '13x' ),
									value: '13x',
								},
								{
									label: __( '14x' ),
									value: '14x',
								},
								{
									label: __( '15x' ),
									value: '15x',
								},

							] }
						/>
					</PanelRow>
					<PanelRow>
						<SelectControl
							key="margin-medium-bottom"
							label={ __( 'Bottom' ) }
							value={ props.attributes.marginTabletPortraitBottom ? props.attributes.marginTabletPortraitBottom : '' }
							onChange={ setMarginTabletPortraitBottom }
													options={ [
								{
									label: __( '0' ),
									value: '0',
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
									label: __( '3x' ),
									value: '3x',
								},
								{
									label: __( '4x' ),
									value: '4x',
								},
								{
									label: __( '5x' ),
									value: '5x',
								},
								{
									label: __( '6x' ),
									value: '6x',
								},
								{
									label: __( '7x' ),
									value: '7x',
								},
								{
									label: __( '8x' ),
									value: '8x',
								},
								{
									label: __( '9x' ),
									value: '9x',
								},
								{
									label: __( '10x' ),
									value: '10x',
								},
								{
									label: __( '11x' ),
									value: '11x',
								},
								{
									label: __( '12x' ),
									value: '12x',
								},
								{
									label: __( '13x' ),
									value: '13x',
								},
								{
									label: __( '14x' ),
									value: '14x',
								},
								{
									label: __( '15x' ),
									value: '15x',
								},

							] }
						/>
					</PanelRow>
					<PanelRow>
						<SelectControl
							key="margin-medium-left"
							label={ __( 'Left' ) }
							value={ props.attributes.marginTabletPortraitLeft ? props.attributes.marginTabletPortraitLeft : '' }
							onChange={ setMarginTabletPortraitLeft }
													options={ [
								{
									label: __( '0' ),
									value: '0',
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
									label: __( '3x' ),
									value: '3x',
								},
								{
									label: __( '4x' ),
									value: '4x',
								},
								{
									label: __( '5x' ),
									value: '5x',
								},
								{
									label: __( '6x' ),
									value: '6x',
								},
								{
									label: __( '7x' ),
									value: '7x',
								},
								{
									label: __( '8x' ),
									value: '8x',
								},
								{
									label: __( '9x' ),
									value: '9x',
								},
								{
									label: __( '10x' ),
									value: '10x',
								},
								{
									label: __( '11x' ),
									value: '11x',
								},
								{
									label: __( '12x' ),
									value: '12x',
								},
								{
									label: __( '13x' ),
									value: '13x',
								},
								{
									label: __( '14x' ),
									value: '14x',
								},
								{
									label: __( '15x' ),
									value: '15x',
								},

							] }
						/>
					</PanelRow>
				</div>
				<div className="margin-inner-wrapper">
					<h2 className="components-panel__body-title">Tablet Landscape Margin</h2>
					<PanelRow>
						<SelectControl
							key="margin-large-top"
							label={ __( 'Top' ) }
							value={ props.attributes.marginTabletLandscapeTop ? props.attributes.marginTabletLandscapeTop : '' }
							onChange={ setMarginTabletLandscapeTop }
							options={ [
								{
									label: __( '0' ),
									value: '0',
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
									label: __( '3x' ),
									value: '3x',
								},
								{
									label: __( '4x' ),
									value: '4x',
								},
								{
									label: __( '5x' ),
									value: '5x',
								},
								{
									label: __( '6x' ),
									value: '6x',
								},
								{
									label: __( '7x' ),
									value: '7x',
								},
								{
									label: __( '8x' ),
									value: '8x',
								},
								{
									label: __( '9x' ),
									value: '9x',
								},
								{
									label: __( '10x' ),
									value: '10x',
								},
								{
									label: __( '11x' ),
									value: '11x',
								},
								{
									label: __( '12x' ),
									value: '12x',
								},
								{
									label: __( '13x' ),
									value: '13x',
								},
								{
									label: __( '14x' ),
									value: '14x',
								},
								{
									label: __( '15x' ),
									value: '15x',
								},

							] }
						/>
					</PanelRow>
					<PanelRow>
						<SelectControl
							key="margin-large-right"
							label={ __( 'Right' ) }
							value={ props.attributes.marginTabletLandscapeRight ? props.attributes.marginTabletLandscapeRight : '' }
							onChange={ setMarginTabletLandscapeRight }
													options={ [
								{
									label: __( '0' ),
									value: '0',
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
									label: __( '3x' ),
									value: '3x',
								},
								{
									label: __( '4x' ),
									value: '4x',
								},
								{
									label: __( '5x' ),
									value: '5x',
								},
								{
									label: __( '6x' ),
									value: '6x',
								},
								{
									label: __( '7x' ),
									value: '7x',
								},
								{
									label: __( '8x' ),
									value: '8x',
								},
								{
									label: __( '9x' ),
									value: '9x',
								},
								{
									label: __( '10x' ),
									value: '10x',
								},
								{
									label: __( '11x' ),
									value: '11x',
								},
								{
									label: __( '12x' ),
									value: '12x',
								},
								{
									label: __( '13x' ),
									value: '13x',
								},
								{
									label: __( '14x' ),
									value: '14x',
								},
								{
									label: __( '15x' ),
									value: '15x',
								},

							] }
						/>
					</PanelRow>
					<PanelRow>
						<SelectControl
							key="margin-large-bottom"
							label={ __( 'Bottom' ) }
							value={ props.attributes.marginTabletLandscapeBottom ? props.attributes.marginTabletLandscapeBottom : '' }
							onChange={ setMarginTabletLandscapeBottom }
													options={ [
								{
									label: __( '0' ),
									value: '0',
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
									label: __( '3x' ),
									value: '3x',
								},
								{
									label: __( '4x' ),
									value: '4x',
								},
								{
									label: __( '5x' ),
									value: '5x',
								},
								{
									label: __( '6x' ),
									value: '6x',
								},
								{
									label: __( '7x' ),
									value: '7x',
								},
								{
									label: __( '8x' ),
									value: '8x',
								},
								{
									label: __( '9x' ),
									value: '9x',
								},
								{
									label: __( '10x' ),
									value: '10x',
								},
								{
									label: __( '11x' ),
									value: '11x',
								},
								{
									label: __( '12x' ),
									value: '12x',
								},
								{
									label: __( '13x' ),
									value: '13x',
								},
								{
									label: __( '14x' ),
									value: '14x',
								},
								{
									label: __( '15x' ),
									value: '15x',
								},

							] }
						/>
					</PanelRow>
					<PanelRow>
						<SelectControl
							key="margin-large-left"
							label={ __( 'Left' ) }
							value={ props.attributes.marginTabletLandscapeLeft ? props.attributes.marginTabletLandscapeLeft : '' }
							onChange={ setMarginTabletLandscapeLeft }
													options={ [
								{
									label: __( '0' ),
									value: '0',
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
									label: __( '3x' ),
									value: '3x',
								},
								{
									label: __( '4x' ),
									value: '4x',
								},
								{
									label: __( '5x' ),
									value: '5x',
								},
								{
									label: __( '6x' ),
									value: '6x',
								},
								{
									label: __( '7x' ),
									value: '7x',
								},
								{
									label: __( '8x' ),
									value: '8x',
								},
								{
									label: __( '9x' ),
									value: '9x',
								},
								{
									label: __( '10x' ),
									value: '10x',
								},
								{
									label: __( '11x' ),
									value: '11x',
								},
								{
									label: __( '12x' ),
									value: '12x',
								},
								{
									label: __( '13x' ),
									value: '13x',
								},
								{
									label: __( '14x' ),
									value: '14x',
								},
								{
									label: __( '15x' ),
									value: '15x',
								},

							] }
						/>
					</PanelRow>
				</div>
				<div className="margin-inner-wrapper">
					<h2 className="components-panel__body-title">Desktop Margin</h2>
					<PanelRow>
						<SelectControl
							key="margin-xl-top"
							label={ __( 'Top' ) }
							value={ props.attributes.marginDesktopTop ? props.attributes.marginDesktopTop : '' }
							onChange={ setMarginDesktopTop }
							options={ [
								{
									label: __( '0' ),
									value: '0',
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
									label: __( '3x' ),
									value: '3x',
								},
								{
									label: __( '4x' ),
									value: '4x',
								},
								{
									label: __( '5x' ),
									value: '5x',
								},
								{
									label: __( '6x' ),
									value: '6x',
								},
								{
									label: __( '7x' ),
									value: '7x',
								},
								{
									label: __( '8x' ),
									value: '8x',
								},
								{
									label: __( '9x' ),
									value: '9x',
								},
								{
									label: __( '10x' ),
									value: '10x',
								},
								{
									label: __( '11x' ),
									value: '11x',
								},
								{
									label: __( '12x' ),
									value: '12x',
								},
								{
									label: __( '13x' ),
									value: '13x',
								},
								{
									label: __( '14x' ),
									value: '14x',
								},
								{
									label: __( '15x' ),
									value: '15x',
								},

							] }
						/>
					</PanelRow>
					<PanelRow>
						<SelectControl
							key="margin-xl-right"
							label={ __( 'Right' ) }
							value={ props.attributes.marginDesktopRight ? props.attributes.marginDesktopRight : '' }
							onChange={ setMarginDesktopRight }
													options={ [
								{
									label: __( '0' ),
									value: '0',
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
									label: __( '3x' ),
									value: '3x',
								},
								{
									label: __( '4x' ),
									value: '4x',
								},
								{
									label: __( '5x' ),
									value: '5x',
								},
								{
									label: __( '6x' ),
									value: '6x',
								},
								{
									label: __( '7x' ),
									value: '7x',
								},
								{
									label: __( '8x' ),
									value: '8x',
								},
								{
									label: __( '9x' ),
									value: '9x',
								},
								{
									label: __( '10x' ),
									value: '10x',
								},
								{
									label: __( '11x' ),
									value: '11x',
								},
								{
									label: __( '12x' ),
									value: '12x',
								},
								{
									label: __( '13x' ),
									value: '13x',
								},
								{
									label: __( '14x' ),
									value: '14x',
								},
								{
									label: __( '15x' ),
									value: '15x',
								},

							] }
						/>
					</PanelRow>
					<PanelRow>
						<SelectControl
							key="margin-xl-bottom"
							label={ __( 'Bottom' ) }
							value={ props.attributes.marginDesktopBottom ? props.attributes.marginDesktopBottom : '' }
							onChange={ setMarginDesktopBottom }
													options={ [
								{
									label: __( '0' ),
									value: '0',
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
									label: __( '3x' ),
									value: '3x',
								},
								{
									label: __( '4x' ),
									value: '4x',
								},
								{
									label: __( '5x' ),
									value: '5x',
								},
								{
									label: __( '6x' ),
									value: '6x',
								},
								{
									label: __( '7x' ),
									value: '7x',
								},
								{
									label: __( '8x' ),
									value: '8x',
								},
								{
									label: __( '9x' ),
									value: '9x',
								},
								{
									label: __( '10x' ),
									value: '10x',
								},
								{
									label: __( '11x' ),
									value: '11x',
								},
								{
									label: __( '12x' ),
									value: '12x',
								},
								{
									label: __( '13x' ),
									value: '13x',
								},
								{
									label: __( '14x' ),
									value: '14x',
								},
								{
									label: __( '15x' ),
									value: '15x',
								},

							] }
						/>
					</PanelRow>
					<PanelRow>
						<SelectControl
							key="margin-xl-left"
							label={ __( 'Left' ) }
							value={ props.attributes.marginDesktopLeft ? props.attributes.marginDesktopLeft : '' }
							onChange={ setMarginDesktopLeft }
													options={ [
								{
									label: __( '0' ),
									value: '0',
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
									label: __( '3x' ),
									value: '3x',
								},
								{
									label: __( '4x' ),
									value: '4x',
								},
								{
									label: __( '5x' ),
									value: '5x',
								},
								{
									label: __( '6x' ),
									value: '6x',
								},
								{
									label: __( '7x' ),
									value: '7x',
								},
								{
									label: __( '8x' ),
									value: '8x',
								},
								{
									label: __( '9x' ),
									value: '9x',
								},
								{
									label: __( '10x' ),
									value: '10x',
								},
								{
									label: __( '11x' ),
									value: '11x',
								},
								{
									label: __( '12x' ),
									value: '12x',
								},
								{
									label: __( '13x' ),
									value: '13x',
								},
								{
									label: __( '14x' ),
									value: '14x',
								},
								{
									label: __( '15x' ),
									value: '15x',
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
