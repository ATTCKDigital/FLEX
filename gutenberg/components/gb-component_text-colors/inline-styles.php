<?php

namespace FLEX_LAYOUT_SYSTEM\Components\TextColorAttributes;

function text_color_inline_styles( $attributes ) {
	$style = '';
	if ( array_key_exists('backgroundType', $attributes) ) {
		$style .= array_key_exists('textColor', $attributes) ? "color: {$attributes['textColor']};" : '';
	}

	return $style;
}
