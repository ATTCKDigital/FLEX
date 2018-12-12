<?php

/**
 * Customizer.
 *
 * @param WP_Customize_Manager $wp_customize the Customizer object.
 */
function tabor_customize_register( $wp_customize ) {
  $colors = ATTCK_COLORS;
  foreach ($colors as $color) {
    $wp_customize->add_setting(
      $color['slug'], array(
        'default'           => $color['default'],
        'sanitize_callback' => 'sanitize_hex_color',
        'transport'         => 'postMessage',
      )
    );
    $wp_customize->add_control(
      new WP_Customize_Color_Control(
        $wp_customize, $color['slug'], array(
          'label'       => esc_html__( $color['label'], '@@textdomain' ),
          'description' => esc_html__( $color['description'], '@@textdomain' ),
          'section'     => 'colors',
        )
      )
    );
  }
}

add_action( 'customize_register', 'tabor_customize_register', 11 );

/**
 * Advanced Gutenberg block features that require opt-in support in the theme.
 */
function tabor_gutenberg_color_palette() {
  /**
   * Custom colors for use in the editor.
   *
   * @link https://wordpress.org/gutenberg/handbook/reference/theme-support/
   */
  $colors = ATTCK_COLORS;

  $themeColors = array();
  global $colors;
  foreach ($colors as $color) {
    $themeColor = array(
      'name'  => esc_html__( $color['label'], '@@textdomain' ),
      'slug'  => $color['slug'],
      'color' => esc_html( get_theme_mod( $color['slug'], $color['default'] ) ),
    );
    array_push($themeColors, $themeColor);
  }

  add_theme_support(
    'editor-color-palette',
    $themeColors
  );
}

add_action( 'after_setup_theme', 'tabor_gutenberg_color_palette' );

/**
 * Add custom colors to Gutenberg.
 */
function tabor_gutenberg_colors() {
  $colors = ATTCK_COLORS;
  // Build styles.
  $css  = "";
  foreach ($colors as $color) {
    $colorSlug = $color['slug'];
    $colorValue = esc_attr( get_theme_mod($colorSlug, $color['default']) );
    $css .= ":root { --{$colorSlug}: {$colorValue}; }";
    // $css .= ".has-{$colorSlug}-color { color: var(--{$colorSlug}) !important; }";
    // $css .= ".has-{$colorSlug}-background-color { background-color: var(--{$colorSlug}) !important; }";
  }
  return wp_strip_all_tags( $css );
}

/**
 * Enqueue theme styles.
 */
function tabor_styles() {
  // Load theme styles.
  wp_enqueue_style( 'tabor-style', get_theme_file_uri( '/style.css' ), false, '@@pkg.version', 'all' );
  // Add custom colors to the front end.
  wp_add_inline_style( 'tabor-style', tabor_gutenberg_colors() );
}
add_action( 'wp_enqueue_scripts', 'tabor_styles' );
