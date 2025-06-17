<?php
namespace FLEX_LAYOUT_SYSTEM\Components\BackgroundColorOptions;

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

	return "rgba($r, $g, $b, $alpha)";
}

function background_color_options_inline_styles( $attributes ) {
	$style = '';

	if ( array_key_exists( 'backgroundColor', $attributes ) ) {
		$opacity = isset( $attributes['backgroundOpacity'] ) ? $attributes['backgroundOpacity'] : 100;
		$style .= ';background-color: ' . hex_to_rgba( $attributes['backgroundColor'], $opacity ) . '; ';
	}

	return $style;

	// $style .= array_key_exists('backgroundColor', $attributes) ? ";background-color: {$attributes['backgroundColor']}; " : '';
}
