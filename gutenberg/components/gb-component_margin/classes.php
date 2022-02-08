<?php

namespace FLEX_LAYOUT_SYSTEM\Components\Margin;

function margin_options_classes( $attributes ) {
	$class = '';
	$class .= array_key_exists('marginTop', $attributes) && $attributes['marginTop'] != 'inherit' ? " margin-top-{$attributes['marginTop']} " : '';
	$class .= array_key_exists('marginRight', $attributes) && $attributes['marginRight'] != 'inherit' ? " margin-right-{$attributes['marginRight']} " : '';
	$class .= array_key_exists('marginLeft', $attributes) && $attributes['marginLeft'] != 'inherit' ? " margin-left-{$attributes['marginLeft']} " :'';
	$class .= array_key_exists('marginBottom', $attributes) && $attributes['marginBottom'] != 'inherit' ? " margin-bottom-{$attributes['marginBottom']} " :'';
	
	$class .= array_key_exists('marginPhoneTop', $attributes) && $attributes['marginPhoneTop'] != 'inherit' ? " margin-phone-top-{$attributes['marginPhoneTop']} " :'';
	$class .= array_key_exists('marginPhoneRight', $attributes) && $attributes['marginPhoneRight'] != 'inherit' ? " margin-phone-right-{$attributes['marginPhoneRight']} " :'';
	$class .= array_key_exists('marginPhoneLeft', $attributes) && $attributes['marginPhoneLeft'] != 'inherit' ? " margin-phone-left-{$attributes['marginPhoneLeft']} " :'';
	$class .= array_key_exists('marginPhoneBottom', $attributes) && $attributes['marginPhoneBottom'] != 'inherit' ? " margin-phone-bottom-{$attributes['marginPhoneBottom']} " :'';
	
	$class .= array_key_exists('marginPhonePlusTop', $attributes) && $attributes['marginPhonePlusTop'] != 'inherit' ? " margin-phone-plus-top-{$attributes['marginPhonePlusTop']} " :'';
	$class .= array_key_exists('marginPhonePlusRight', $attributes) && $attributes['marginPhonePlusRight'] != 'inherit' ? " margin-phone-plus-right-{$attributes['marginPhonePlusRight']} " :'';
	$class .= array_key_exists('marginPhonePlusLeft', $attributes) && $attributes['marginPhonePlusLeft'] != 'inherit' ? " margin-phone-plus-left-{$attributes['marginPhonePlusLeft']} " :'';
	$class .= array_key_exists('marginPhonePlusBottom', $attributes) && $attributes['marginPhonePlusBottom'] != 'inherit' ? " margin-phone-plus-bottom-{$attributes['marginPhonePlusBottom']} " :'';
	
	$class .= array_key_exists('marginTabletPortraitTop', $attributes) && $attributes['marginTabletPortraitTop'] != 'inherit' ? " margin-tablet-portrait-top-{$attributes['marginTabletPortraitTop']} " :'';
	$class .= array_key_exists('marginTabletPortraitRight', $attributes) && $attributes['marginTabletPortraitRight'] != 'inherit' ? " margin-tablet-portrait-right-{$attributes['marginTabletPortraitRight']} " :'';
	$class .= array_key_exists('marginTabletPortraitLeft', $attributes) && $attributes['marginTabletPortraitLeft'] != 'inherit' ? " margin-tablet-portrait-left-{$attributes['marginTabletPortraitLeft']} " :'';
	$class .= array_key_exists('marginTabletPortraitBottom', $attributes) && $attributes['marginTabletPortraitBottom'] != 'inherit' ? " margin-tablet-portrait-bottom-{$attributes['marginTabletPortraitBottom']} " :'';
	
	$class .= array_key_exists('marginTabletLandscapeTop', $attributes) && $attributes['marginTabletLandscapeTop'] != 'inherit' ? " margin-tablet-landscape-top-{$attributes['marginTabletLandscapeTop']} " :'';
	$class .= array_key_exists('marginTabletLandscapeRight', $attributes) && $attributes['marginTabletLandscapeRight'] != 'inherit' ? " margin-tablet-landscape-right-{$attributes['marginTabletLandscapeRight']} " :'';
	$class .= array_key_exists('marginTabletLandscapeLeft', $attributes) && $attributes['marginTabletLandscapeLeft'] != 'inherit' ? " margin-tablet-landscape-left-{$attributes['marginTabletLandscapeLeft']} " :'';
	$class .= array_key_exists('marginTabletLandscapeBottom', $attributes) && $attributes['marginTabletLandscapeBottom'] != 'inherit' ? " margin-tablet-landscape-bottom-{$attributes['marginTabletLandscapeBottom']} " :'';
	
	$class .= array_key_exists('marginDesktopTop', $attributes) && $attributes['marginDesktopTop'] != 'inherit' ? " margin-desktop-top-{$attributes['marginDesktopTop']} " :'';
	$class .= array_key_exists('marginDesktopRight', $attributes) && $attributes['marginDesktopRight'] != 'inherit' ? " margin-desktop-right-{$attributes['marginDesktopRight']} " :'';
	$class .= array_key_exists('marginDesktopLeft', $attributes) && $attributes['marginDesktopLeft'] != 'inherit' ? " margin-desktop-left-{$attributes['marginDesktopLeft']} " :'';
	$class .= array_key_exists('marginDesktopBottom', $attributes) && $attributes['marginDesktopBottom'] != 'inherit' ? " margin-desktop-bottom-{$attributes['marginDesktopBottom']} " :'';
	
	$class .= array_key_exists('marginXlTop', $attributes) && $attributes['marginXlTop'] != 'inherit' ? " margin-desktop-top-{$attributes['marginXlTop']} " :'';
	$class .= array_key_exists('marginXlRight', $attributes) && $attributes['marginXlRight'] != 'inherit' ? " margin-desktop-right-{$attributes['marginXlRight']} " :'';
	$class .= array_key_exists('marginXlLeft', $attributes) && $attributes['marginXlLeft'] != 'inherit' ? " margin-desktop-left-{$attributes['marginXlLeft']} " :'';
	$class .= array_key_exists('marginXlBottom', $attributes) && $attributes['marginXlBottom'] != 'inherit' ? " margin-desktop-bottom-{$attributes['marginXlBottom']} " :'';
	
	$class .= array_key_exists('marginXl2Top', $attributes) && $attributes['marginXl2Top'] != 'inherit' ? " margin-desktop-top-{$attributes['marginXl2Top']} " :'';
	$class .= array_key_exists('marginXl2Right', $attributes) && $attributes['marginXl2Right'] != 'inherit' ? " margin-desktop-right-{$attributes['marginXl2Right']} " :'';
	$class .= array_key_exists('marginXl2Left', $attributes) && $attributes['marginXl2Left'] != 'inherit' ? " margin-desktop-left-{$attributes['marginXl2Left']} " :'';
	$class .= array_key_exists('marginXl2Bottom', $attributes) && $attributes['marginXl2Bottom'] != 'inherit' ? " margin-desktop-bottom-{$attributes['marginXl2Bottom']} " :'';

	return $class;
}
