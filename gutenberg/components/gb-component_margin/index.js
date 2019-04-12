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
	const setMarginSmallTop = value => props.setAttributes( { marginSmallTop: value } );
	const setMarginSmallRight = value => props.setAttributes( { marginSmallRight: value } );
	const setMarginSmallBottom = value => props.setAttributes( { marginSmallBottom: value } );
	const setMarginSmallLeft = value => props.setAttributes( { marginSmallLeft: value } );
	const setMarginMediumTop = value => props.setAttributes( { marginMediumTop: value } );
	const setMarginMediumRight = value => props.setAttributes( { marginMediumRight: value } );
	const setMarginMediumBottom = value => props.setAttributes( { marginMediumBottom: value } );
	const setMarginMediumLeft = value => props.setAttributes( { marginMediumLeft: value } );
	const setMarginLargeTop = value => props.setAttributes( { marginLargeTop: value } );
	const setMarginLargeRight = value => props.setAttributes( { marginLargeRight: value } );
	const setMarginLargeBottom = value => props.setAttributes( { marginLargeBottom: value } );
	const setMarginLargeLeft = value => props.setAttributes( { marginLargeLeft: value } );
	const setMarginXLTop = value => props.setAttributes( { marginXLTop: value } );
	const setMarginXLRight = value => props.setAttributes( { marginXLRight: value } );
	const setMarginXLBottom = value => props.setAttributes( { marginXLBottom: value } );
	const setMarginXLLeft = value => props.setAttributes( { marginXLLeft: value } );

	const marginSelect = () => {

		return (
			<div className="margin-wrapper">
				<div className="margin-inner-wrapper">
					<h2 className="components-panel__body-title">Mobile Margin</h2>
					<PanelRow>
						<SelectControl
							key="margin-small-top"
							label={ __( 'Top' ) }
							value={ props.attributes.marginSmallTop ? props.attributes.marginSmallTop : '' }
							onChange={ setMarginSmallTop }
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
							value={ props.attributes.marginSmallRight ? props.attributes.marginSmallRight : '' }
							onChange={ setMarginSmallRight }
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
							value={ props.attributes.marginSmallBottom ? props.attributes.marginSmallBottom : '' }
							onChange={ setMarginSmallBottom }
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
							value={ props.attributes.marginSmallLeft ? props.attributes.marginSmallLeft : '' }
							onChange={ setMarginSmallLeft }
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
							value={ props.attributes.marginMediumTop ? props.attributes.marginMediumTop : '' }
							onChange={ setMarginMediumTop }
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
							value={ props.attributes.marginMediumRight ? props.attributes.marginMediumRight : '' }
							onChange={ setMarginMediumRight }
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
							value={ props.attributes.marginMediumBottom ? props.attributes.marginMediumBottom : '' }
							onChange={ setMarginMediumBottom }
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
							value={ props.attributes.marginMediumLeft ? props.attributes.marginMediumLeft : '' }
							onChange={ setMarginMediumLeft }
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
							value={ props.attributes.marginLargeTop ? props.attributes.marginLargeTop : '' }
							onChange={ setMarginLargeTop }
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
							value={ props.attributes.marginLargeRight ? props.attributes.marginLargeRight : '' }
							onChange={ setMarginLargeRight }
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
							value={ props.attributes.marginLargeBottom ? props.attributes.marginLargeBottom : '' }
							onChange={ setMarginLargeBottom }
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
							value={ props.attributes.marginLargeLeft ? props.attributes.marginLargeLeft : '' }
							onChange={ setMarginLargeLeft }
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
							value={ props.attributes.marginXLTop ? props.attributes.marginXLTop : '' }
							onChange={ setMarginXLTop }
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
							value={ props.attributes.marginXLRight ? props.attributes.marginXLRight : '' }
							onChange={ setMarginXLRight }
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
							value={ props.attributes.marginXLBottom ? props.attributes.marginXLBottom : '' }
							onChange={ setMarginXLBottom }
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
							value={ props.attributes.marginXLLeft ? props.attributes.marginXLLeft : '' }
							onChange={ setMarginXLLeft }
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
