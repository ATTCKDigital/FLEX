<?php
define('CHILD_THEME_DIR', get_stylesheet_directory());

/*** Global Variables ***/
// These define globally available variables, and must be included first
include_once(CHILD_THEME_DIR . '/config/global-variables/colors.php');
include_once(CHILD_THEME_DIR . '/config/global-variables/nav-menus.php');
include_once(CHILD_THEME_DIR . '/config/global-variables/blocks.php');


// WP functions are split out into individual files for clarity. Disable/Enable files by commenting out here. 
// See README.md in parent theme for details on each config file

/*** ACF Configs ***/
// include_once(CHILD_THEME_DIR . '/config/acf-configs/acf-field-values.php');
// include_once(CHILD_THEME_DIR . '/config/acf-configs/acf-wpml-options.php');
include_once(CHILD_THEME_DIR . '/config/acf-configs/acf-options-page.php'); //REQUIRED
include_once(CHILD_THEME_DIR . '/config/acf-configs/acf-search.php'); //RECOMMENDED

/*** WP-Admin Configs ***/
// include_once(CHILD_THEME_DIR . '/config/admin-configs/change-post-labels.php');
// include_once(CHILD_THEME_DIR . '/config/admin-configs/image-crops.php'); //RECOMMENDED
include_once(CHILD_THEME_DIR . '/config/admin-configs/remove-comments-column.php'); //RECOMMENDED
// include_once(CHILD_THEME_DIR . '/config/admin-configs/sidebarsphp');

/*** Theme Configs ***/
// include_once(CHILD_THEME_DIR . '/config/theme-configs/custom-post-types.php');
// include_once(CHILD_THEME_DIR . '/config/theme-configs/disable-tax-archive.php');
// include_once(CHILD_THEME_DIR . '/config/theme-configs/geotarget.php');
include_once(CHILD_THEME_DIR . '/config/theme-configs/load-more.php'); //RECOMMENDED
// include_once(CHILD_THEME_DIR . '/config/theme-configs/password-protection.php');
// include_once(CHILD_THEME_DIR . '/config/theme-configs/wpml-language-switcher.php');

