<?php

namespace FLEX_LAYOUT_SYSTEM\Components\Margin;

function margin_options_classes( $attributes ) {
	$class = '';
	$class .= array_key_exists('marginSmallTop', $attributes) ? " margin-small-top-{$attributes['marginSmallTop']} " : '';
	$class .= array_key_exists('marginSmallRight', $attributes) ? " margin-small-right-{$attributes['marginSmallRight']} " : '';
	$class .= array_key_exists('marginSmallLeft', $attributes) ? " margin-small-left-{$attributes['marginSmallLeft']} " : '';
	$class .= array_key_exists('marginSmallBottom', $attributes) ? " margin-small-bottom-{$attributes['marginSmallBottom']} " : '';
	$class .= array_key_exists('marginMediumTop', $attributes) ? " margin-medium-top-{$attributes['marginMediumTop']} " : '';
	$class .= array_key_exists('marginMediumRight', $attributes) ? " margin-medium-right-{$attributes['marginMediumRight']} " : '';
	$class .= array_key_exists('marginMediumLeft', $attributes) ? " margin-medium-left-{$attributes['marginMediumLeft']} " : '';
	$class .= array_key_exists('marginMediumBottom', $attributes) ? " margin-medium-bottom-{$attributes['marginMediumBottom']} " : '';
	$class .= array_key_exists('marginLargeTop', $attributes) ? " margin-large-top-{$attributes['marginLargeTop']} " : '';
	$class .= array_key_exists('marginLargeRight', $attributes) ? " margin-large-right-{$attributes['marginLargeRight']} " : '';
	$class .= array_key_exists('marginLargeLeft', $attributes) ? " margin-large-left-{$attributes['marginLargeLeft']} " : '';
	$class .= array_key_exists('marginLargeBottom', $attributes) ? " margin-large-bottom-{$attributes['marginLargeBottom']} " : '';
	$class .= array_key_exists('marginXLTop', $attributes) ? " margin-xl-top-{$attributes['marginXLTop']} " : '';
	$class .= array_key_exists('marginXLRight', $attributes) ? " margin-xl-right-{$attributes['marginXLRight']} " : '';
	$class .= array_key_exists('marginXLLeft', $attributes) ? " margin-xl-left-{$attributes['marginXLLeft']} " : '';
	$class .= array_key_exists('marginXLBottom', $attributes) ? " margin-xl-bottom-{$attributes['marginXLBottom']} " : '';

	return $class;
}
