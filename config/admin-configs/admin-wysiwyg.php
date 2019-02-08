<?php

// Add global colors to the TinyMCE editor
function flexls_mce_colors($init) {
	$colors = FLEXLS_COLORS;
	$custom_colors = "";
	foreach ($colors as $color) {
		$settingId = colorSettingId($color); // Sarah TODO: function used here is defined in `/config/theme-configs/customizer-colors.php/` - should it be somewhere else??
		$colorValue = ltrim(esc_attr( get_theme_mod($settingId, $color['default']) ), '#');
		$custom_colors .= "\"{$colorValue}\", \"{$color['label']}\",\n";
	}

	// build colour grid default+custom colors
	$init['textcolor_map'] = '[' . $custom_colors . ']';

	// enable 6th row for custom colours in grid
	$init['textcolor_rows'] = 3;

	return $init;
}

add_filter('tiny_mce_before_init', 'flexls_mce_colors');
