<?php
/**
 * Plugin's bootstrap file to launch the plugin.
 *
 * @package     FLEX_LAYOUT_SYSTEM
 * @author      ATTCK (@attck)
 * @license     GPL2+
 *
 * @wordpress-plugin
 * Plugin Name: Flex Layout System
 * Plugin URI:
 * Description: A plugin to enhance gb editor to create a dynamic flexible layout system.
 * Version:     1.0
 * Author:      Oka Tai-Lee - ATTCK
 * Author URI:
 * Text Domain: fls
 * Domain Path: /languages
 * License:     GPL2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.html
 */

namespace FLEX_LAYOUT_SYSTEM;

//  Exit if accessed directly.
defined('ABSPATH') || exit;

/**
 * Gets this plugin's absolute directory path.
 *
 * @since  2.1.0
 * @ignore
 * @access private
 *
 * @return string
 */
function _get_plugin_directory() {
	return THEME_DIR;
}

/**
 * Gets this plugin's URL.
 *
 * @since  2.1.0
 * @ignore
 * @access private
 *
 * @return string
 */
function _get_plugin_url() {
	static $plugin_url;

	if ( empty( $plugin_url ) ) {
		$plugin_url = plugins_url( null, __FILE__ );
	}

	return $plugin_url;
}

// Components
include THEME_DIR . '/gb-components/gb-component_background-options/attributes.php';
include THEME_DIR . '/gb-components/gb-component_background-options/classes.php';
include THEME_DIR . '/gb-components/gb-component_background-options/inline-styles.php';
include THEME_DIR . '/gb-components/gb-component_background-options/video.php';

include THEME_DIR . '/gb-components/gb-component_columns/attributes.php';
include THEME_DIR . '/gb-components/gb-component_columns/classes.php';

include THEME_DIR . '/gb-components/gb-component_logo-color/attributes.php';
include THEME_DIR . '/gb-components/gb-component_logo-color/data-attributes.php';

include THEME_DIR . '/gb-components/gb-component_margin/attributes.php';
include THEME_DIR . '/gb-components/gb-component_margin/classes.php';

include THEME_DIR . '/gb-components/gb-component_padding/attributes.php';
include THEME_DIR . '/gb-components/gb-component_padding/classes.php';

include THEME_DIR . '/gb-components/gb-component_row-height/attributes.php';
include THEME_DIR . '/gb-components/gb-component_row-height/classes.php';

include THEME_DIR . '/gb-components/gb-component_text-colors/attributes.php';
include THEME_DIR . '/gb-components/gb-component_text-colors/classes.php';

include THEME_DIR . '/gb-components/gb-component_scroller/attributes.php';
include THEME_DIR . '/gb-components/gb-component_scroller/scroller-output.php';

// Dynamic Blocks
include THEME_DIR . '/blocks/block_button/button.php';
include THEME_DIR . '/blocks/block_column/column.php';
include THEME_DIR . '/blocks/block_heading/heading.php';
include THEME_DIR . '/blocks/block_image/image.php';
include THEME_DIR . '/blocks/block_quote/quote.php';
include THEME_DIR . '/blocks/block_row/row.php';
include THEME_DIR . '/blocks/block_source/source.php';
include THEME_DIR . '/blocks/block_text/text.php';
