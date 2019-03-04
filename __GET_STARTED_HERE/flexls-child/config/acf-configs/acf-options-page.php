<?php
// custom settings page, use acf to add necessary fields
if (function_exists('acf_add_options_page')) {
	acf_add_options_page(
		[
			'page_title' => 'Global Settings',
			'menu_title' => 'Global Settings',
			'menu_slug'  => 'theme-global-settings',
			'capability' => 'edit_posts',
			'position'   => '59.9',//right above Appearance
			'redirect'   => false
		]
	);
}

