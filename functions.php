<?php
define('THEME_DIR', get_template_directory());

// Most stuff doesn't happen in functions. Separate files out for sanity.
include_once(THEME_DIR . '/inc/config/acf-css.php');
include_once(THEME_DIR . '/inc/config/acf-field-values.php');
include_once(THEME_DIR . '/inc/config/acf-row-names.php');
include_once(THEME_DIR . '/inc/config/conf.php');
include_once(THEME_DIR . '/inc/config/constants.php');
include_once(THEME_DIR . '/inc/config/custom-post-types.php');
include_once(THEME_DIR . '/inc/config/load-more.php');
include_once(THEME_DIR . '/inc/config/nav-walker.php');
include_once(THEME_DIR . '/inc/config/options.php');
include_once(THEME_DIR . '/inc/config/wysiwyg.php');
include_once(THEME_DIR . '/inc/config/acf-sync.php');
include_once(THEME_DIR . '/inc/config/cropper.php');
include_once(THEME_DIR . '/inc/config/search.php');
include_once(THEME_DIR . '/inc/config/language-switcher.php');
include_once(THEME_DIR . '/inc/config/acf-wpml-options.php');
include_once(THEME_DIR . '/inc/config/geotarget.php');



// Generic utilities.
include_once(THEME_DIR . '/inc/classes/Utils.class.php');

/**
 * Theme functions and definitions
 *
 * Sets up the theme and provides some helper functions. Some helper functions
 * are used in the theme as custom template tags. Others are attached to action and
 * filter hooks in WordPress to change core functionality.
 *
 * This needs to stay in the main functions folder, else wp-admin
 * doesn't like it
 *
 * @package WordPress
 * @subpackage _attck
 * @since _attck 0.1
 */
add_action('after_setup_theme', '_theme_setup');

if (!function_exists('_theme_setup')) {
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which runs
	 * before the init hook. The init hook is too late for some features, such as
	 * indicating support post thumbnails.
	 *
	 * @uses add_theme_support() To add support for post thumbnails and automatic feed links.
	 * @uses register_nav_menus() To add support for navigation menus.
	 * @uses add_custom_background() To add support for a custom background.
	 * @uses add_editor_style() To style the visual editor.
	 * @uses load_theme_textdomain() For translation/localization support.
	 * @uses add_custom_image_header() To add support for a custom header.
	 * @uses register_default_headers() To register the default custom header images provided with the theme.
	 * @uses set_post_thumbnail_size() To set a custom post thumbnail size.
	 *
	 */
	function _theme_setup() {
		// Add default posts, and comments RSS feed links, and support for custom menus to head
		add_theme_support('automatic-feed-links');
		add_theme_support('post-thumbnails');
		add_theme_support('menus');
		add_theme_support('theme-options');


		// This theme uses wp_nav_menu() in one location.
		register_nav_menus(array(
			'primary' => __('Primary Navigation', '_attck'),
			'footer' => __('Footer Navigation', '_attck'),
			'footer_secondary' => __('Footer Navigation Secondary', '_attck'),
			'footer_tertiary' => __('Footer Navigation Tertiary', '_attck'),
		));
	}
}

/**
 * Disable WordPress Admin Bar for all users but admins. 
 */
show_admin_bar(false);



/**
 * REMOVE WP EMOJI
 * https://www.denisbouquet.com/remove-wordpress-emoji-code/
 */
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');
remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
remove_action( 'admin_print_styles', 'print_emoji_styles' );

/**
 * Remove WP embedded js
 * https://wordpress.stackexchange.com/questions/211701/what-does-wp-embed-min-js-do-in-wordpress-4-4
 */
function my_deregister_scripts(){
	wp_deregister_script('wp-embed');
}
add_action('wp_footer', 'my_deregister_scripts');
