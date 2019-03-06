<?php

namespace FLEX_LAYOUT_SYSTEM\Components\LogoColor;

function logo_color_options_data_attributes( $attributes ) {
	return array_key_exists('logoColor', $attributes) ? "logo-color-{$attributes['logoColor']}" : '';
}
