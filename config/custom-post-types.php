<?php
add_action('init', 'create_post_type');

// Register custom post types and taxonomies here.
function create_post_type() {
	register_taxonomy('press_tag', array('press'),
		array(
			'hierarchical' => false,
			'labels' => array(
				'name' => __('Tags'),
				'singular_name' => __('Tag'),
				'menu_name' => __('Tags'),
				'all_items' => __('All Tags'),
				'edit_item' => __('Edit Tag'),
				'view_item' => __('View Tag'),
				'add_new_item' => __('Add new Tag'),
				'new_item_nme' => __('New Tag'),
				'parent_item' => __('Parent Tag'),
				'parent_item_colon' => __('Parent Tag:'),
				'search_items' => __('Search Tags'),
				'popular_items' => __('Popular Tags'),
				'separate_items_with_commas' => __('Separate Tags with commas'),
				'add_or_remove_items' => __('Add or remove Tags'),
				'choose_from_most_used' => __('Choose from most used Tags'),
				'not_found' => __('No Tags found'),
			),
			'show_ui' => true,
			'show_in_quick_edit' => true,
			'show_admin_column' => true,
			'query_var' => true,
			'show_in_rest' => true,
			'rewrite' => array('slug' => 'press-tag'),
			'has_archive' => false,
		)
	);

	register_post_type('expertise',
		array(
			'labels' => array(
				'name' => __('Expertise'),
				'singular_name' => __('Expertise'),
				'add_new_item' => __('Add new Expertise'),
				'edit_item' => __('Edit Expertise'),
				'new_item' => __('New Expertise'),
				'view_item' => __('View Expertise'),
				'view_items' => __('View Expertise'),
				'search_items' => __('Search Expertise'),
				'not_found' => __('No Expertise found'),
				'not_found_in_trash' => __('No Expertise found in Trash'),
				'archives' => __('Expertise'),
				'attributes' => __('Expertise Attributes'),
				'insert_into_item' => __('Insert into Expertise'),
				'uploaded_to_this_item' => __('Uploaded to this Expertise')
			),
			'hierarchical' => true,
			'public' => true,
			'has_archive' => false,
			'menu_position'=> 30,
			'rewrite' => array('slug' => 'expertise'),
			'supports' => array('title', 'thumbnail', 'author', 'page-attributes'),
			'menu_icon'=> 'dashicons-analytics',
			'exclude_from_search' => false,
			'publicly_queryable'=> true,
			'show_in_nav_menus'=> true,
			'query_var' => true,
		)
	);

	register_post_type('campaigns',
		array(
			'labels' => array(
				'name' => __('Campaigns'),
				'singular_name' => __('Campaign'),
				'add_new_item' => __('Add new Campaign'),
				'edit_item' => __('Edit Campaign'),
				'new_item' => __('New Campaign'),
				'view_item' => __('View Campaign'),
				'view_items' => __('View Campaign'),
				'search_items' => __('Search Campaign'),
				'not_found' => __('No Campaign found'),
				'not_found_in_trash' => __('No Campaign found in Trash'),
				'archives' => __('Campaign'),
				'attributes' => __('Campaign Attributes'),
				'insert_into_item' => __('Insert into Campaign'),
				'uploaded_to_this_item' => __('Uploaded to this Campaign')
			),
			'hierarchical' => false,
			'public' => true,
			'has_archive' => true,
			'menu_position'=> 30,
			'rewrite' => array('slug' => 'campaigns'),
			'supports' => array('title', 'thumbnail', 'author', 'page-attributes', 'excerpt'),
			'menu_icon'=> 'dashicons-megaphone',
			'exclude_from_search' => false,
			'publicly_queryable'=> true,
			'show_in_nav_menus'=> true,
			'query_var' => true,
		)
	);

	register_post_type('challenges',
		array(
			'labels' => array(
				'name' => __('Challenges'),
				'singular_name' => __('Challenge'),
				'add_new_item' => __('Add new Challenge'),
				'edit_item' => __('Edit Challenge'),
				'new_item' => __('New Challenge'),
				'view_item' => __('View Challenge'),
				'view_items' => __('View Challenge'),
				'search_items' => __('Search Challenge'),
				'not_found' => __('No Challenge found'),
				'not_found_in_trash' => __('No Challenge found in Trash'),
				'archives' => __('Challenge'),
				'attributes' => __('Challenge Attributes'),
				'insert_into_item' => __('Insert into Challenge'),
				'uploaded_to_this_item' => __('Uploaded to this Challenge')
			),
			'hierarchical' => false,
			'public' => true,
			'has_archive' => true,
			'menu_position'=> 30,
			'rewrite' => array('slug' => 'challenges'),
			'supports' => array('title', 'thumbnail', 'author', 'page-attributes', 'excerpt'),
			'menu_icon'=> 'dashicons-schedule',
			'exclude_from_search' => false,
			'publicly_queryable'=> true,
			'show_in_nav_menus'=> true,
			'query_var' => true,
		)
	);

	register_post_type('press',
		array(
			'labels' => array(
				'name' => __('Press'),
				'singular_name' => __('Press'),
				'add_new_item' => __('Add new Press'),
				'edit_item' => __('Edit Press'),
				'new_item' => __('New Press'),
				'view_item' => __('View Press'),
				'view_items' => __('View Press'),
				'search_items' => __('Search Press'),
				'not_found' => __('No Press found'),
				'not_found_in_trash' => __('No Press found in Trash'),
				'archives' => __('Press'),
				'attributes' => __('Press Attributes'),
				'insert_into_item' => __('Insert into Press'),
				'uploaded_to_this_item' => __('Uploaded to this Press')
			),
			'hierarchical' => false,
			'public' => true,
			'has_archive' => false,
			'menu_position'=> 30,
			'rewrite' => array('slug' => 'press', "with_front" => true),
			'supports' => array('title', 'thumbnail', 'author', 'editor'),
			'menu_icon'=> 'dashicons-media-text',
			'exclude_from_search' => false,
			'publicly_queryable'=> true,
			'show_in_nav_menus'=> true,
			'query_var' => true,
			'taxonomies' => array('press_tag')
		)
	);


}

/**
* Disable the taxonomy archive pages
* https://jboullion.com/disable-taxonomy-archive/
*/
add_action('pre_get_posts', 'jb_disable_tax_archive');
function jb_disable_tax_archive($qry) {

    if (is_admin()) return;

    if (is_tax('press_tag')){
    	$location = home_url();
        wp_safe_redirect( $location );
		exit;
    }

}

?>
