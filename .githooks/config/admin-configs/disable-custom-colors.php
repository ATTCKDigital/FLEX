<?php
/**
 * Disable the custom color picker.
 * https://richtabor.com/disable-gutenberg-colors/
 */
function tabor_gutenberg_disable_custom_colors() {
  add_theme_support( 'disable-custom-colors' );
}
add_action( 'after_setup_theme', 'tabor_gutenberg_disable_custom_colors' );
