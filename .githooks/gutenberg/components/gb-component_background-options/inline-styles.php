<?php

namespace FLEX_LAYOUT_SYSTEM\Components\BackgroundOptions;

function background_options_inline_styles( $attributes ) {
	$style = '';
	if ( array_key_exists('backgroundType', $attributes) ) {
		$style .= $attributes['backgroundType'] == 'color' && array_key_exists('backgroundColor', $attributes) ? "background-color: {$attributes['backgroundColor']}; " : '';
	}

	return $style;
}

function background_options_mobile_styles( $attributes ) {
	$mobileStyle = '';
	if ( array_key_exists('backgroundType', $attributes) ) {
		$mobileStyle .= $attributes['backgroundType'] == 'image' && array_key_exists('backgroundImageMobile', $attributes) ? "background-image: url({$attributes['backgroundImageMobile']['url']}); " : '';
		$mobileStyle .= $attributes['backgroundType'] == 'image' && array_key_exists('backgroundSizeMobile', $attributes) ? "background-size: {$attributes['backgroundSizeMobile']}; " : '';
		$mobileStyle .= $attributes['backgroundType'] == 'image' && array_key_exists('backgroundRepeatMobile', $attributes) ? "background-repeat: {$attributes['backgroundRepeatMobile']}; " : '';
		$mobileStyle .= $attributes['backgroundType'] == 'image' && array_key_exists('backgroundPositionXMobile', $attributes) ? "background-position-x: {$attributes['backgroundPositionXMobile']};" : '';
		$mobileStyle .= $attributes['backgroundType'] == 'image' && array_key_exists('backgroundPositionYMobile', $attributes) ? "background-position-y: {$attributes['backgroundPositionYMobile']};" : '';

	}

	return $mobileStyle;
}

function background_options_desktop_styles( $attributes ) {
	$desktopStyle = '';
	if ( array_key_exists('backgroundType', $attributes) ) {
		$desktopStyle .= $attributes['backgroundType'] == 'image' && array_key_exists('backgroundImage', $attributes) ? "background-image: url({$attributes['backgroundImage']['url']}); " : '';
		$desktopStyle .= $attributes['backgroundType'] == 'image' && array_key_exists('backgroundSize', $attributes) ? "background-size: {$attributes['backgroundSize']}; " : '';
		$desktopStyle .= $attributes['backgroundType'] == 'image' && array_key_exists('backgroundRepeat', $attributes) ? "background-repeat: {$attributes['backgroundRepeat']}; " : '';
		$desktopStyle .= $attributes['backgroundType'] == 'image' && array_key_exists('backgroundPositionX', $attributes) ? "background-position-x: {$attributes['backgroundPositionX']}; " : '';
		$desktopStyle .= $attributes['backgroundType'] == 'image' && array_key_exists('backgroundPositionY', $attributes) ? "background-position-y: {$attributes['backgroundPositionY']}; " : '';

	}

	return $desktopStyle;
}