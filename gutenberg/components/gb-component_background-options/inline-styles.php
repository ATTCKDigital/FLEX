<?php

namespace FLEX_LAYOUT_SYSTEM\Components\BackgroundOptions;

function background_options_inline_styles( $attributes ) {
	$style = '';
	if ( array_key_exists('backgroundType', $attributes) ) {
		$style .= $attributes['backgroundType'] == 'color' && array_key_exists('backgroundColor', $attributes) ? "background-color: {$attributes['backgroundColor']}; " : '';

		$style .= $attributes['backgroundType'] == 'image' && array_key_exists('backgroundSize', $attributes) ? "background-size: {$attributes['backgroundSize']}; " : '';
		$style .= $attributes['backgroundType'] == 'image' && array_key_exists('backgroundRepeat', $attributes) ? "background-repeat: {$attributes['backgroundRepeat']};" : '';
	}

	return $style;
}

function background_options_mobile_styles( $attributes ) {
	$mobileStyle = '';
	if ( array_key_exists('backgroundType', $attributes) ) {
		$mobileStyle .= $attributes['backgroundType'] == 'image' && array_key_exists('backgroundImageMobile', $attributes) ? "background-image: url({$attributes['backgroundImageMobile']['url']});" : '';

	}

	return $mobileStyle;
}

function background_options_desktop_styles( $attributes ) {
	$desktopStyle = '';
	if ( array_key_exists('backgroundType', $attributes) ) {
		$desktopStyle .= $attributes['backgroundType'] == 'image' && array_key_exists('backgroundImage', $attributes) ? "background-image: url({$attributes['backgroundImage']['url']});" : '';

	}

	return $desktopStyle;
}