<?php
namespace FLEX_LAYOUT_SYSTEM\Components\BackgroundOptions;

function background_options_inline_styles( $attributes ) {
	$style = '';

	if ( array_key_exists('backgroundType', $attributes) ) {
		$style .= $attributes['backgroundType'] == 'color' && array_key_exists('backgroundColor', $attributes) ? "background-color: {$attributes['backgroundColor']}; " : 'background-color: inherit;';
	}

	return $style;
}

function background_options_desktop_styles( $attributes ) {
	$desktopStyle = '';

	if ( array_key_exists('backgroundType', $attributes) ) {
		$desktopStyle .= $attributes['backgroundType'] == 'image' && array_key_exists('backgroundImage', $attributes) ? "background-image: url({$attributes['backgroundImage']['url']}); " : 'background-image: inherit;';
		$desktopStyle .= $attributes['backgroundType'] == 'image' && array_key_exists('backgroundSize', $attributes) ? "background-size: {$attributes['backgroundSize']}; " : 'background-size: inherit;';
		$desktopStyle .= $attributes['backgroundType'] == 'image' && array_key_exists('backgroundRepeat', $attributes) ? "background-repeat: {$attributes['backgroundRepeat']}; " : 'background-repeat: inherit;';
		$desktopStyle .= $attributes['backgroundType'] == 'image' && array_key_exists('backgroundPositionX', $attributes) ? "background-position-x: {$attributes['backgroundPositionX']}; " : 'background-position-x: inherit;';
		$desktopStyle .= $attributes['backgroundType'] == 'image' && array_key_exists('backgroundPositionY', $attributes) ? "background-position-y: {$attributes['backgroundPositionY']}; " : 'background-position-y: inherit;';
	}

	return $desktopStyle;
}

function background_options_mobile_styles( $attributes ) {
	$mobileStyle = '';

	if ( array_key_exists('backgroundType', $attributes) ) {
		$mobileStyle .= $attributes['backgroundType'] == 'image' && array_key_exists('backgroundImageMobile', $attributes) ? "background-image: url({$attributes['backgroundImageMobile']['url']}); " : 'background-image: inherit;';
		$mobileStyle .= $attributes['backgroundType'] == 'image' && array_key_exists('backgroundSizeMobile', $attributes) ? "background-size: {$attributes['backgroundSizeMobile']}; " : 'background-size: inherit;';
		$mobileStyle .= $attributes['backgroundType'] == 'image' && array_key_exists('backgroundRepeatMobile', $attributes) ? "background-repeat: {$attributes['backgroundRepeatMobile']}; " : 'background-repeat: inherit;';
		$mobileStyle .= $attributes['backgroundType'] == 'image' && array_key_exists('backgroundPositionXMobile', $attributes) ? "background-position-x: {$attributes['backgroundPositionXMobile']};" : 'background-position-x: inherit;';
		$mobileStyle .= $attributes['backgroundType'] == 'image' && array_key_exists('backgroundPositionYMobile', $attributes) ? "background-position-y: {$attributes['backgroundPositionYMobile']};" : 'background-position-y: inherit;';
	}

	return $mobileStyle;
}

function background_options_background_image_wide_styles( $attributes ) {
	$backgroundImageWideStyle = '';

	if ( array_key_exists('backgroundImageWide', $attributes) && $attributes['backgroundImageWide'] == true ) {
		$backgroundImageWideStyle = ':before';
	}

	return $backgroundImageWideStyle;	
}
