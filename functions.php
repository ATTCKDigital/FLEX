<?php
define('THEME_DIR', get_template_directory()); // use when there are files that should ONLY be from the parent theme.
// Use locate_template() to include files.  This function first checks the child theme for the file and if there is none, uses the parent theme.
// Allows us to override main functions in the child theme without changing the parent.

/*** Global Variables ***/
// These define globally available variables, and must be included first
include_once(locate_template('config/global-variables/colors.php'));
include_once(locate_template('config/global-variables/nav-menus.php'));

// WP functions are split out into individual files for clarity. Disable/Enable files by commenting out here. See README.md
// for details on each config file

/*** ACF Configs ***/
include_once(locate_template('config/acf-configs/acf-css.php'));  //REQUIRED
include_once(locate_template('config/acf-configs/acf-sync.php')); //REQUIRED

/*** WP-Admin Configs ***/
include_once(locate_template('config/admin-configs/admin-wysiwyg.php')); //REQUIRED
include_once(locate_template('config/admin-configs/custom-excerpts.php')); //REQUIRED
include_once(locate_template('config/admin-configs/embed-wrapper.php')); //REQUIRED
include_once(locate_template('config/admin-configs/svg-uploads.php')); //REQUIRED
include_once(locate_template('config/admin-configs/unwrap-images.php')); //REQUIRED

/*** Theme Configs ***/
include_once(locate_template('config/theme-configs/body-classes.php')); //REQUIRED
include_once(locate_template('config/theme-configs/constants.php')); //REQUIRED
include_once(locate_template('config/theme-configs/custom-nav-classes.php')); //REQUIRED
include_once(locate_template('config/theme-configs/customizer-colors.php')); //REQUIRED
include_once(locate_template('config/theme-configs/enqueue-scripts-styles.php')); //REQUIRED
include_once(locate_template('config/theme-configs/enable-gutenberg-blocks.php')); //REQUIRED
include_once(locate_template('config/theme-configs/nav-walker.php')); //REQUIRED
include_once(locate_template('config/theme-configs/register-nav-menus.php')); //REQUIRED
include_once(locate_template('config/theme-configs/theme-setup.php')); //REQUIRED
include_once(locate_template('config/theme-configs/Utils.class.php')); //REQUIRED


