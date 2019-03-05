<?php
namespace FLEX_LAYOUT_SYSTEM\Blocks\Text;

use const FLEX_LAYOUT_SYSTEM\Components\Margin\MARGIN_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Margin\margin_options_classes;

add_action( 'plugins_loaded', __NAMESPACE__ . '\register_text_block' );
/**
 * Register the dynamic block.
 *
 * @since 2.1.0
 *
 * @return void
 */
function register_text_block() {

	// Only load if Gutenberg is available.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	// Hook server side rendering into render callback
	register_block_type( 'flexls/text', [
		'attributes'      => array_merge(
			[
				'content' => [
					'type' => 'string',
					'default' => '',
				],
				'className' => [
                    'type' => 'string',
                    'default' => '',
                ],
			],
			MARGIN_OPTIONS_ATTRIBUTES
		),
		'render_callback' => __NAMESPACE__ . '\render_text_block',
	] );

}

/**
 * Server rendering for /blocks/text
 */
function render_text_block($attributes) {
	$class = 'component-text component';
	$class .= ' '.$attributes['className'];
	$class .= margin_options_classes($attributes);

	$output = "<div class=\"{$class}\" ><div class=\"body-text\">{$attributes['content']}</div></section>";

	return $output;
}
