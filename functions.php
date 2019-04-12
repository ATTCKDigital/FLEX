<?php
if(!defined('WPE_PROD')) {
	define('WPE_PROD', ''); //define the WPEngine environments
}
if(!defined('WPE_STAGE')) {
	define('WPE_STAGE', ''); //define the WPEngine environments
}
define('THEME_DIR', get_template_directory()); // use when there are files that should ONLY be from the parent theme.

// Use locate_template() to include files.  This function first checks the child theme for the file and if there is none, uses the parent theme.
// Allows us to override main functions in the child theme without changing the parent.

/*** Global Variables ***/
// These define globally available variables, and must be included first
include_once(locate_template('config/global-variables/blocks.php')); //REQUIRED
include_once(locate_template('config/global-variables/colors.php')); //REQUIRED
include_once(locate_template('config/global-variables/nav-menus.php')); //REQUIRED
include_once(locate_template('config/global-variables/svg-sprite.php')); //REQUIRED
include_once(locate_template('config/global-variables/date-format.php')); //REQUIRED
include_once(locate_template('config/global-variables/wysiwyg-formats.php')); //REQUIRED

// WP functions are split out into individual files for clarity. Disable/Enable files by commenting out here. See README.md
// for details on each config file

/*** ACF Configs ***/
include_once(locate_template('config/acf-configs/acf-css.php'));  //REQUIRED
include_once(locate_template('config/acf-configs/acf-sync.php')); //REQUIRED
include_once(locate_template('config/acf-configs/acf-options-page.php')); //REQUIRED
include_once(locate_template('config/acf-configs/register-acf-blocks.php')); //REQUIRED

/*** WP-Admin Configs ***/
include_once(locate_template('config/admin-configs/admin-upload-structure.php')); //REQUIRED
include_once(locate_template('config/admin-configs/admin-robots.php')); //REQUIRED
include_once(locate_template('config/admin-configs/admin-env.php')); //REQUIRED
include_once(locate_template('config/admin-configs/admin-theme.php')); //REQUIRED
include_once(locate_template('config/admin-configs/admin-wysiwyg.php')); //REQUIRED
include_once(locate_template('config/admin-configs/custom-excerpts.php')); //REQUIRED
include_once(locate_template('config/admin-configs/embed-wrapper.php')); //REQUIRED
include_once(locate_template('config/admin-configs/svg-uploads.php')); //REQUIRED
include_once(locate_template('config/admin-configs/unwrap-images.php')); //REQUIRED

/*** Theme Configs ***/
include_once(locate_template('config/theme-configs/body-classes.php')); //REQUIRED
include_once(locate_template('config/theme-configs/custom-nav-classes.php')); //REQUIRED
include_once(locate_template('config/theme-configs/customizer-colors.php')); //REQUIRED
include_once(locate_template('config/theme-configs/enable-gutenberg-blocks.php')); //REQUIRED
include_once(locate_template('config/theme-configs/enqueue-scripts-styles.php')); //REQUIRED
include_once(locate_template('config/theme-configs/flex-layout-system.php')); //REQUIRED
include_once(locate_template('config/theme-configs/flexlayout-meta-boxes.php')); //REQUIRED
include_once(locate_template('config/theme-configs/nav-walker.php')); //REQUIRED
include_once(locate_template('config/theme-configs/register-nav-menus.php')); //REQUIRED
include_once(locate_template('config/theme-configs/site-logo.php')); //REQUIRED
include_once(locate_template('config/theme-configs/theme-setup.php')); //REQUIRED
include_once(locate_template('config/theme-configs/Utils.class.php')); //REQUIRED
include_once(locate_template('config/theme-configs/year-shortcode.php')); //REQUIRED
