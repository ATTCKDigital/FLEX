<?php
/**
 * Reads dist/<name>.asset.php, written by the child theme's build next to each
 * entry, from the active (child) theme.
 *
 * A missing or invalid manifest falls back to no dependencies and a null version,
 * so the site keeps rendering; with WP_DEBUG on, the problem is logged.
 *
 * @param string $name Entry name, e.g. 'main'.
 * @return array{dependencies: string[], version: string|null}
 */
function flex_get_asset_manifest( $name ) {
	static $manifests = array();

	if ( isset( $manifests[ $name ] ) ) {
		return $manifests[ $name ];
	}

	$file  = get_stylesheet_directory() . "/dist/{$name}.asset.php";
	$asset = is_readable( $file ) ? include $file : null;
	$valid = is_array( $asset )
		&& isset( $asset['dependencies'], $asset['version'] )
		&& is_array( $asset['dependencies'] )
		&& is_string( $asset['version'] );

	if ( ! $valid && defined( 'WP_DEBUG' ) && WP_DEBUG ) {
		error_log( "FLEX: missing or invalid asset manifest {$file}; run the child theme build." );
	}

	$manifests[ $name ] = $valid
		? array(
			'dependencies' => array_values( array_filter( $asset['dependencies'], 'is_string' ) ),
			'version'      => $asset['version'],
		)
		: array(
			'dependencies' => array(),
			'version'      => null,
		);

	return $manifests[ $name ];
}

/**
 * Appends ?ver=<manifest version> to a URL that is not loaded through
 * wp_enqueue_* (TinyMCE editor style, admin color scheme).
 *
 * @param string $url  Asset URL.
 * @param string $name Entry name of its manifest.
 * @return string The URL, versioned when the manifest has a version.
 */
function flex_versioned_asset_url( $url, $name ) {
	$version = flex_get_asset_manifest( $name )['version'];

	return null === $version ? $url : add_query_arg( 'ver', $version, $url );
}

/**
 * Enqueues the theme stylesheets ahead of core and plugin styles (priority 1),
 * matching the cascade of the former hard-coded <link>s in header.php.
 */
function flex_enqueue_theme_styles() {
	$dist_uri = get_stylesheet_directory_uri() . '/dist';

	wp_enqueue_style(
		'flex-style',
		$dist_uri . '/style.css',
		array(),
		flex_get_asset_manifest( 'style' )['version'],
		'screen'
	);

	wp_enqueue_style(
		'flex-print',
		$dist_uri . '/print.css',
		array(),
		flex_get_asset_manifest( 'print' )['version'],
		'print'
	);
}

add_action( 'wp_enqueue_scripts', 'flex_enqueue_theme_styles', 1 );

/**
 * Enqueues our scripts
 */
function _scripts() {
	if (!is_admin()) {
		// Ensure WordPress's jQuery is properly registered and enqueued
		wp_enqueue_script('jquery');
	}

	// Compiled theme js file; dependencies and version come from its build manifest
	$main_asset = flex_get_asset_manifest( 'main' );

	wp_enqueue_script(
		'afp_script',
		get_stylesheet_directory_uri() . "/dist/main.js",
		$main_asset['dependencies'],
		$main_asset['version'],
		true
	);

	wp_enqueue_script(
		'three-js-global',
		get_template_directory_uri() . '/js/three.min.js',
		array(),
		'0.125.0',
		true
	);

	wp_enqueue_script(
		'constellation',
		get_template_directory_uri() . '/js/constellation.js',
		array('three-js-global'),
		'1.0',
		true
	);

	// Load more vars
	wp_localize_script(
		'afp_script',
		'afp_vars',
		array(
			// Create nonce which we later will use to verify AJAX request
			'afp_nonce' => wp_create_nonce('afp_nonce'),
			'afp_ajax_url' => admin_url('admin-ajax.php'),
		)
	);
}

add_action('wp_enqueue_scripts', '_scripts', PHP_INT_MAX);


// Deregister any unneeded plugin scripts here.
function flexlayout_deregister_styles() {
	// Remove CF7 styles
	wp_deregister_style( 'contact-form-7' );
}

add_action('wp_print_styles', 'flexlayout_deregister_styles', 100);

// Allows WYSIWYG to display custom css
function flexlayout_theme_add_editor_styles() {
	add_editor_style( flex_versioned_asset_url( get_stylesheet_directory_uri() . '/dist/wysiwyg.css', 'wysiwyg' ) );
}

add_action( 'admin_init', 'flexlayout_theme_add_editor_styles' );

/**
 * Block editor assets. Only hooked to enqueue_block_editor_assets, never to
 * wp_enqueue_scripts: admin.js depends on the WordPress editor handles its
 * manifest lists (wp-blocks, wp-block-editor, …).
 */
function block_editor_scripts() {
	$admin_asset = flex_get_asset_manifest( 'admin' );
	$dist_uri    = get_stylesheet_directory_uri() . '/dist';

	wp_enqueue_script(
		'block_editor_scripts',
		$dist_uri . '/admin.js',
		$admin_asset['dependencies'],
		$admin_asset['version'],
		true
	);

	wp_enqueue_style(
		'block_editor_styles',
		$dist_uri . '/admin.css',
		array(),
		$admin_asset['version']
	);
}

add_action('enqueue_block_editor_assets', 'block_editor_scripts');

// REMOVE WP EMOJI
// https://www.denisbouquet.com/remove-wordpress-emoji-code/
remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'wp_print_styles', 'print_emoji_styles' );
remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
remove_action( 'admin_print_styles', 'print_emoji_styles' );
