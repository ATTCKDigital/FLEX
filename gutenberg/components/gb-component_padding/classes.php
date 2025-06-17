<?php
namespace FLEX_LAYOUT_SYSTEM\Components\Padding;

function padding_options_classes( $attributes ) {
	$class = '';
	$class .= array_key_exists('paddingTop', $attributes) && $attributes['paddingTop'] != 'inherit' ? " padding-top-{$attributes['paddingTop']} " : '';
	$class .= array_key_exists('paddingRight', $attributes) && $attributes['paddingRight'] != 'inherit' ? " padding-right-{$attributes['paddingRight']} " : '';
	$class .= array_key_exists('paddingLeft', $attributes) && $attributes['paddingLeft'] != 'inherit' ? " padding-left-{$attributes['paddingLeft']} " :'';
	$class .= array_key_exists('paddingBottom', $attributes) && $attributes['paddingBottom'] != 'inherit' ? " padding-bottom-{$attributes['paddingBottom']} " :'';
	
	$class .= array_key_exists('paddingPhoneTop', $attributes) && $attributes['paddingPhoneTop'] != 'inherit' ? " padding-phone-top-{$attributes['paddingPhoneTop']} " :'';
	$class .= array_key_exists('paddingPhoneRight', $attributes) && $attributes['paddingPhoneRight'] != 'inherit' ? " padding-phone-right-{$attributes['paddingPhoneRight']} " :'';
	$class .= array_key_exists('paddingPhoneLeft', $attributes) && $attributes['paddingPhoneLeft'] != 'inherit' ? " padding-phone-left-{$attributes['paddingPhoneLeft']} " :'';
	$class .= array_key_exists('paddingPhoneBottom', $attributes) && $attributes['paddingPhoneBottom'] != 'inherit' ? " padding-phone-bottom-{$attributes['paddingPhoneBottom']} " :'';

	$class .= array_key_exists('paddingPhonePlusTop', $attributes) && $attributes['paddingPhonePlusTop'] != 'inherit' ? " padding-phone-plus-top-{$attributes['paddingPhonePlusTop']} " :'';
	$class .= array_key_exists('paddingPhonePlusRight', $attributes) && $attributes['paddingPhonePlusRight'] != 'inherit' ? " padding-phone-plus-right-{$attributes['paddingPhonePlusRight']} " :'';
	$class .= array_key_exists('paddingPhonePlusLeft', $attributes) && $attributes['paddingPhonePlusLeft'] != 'inherit' ? " padding-phone-plus-left-{$attributes['paddingPhonePlusLeft']} " :'';
	$class .= array_key_exists('paddingPhonePlusBottom', $attributes) && $attributes['paddingPhonePlusBottom'] != 'inherit' ? " padding-phone-plus-bottom-{$attributes['paddingPhonePlusBottom']} " :'';
	
	$class .= array_key_exists('paddingTabletPortraitTop', $attributes) && $attributes['paddingTabletPortraitTop'] != 'inherit' ? " padding-tablet-portrait-top-{$attributes['paddingTabletPortraitTop']} " :'';
	$class .= array_key_exists('paddingTabletPortraitRight', $attributes) && $attributes['paddingTabletPortraitRight'] != 'inherit' ? " padding-tablet-portrait-right-{$attributes['paddingTabletPortraitRight']} " :'';
	$class .= array_key_exists('paddingTabletPortraitLeft', $attributes) && $attributes['paddingTabletPortraitLeft'] != 'inherit' ? " padding-tablet-portrait-left-{$attributes['paddingTabletPortraitLeft']} " :'';
	$class .= array_key_exists('paddingTabletPortraitBottom', $attributes) && $attributes['paddingTabletPortraitBottom'] != 'inherit' ? " padding-tablet-portrait-bottom-{$attributes['paddingTabletPortraitBottom']} " :'';
	
	$class .= array_key_exists('paddingTabletLandscapeTop', $attributes) && $attributes['paddingTabletLandscapeTop'] != 'inherit' ? " padding-tablet-landscape-top-{$attributes['paddingTabletLandscapeTop']} " :'';
	$class .= array_key_exists('paddingTabletLandscapeRight', $attributes) && $attributes['paddingTabletLandscapeRight'] != 'inherit' ? " padding-tablet-landscape-right-{$attributes['paddingTabletLandscapeRight']} " :'';
	$class .= array_key_exists('paddingTabletLandscapeLeft', $attributes) && $attributes['paddingTabletLandscapeLeft'] != 'inherit' ? " padding-tablet-landscape-left-{$attributes['paddingTabletLandscapeLeft']} " :'';
	$class .= array_key_exists('paddingTabletLandscapeBottom', $attributes) && $attributes['paddingTabletLandscapeBottom'] != 'inherit' ? " padding-tablet-landscape-bottom-{$attributes['paddingTabletLandscapeBottom']} " :'';
	
	$class .= array_key_exists('paddingDesktopTop', $attributes) && $attributes['paddingDesktopTop'] != 'inherit' ? " padding-desktop-top-{$attributes['paddingDesktopTop']} " :'';
	$class .= array_key_exists('paddingDesktopRight', $attributes) && $attributes['paddingDesktopRight'] != 'inherit' ? " padding-desktop-right-{$attributes['paddingDesktopRight']} " :'';
	$class .= array_key_exists('paddingDesktopLeft', $attributes) && $attributes['paddingDesktopLeft'] != 'inherit' ? " padding-desktop-left-{$attributes['paddingDesktopLeft']} " :'';
	$class .= array_key_exists('paddingDesktopBottom', $attributes) && $attributes['paddingDesktopBottom'] != 'inherit' ? " padding-desktop-bottom-{$attributes['paddingDesktopBottom']} " :'';

	$class .= array_key_exists('paddingXlTop', $attributes) && $attributes['paddingXlTop'] != 'inherit' ? " padding-xl-top-{$attributes['paddingXlTop']} " :'';
	$class .= array_key_exists('paddingXlRight', $attributes) && $attributes['paddingXlRight'] != 'inherit' ? " padding-xl-right-{$attributes['paddingXlRight']} " :'';
	$class .= array_key_exists('paddingXlLeft', $attributes) && $attributes['paddingXlLeft'] != 'inherit' ? " padding-xl-left-{$attributes['paddingXlLeft']} " :'';
	$class .= array_key_exists('paddingXlBottom', $attributes) && $attributes['paddingXlBottom'] != 'inherit' ? " padding-xl-bottom-{$attributes['paddingXlBottom']} " :'';

	$class .= array_key_exists('paddingXl2Top', $attributes) && $attributes['paddingXl2Top'] != 'inherit' ? " padding-xl2-top-{$attributes['paddingXl2Top']} " :'';
	$class .= array_key_exists('paddingXl2Right', $attributes) && $attributes['paddingXl2Right'] != 'inherit' ? " padding-xl2-right-{$attributes['paddingXl2Right']} " :'';
	$class .= array_key_exists('paddingXl2Left', $attributes) && $attributes['paddingXl2Left'] != 'inherit' ? " padding-xl2-left-{$attributes['paddingXl2Left']} " :'';
	$class .= array_key_exists('paddingXl2Bottom', $attributes) && $attributes['paddingXl2Bottom'] != 'inherit' ? " padding-xl2-bottom-{$attributes['paddingXl2Bottom']} " :'';

	return $class;
}
