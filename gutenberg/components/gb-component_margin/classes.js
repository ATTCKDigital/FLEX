/**
 * Set inline CSS class.
 * @param {object} props - The block object.
 * @return {array} The inline CSS class.
 */
function MarginOptionsClasses( props ) {
	return [
		props.attributes.marginTop && props.attributes.marginTop !== 'inherit' ? `margin-top-${ props.attributes.marginTop }` : null,
		props.attributes.marginRight && props.attributes.marginRight !== 'inherit' ? `margin-right-${ props.attributes.marginRight }` : null,
		props.attributes.marginLeft && props.attributes.marginLeft !== 'inherit' ? `margin-left-${ props.attributes.marginLeft }` : null,
		props.attributes.marginBottom && props.attributes.marginBottom !== 'inherit' ? `margin-bottom-${ props.attributes.marginBottom }` : null,

		props.attributes.marginPhoneTop && props.attributes.marginPhoneTop !== 'inherit' ? `margin-phone-top-${ props.attributes.marginPhoneTop }` : null,
		props.attributes.marginPhoneRight && props.attributes.marginPhoneRight !== 'inherit' ? `margin-phone-right-${ props.attributes.marginPhoneRight }` : null,
		props.attributes.marginPhoneLeft && props.attributes.marginPhoneLeft !== 'inherit' ? `margin-phone-left-${ props.attributes.marginPhoneLeft }` : null,
		props.attributes.marginPhoneBottom && props.attributes.marginPhoneBottom !== 'inherit' ? `margin-phone-bottom-${ props.attributes.marginPhoneBottom }` : null,

		props.attributes.marginPhonePlusTop && props.attributes.marginPhonePlusTop !== 'inherit' ? `margin-phone-plus-top-${ props.attributes.marginPhonePlusTop }` : null,
		props.attributes.marginPhonePlusRight && props.attributes.marginPhonePlusRight !== 'inherit' ? `margin-phone-plus-right-${ props.attributes.marginPhonePlusRight }` : null,
		props.attributes.marginPhonePlusLeft && props.attributes.marginPhonePlusLeft !== 'inherit' ? `margin-phone-plus-left-${ props.attributes.marginPhonePlusLeft }` : null,
		props.attributes.marginPhonePlusBottom && props.attributes.marginPhonePlusBottom !== 'inherit' ? `margin-phone-plus-bottom-${ props.attributes.marginPhonePlusBottom }` : null,

		props.attributes.marginTabletPortraitTop && props.attributes.marginTabletPortraitTop !== 'inherit' ? `margin-tablet-portrait-top-${ props.attributes.marginTabletPortraitTop }` : null,
		props.attributes.marginTabletPortraitRight && props.attributes.marginTabletPortraitRight !== 'inherit' ? `margin-tablet-portrait-right-${ props.attributes.marginTabletPortraitRight }` : null,
		props.attributes.marginTabletPortraitLeft && props.attributes.marginTabletPortraitLeft !== 'inherit' ? `margin-tablet-portrait-left-${ props.attributes.marginTabletPortraitLeft }` : null,
		props.attributes.marginTabletPortraitBottom && props.attributes.marginTabletPortraitBottom !== 'inherit' ? `margin-tablet-portrait-bottom-${ props.attributes.marginTabletPortraitBottom }` : null,

		props.attributes.marginTabletLandscapeTop && props.attributes.marginTabletLandscapeTop !== 'inherit' ? `margin-tablet-landscape-top-${ props.attributes.marginTabletLandscapeTop }` : null,
		props.attributes.marginTabletLandscapeRight && props.attributes.marginTabletLandscapeRight !== 'inherit' ? `margin-tablet-landscape-right-${ props.attributes.marginTabletLandscapeRight }` : null,
		props.attributes.marginTabletLandscapeLeft && props.attributes.marginTabletLandscapeLeft !== 'inherit' ? `margin-tablet-landscape-left-${ props.attributes.marginTabletLandscapeLeft }` : null,
		props.attributes.marginTabletLandscapeBottom && props.attributes.marginTabletLandscapeBottom !== 'inherit' ? `margin-tablet-landscape-bottom-${ props.attributes.marginTabletLandscapeBottom }` : null,

		props.attributes.marginDesktopTop && props.attributes.marginDesktopTop !== 'inherit' ? `margin-desktop-top-${ props.attributes.marginDesktopTop }` : null,
		props.attributes.marginDesktopRight && props.attributes.marginDesktopRight !== 'inherit'? `margin-desktop-right-${ props.attributes.marginDesktopRight }` : null,
		props.attributes.marginDesktopLeft && props.attributes.marginDesktopLeft !== 'inherit'? `margin-desktop-left-${ props.attributes.marginDesktopLeft }` : null,
		props.attributes.marginDesktopBottom && props.attributes.marginDesktopBottom !== 'inherit'? `margin-desktop-bottom-${ props.attributes.marginDesktopBottom }` : null,

		props.attributes.marginXlTop && props.attributes.marginXlTop !== 'inherit' ? `margin-xl-top-${ props.attributes.marginXlTop }` : null,
		props.attributes.marginXlRight && props.attributes.marginXlRight !== 'inherit'? `margin-xl-right-${ props.attributes.marginXlRight }` : null,
		props.attributes.marginXlLeft && props.attributes.marginXlLeft !== 'inherit'? `margin-xl-left-${ props.attributes.marginXlLeft }` : null,
		props.attributes.marginXlBottom && props.attributes.marginXlBottom !== 'inherit'? `margin-xl-bottom-${ props.attributes.marginXlBottom }` : null,

		props.attributes.marginXl2Top && props.attributes.marginXl2Top !== 'inherit' ? `margin-xl2-top-${ props.attributes.marginXl2Top }` : null,
		props.attributes.marginXl2Right && props.attributes.marginXl2Right !== 'inherit'? `margin-xl2-right-${ props.attributes.marginXl2Right }` : null,
		props.attributes.marginXl2Left && props.attributes.marginXl2Left !== 'inherit'? `margin-xl2-left-${ props.attributes.marginXl2Left }` : null,
		props.attributes.marginXl2Bottom && props.attributes.marginXl2Bottom !== 'inherit'? `margin-xl2-bottom-${ props.attributes.marginXl2Bottom }` : null,
	];
}

export default MarginOptionsClasses;
