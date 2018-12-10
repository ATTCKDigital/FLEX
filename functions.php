<?php
define('THEME_DIR', get_template_directory());

// WP functions are split out into individual files for clarity. Disable/Enable files by commenting out here. See README.md 
// for details on each config file

/*** ACF Configs ***/
// include_once(THEME_DIR . '/config/acf-configs/acf-field-values.php');
// include_once(THEME_DIR . '/config/acf-configs/acf-wpml-options.php');
include_once(THEME_DIR . '/config/acf-configs/acf-css.php');
include_once(THEME_DIR . '/config/acf-configs/acf-options-page.php'); //REQUIRED
include_once(THEME_DIR . '/config/acf-configs/acf-row-names.php'); //RECOMMENDED
include_once(THEME_DIR . '/config/acf-configs/acf-search.php'); //RECOMMENDED
include_once(THEME_DIR . '/config/acf-configs/acf-sync.php'); //REQUIRED

/*** WP-Admin Configs ***/
include_once(THEME_DIR . '/config/admin-configs/admin-wysiwyg.php'); //RECOMMENDED
// include_once(THEME_DIR . '/config/admin-configs/change-post-labels.php');
include_once(THEME_DIR . '/config/admin-configs/custom-exceprts.php'); //REQUIRED
include_once(THEME_DIR . '/config/admin-configs/disable-custom-colors.php'); //REQUIRED
include_once(THEME_DIR . '/config/admin-configs/embed-wrapper.php'); //RECOMMENDED
// include_once(THEME_DIR . '/config/admin-configs/image-crops.php'); //RECOMMENDED
include_once(THEME_DIR . '/config/admin-configs/remove-comments-column.php'); //RECOMMENDED
include_once(THEME_DIR . '/config/admin-configs/svg-uploads.php'); //RECOMMENDED
include_once(THEME_DIR . '/config/admin-configs/unwrap-images.php'); //REQUIRED

/*** Theme Configs ***/
include_once(THEME_DIR . '/config/theme-configs/body-classes.php'); //REQUIRED
include_once(THEME_DIR . '/config/theme-configs/constants.php'); //REQUIRED
// include_once(THEME_DIR . '/config/theme-configs/custom-nav-classes.php');
// include_once(THEME_DIR . '/config/theme-configs/custom-post-types.php');
include_once(THEME_DIR . '/config/theme-configs/enqueue-scripts-styles.php'); //REQUIRED
// include_once(THEME_DIR . '/config/theme-configs/disable-tax-archive.php');
// include_once(THEME_DIR . '/config/theme-configs/geotarget.php');
include_once(THEME_DIR . '/config/theme-configs/load-more.php'); //RECOMMENDED
include_once(THEME_DIR . '/config/theme-configs/nav-walker.php'); //RECOMMENDED
// include_once(THEME_DIR . '/config/theme-configs/password-protection.php');
include_once(THEME_DIR . '/config/theme-configs/Utils.class.php'); //REQUIRED
// include_once(THEME_DIR . '/config/theme-configs/wpml-language-switcher.php');


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


		// This theme uses wp_nav_menu(). If additional menus are needed, add to the array below.
		register_nav_menus(array(
			'primary' => __('Primary Navigation', '_attck'),
			'footer' => __('Footer Navigation', '_attck'),
		));
	}
}



