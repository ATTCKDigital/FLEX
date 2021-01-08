<?php
namespace FLEX_LAYOUT_SYSTEM\Components\BackgroundColorOptions;

function background_color_options_inline_styles( $attributes ) {
	$style = '';

	$style .= array_key_exists('backgroundColor', $attributes) ? ";background-color: {$attributes['backgroundColor']}; " : '';

	return $style;
}
