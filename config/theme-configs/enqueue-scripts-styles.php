<?php

// Enqueues our scripts

add_action('wp_enqueue_scripts', '_scripts', PHP_INT_MAX);
function _scripts() {
	if (!is_admin()) {
		//Deregister included jquery. Latest version will be included in main.js
		wp_deregister_script('jquery');
		wp_enqueue_script('jquery', "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js", array(), null, true);
	}
	//Compiled theme js file
	wp_enqueue_script('afp_script', get_stylesheet_directory_uri() . "/dist/main.js", array(), null, true);



	// Load more vars
	wp_localize_script('afp_script', 'afp_vars', array(
			// Create nonce which we later will use to verify AJAX request
			'afp_nonce' => wp_create_nonce( 'afp_nonce' ),
			'afp_ajax_url' => admin_url( 'admin-ajax.php' ),
		)
	);
}


// Deregister any unneeded plugin scripts here.
add_action('wp_print_styles', 'flexlayout_deregister_styles', 100);
function flexlayout_deregister_styles() {
	// Remove CF7 styles
	wp_deregister_style( 'contact-form-7' );
}

// Allows WYSIWYG to display custom css
function flexlayout_theme_add_editor_styles() {
    add_editor_style( get_stylesheet_directory_uri().'/dist/wysiwyg.css' );
}
add_action( 'admin_init', 'flexlayout_theme_add_editor_styles' );

// Admin specific styles
function block_editor_scripts() {
	wp_enqueue_script("block_editor_scripts", get_stylesheet_directory_uri(). "/dist/admin.js", array(), null, true);
	wp_enqueue_style('block_editor_styles', get_stylesheet_directory_uri().'/dist/admin.css');
}
add_action('enqueue_block_editor_assets', 'block_editor_scripts');

// REMOVE WP EMOJI
// https://www.denisbouquet.com/remove-wordpress-emoji-code/
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');
remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
remove_action( 'admin_print_styles', 'print_emoji_styles' );
