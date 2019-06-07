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
import ColumnOptionsAttributes from './attributes';
import ColumnOptionsClasses from './classes';

// Export for ease of importing in individual blocks.
export {
	ColumnOptionsAttributes,
	ColumnOptionsClasses,
};

function ColumnOptions( props ) {
	const setColumnCount = value => props.setAttributes( { columnCount: value } );
	const setColumnDefault = value => props.setAttributes( { columnDefault: value } );
	const setColumnPhone = value => props.setAttributes( { columnPhone: value } );
	const setColumnTabletPortrait = value => props.setAttributes( { columnTabletPortrait: value } );
	const setColumnTabletLandscape = value => props.setAttributes( { columnTabletLandscape: value } );
	const setColumnDesktop = value => props.setAttributes( { columnDesktop: value } );
	const setColumnXL = value => props.setAttributes( { columnXL: value } );

	const columnSelect = () => {
		if ( '12' !== props.attributes.columnCount ) {
			return '';
		}
		return (
			<div className="column-wrapper">
				<div className="column-inner-wrapper">
					<p>Inherit uses prev screen size setting.</p>
					<PanelRow>
						<SelectControl
							key="column-default"
							label={ __( 'Default' ) }
							value={ props.attributes.columnDefault ? props.attributes.columnDefault : '' }
							onChange={ setColumnDefault }
							options={ [
								{
									label: __( 'Hidden' ),
									value: '0',
								},
								{
									label: __( '1' ),
									value: '1',
								},
								{
									label: __( '2' ),
									value: '2',
								},
								{
									label: __( '3' ),
									value: '3',
								},
								{
									label: __( '4' ),
									value: '4',
								},
								{
									label: __( '5' ),
									value: '5',
								},
								{
									label: __( '6' ),
									value: '6',
								},
								{
									label: __( '7' ),
									value: '7',
								},
								{
									label: __( '8' ),
									value: '8',
								},
								{
									label: __( '9' ),
									value: '9',
								},
								{
									label: __( '10' ),
									value: '10',
								},
								{
									label: __( '11' ),
									value: '11',
								},
								{
									label: __( '12 (Full width)' ),
									value: '12',
								},

							] }
						/>
					</PanelRow>
					<PanelRow>
						<SelectControl
							key="column-small"
							label={ __( 'Mobile' ) }
							value={ props.attributes.columnPhone ? props.attributes.columnPhone : '' }
							onChange={ setColumnPhone }
							options={ [
								{
									label: __( 'Inherit' ),
									value: 'inherit',
								},
								{
									label: __( 'Hide on mobile' ),
									value: '0',
								},
								{
									label: __( '1' ),
									value: '1',
								},
								{
									label: __( '2' ),
									value: '2',
								},
								{
									label: __( '3' ),
									value: '3',
								},
								{
									label: __( '4' ),
									value: '4',
								},
								{
									label: __( '5' ),
									value: '5',
								},
								{
									label: __( '6' ),
									value: '6',
								},
								{
									label: __( '7' ),
									value: '7',
								},
								{
									label: __( '8' ),
									value: '8',
								},
								{
									label: __( '9' ),
									value: '9',
								},
								{
									label: __( '10' ),
									value: '10',
								},
								{
									label: __( '11' ),
									value: '11',
								},
								{
									label: __( '12 (Full width)' ),
									value: '12',
								},

							] }
						/>
					</PanelRow>
					<PanelRow>
						<SelectControl
							key="column-tablet-portrait"
							label={ __( 'Tablet Portrait' ) }
							value={ props.attributes.columnTabletPortrait ? props.attributes.columnTabletPortrait : '' }
							onChange={ setColumnTabletPortrait }
							options={ [
								{
									label: __( 'Inherit' ),
									value: 'inherit',
								},
								{
									label: __( 'Hide on tablet portrait' ),
									value: '0',
								},
								{
									label: __( '1' ),
									value: '1',
								},
								{
									label: __( '2' ),
									value: '2',
								},
								{
									label: __( '3' ),
									value: '3',
								},
								{
									label: __( '4' ),
									value: '4',
								},
								{
									label: __( '5' ),
									value: '5',
								},
								{
									label: __( '6' ),
									value: '6',
								},
								{
									label: __( '7' ),
									value: '7',
								},
								{
									label: __( '8' ),
									value: '8',
								},
								{
									label: __( '9' ),
									value: '9',
								},
								{
									label: __( '10' ),
									value: '10',
								},
								{
									label: __( '11' ),
									value: '11',
								},
								{
									label: __( '12 (Full width)' ),
									value: '12',
								},

							] }
						/>
					</PanelRow>
					<PanelRow>
						<SelectControl
							key="column-tablet-landscape"
							label={ __( 'Tablet Landcsape' ) }
							value={ props.attributes.columnTabletLandscape ? props.attributes.columnTabletLandscape : '' }
							onChange={ setColumnTabletLandscape }
							options={ [
								{
									label: __( 'Inherit' ),
									value: 'inherit',
								},
								{
									label: __( 'Hide on tablet landcsape' ),
									value: '0',
								},
								{
									label: __( '1' ),
									value: '1',
								},
								{
									label: __( '2' ),
									value: '2',
								},
								{
									label: __( '3' ),
									value: '3',
								},
								{
									label: __( '4' ),
									value: '4',
								},
								{
									label: __( '5' ),
									value: '5',
								},
								{
									label: __( '6' ),
									value: '6',
								},
								{
									label: __( '7' ),
									value: '7',
								},
								{
									label: __( '8' ),
									value: '8',
								},
								{
									label: __( '9' ),
									value: '9',
								},
								{
									label: __( '10' ),
									value: '10',
								},
								{
									label: __( '11' ),
									value: '11',
								},
								{
									label: __( '12 (Full width)' ),
									value: '12',
								},

							] }
						/>
					</PanelRow>
					<PanelRow>
						<SelectControl
							key="column-desktop"
							label={ __( 'Desktop' ) }
							value={ props.attributes.columnDesktop ? props.attributes.columnDesktop : '' }
							onChange={ setColumnDesktop }
							options={ [
								{
									label: __( 'Inherit' ),
									value: 'inherit',
								},
								{
									label: __( 'Hide on desktop' ),
									value: '0',
								},
								{
									label: __( '1' ),
									value: '1',
								},
								{
									label: __( '2' ),
									value: '2',
								},
								{
									label: __( '3' ),
									value: '3',
								},
								{
									label: __( '4' ),
									value: '4',
								},
								{
									label: __( '5' ),
									value: '5',
								},
								{
									label: __( '6' ),
									value: '6',
								},
								{
									label: __( '7' ),
									value: '7',
								},
								{
									label: __( '8' ),
									value: '8',
								},
								{
									label: __( '9' ),
									value: '9',
								},
								{
									label: __( '10' ),
									value: '10',
								},
								{
									label: __( '11' ),
									value: '11',
								},
								{
									label: __( '12 (Full width)' ),
									value: '12',
								},

							] }
						/>
					</PanelRow>
					<PanelRow>
						<SelectControl
							key="column-xl"
							label={ __( 'XL' ) }
							value={ props.attributes.columnXL ? props.attributes.columnXL : '' }
							onChange={ setColumnXL }
							options={ [
								{
									label: __( 'Inherit' ),
									value: 'inherit',
								},
								{
									label: __( 'Hide on desktop' ),
									value: '0',
								},
								{
									label: __( '1' ),
									value: '1',
								},
								{
									label: __( '2' ),
									value: '2',
								},
								{
									label: __( '3' ),
									value: '3',
								},
								{
									label: __( '4' ),
									value: '4',
								},
								{
									label: __( '5' ),
									value: '5',
								},
								{
									label: __( '6' ),
									value: '6',
								},
								{
									label: __( '7' ),
									value: '7',
								},
								{
									label: __( '8' ),
									value: '8',
								},
								{
									label: __( '9' ),
									value: '9',
								},
								{
									label: __( '10' ),
									value: '10',
								},
								{
									label: __( '11' ),
									value: '11',
								},
								{
									label: __( '12 (Full width)' ),
									value: '12',
								},

							] }
						/>
					</PanelRow>
				</div>
			</div>
		);
	};


	const column24Select = () => {
		if ( '24' !== props.attributes.columnCount ) {
			return '';
		}

		return (
			<div className="column-wrapper">
				<div className="column-inner-wrapper">
					<p>Inherit uses prev screen size setting.</p>
					<PanelRow>
						<SelectControl
							key="column-24-default"
							label={ __( 'Default' ) }
							value={ props.attributes.columnDefault ? props.attributes.columnDefault : '' }
							onChange={ setColumnDefault }
							options={ [
								{
									label: __( '1' ),
									value: '1',
								},
								{
									label: __( '2' ),
									value: '2',
								},
								{
									label: __( '3' ),
									value: '3',
								},
								{
									label: __( '4' ),
									value: '4',
								},
								{
									label: __( '5' ),
									value: '5',
								},
								{
									label: __( '6' ),
									value: '6',
								},
								{
									label: __( '7' ),
									value: '7',
								},
								{
									label: __( '8' ),
									value: '8',
								},
								{
									label: __( '9' ),
									value: '9',
								},
								{
									label: __( '10' ),
									value: '10',
								},
								{
									label: __( '11' ),
									value: '11',
								},
								{
									label: __( '12 (50%)' ),
									value: '12',
								},
								{
									label: __( '13' ),
									value: '13',
								},
								{
									label: __( '14' ),
									value: '14',
								},
								{
									label: __( '15' ),
									value: '15',
								},
								{
									label: __( '16' ),
									value: '16',
								},
								{
									label: __( '17' ),
									value: '17',
								},
								{
									label: __( '18' ),
									value: '18',
								},
								{
									label: __( '19' ),
									value: '19',
								},
								{
									label: __( '20' ),
									value: '20',
								},
								{
									label: __( '21' ),
									value: '21',
								},
								{
									label: __( '22' ),
									value: '22',
								},
								{
									label: __( '23' ),
									value: '23',
								},
								{
									label: __( '24 (Full width)' ),
									value: '24',
								},
							] }
						/>
					</PanelRow>
					<PanelRow>
						<SelectControl
							key="column-24-small"
							label={ __( 'Mobile' ) }
							value={ props.attributes.columnPhone ? props.attributes.columnPhone : '' }
							onChange={ setColumnPhone }
							options={ [
								{
									label: __( 'Inherit' ),
									value: 'inherit',
								},
								{
									label: __( 'Hide on mobile' ),
									value: '0',
								},
								{
									label: __( '1' ),
									value: '1',
								},
								{
									label: __( '2' ),
									value: '2',
								},
								{
									label: __( '3' ),
									value: '3',
								},
								{
									label: __( '4' ),
									value: '4',
								},
								{
									label: __( '5' ),
									value: '5',
								},
								{
									label: __( '6' ),
									value: '6',
								},
								{
									label: __( '7' ),
									value: '7',
								},
								{
									label: __( '8' ),
									value: '8',
								},
								{
									label: __( '9' ),
									value: '9',
								},
								{
									label: __( '10' ),
									value: '10',
								},
								{
									label: __( '11' ),
									value: '11',
								},
								{
									label: __( '12 (50%)' ),
									value: '12',
								},
								{
									label: __( '13' ),
									value: '13',
								},
								{
									label: __( '14' ),
									value: '14',
								},
								{
									label: __( '15' ),
									value: '15',
								},
								{
									label: __( '16' ),
									value: '16',
								},
								{
									label: __( '17' ),
									value: '17',
								},
								{
									label: __( '18' ),
									value: '18',
								},
								{
									label: __( '19' ),
									value: '19',
								},
								{
									label: __( '20' ),
									value: '20',
								},
								{
									label: __( '21' ),
									value: '21',
								},
								{
									label: __( '22' ),
									value: '22',
								},
								{
									label: __( '23' ),
									value: '23',
								},
								{
									label: __( '24 (Full width)' ),
									value: '24',
								},
							] }
						/>
					</PanelRow>
					<PanelRow>
						<SelectControl
							key="column-24-tablet-portrait"
							label={ __( 'Tablet Portrait' ) }
							value={ props.attributes.columnTabletPortrait ? props.attributes.columnTabletPortrait : '' }
							onChange={ setColumnTabletPortrait }
							options={ [
								{
									label: __( 'Inherit' ),
									value: 'inherit',
								},
								{
									label: __( 'Hide on tablet portrait' ),
									value: '0',
								},
								{
									label: __( '1' ),
									value: '1',
								},
								{
									label: __( '2' ),
									value: '2',
								},
								{
									label: __( '3' ),
									value: '3',
								},
								{
									label: __( '4' ),
									value: '4',
								},
								{
									label: __( '5' ),
									value: '5',
								},
								{
									label: __( '6' ),
									value: '6',
								},
								{
									label: __( '7' ),
									value: '7',
								},
								{
									label: __( '8' ),
									value: '8',
								},
								{
									label: __( '9' ),
									value: '9',
								},
								{
									label: __( '10' ),
									value: '10',
								},
								{
									label: __( '11' ),
									value: '11',
								},
								{
									label: __( '12 (50%)' ),
									value: '12',
								},
								{
									label: __( '13' ),
									value: '13',
								},
								{
									label: __( '14' ),
									value: '14',
								},
								{
									label: __( '15' ),
									value: '15',
								},
								{
									label: __( '16' ),
									value: '16',
								},
								{
									label: __( '17' ),
									value: '17',
								},
								{
									label: __( '18' ),
									value: '18',
								},
								{
									label: __( '19' ),
									value: '19',
								},
								{
									label: __( '20' ),
									value: '20',
								},
								{
									label: __( '21' ),
									value: '21',
								},
								{
									label: __( '22' ),
									value: '22',
								},
								{
									label: __( '23' ),
									value: '23',
								},
								{
									label: __( '24 (Full width)' ),
									value: '24',
								},
							] }
						/>
					</PanelRow>
					<PanelRow>
						<SelectControl
							key="column-24-tablet-landscape"
							label={ __( 'Tablet Landcsape' ) }
							value={ props.attributes.columnTabletLandscape ? props.attributes.columnTabletLandscape : '' }
							onChange={ setColumnTabletLandscape }
							options={ [
								{
									label: __( 'Inherit' ),
									value: 'inherit',
								},
								{
									label: __( 'Hide on tablet landcsape' ),
									value: '0',
								},
								{
									label: __( '1' ),
									value: '1',
								},
								{
									label: __( '2' ),
									value: '2',
								},
								{
									label: __( '3' ),
									value: '3',
								},
								{
									label: __( '4' ),
									value: '4',
								},
								{
									label: __( '5' ),
									value: '5',
								},
								{
									label: __( '6' ),
									value: '6',
								},
								{
									label: __( '7' ),
									value: '7',
								},
								{
									label: __( '8' ),
									value: '8',
								},
								{
									label: __( '9' ),
									value: '9',
								},
								{
									label: __( '10' ),
									value: '10',
								},
								{
									label: __( '11' ),
									value: '11',
								},
								{
									label: __( '12 (50%)' ),
									value: '12',
								},
								{
									label: __( '13' ),
									value: '13',
								},
								{
									label: __( '14' ),
									value: '14',
								},
								{
									label: __( '15' ),
									value: '15',
								},
								{
									label: __( '16' ),
									value: '16',
								},
								{
									label: __( '17' ),
									value: '17',
								},
								{
									label: __( '18' ),
									value: '18',
								},
								{
									label: __( '19' ),
									value: '19',
								},
								{
									label: __( '20' ),
									value: '20',
								},
								{
									label: __( '21' ),
									value: '21',
								},
								{
									label: __( '22' ),
									value: '22',
								},
								{
									label: __( '23' ),
									value: '23',
								},
								{
									label: __( '24 (Full width)' ),
									value: '24',
								},
							] }
						/>
					</PanelRow>
					<PanelRow>
						<SelectControl
							key="column-24-desktop"
							label={ __( 'Desktop' ) }
							value={ props.attributes.columnDesktop ? props.attributes.columnDesktop : '' }
							onChange={ setColumnDesktop }
							options={ [
								{
									label: __( 'Inherit' ),
									value: 'inherit',
								},
								{
									label: __( 'Hide on desktop' ),
									value: '0',
								},
								{
									label: __( '1' ),
									value: '1',
								},
								{
									label: __( '2' ),
									value: '2',
								},
								{
									label: __( '3' ),
									value: '3',
								},
								{
									label: __( '4' ),
									value: '4',
								},
								{
									label: __( '5' ),
									value: '5',
								},
								{
									label: __( '6' ),
									value: '6',
								},
								{
									label: __( '7' ),
									value: '7',
								},
								{
									label: __( '8' ),
									value: '8',
								},
								{
									label: __( '9' ),
									value: '9',
								},
								{
									label: __( '10' ),
									value: '10',
								},
								{
									label: __( '11' ),
									value: '11',
								},
								{
									label: __( '12 (50%)' ),
									value: '12',
								},
								{
									label: __( '13' ),
									value: '13',
								},
								{
									label: __( '14' ),
									value: '14',
								},
								{
									label: __( '15' ),
									value: '15',
								},
								{
									label: __( '16' ),
									value: '16',
								},
								{
									label: __( '17' ),
									value: '17',
								},
								{
									label: __( '18' ),
									value: '18',
								},
								{
									label: __( '19' ),
									value: '19',
								},
								{
									label: __( '20' ),
									value: '20',
								},
								{
									label: __( '21' ),
									value: '21',
								},
								{
									label: __( '22' ),
									value: '22',
								},
								{
									label: __( '23' ),
									value: '23',
								},
								{
									label: __( '24 (Full width)' ),
									value: '24',
								},

							] }
						/>
					</PanelRow>
					<PanelRow>
						<SelectControl
							key="column-24-xl"
							label={ __( 'XL' ) }
							value={ props.attributes.columnXL ? props.attributes.columnXL : '' }
							onChange={ setColumnXL }
							options={ [
								{
									label: __( 'Inherit' ),
									value: 'inherit',
								},
								{
									label: __( 'Hide on desktop' ),
									value: '0',
								},
								{
									label: __( '1' ),
									value: '1',
								},
								{
									label: __( '2' ),
									value: '2',
								},
								{
									label: __( '3' ),
									value: '3',
								},
								{
									label: __( '4' ),
									value: '4',
								},
								{
									label: __( '5' ),
									value: '5',
								},
								{
									label: __( '6' ),
									value: '6',
								},
								{
									label: __( '7' ),
									value: '7',
								},
								{
									label: __( '8' ),
									value: '8',
								},
								{
									label: __( '9' ),
									value: '9',
								},
								{
									label: __( '10' ),
									value: '10',
								},
								{
									label: __( '11' ),
									value: '11',
								},
								{
									label: __( '12 (50%)' ),
									value: '12',
								},
								{
									label: __( '13' ),
									value: '13',
								},
								{
									label: __( '14' ),
									value: '14',
								},
								{
									label: __( '15' ),
									value: '15',
								},
								{
									label: __( '16' ),
									value: '16',
								},
								{
									label: __( '17' ),
									value: '17',
								},
								{
									label: __( '18' ),
									value: '18',
								},
								{
									label: __( '19' ),
									value: '19',
								},
								{
									label: __( '20' ),
									value: '20',
								},
								{
									label: __( '21' ),
									value: '21',
								},
								{
									label: __( '22' ),
									value: '22',
								},
								{
									label: __( '23' ),
									value: '23',
								},
								{
									label: __( '24 (Full width)' ),
									value: '24',
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
			title={ __( 'Block Column Count' ) }
			className="flexlayout-column-options"
			initialOpen={ false }
		>
			<PanelRow>
				<SelectControl
					key="column-total"
					label={ __( 'Total Columns' ) }
					value={ props.attributes.columnCount ? props.attributes.columnCount : '' }
					onChange={ setColumnCount }
					options={ [
						{
							label: __( '12' ),
							value: '12',
						},
						{
							label: __( '24' ),
							value: '24',
						},
					]}
				/>
			</PanelRow>
			<PanelRow>
				{ columnSelect() }
				{ column24Select() }
			</PanelRow>
		</PanelBody>
	);
}

export default ColumnOptions;
