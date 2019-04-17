/**
 * Set inline CSS class.
 * @param {object} props - The block object.
 * @return {array} The inline CSS class.
 */
function MarginOptionsClasses( props ) {
	return [
		props.attributes.marginTop ? `margin-top-${ props.attributes.marginTop }` : null,
		props.attributes.marginRight ? `margin-right-${ props.attributes.marginRight }` : null,
		props.attributes.marginLeft ? `margin-left-${ props.attributes.marginLeft }` : null,
		props.attributes.marginBottom ? `margin-bottom-${ props.attributes.marginBottom }` : null,
		props.attributes.marginTabletPortraitTop ? `margin-tablet-portrait-top-${ props.attributes.marginTabletPortraitTop }` : null,
		props.attributes.marginTabletPortraitRight ? `margin-tablet-portrait-right-${ props.attributes.marginTabletPortraitRight }` : null,
		props.attributes.marginTabletPortraitLeft ? `margin-tablet-portrait-left-${ props.attributes.marginTabletPortraitLeft }` : null,
		props.attributes.marginTabletPortraitBottom ? `margin-tablet-portrait-bottom-${ props.attributes.marginTabletPortraitBottom }` : null,
		props.attributes.marginTabletLandscapeTop ? `margin-tablet-landscape-top-${ props.attributes.marginTabletLandscapeTop }` : null,
		props.attributes.marginTabletLandscapeRight ? `margin-tablet-landscape-right-${ props.attributes.marginTabletLandscapeRight }` : null,
		props.attributes.marginTabletLandscapeLeft ? `margin-tablet-landscape-left-${ props.attributes.marginTabletLandscapeLeft }` : null,
		props.attributes.marginTabletLandscapeBottom ? `margin-tablet-landscape-bottom-${ props.attributes.marginTabletLandscapeBottom }` : null,
		props.attributes.marginDesktopTop ? `margin-desktop-top-${ props.attributes.marginDesktopTop }` : null,
		props.attributes.marginDesktopRight ? `margin-desktop-right-${ props.attributes.marginDesktopRight }` : null,
		props.attributes.marginDesktopLeft ? `margin-desktop-left-${ props.attributes.marginDesktopLeft }` : null,
		props.attributes.marginDesktopBottom ? `margin-desktop-bottom-${ props.attributes.marginDesktopBottom }` : null,

	];
}

export default MarginOptionsClasses;
