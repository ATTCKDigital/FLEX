<?php
namespace FLEX_LAYOUT_SYSTEM\Blocks\Shortcode;

use function FLEX_LAYOUT_SYSTEM\Components\Margin\margin_options_classes;
use function FLEX_LAYOUT_SYSTEM\Components\Border\border_options_classes;
use function FLEX_LAYOUT_SYSTEM\Components\Padding\padding_options_classes;

add_action( 'init', __NAMESPACE__ . '\register_shortcode_block' );

/**
 * Register the dynamic block.
 *
 * @since 2.1.0
 *
 * @return void
 */
function register_shortcode_block() {
	// Only load if Gutenberg is available.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	// Register from block.json (name + attributes); keep the server render callback.
	register_block_type( __DIR__ . '/block.json', [
		'render_callback' => __NAMESPACE__ . '\render_shortcode_block',
	] );
}

/**
 * Server rendering for /blocks/shortcode
 */
function render_shortcode_block($attributes) {
	$class = 'component-shortcode component';
	$class .= ' ' . $attributes['className'];
	$class .= margin_options_classes($attributes);
	$class .= padding_options_classes($attributes);
	$class .= border_options_classes($attributes);

	$output = "<div class=\"{$class}\" >" . do_shortcode($attributes['content']) . "</div>";

	return $output;
}
