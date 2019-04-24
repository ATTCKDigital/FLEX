<?php

namespace FLEX_LAYOUT_SYSTEM\Components\Margin;

function margin_options_classes( $attributes ) {
	$class = '';
	$class .= array_key_exists('marginTop', $attributes) ? " margin-top-{$attributes['marginTop']} " : '';
	$class .= array_key_exists('marginRight', $attributes) ? " margin-right-{$attributes['marginRight']} " : '';
	$class .= array_key_exists('marginLeft', $attributes) ? " margin-left-{$attributes['marginLeft']} " : '';
	$class .= array_key_exists('marginBottom', $attributes) ? " margin-bottom-{$attributes['marginBottom']} " : '';
	$class .= array_key_exists('marginTabletPortraitTop', $attributes) ? " margin-tablet-portrait-top-{$attributes['marginTabletPortraitTop']} " : '';
	$class .= array_key_exists('marginTabletPortraitRight', $attributes) ? " margin-tablet-portrait-right-{$attributes['marginTabletPortraitRight']} " : '';
	$class .= array_key_exists('marginTabletPortraitLeft', $attributes) ? " margin-tablet-portrait-left-{$attributes['marginTabletPortraitLeft']} " : '';
	$class .= array_key_exists('marginTabletPortraitBottom', $attributes) ? " margin-tablet-portrait-bottom-{$attributes['marginTabletPortraitBottom']} " : '';
	$class .= array_key_exists('marginTabletLandscapeTop', $attributes) ? " margin-tablet-landscape-top-{$attributes['marginTabletLandscapeTop']} " : '';
	$class .= array_key_exists('marginTabletLandscapeRight', $attributes) ? " margin-tablet-landscape-right-{$attributes['marginTabletLandscapeRight']} " : '';
	$class .= array_key_exists('marginTabletLandscapeLeft', $attributes) ? " margin-tablet-landscape-left-{$attributes['marginTabletLandscapeLeft']} " : '';
	$class .= array_key_exists('marginTabletLandscapeBottom', $attributes) ? " margin-tablet-landscape-bottom-{$attributes['marginTabletLandscapeBottom']} " : '';
	$class .= array_key_exists('marginDesktopTop', $attributes) ? " margin-desktop-top-{$attributes['marginDesktopTop']} " : '';
	$class .= array_key_exists('marginDesktopRight', $attributes) ? " margin-desktop-right-{$attributes['marginDesktopRight']} " : '';
	$class .= array_key_exists('marginDesktopLeft', $attributes) ? " margin-desktop-left-{$attributes['marginDesktopLeft']} " : '';
	$class .= array_key_exists('marginDesktopBottom', $attributes) ? " margin-desktop-bottom-{$attributes['marginDesktopBottom']} " : '';

	return $class;
}
