/**
 * Set inline CSS class.
 * @param {object} props - The block object.
 * @return {array} The inline CSS class.
 */
function RowHeightOptionsClasses( props ) {
	return [
		props.attributes.rowHeight ? `component-row-height-${ props.attributes.rowHeight }` : null,
	];
}

export default RowHeightOptionsClasses;
