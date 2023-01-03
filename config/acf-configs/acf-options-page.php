<?php
// Custom settings page, use ACF to add necessary fields
if (function_exists('acf_add_options_page')) {
	// Add global settings in wp-admin settings menu
	acf_add_options_sub_page(array(
		'page_title' 	=> 'Global Settings',
		'menu_title' 	=> 'Global Settings',
		'parent_slug' 	=> 'options-general.php',
	));
}
