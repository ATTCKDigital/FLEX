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

// https://gist.github.com/gerbenvandijk/5253921
function custom_active_item_classes($classes = array(), $menu_item = false) {
	global $post;

	// Get post ID, if nothing found set to NULL
	$id = (isset($post->ID) ? get_the_ID() : NULL );

	// Checking if post ID exist...
	if (isset($id)) {
		$classes[] = ($menu_item->url == get_post_type_archive_link($post->post_type)) ? 'current-menu-item active' : '';
	}

	return $classes;
}

add_filter('nav_menu_css_class', 'custom_active_item_classes', 10, 2);