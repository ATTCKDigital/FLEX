/**
 * Set inline CSS class.
 * @param {object} props - The block object.
 * @return {array} The inline CSS class.
 */
function ColumnOptionsClasses( props ) {
	return [
		props.attributes.columnDefault ? `flex-${ props.attributes.columnDefault }-${ props.attributes.columnCount }` : null,
		props.attributes.columnPhone && props.attributes.columnPhone !== 'inherit' ? `flex-phone-${ props.attributes.columnPhone }-${ props.attributes.columnCount }` : null,
		props.attributes.columnTabletPortrait && props.attributes.columnTabletPortrait !== 'inherit' ? `flex-tablet-portrait-${ props.attributes.columnTabletPortrait }-${ props.attributes.columnCount }` : null,
		props.attributes.columnTabletLandscape && props.attributes.columnTabletLandscape !== 'inherit' ? `flex-tablet-landscape-${ props.attributes.columnTabletLandscape }-${ props.attributes.columnCount }` : null,
		props.attributes.columnDesktop && props.attributes.columnDesktop !== 'inherit' ? `flex-desktop-${ props.attributes.columnDesktop }-${ props.attributes.columnCount }` : null,
		props.attributes.columnXL && props.attributes.columnXL !== 'inherit' ? `flex-xl-${ props.attributes.columnXL }-${ props.attributes.columnCount }` : null,

	];
}

export default ColumnOptionsClasses;
