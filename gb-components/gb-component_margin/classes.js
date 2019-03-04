/**
 * Set inline CSS class.
 * @param {object} props - The block object.
 * @return {array} The inline CSS class.
 */
function MarginOptionsClasses( props ) {
	return [
		props.attributes.marginSmallTop ? `margin-small-top-${ props.attributes.marginSmallTop }` : null,
		props.attributes.marginSmallRight ? `margin-small-right-${ props.attributes.marginSmallRight }` : null,
		props.attributes.marginSmallLeft ? `margin-small-left-${ props.attributes.marginSmallLeft }` : null,
		props.attributes.marginSmallBottom ? `margin-small-bottom-${ props.attributes.marginSmallBottom }` : null,
		props.attributes.marginMediumTop ? `margin-medium-top-${ props.attributes.marginMediumTop }` : null,
		props.attributes.marginMediumRight ? `margin-medium-right-${ props.attributes.marginMediumRight }` : null,
		props.attributes.marginMediumLeft ? `margin-medium-left-${ props.attributes.marginMediumLeft }` : null,
		props.attributes.marginMediumBottom ? `margin-medium-bottom-${ props.attributes.marginMediumBottom }` : null,
		props.attributes.marginLargeTop ? `margin-large-top-${ props.attributes.marginLargeTop }` : null,
		props.attributes.marginLargeRight ? `margin-large-right-${ props.attributes.marginLargeRight }` : null,
		props.attributes.marginLargeLeft ? `margin-large-left-${ props.attributes.marginLargeLeft }` : null,
		props.attributes.marginLargeBottom ? `margin-large-bottom-${ props.attributes.marginLargeBottom }` : null,
		props.attributes.marginXLTop ? `margin-xl-top-${ props.attributes.marginXLTop }` : null,
		props.attributes.marginXLRight ? `margin-xl-right-${ props.attributes.marginXLRight }` : null,
		props.attributes.marginXLLeft ? `margin-xl-left-${ props.attributes.marginXLLeft }` : null,
		props.attributes.marginXLBottom ? `margin-xl-bottom-${ props.attributes.marginXLBottom }` : null,

	];
}

export default MarginOptionsClasses;
