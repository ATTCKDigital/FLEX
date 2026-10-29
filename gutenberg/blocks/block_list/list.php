<?php
namespace FLEX_LAYOUT_SYSTEM\Blocks\ListBlock;

use function FLEX_LAYOUT_SYSTEM\Components\Margin\margin_options_classes;
use function FLEX_LAYOUT_SYSTEM\Components\Border\border_options_classes;
use function FLEX_LAYOUT_SYSTEM\Components\Padding\padding_options_classes;

add_action( 'init', __NAMESPACE__ . '\register_list_block' );

/**
 * Register the dynamic block.
 *
 * @since 2.1.0
 *
 * @return void
 */
function register_list_block() {
	// Only load if Gutenberg is available.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	// Register from block.json (name + attributes); keep the server render callback.
	register_block_type( __DIR__ . '/block.json', [
		'render_callback' => __NAMESPACE__ . '\render_list_block',
	] );
}

/**
 * Server rendering for /blocks/list
 *
 * `content` holds the list items as an HTML string of <li> elements (what the
 * editor's multiline RichText saves).
 */
function render_list_block( $attributes ) {
	$tag_name = ! empty( $attributes['ordered'] ) ? 'ol' : 'ul';
	$align    = ! empty( $attributes['align'] ) ? $attributes['align'] : 'left';

	$class  = 'component-list component';
	$class .= ' align-' . $align;
	$class .= ! empty( $attributes['className'] ) ? ' ' . $attributes['className'] : '';
	$class .= margin_options_classes( $attributes );
	$class .= padding_options_classes( $attributes );
	$class .= border_options_classes( $attributes );

	$style = ! empty( $attributes['textColor'] ) ? ' style="color:' . esc_attr( $attributes['textColor'] ) . ';"' : '';
	$items = isset( $attributes['content'] ) && is_string( $attributes['content'] ) ? $attributes['content'] : '';

	return sprintf(
		'<div class="%1$s"%2$s><%3$s>%4$s</%3$s></div>',
		esc_attr( $class ),
		$style,
		$tag_name,
		wp_kses_post( $items )
	);
}
