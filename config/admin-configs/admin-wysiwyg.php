<?php

// Add global colors to the TinyMCE editor
function flexlayout_mce_colors($init) {
	$colors = FLEXLAYOUT_COLORS;
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

add_filter('tiny_mce_before_init', 'flexlayout_mce_colors');


function my_mce_buttons( $buttons ) {
   array_unshift( $buttons, 'styleselect' );
   return $buttons;
}
add_filter('mce_buttons', 'my_mce_buttons');

//Add WYSIWYG Formats dropdown styles 
function mce_mod( $init ) {
	$style_formats = FLEXLAYOUT_WYSIWYG;

   
	$init['style_formats'] = json_encode( $style_formats );
	return $init;
}
add_filter('tiny_mce_before_init', 'mce_mod');