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
import RowHeightOptionsAttributes from './attributes';
import RowHeightOptionsClasses from './classes';
// import './editor.scss';

// Export for ease of importing in individual blocks.
export {
	RowHeightOptionsAttributes,
	RowHeightOptionsClasses,
};

function RowHeightOptions( props ) {
	const setRowHeight = value => props.setAttributes( { rowHeight: value } );

	const rowHeightSelect = () => {

		return (
			<div className="row-height-wrapper">
				<div className="row-height-inner-wrapper">
					<PanelRow>
						<SelectControl
							key="row-height"
							label={ __( 'Select Row Height' ) }
							help={__( 'Select a fixed row height. Useful for heroes.' )}
							value={ props.attributes.rowHeight ? props.attributes.rowHeight : '' }
							onChange={ setRowHeight }
							options={ [
								{
									label: __( 'No fixed height' ),
									value: 'none',
								},
								{
									label: __( 'Small' ),
									value: 'small',
								},
								{
									label: __( 'Medium' ),
									value: 'medium',
								},
								{
									label: __( 'Large' ),
									value: 'large',
								},
								{
									label: __( 'Full Height (100% Screen Height)' ),
									value: 'full-height',
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
			title={ __( 'Row Height' ) }
			className="flexlayout-row-height-options"
			initialOpen={ false }
		>
			<PanelRow>
				{ rowHeightSelect() }
			</PanelRow>
		</PanelBody>
	);
}

export default RowHeightOptions;
