<?php

// Add predefined colors to the TinyMCE editor
function attck_mce_colors($init) {
	$custom_colours =	'"231f20", "Black",
						"ac574d", "Brick Red",
						"777777", "Dark Gray",
						"e5e5e5", "Gray",
						"ededed", "Light Gray",
						"616161", "Medium Gray",';

	// build colour grid default+custom colors
	$init['textcolor_map'] = '[' . $custom_colours . ']';

	// enable 6th row for custom colours in grid
	$init['textcolor_rows'] = 3;

	return $init;
}
add_filter('tiny_mce_before_init', 'attck_mce_colors');
