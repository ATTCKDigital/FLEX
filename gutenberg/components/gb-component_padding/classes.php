<?php

namespace FLEX_LAYOUT_SYSTEM\Components\Padding;

function padding_options_classes( $attributes ) {
	$class = '';
	$class .= array_key_exists('paddingTop', $attributes) ? " padding-top-{$attributes['paddingTop']} " : '';
	$class .= array_key_exists('paddingRight', $attributes) ? " padding-right-{$attributes['paddingRight']} " : '';
	$class .= array_key_exists('paddingLeft', $attributes) ? " padding-left-{$attributes['paddingLeft']} " :'';
	$class .= array_key_exists('paddingBottom', $attributes) ? " padding-bottom-{$attributes['paddingBottom']} " :'';
	$class .= array_key_exists('paddingTabletPortraitTop', $attributes) ? " padding-tablet-portrait-top-{$attributes['paddingTabletPortraitTop']} " :'';
	$class .= array_key_exists('paddingTabletPortraitRight', $attributes) ? " padding-tablet-portrait-right-{$attributes['paddingTabletPortraitRight']} " :'';
	$class .= array_key_exists('paddingTabletPortraitLeft', $attributes) ? " padding-tablet-portrait-left-{$attributes['paddingTabletPortraitLeft']} " :'';
	$class .= array_key_exists('paddingTabletPortraitBottom', $attributes) ? " padding-tablet-portrait-bottom-{$attributes['paddingTabletPortraitBottom']} " :'';
	$class .= array_key_exists('paddingTabletLandscapeTop', $attributes) ? " padding-tablet-landscape-top-{$attributes['paddingTabletLandscapeTop']} " :'';
	$class .= array_key_exists('paddingTabletLandscapeRight', $attributes) ? " padding-tablet-landscape-right-{$attributes['paddingTabletLandscapeRight']} " :'';
	$class .= array_key_exists('paddingTabletLandscapeLeft', $attributes) ? " padding-tablet-landscape-left-{$attributes['paddingTabletLandscapeLeft']} " :'';
	$class .= array_key_exists('paddingTabletLandscapeBottom', $attributes) ? " padding-tablet-landscape-bottom-{$attributes['paddingTabletLandscapeBottom']} " :'';
	$class .= array_key_exists('paddingDesktopTop', $attributes) ? " padding-desktop-top-{$attributes['paddingDesktopTop']} " :'';
	$class .= array_key_exists('paddingDesktopRight', $attributes) ? " padding-desktop-right-{$attributes['paddingDesktopRight']} " :'';
	$class .= array_key_exists('paddingDesktopLeft', $attributes) ? " padding-desktop-left-{$attributes['paddingDesktopLeft']} " :'';
	$class .= array_key_exists('paddingDesktopBottom', $attributes) ? " padding-desktop-bottom-{$attributes['paddingDesktopBottom']} " :'';
	return $class;
}
