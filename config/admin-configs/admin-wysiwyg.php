<?php

// Add predefined colors to the TinyMCE editor
function attck_mce_colors($init) {
	$colors = ATTCK_COLORS;
	$custom_colors = "";
	foreach ($colors as $color) {
		$colorValue = ltrim(esc_attr( get_theme_mod($color['slug'], $color['default']) ), '#');
		$custom_colors .= "\"{$colorValue}\", \"{$color['label']}\",\n";
	}

	// build colour grid default+custom colors
	$init['textcolor_map'] = '[' . $custom_colors . ']';

	// enable 6th row for custom colours in grid
	$init['textcolor_rows'] = 3;

	return $init;
}

add_filter('tiny_mce_before_init', 'attck_mce_colors');
