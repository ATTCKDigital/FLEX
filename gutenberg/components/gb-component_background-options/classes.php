<?php

namespace FLEX_LAYOUT_SYSTEM\Components\BackgroundOptions;

function background_options_classes( $attributes ) {
	$class = '';

	if ( array_key_exists('backgroundType', $attributes) ) {
		$class .= " component-{$attributes['backgroundType']}-background component-image-background component-background";
	}

	// Apply wide background image class
	$backgroundImageWide = array_key_exists('backgroundImageWide', $attributes);
	if ( $backgroundImageWide && $backgroundImageWide == true ) {
		$class .= " component-image-background-wide";
	}

	if ( array_key_exists('backgroundPositionX', $attributes) && array_key_exists('backgroundPositionY', $attributes) ) {
		$class .= " component-background-{$attributes['backgroundPositionX']}-{$attributes['backgroundPositionY']}";
	}

	return $class;
}
