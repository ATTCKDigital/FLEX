<?php
/**
 * colorSettingId
 * By generating customizer color settingIds in this way,
 * we ensures that overrides on boilerplate theme color values set in the admin
 * do not carry over to child theme color values, if using instead.
 * @param		Array $color Array with details of color to generate settingId for
 * @return	String Id of Customizer Setting for color
 *
 * Sarah TODO: maybe there's a smarter way to manage this
 * because you now have to use this function any time you use colors from the customizer
 */
function colorSettingId($color) {
	$settingId = $color['slug'];
	if ( !empty($color['theme']) ) {
		$settingId = "{$color['theme']}-{$settingId}";
	}
	return $settingId;
}

/**
 * Adds configurable colors to the Gutenberg customizer
 * See: https://richtabor.com/gutenberg-customizer-colors/
 */

/**
 * Customizer.
 *
 * @param WP_Customize_Manager $wp_customize the Customizer object.
 */
function tabor_customize_register( $wp_customize ) {
	$colors = FLEXLAYOUT_COLORS;

	foreach ($colors as $color) {
		$settingId = colorSettingId($color);

		$wp_customize->add_setting(
			$settingId, array(
				'default'           => $color['default'],
				'sanitize_callback' => 'sanitize_hex_color',
				'transport'         => 'postMessage',
			)
		);
	
		$wp_customize->add_control(
			new WP_Customize_Color_Control(
				$wp_customize, $settingId, array(
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
	// Custom colors for use in the editor.
	// @link https://wordpress.org/gutenberg/handbook/reference/theme-support/
	$colors = FLEXLAYOUT_COLORS;

	$themeColors = array();

	foreach ($colors as $color) {
		$settingId = colorSettingId($color);

		$themeColor = array(
			'name'  => esc_html__( $color['label'], '@@textdomain' ),
			'slug'  => $color['slug'],
			'color' => esc_html( get_theme_mod( $settingId, $color['default'] ) ),
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
 * Builds the customizer colors as CSS custom properties, e.g.
 * `:root { --color-brand-primary: #1d1d1d; }`. Side-effect free.
 *
 * The declarations are printed at runtime (see the hooks below) instead of
 * being compiled into the theme CSS, so a build from a clean checkout is
 * site-neutral and WordPress never writes into the theme directory.
 *
 * @return string CSS declaration block for :root.
 */
function flex_customizer_colors_css() {
	$declarations = '';

	foreach ( FLEXLAYOUT_COLORS as $color ) {
		$value         = esc_attr( get_theme_mod( colorSettingId( $color ), $color['default'] ) );
		$declarations .= " --{$color['slug']}: {$value}; ";
	}

	return wp_strip_all_tags( ':root {' . $declarations . '}' );
}

/**
 * Front end: prints the color custom properties right after the theme
 * stylesheet (<style id="flex-style-inline-css">). Runs after
 * flex_enqueue_theme_styles() (priority 1).
 */
function flex_add_customizer_colors_to_front_end() {
	if ( wp_style_is( 'flex-style', 'enqueued' ) ) {
		wp_add_inline_style( 'flex-style', flex_customizer_colors_css() );
	}
}

add_action( 'wp_enqueue_scripts', 'flex_add_customizer_colors_to_front_end', 20 );

/**
 * Block editor canvas (iframed or not): editor settings styles are injected
 * into the canvas document.
 *
 * @param array $settings Block editor settings.
 * @return array Settings with the color custom properties appended to styles.
 */
function flex_add_customizer_colors_to_editor_settings( $settings ) {
	if ( ! isset( $settings['styles'] ) || ! is_array( $settings['styles'] ) ) {
		$settings['styles'] = array();
	}

	$settings['styles'][] = array( 'css' => flex_customizer_colors_css() );

	return $settings;
}

add_filter( 'block_editor_settings_all', 'flex_add_customizer_colors_to_editor_settings' );

/**
 * Block editor outer frame: dist/admin.css (block_editor_styles) uses the
 * color custom properties too. Runs after block_editor_scripts() (priority 10).
 */
function flex_add_customizer_colors_to_editor_styles() {
	if ( wp_style_is( 'block_editor_styles', 'enqueued' ) ) {
		wp_add_inline_style( 'block_editor_styles', flex_customizer_colors_css() );
	}
}

add_action( 'enqueue_block_editor_assets', 'flex_add_customizer_colors_to_editor_styles', 20 );

/**
 * TinyMCE (classic editor, ACF WYSIWYG fields): dist/wysiwyg.css uses the
 * color custom properties, so they are added to the editor iframe.
 *
 * @param array $init TinyMCE init settings.
 * @return array Settings with the color custom properties in content_style.
 */
function flex_add_customizer_colors_to_tinymce( $init ) {
	$existing              = isset( $init['content_style'] ) ? $init['content_style'] . ' ' : '';
	$init['content_style'] = $existing . flex_customizer_colors_css();

	return $init;
}

add_filter( 'tiny_mce_before_init', 'flex_add_customizer_colors_to_tinymce' );


/**
 * Enqueue theme styles.
 */
function tabor_styles() {
	// Load theme styles.
	wp_enqueue_style( 'tabor-style', get_theme_file_uri( '/style.css' ), false, '@@pkg.version', 'all' );
}

add_action( 'wp_enqueue_scripts', 'tabor_styles' );
