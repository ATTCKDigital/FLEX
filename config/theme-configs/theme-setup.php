<?php 
/**
 * Theme functions and definitions
 *
 * Fires after the theme is loaded.
 *
 * @package WordPress
 * @subpackage _flex
 * @since _flex 3.0
 */
if (!function_exists('flex_theme_setup')) {
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which runs
	 * before the init hook. The init hook is too late for some features.
	 */
	function flex_theme_setup() {
		// Add post thumbnails, RSS feed links
		add_theme_support( 'automatic-feed-links' );
		add_theme_support( 'post-thumbnails' );
		add_theme_support( 'custom-logo' );
		add_theme_support( 'align-wide' );
	}
}

add_action('after_setup_theme', 'flex_theme_setup');
