<?php 
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
 * @since _attck 3.0
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

	}
}
