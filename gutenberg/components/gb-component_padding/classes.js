/**
 * Set inline CSS class.
 * @param {object} props - The block object.
 * @return {array} The inline CSS class.
 */
function PaddingOptionsClasses( props ) {
	return [
		props.attributes.paddingTop && props.attributes.paddingTop !== 'inherit' ? `padding-top-${ props.attributes.paddingTop }` : null,
		props.attributes.paddingRight && props.attributes.paddingRight !== 'inherit' ? `padding-right-${ props.attributes.paddingRight }` : null,
		props.attributes.paddingLeft && props.attributes.paddingLeft !== 'inherit' ? `padding-left-${ props.attributes.paddingLeft }` : null,
		props.attributes.paddingBottom && props.attributes.paddingBottom !== 'inherit' ? `padding-bottom-${ props.attributes.paddingBottom }` : null,
		
		props.attributes.paddingPhoneTop && props.attributes.paddingPhoneTop !== 'inherit' ? `padding-phone-top-${ props.attributes.paddingPhoneTop }` : null,
		props.attributes.paddingPhoneRight && props.attributes.paddingPhoneRight !== 'inherit' ? `padding-phone-right-${ props.attributes.paddingPhoneRight }` : null,
		props.attributes.paddingPhoneLeft && props.attributes.paddingPhoneLeft !== 'inherit' ? `padding-phone-left-${ props.attributes.paddingPhoneLeft }` : null,
		props.attributes.paddingPhoneBottom && props.attributes.paddingPhoneBottom !== 'inherit' ? `padding-phone-bottom-${ props.attributes.paddingPhoneBottom }` : null,
		
		props.attributes.paddingPhonePlusTop && props.attributes.paddingPhonePlusTop !== 'inherit' ? `padding-phone-plus-top-${ props.attributes.paddingPhonePlusTop }` : null,
		props.attributes.paddingPhonePlusRight && props.attributes.paddingPhonePlusRight !== 'inherit' ? `padding-phone-plus-right-${ props.attributes.paddingPhonePlusRight }` : null,
		props.attributes.paddingPhonePlusLeft && props.attributes.paddingPhonePlusLeft !== 'inherit' ? `padding-phone-plus-left-${ props.attributes.paddingPhonePlusLeft }` : null,
		props.attributes.paddingPhonePlusBottom && props.attributes.paddingPhonePlusBottom !== 'inherit' ? `padding-phone-plus-bottom-${ props.attributes.paddingPhonePlusBottom }` : null,

		props.attributes.paddingTabletPortraitTop && props.attributes.paddingTabletPortraitTop !== 'inherit' ? `padding-tablet-portrait-top-${ props.attributes.paddingTabletPortraitTop }` : null,
		props.attributes.paddingTabletPortraitRight && props.attributes.paddingTabletPortraitRight !== 'inherit' ? `padding-tablet-portrait-right-${ props.attributes.paddingTabletPortraitRight }` : null,
		props.attributes.paddingTabletPortraitLeft && props.attributes.paddingTabletPortraitLeft !== 'inherit' ? `padding-tablet-portrait-left-${ props.attributes.paddingTabletPortraitLeft }` : null,
		props.attributes.paddingTabletPortraitBottom && props.attributes.paddingTabletPortraitBottom !== 'inherit' ? `padding-tablet-portrait-bottom-${ props.attributes.paddingTabletPortraitBottom }` : null,
		
		props.attributes.paddingTabletLandscapeTop && props.attributes.paddingTabletLandscapeTop !== 'inherit' ? `padding-tablet-landscape-top-${ props.attributes.paddingTabletLandscapeTop }` : null,
		props.attributes.paddingTabletLandscapeRight && props.attributes.paddingTabletLandscapeRight !== 'inherit' ? `padding-tablet-landscape-right-${ props.attributes.paddingTabletLandscapeRight }` : null,
		props.attributes.paddingTabletLandscapeLeft && props.attributes.paddingTabletLandscapeLeft !== 'inherit' ? `padding-tablet-landscape-left-${ props.attributes.paddingTabletLandscapeLeft }` : null,
		props.attributes.paddingTabletLandscapeBottom && props.attributes.paddingTabletLandscapeBottom !== 'inherit' ? `padding-tablet-landscape-bottom-${ props.attributes.paddingTabletLandscapeBottom }` : null,
		
		props.attributes.paddingDesktopTop && props.attributes.paddingDesktopTop !== 'inherit' ? `padding-desktop-top-${ props.attributes.paddingDesktopTop }` : null,
		props.attributes.paddingDesktopRight && props.attributes.paddingDesktopRight !== 'inherit'? `padding-desktop-right-${ props.attributes.paddingDesktopRight }` : null,
		props.attributes.paddingDesktopLeft && props.attributes.paddingDesktopLeft !== 'inherit'? `padding-desktop-left-${ props.attributes.paddingDesktopLeft }` : null,
		props.attributes.paddingDesktopBottom && props.attributes.paddingDesktopBottom !== 'inherit'? `padding-desktop-bottom-${ props.attributes.paddingDesktopBottom }` : null,

		props.attributes.paddingXlTop && props.attributes.paddingXlTop !== 'inherit' ? `padding-xl-top-${ props.attributes.paddingXlTop }` : null,
		props.attributes.paddingXlRight && props.attributes.paddingXlRight !== 'inherit'? `padding-xl-right-${ props.attributes.paddingXlRight }` : null,
		props.attributes.paddingXlLeft && props.attributes.paddingXlLeft !== 'inherit'? `padding-xl-left-${ props.attributes.paddingXlLeft }` : null,
		props.attributes.paddingXlBottom && props.attributes.paddingXlBottom !== 'inherit'? `padding-xl-bottom-${ props.attributes.paddingXlBottom }` : null,

		props.attributes.paddingXl2Top && props.attributes.paddingXl2Top !== 'inherit' ? `padding-xl2-top-${ props.attributes.paddingXl2Top }` : null,
		props.attributes.paddingXl2Right && props.attributes.paddingXl2Right !== 'inherit'? `padding-xl2-right-${ props.attributes.paddingXl2Right }` : null,
		props.attributes.paddingXl2Left && props.attributes.paddingXl2Left !== 'inherit'? `padding-xl2-left-${ props.attributes.paddingXl2Left }` : null,
		props.attributes.paddingXl2Bottom && props.attributes.paddingXl2Bottom !== 'inherit'? `padding-xl2-bottom-${ props.attributes.paddingXl2Bottom }` : null,
	];
}

export default PaddingOptionsClasses;
