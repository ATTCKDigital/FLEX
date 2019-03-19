<?php

namespace FLEX_LAYOUT_SYSTEM\Components\Padding;

function padding_options_classes( $attributes ) {
	$class = '';
	$class .= array_key_exists('paddingSmallTop', $attributes) ? " padding-small-top-{$attributes['paddingSmallTop']} " : '';
	$class .= array_key_exists('paddingSmallRight', $attributes) ? " padding-small-right-{$attributes['paddingSmallRight']} " : '';
	$class .= array_key_exists('paddingSmallLeft', $attributes) ? " padding-small-left-{$attributes['paddingSmallLeft']} " :'';
	$class .= array_key_exists('paddingSmallBottom', $attributes) ? " padding-small-bottom-{$attributes['paddingSmallBottom']} " :'';
	$class .= array_key_exists('paddingMediumTop', $attributes) ? " padding-medium-top-{$attributes['paddingMediumTop']} " :'';
	$class .= array_key_exists('paddingMediumRight', $attributes) ? " padding-medium-right-{$attributes['paddingMediumRight']} " :'';
	$class .= array_key_exists('paddingMediumLeft', $attributes) ? " padding-medium-left-{$attributes['paddingMediumLeft']} " :'';
	$class .= array_key_exists('paddingMediumBottom', $attributes) ? " padding-medium-bottom-{$attributes['paddingMediumBottom']} " :'';
	$class .= array_key_exists('paddingLargeTop', $attributes) ? " padding-large-top-{$attributes['paddingLargeTop']} " :'';
	$class .= array_key_exists('paddingLargeRight', $attributes) ? " padding-large-right-{$attributes['paddingLargeRight']} " :'';
	$class .= array_key_exists('paddingLargeLeft', $attributes) ? " padding-large-left-{$attributes['paddingLargeLeft']} " :'';
	$class .= array_key_exists('paddingLargeBottom', $attributes) ? " padding-large-bottom-{$attributes['paddingLargeBottom']} " :'';
	$class .= array_key_exists('paddingXLTop', $attributes) ? " padding-xl-top-{$attributes['paddingXLTop']} " :'';
	$class .= array_key_exists('paddingXLRight', $attributes) ? " padding-xl-right-{$attributes['paddingXLRight']} " :'';
	$class .= array_key_exists('paddingXLLeft', $attributes) ? " padding-xl-left-{$attributes['paddingXLLeft']} " :'';
	$class .= array_key_exists('paddingXLBottom', $attributes) ? " padding-xl-bottom-{$attributes['paddingXLBottom']} " :'';
	return $class;
}
