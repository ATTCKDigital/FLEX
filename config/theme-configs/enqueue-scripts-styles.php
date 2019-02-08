<?php

// Enqueues our scripts

add_action('wp_enqueue_scripts', '_scripts', PHP_INT_MAX);
function _scripts() {
	if (!is_admin()) {
		//Deregister included jquery. Latest version will be included in main.js
		wp_deregister_script('jquery');
	}

	//Compiled theme js file
	wp_enqueue_script("afp_script", get_template_directory_uri() . "/dist/js/main.js", array(), null, true);

	// Load more vars
	wp_localize_script('afp_script', 'afp_vars', array(
			// Create nonce which we later will use to verify AJAX request
			'afp_nonce' => wp_create_nonce( 'afp_nonce' ),
			'afp_ajax_url' => admin_url( 'admin-ajax.php' ),
		)
	);
}


// Deregister any unneeded plugin scripts here.
add_action('wp_print_styles', 'flexls_deregister_styles', 100);
function flexls_deregister_styles() {
	// Remove CF7 styles
	wp_deregister_style( 'contact-form-7' );
}


// REMOVE WP EMOJI
// https://www.denisbouquet.com/remove-wordpress-emoji-code/
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');
remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
remove_action( 'admin_print_styles', 'print_emoji_styles' );

