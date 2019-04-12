<?php 
// Customize the "current" menu item class
// https://gist.github.com/gerbenvandijk/5253921
function flexlayout_nav_active_classes($classes = array(), $menu_item = false) {
	global $post;

	// Get post ID, if nothing found set to NULL
	$id = (isset($post->ID) ? get_the_ID() : NULL );

	// Checking if post ID exist...
	if (isset($id)) {
		$classes[] = ($menu_item->url == get_post_type_archive_link($post->post_type)) ? 'current-menu-item active' : '';
	}

	return $classes;
}

add_filter('nav_menu_css_class', 'flexlayout_nav_active_classes', 10, 2);