<?php
/**
 * Editor canvas stylesheet (FLEX v5.10.0, feature 020).
 *
 * WordPress 7.1+ always renders the post editor's block canvas inside an iframe.
 * Styles reach that iframe through `enqueue_block_assets`, which core fires twice in
 * the block editor:
 *
 * - while collecting the iframe's assets (`_wp_get_iframed_editor_assets()`), with
 *   `wp_should_load_block_editor_scripts_and_styles()` forced to false;
 * - for the outer admin document (`wp_common_block_scripts_and_styles()`), where it
 *   is true.
 *
 * It also fires on the front end, where this stylesheet must never load.
 *
 * The iframe-pass test relies on that core behaviour. Other admin screens that
 * fire the hook (widgets, site editor) also get the sheet; admin-ajax requests
 * such as ACF's block preview fetch do not print styles. The Customizer preview
 * is a front-end request, so nothing loads there.
 *
 * The child theme builds the stylesheet as dist/editor-canvas.css (entry
 * `editor-canvas`); a child that has not built it is unaffected. Editor chrome
 * (dist/admin.css, `block_editor_styles`) stays on `enqueue_block_editor_assets`.
 */

/**
 * Whether the editor-canvas stylesheet also loads in the outer editor document.
 * Needed below WordPress 7.1, where the post editor may render un-iframed
 * (6.x: unless every registered block is apiVersion 3; 7.0: per post).
 *
 * Filter `flex_editor_canvas_in_outer_document` (bool) to force it either way.
 *
 * @return bool
 */
function flex_editor_canvas_in_outer_document() {
	return (bool) apply_filters(
		'flex_editor_canvas_in_outer_document',
		version_compare( get_bloginfo( 'version' ), '7.1-alpha', '<' )
	);
}

/**
 * Enqueues dist/editor-canvas.css for the block-editor canvas: always in the
 * iframe pass, in the outer document only when flex_editor_canvas_in_outer_document().
 * Never on the front end.
 *
 * Filter `flex_editor_canvas_style_dependencies` (string[] $deps, bool $iframe_pass)
 * adds style handles that must load before the canvas sheet, such as a font kit.
 * Handles used in the iframe pass must be registered before it runs (e.g. on `init`).
 *
 * @return bool True when enqueued.
 */
function flex_enqueue_editor_canvas_styles() {
	// Front end: never (enqueue_block_assets also fires on wp_enqueue_scripts).
	if ( ! is_admin() ) {
		return false;
	}

	// True while core collects the editor iframe's assets.
	$iframe_pass = ! wp_should_load_block_editor_scripts_and_styles();

	if ( ! $iframe_pass && ! flex_editor_canvas_in_outer_document() ) {
		return false;
	}

	// A child that has not adopted the editor-canvas entry is unaffected (and not logged).
	if ( ! is_readable( get_stylesheet_directory() . '/dist/editor-canvas.css' ) ) {
		return false;
	}

	$asset = flex_get_asset_manifest( 'editor-canvas' );

	// The manifest helper has already logged a missing or invalid manifest.
	if ( null === $asset['version'] ) {
		return false;
	}

	$dependencies = apply_filters( 'flex_editor_canvas_style_dependencies', array(), $iframe_pass );

	wp_enqueue_style(
		'flex-editor-canvas',
		get_stylesheet_directory_uri() . '/dist/editor-canvas.css',
		array_values( array_filter( (array) $dependencies, 'is_string' ) ),
		$asset['version']
	);

	return true;
}

add_action( 'enqueue_block_assets', 'flex_enqueue_editor_canvas_styles' );
