<?php 
/**
 * Theme functions and definitions
 *
 * Fires after the theme is loaded.
 *
 * @package WordPress
 * @subpackage _flexls
 * @since _flexls 3.0
 */
add_action('after_setup_theme', 'flexls_theme_setup');

if (!function_exists('flexls_theme_setup')) {
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which runs
	 * before the init hook. The init hook is too late for some features.
	 */
	function flexls_theme_setup() {
		// Add post thumbnails, RSS feed links

		add_theme_support('automatic-feed-links');
		add_theme_support('post-thumbnails');
		add_theme_support( 'custom-logo' );
		add_theme_support( 'align-wide' );
	}
}
