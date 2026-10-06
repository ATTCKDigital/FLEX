<?php
namespace FLEX_LAYOUT_SYSTEM\Blocks\Source;

use function FLEX_LAYOUT_SYSTEM\Components\Margin\margin_options_classes;
use function FLEX_LAYOUT_SYSTEM\Components\Border\border_options_classes;
use function FLEX_LAYOUT_SYSTEM\Components\Padding\padding_options_classes;

add_action( 'init', __NAMESPACE__ . '\register_source_block' );

/**
 * Register the dynamic block.
 *
 * @since 2.1.0
 *
 * @return void
 */
function register_source_block() {
	// Only load if Gutenberg is available.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	// Register from block.json (name + attributes); keep the server render callback.
	register_block_type( __DIR__ . '/block.json', [
		'render_callback' => __NAMESPACE__ . '\render_source_block',
	] );
}

/**
 * Server rendering for /blocks/source
 */
function render_source_block($attributes) {
	$class = 'component-source component';
	$class .= ' '.$attributes['className'];
	$class .= margin_options_classes($attributes);
	$class .= padding_options_classes($attributes);
	$class .= border_options_classes($attributes);

	$output = "<div class=\"{$class}\" >{$attributes['content']}</div>";

	return $output;
}
