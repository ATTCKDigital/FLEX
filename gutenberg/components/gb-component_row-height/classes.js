/**
 * Set inline CSS class.
 * @param {Object} props - The block object.
 * @return {Array} The inline CSS class.
 */
function RowHeightOptionsClasses( props ) {
	return [
		props.attributes.rowHeight
			? `component-row-height-${ props.attributes.rowHeight }`
			: null,
		props.attributes.rowHeightMobile
			? `component-row-height-mobile-${ props.attributes.rowHeight }`
			: null,
	];
}

export default RowHeightOptionsClasses;
