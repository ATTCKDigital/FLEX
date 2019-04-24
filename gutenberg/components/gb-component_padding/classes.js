/**
 * Set inline CSS class.
 * @param {object} props - The block object.
 * @return {array} The inline CSS class.
 */
function PaddingOptionsClasses( props ) {
	return [
		props.attributes.paddingTop ? `padding-top-${ props.attributes.paddingTop }` : null,
		props.attributes.paddingRight ? `padding-right-${ props.attributes.paddingRight }` : null,
		props.attributes.paddingLeft ? `padding-left-${ props.attributes.paddingLeft }` : null,
		props.attributes.paddingBottom ? `padding-bottom-${ props.attributes.paddingBottom }` : null,
		props.attributes.paddingTabletPortraitTop ? `padding-tablet-portrait-top-${ props.attributes.paddingTabletPortraitTop }` : null,
		props.attributes.paddingTabletPortraitRight ? `padding-tablet-portrait-right-${ props.attributes.paddingTabletPortraitRight }` : null,
		props.attributes.paddingTabletPortraitLeft ? `padding-tablet-portrait-left-${ props.attributes.paddingTabletPortraitLeft }` : null,
		props.attributes.paddingTabletPortraitBottom ? `padding-tablet-portrait-bottom-${ props.attributes.paddingTabletPortraitBottom }` : null,
		props.attributes.paddingTabletLandscapeTop ? `padding-tablet-landscape-top-${ props.attributes.paddingTabletLandscapeTop }` : null,
		props.attributes.paddingTabletLandscapeRight ? `padding-tablet-landscape-right-${ props.attributes.paddingTabletLandscapeRight }` : null,
		props.attributes.paddingTabletLandscapeLeft ? `padding-tablet-landscape-left-${ props.attributes.paddingTabletLandscapeLeft }` : null,
		props.attributes.paddingTabletLandscapeBottom ? `padding-tablet-landscape-bottom-${ props.attributes.paddingTabletLandscapeBottom }` : null,
		props.attributes.paddingDesktopTop ? `padding-desktop-top-${ props.attributes.paddingDesktopTop }` : null,
		props.attributes.paddingDesktopRight ? `padding-desktop-right-${ props.attributes.paddingDesktopRight }` : null,
		props.attributes.paddingDesktopLeft ? `padding-desktop-left-${ props.attributes.paddingDesktopLeft }` : null,
		props.attributes.paddingDesktopBottom ? `padding-desktop-bottom-${ props.attributes.paddingDesktopBottom }` : null,
	];
}

export default PaddingOptionsClasses;
