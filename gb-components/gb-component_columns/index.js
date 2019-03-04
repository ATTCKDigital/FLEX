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
import './editor.scss'; 

// Export for ease of importing in individual blocks.
export {
	ColumnOptionsAttributes,
	ColumnOptionsClasses,
};

function ColumnOptions( props ) {
	const setColumnCount = value => props.setAttributes( { columnCount: value } );
	const setColumnSmall = value => props.setAttributes( { columnSmall: value } );
	const setColumnMedium = value => props.setAttributes( { columnMedium: value } );
	const setColumnLarge = value => props.setAttributes( { columnLarge: value } );
	const setColumnXL = value => props.setAttributes( { columnXL: value } );
	
	const columnSelect = () => {
		if ( '12' !== props.attributes.columnCount ) {
			return '';
		}
		return (
			<div className="column-wrapper">
				<div className="column-inner-wrapper">
					<PanelRow>
						<SelectControl
							key="column-small"
							label={ __( 'Mobile' ) }
							value={ props.attributes.columnSmall ? props.attributes.columnSmall : '' }
							onChange={ setColumnSmall }
							options={ [
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
							key="column-medium"
							label={ __( 'Tablet Portrait' ) }
							value={ props.attributes.columnMedium ? props.attributes.columnMedium : '' }
							onChange={ setColumnMedium }
							options={ [
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
							key="column-large"
							label={ __( 'Tablet Landcsape' ) }
							value={ props.attributes.columnLarge ? props.attributes.columnLarge : '' }
							onChange={ setColumnLarge }
							options={ [
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
							key="column-xl"
							label={ __( 'Desktop' ) }
							value={ props.attributes.columnXL ? props.attributes.columnXL : '' }
							onChange={ setColumnXL }
							options={ [
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
					<PanelRow>
						<SelectControl
							key="column-small-24"
							label={ __( 'Mobile' ) }
							value={ props.attributes.columnSmall ? props.attributes.columnSmall : '' }
							onChange={ setColumnSmall }
							options={ [
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
									label: __( '12 (50% width)' ),
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
									label: __( '24 (Full' ),
									value: '24',
								},

							] }
						/>
					</PanelRow>
					<PanelRow>
						<SelectControl
							key="column-medium-24"
							label={ __( 'Tablet Portrait' ) }
							value={ props.attributes.columnMedium ? props.attributes.columnMedium : '' }
							onChange={ setColumnMedium }
							options={ [
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
									label: __( '12 (50% width)' ),
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
									label: __( '24 (Full' ),
									value: '24',
								},

							] }
						/>
					</PanelRow>
					<PanelRow>
						<SelectControl
							key="column-large-24"
							label={ __( 'Tablet Landcsape' ) }
							value={ props.attributes.columnLarge ? props.attributes.columnLarge : '' }
							onChange={ setColumnLarge }
							options={ [
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
									label: __( '12 (50% width)' ),
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
									label: __( '24 (Full' ),
									value: '24',
								},

							] }
						/>
					</PanelRow>
					<PanelRow>
						<SelectControl
							key="column-xl-24"
							label={ __( 'Desktop' ) }
							value={ props.attributes.columnXL ? props.attributes.columnXL : '' }
							onChange={ setColumnXL }
							options={ [
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
									label: __( '12 (50% width)' ),
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
									label: __( '24 (Full' ),
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
			className="flexls-column-options"
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
