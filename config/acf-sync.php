<?php
add_filter('acf/settings/save_json', 'my_acf_json_save_point');

function my_acf_json_save_point( $path ) {

    // update path
    $path = get_stylesheet_directory() . '/inc/config/acf-json';


    // return
    return $path;

}

add_filter('acf/settings/load_json', 'my_acf_json_load_point');

function my_acf_json_load_point( $paths ) {

    // remove original path (optional)
    unset($paths[0]);


    // append path
    $paths[] = get_stylesheet_directory() . '/inc/config/acf-json';


    // return
    return $paths;

}

/**
 * Update ACF settings.
 */
function my_acf_init() {
	// Save field changes to database (set to to 'false'). Only for Dev environment
	acf_update_setting('json', true);
}

add_action('acf/init', 'my_acf_init');
