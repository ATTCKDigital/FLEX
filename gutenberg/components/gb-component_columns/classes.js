/**
 * Set inline CSS class.
 * @param {object} props - The block object.
 * @return {array} The inline CSS class.
 */
function ColumnOptionsClasses( props ) {
	return [
		props.attributes.columnSmall ? `flex-g-sm-${ props.attributes.columnSmall }-${ props.attributes.columnCount }` : null,
		props.attributes.columnMedium ? `flex-g-md-${ props.attributes.columnMedium }-${ props.attributes.columnCount }` : null,
		props.attributes.columnLarge ? `flex-g-lg-${ props.attributes.columnLarge }-${ props.attributes.columnCount }` : null,
		props.attributes.columnXL ? `flex-g-xl-${ props.attributes.columnXL }-${ props.attributes.columnCount }` : null,

	];
}

export default ColumnOptionsClasses;
