/**
 * Set inline CSS class.
 * @param {object} props - The block object.
 * @return {array} The inline CSS class.
 */
function PaddingOptionsClasses( props ) {
	return [
		props.attributes.paddingSmallTop ? `padding-small-top-${ props.attributes.paddingSmallTop }` : null,
		props.attributes.paddingSmallRight ? `padding-small-right-${ props.attributes.paddingSmallRight }` : null,
		props.attributes.paddingSmallLeft ? `padding-small-left-${ props.attributes.paddingSmallLeft }` : null,
		props.attributes.paddingSmallBottom ? `padding-small-bottom-${ props.attributes.paddingSmallBottom }` : null,
		props.attributes.paddingMediumTop ? `padding-medium-top-${ props.attributes.paddingMediumTop }` : null,
		props.attributes.paddingMediumRight ? `padding-medium-right-${ props.attributes.paddingMediumRight }` : null,
		props.attributes.paddingMediumLeft ? `padding-medium-left-${ props.attributes.paddingMediumLeft }` : null,
		props.attributes.paddingMediumBottom ? `padding-medium-bottom-${ props.attributes.paddingMediumBottom }` : null,
		props.attributes.paddingLargeTop ? `padding-large-top-${ props.attributes.paddingLargeTop }` : null,
		props.attributes.paddingLargeRight ? `padding-large-right-${ props.attributes.paddingLargeRight }` : null,
		props.attributes.paddingLargeLeft ? `padding-large-left-${ props.attributes.paddingLargeLeft }` : null,
		props.attributes.paddingLargeBottom ? `padding-large-bottom-${ props.attributes.paddingLargeBottom }` : null,
		props.attributes.paddingXLTop ? `padding-xl-top-${ props.attributes.paddingXLTop }` : null,
		props.attributes.paddingXLRight ? `padding-xl-right-${ props.attributes.paddingXLRight }` : null,
		props.attributes.paddingXLLeft ? `padding-xl-left-${ props.attributes.paddingXLLeft }` : null,
		props.attributes.paddingXLBottom ? `padding-xl-bottom-${ props.attributes.paddingXLBottom }` : null,

	];
}

export default PaddingOptionsClasses;
