<?php
namespace FLEX_LAYOUT_SYSTEM\Components\BackgroundOptions;

function hex_to_rgba( $hex, $opacity ) {
	if ( ! is_string( $hex ) || strpos( $hex, '#' ) !== 0 ) {
		// Not a hex string — just return original value
		return $hex;
	}

	$hex = ltrim( $hex, '#' );

	if ( strlen( $hex ) === 3 ) {
		$r = hexdec( str_repeat( $hex[0], 2 ) );
		$g = hexdec( str_repeat( $hex[1], 2 ) );
		$b = hexdec( str_repeat( $hex[2], 2 ) );
	} elseif ( strlen( $hex ) === 6 ) {
		$r = hexdec( substr( $hex, 0, 2 ) );
		$g = hexdec( substr( $hex, 2, 2 ) );
		$b = hexdec( substr( $hex, 4, 2 ) );
	} else {
		// Fallback: return plain hex color
		return '#' . $hex;
	}

	$alpha = is_numeric( $opacity ) ? max( 0, min( 1, $opacity / 100 ) ) : 1;

	// error_log( print_r( $opacity, true ) );
	// error_log( print_r( $alpha, true ) );

	return "rgba($r, $g, $b, $alpha)";
}

function background_options_inline_styles( $attributes ) {
	$style = ''; // Always initialize

	$bg_type   = isset( $attributes['backgroundType'] ) ? $attributes['backgroundType'] : null;
	$bg_color  = isset( $attributes['backgroundColor'] ) ? $attributes['backgroundColor'] : null;
	$opacity   = isset( $attributes['backgroundOpacity'] ) ? $attributes['backgroundOpacity'] : 100;

	// Even if backgroundType is null/empty, still apply color
	if ( $bg_color && ( $bg_type === 'color' || $bg_type === '' || is_null( $bg_type ) ) ) {
		if ( function_exists( __NAMESPACE__ . '\\hex_to_rgba' ) ) {
			// error_log( 'backgroundColor raw: ' . print_r( $attributes['backgroundColor'], true ) );
			// error_log( 'backgroundOpacity raw: ' . print_r( $attributes['backgroundOpacity'], true ) );

			$style .= 'background-color: ' . hex_to_rgba( $bg_color, $opacity ) . '; ';
		} else {
			$style .= 'background-color: ' . esc_attr( $bg_color ) . '; ';
		}
	}

	// Optional logging
	// error_log( print_r( $attributes, true ) );

	return $style;
}

function background_options_desktop_styles( $attributes ) {
	$desktopStyle = '';

	$bg_type    = $attributes['backgroundType'] ?? '';
	$bg_color   = $attributes['backgroundColor'] ?? null;
	$opacity    = $attributes['backgroundOpacity'] ?? 100;

	if ( $bg_type === 'color' && $bg_color ) {
		if ( function_exists( __NAMESPACE__ . '\\hex_to_rgba' ) ) {
			$desktopStyle .= 'background-color: ' . hex_to_rgba( $bg_color, $opacity ) . '; ';
		} else {
			$desktopStyle .= 'background-color: ' . esc_attr( $bg_color ) . '; ';
		}
	}

	if ( $bg_type === 'image' ) {
		$desktopStyle .= array_key_exists('backgroundImage', $attributes) ? "background-image: url({$attributes['backgroundImage']['url']}); " : 'background-image: inherit;';
		$desktopStyle .= array_key_exists('backgroundSize', $attributes) ? "background-size: {$attributes['backgroundSize']}; " : 'background-size: inherit;';
		$desktopStyle .= array_key_exists('backgroundRepeat', $attributes) ? "background-repeat: {$attributes['backgroundRepeat']}; " : 'background-repeat: inherit;';
		$desktopStyle .= array_key_exists('backgroundPositionX', $attributes) ? "background-position-x: {$attributes['backgroundPositionX']}; " : 'background-position-x: inherit;';
		$desktopStyle .= array_key_exists('backgroundPositionY', $attributes) ? "background-position-y: {$attributes['backgroundPositionY']}; " : 'background-position-y: inherit;';
	}

	return $desktopStyle;
}

function background_options_mobile_styles( $attributes ) {
	$mobileStyle = '';

	$bg_type    = $attributes['backgroundType'] ?? '';
	$bg_color   = $attributes['backgroundColor'] ?? null;
	$opacity    = $attributes['backgroundOpacity'] ?? 100;

	if ( $bg_type === 'color' && $bg_color ) {
		if ( function_exists( __NAMESPACE__ . '\\hex_to_rgba' ) ) {
			$mobileStyle .= 'background-color: ' . hex_to_rgba( $bg_color, $opacity ) . '; ';
		} else {
			$mobileStyle .= 'background-color: ' . esc_attr( $bg_color ) . '; ';
		}
	}

	if ( $bg_type === 'image' ) {
		$mobileStyle .= array_key_exists('backgroundImageMobile', $attributes) ? "background-image: url({$attributes['backgroundImageMobile']['url']}); " : 'background-image: inherit;';
		$mobileStyle .= array_key_exists('backgroundSizeMobile', $attributes) ? "background-size: {$attributes['backgroundSizeMobile']}; " : 'background-size: inherit;';
		$mobileStyle .= array_key_exists('backgroundRepeatMobile', $attributes) ? "background-repeat: {$attributes['backgroundRepeatMobile']}; " : 'background-repeat: inherit;';
		$mobileStyle .= array_key_exists('backgroundPositionXMobile', $attributes) ? "background-position-x: {$attributes['backgroundPositionXMobile']}; " : 'background-position-x: inherit;';
		$mobileStyle .= array_key_exists('backgroundPositionYMobile', $attributes) ? "background-position-y: {$attributes['backgroundPositionYMobile']}; " : 'background-position-y: inherit;';
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
