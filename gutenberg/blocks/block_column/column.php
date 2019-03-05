<?php
namespace FLEX_LAYOUT_SYSTEM\Blocks\Column;

use const FLEX_LAYOUT_SYSTEM\Components\Columns\COLUMN_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Columns\column_options_classes;

use const FLEX_LAYOUT_SYSTEM\Components\Padding\PADDING_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Padding\padding_options_classes;


add_action( 'plugins_loaded', __NAMESPACE__ . '\register_column_block' );
/**
 * Register the dynamic block.
 *
 * @since 2.1.0
 *
 * @return void
 */
function register_column_block() {

	// Only load if Gutenberg is available.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	// Hook server side rendering into render callback
	register_block_type( 'flexls/column', [
		'attributes'      => array_merge(
			[
				'className' => [
                	'type' => 'string',
                	'default' => '',
            	],
        	],
			COLUMN_OPTIONS_ATTRIBUTES,
			PADDING_OPTIONS_ATTRIBUTES
		),
		'render_callback' => __NAMESPACE__ . '\render_column_block',
	] );

}

/**
 * Server rendering for /blocks/column
 */
function render_column_block($attributes, $content) {
	$class = 'component-column';
	$class .= ' '.$attributes['className'];
	$class .= column_options_classes($attributes);
	$class .= padding_options_classes($attributes);

	$output = "<section class=\"{$class}\" >{$content}</section>";

	return $output;
}
