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
	const setPaddingSmallTop = value => props.setAttributes( { paddingSmallTop: value } );
	const setPaddingSmallRight = value => props.setAttributes( { paddingSmallRight: value } );
	const setPaddingSmallBottom = value => props.setAttributes( { paddingSmallBottom: value } );
	const setPaddingSmallLeft = value => props.setAttributes( { paddingSmallLeft: value } );
	const setPaddingMediumTop = value => props.setAttributes( { paddingMediumTop: value } );
	const setPaddingMediumRight = value => props.setAttributes( { paddingMediumRight: value } );
	const setPaddingMediumBottom = value => props.setAttributes( { paddingMediumBottom: value } );
	const setPaddingMediumLeft = value => props.setAttributes( { paddingMediumLeft: value } );
	const setPaddingLargeTop = value => props.setAttributes( { paddingLargeTop: value } );
	const setPaddingLargeRight = value => props.setAttributes( { paddingLargeRight: value } );
	const setPaddingLargeBottom = value => props.setAttributes( { paddingLargeBottom: value } );
	const setPaddingLargeLeft = value => props.setAttributes( { paddingLargeLeft: value } );
	const setPaddingXLTop = value => props.setAttributes( { paddingXLTop: value } );
	const setPaddingXLRight = value => props.setAttributes( { paddingXLRight: value } );
	const setPaddingXLBottom = value => props.setAttributes( { paddingXLBottom: value } );
	const setPaddingXLLeft = value => props.setAttributes( { paddingXLLeft: value } );

	const paddingSelect = () => {

		return (
			<div className="padding-wrapper">
				<div className="padding-inner-wrapper">
					<h2 className="components-panel__body-title">Mobile Padding</h2>
					<PanelRow>
						<SelectControl
							key="padding-small-top"
							label={ __( 'Top' ) }
							value={ props.attributes.paddingSmallTop ? props.attributes.paddingSmallTop : '' }
							onChange={ setPaddingSmallTop }
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
							key="padding-small-right"
							label={ __( 'Right' ) }
							value={ props.attributes.paddingSmallRight ? props.attributes.paddingSmallRight : '' }
							onChange={ setPaddingSmallRight }
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
							key="padding-small-bottom"
							label={ __( 'Bottom' ) }
							value={ props.attributes.paddingSmallBottom ? props.attributes.paddingSmallBottom : '' }
							onChange={ setPaddingSmallBottom }
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
							key="padding-small-left"
							label={ __( 'Left' ) }
							value={ props.attributes.paddingSmallLeft ? props.attributes.paddingSmallLeft : '' }
							onChange={ setPaddingSmallLeft }
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
				</div>
				<div className="padding-inner-wrapper">
					<h2 className="components-panel__body-title">Tablet Portrait Padding</h2>
					<PanelRow>
						<SelectControl
							key="padding-medium-top"
							label={ __( 'Top' ) }
							value={ props.attributes.paddingMediumTop ? props.attributes.paddingMediumTop : '' }
							onChange={ setPaddingMediumTop }
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
							key="padding-medium-right"
							label={ __( 'Right' ) }
							value={ props.attributes.paddingMediumRight ? props.attributes.paddingMediumRight : '' }
							onChange={ setPaddingMediumRight }
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
							key="padding-medium-bottom"
							label={ __( 'Bottom' ) }
							value={ props.attributes.paddingMediumBottom ? props.attributes.paddingMediumBottom : '' }
							onChange={ setPaddingMediumBottom }
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
							key="padding-medium-left"
							label={ __( 'Left' ) }
							value={ props.attributes.paddingMediumLeft ? props.attributes.paddingMediumLeft : '' }
							onChange={ setPaddingMediumLeft }
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
				</div>
				<div className="padding-inner-wrapper">
					<h2 className="components-panel__body-title">Tablet Landscape Padding</h2>
					<PanelRow>
						<SelectControl
							key="padding-large-top"
							label={ __( 'Top' ) }
							value={ props.attributes.paddingLargeTop ? props.attributes.paddingLargeTop : '' }
							onChange={ setPaddingLargeTop }
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
							key="padding-large-right"
							label={ __( 'Right' ) }
							value={ props.attributes.paddingLargeRight ? props.attributes.paddingLargeRight : '' }
							onChange={ setPaddingLargeRight }
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
							key="padding-large-bottom"
							label={ __( 'Bottom' ) }
							value={ props.attributes.paddingLargeBottom ? props.attributes.paddingLargeBottom : '' }
							onChange={ setPaddingLargeBottom }
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
							key="padding-large-left"
							label={ __( 'Left' ) }
							value={ props.attributes.paddingLargeLeft ? props.attributes.paddingLargeLeft : '' }
							onChange={ setPaddingLargeLeft }
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
				</div>
				<div className="padding-inner-wrapper">
					<h2 className="components-panel__body-title">Desktop Padding</h2>
					<PanelRow>
						<SelectControl
							key="padding-xl-top"
							label={ __( 'Top' ) }
							value={ props.attributes.paddingXLTop ? props.attributes.paddingXLTop : '' }
							onChange={ setPaddingXLTop }
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
							key="padding-xl-right"
							label={ __( 'Right' ) }
							value={ props.attributes.paddingXLRight ? props.attributes.paddingXLRight : '' }
							onChange={ setPaddingXLRight }
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
							key="padding-xl-bottom"
							label={ __( 'Bottom' ) }
							value={ props.attributes.paddingXLBottom ? props.attributes.paddingXLBottom : '' }
							onChange={ setPaddingXLBottom }
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
							key="padding-xl-left"
							label={ __( 'Left' ) }
							value={ props.attributes.paddingXLLeft ? props.attributes.paddingXLLeft : '' }
							onChange={ setPaddingXLLeft }
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
