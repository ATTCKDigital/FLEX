<?php
namespace FLEX_LAYOUT_SYSTEM\Components\TextColors;

function text_color_inline_styles( $attributes ) {
	$style = '';
	$style .= array_key_exists('textColor', $attributes) ? ";color: {$attributes['textColor']};" : '';

	return $style;
}
