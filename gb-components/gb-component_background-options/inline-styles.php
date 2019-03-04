<?php

namespace FLEX_LAYOUT_SYSTEM\Components\BackgroundOptions;

function background_options_inline_styles( $attributes ) {
	$style = '';
	if ( array_key_exists('backgroundType', $attributes) ) {
		$style .= $attributes['backgroundType'] == 'color' && array_key_exists('backgroundColor', $attributes) ? "background-color: {$attributes['backgroundColor']};" : '';

		$style .= $attributes['backgroundType'] == 'image' && array_key_exists('backgroundImage', $attributes) ? "background-image: url({$attributes['backgroundImage']['url']});" : '';
	}

	return $style;
}
