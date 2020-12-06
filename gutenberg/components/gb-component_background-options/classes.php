<?php

namespace FLEX_LAYOUT_SYSTEM\Components\BackgroundOptions;

function background_options_classes( $attributes ) {
	$class = '';

	if ( array_key_exists('backgroundType', $attributes) ) {
		$class .= " component-{$attributes['backgroundType']}-background component-background";
	}

	if ( array_key_exists('backgroundPositionX', $attributes) && array_key_exists('backgroundPositionY', $attributes) ) {
		$class .= " component-background-{$attributes['backgroundPositionX']}-{$attributes['backgroundPositionY']}";
	}

	return $class;
}
