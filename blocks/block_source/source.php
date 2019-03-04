<?php
namespace FLEX_LAYOUT_SYSTEM\Blocks\Source;

use const FLEX_LAYOUT_SYSTEM\Components\Margin\MARGIN_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Margin\margin_options_classes;

add_action( 'plugins_loaded', __NAMESPACE__ . '\register_source_block' );
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

	// Hook server side rendering into render callback
	register_block_type( 'flexls/source', [
		'attributes'      => array_merge(
			[
				'content' => [
					'type' => 'string',
					'default' => '',
				],
				'className' => [
                    'type' => 'string',
                ],
			],
			MARGIN_OPTIONS_ATTRIBUTES
		),
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

	$output = "<div class=\"{$class}\" >{$attributes['content']}</section>";

	return $output;
}