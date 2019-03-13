<?php
namespace FLEX_LAYOUT_SYSTEM\Blocks\Heading;

use const FLEX_LAYOUT_SYSTEM\Components\Margin\MARGIN_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Margin\margin_options_classes;
use const FLEX_LAYOUT_SYSTEM\Components\TextColors\TEXT_COLOR_ATTRIBUTES;



add_action( 'init', __NAMESPACE__ . '\register_heading_block' );
/**
 * Register the dynamic block.
 *
 * @since 2.1.0
 *
 * @return void
 */
function register_heading_block() {

	// Only load if Gutenberg is available.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	// Hook server side rendering into render callback
	register_block_type( 'flexls/heading', [
		'attributes'      => array_merge(
			[
				'content' => [
					'type' => 'string',
					'default' => '',
				],
				'level' => [
					'type' => 'number',
					'default' => 2,
				],
				'align' => [
					'type' => 'string',
					'default' => 'left'
				],
				'placeholder' => [
					'type' => 'string',
				],
				'className' => [
                    'type' => 'string',
                    'default' => '',
                ],
			],
			MARGIN_OPTIONS_ATTRIBUTES,
			TEXT_COLOR_ATTRIBUTES
		),
		'render_callback' => __NAMESPACE__ . '\render_heading_block',
	] );

}

/**
 * Server rendering for /blocks/heading
 */
function render_heading_block($attributes) {
	$tagName = "h{$attributes['level']}";

	$class = $attributes['className'];
	$class .= " headline{$attributes['level']}";
	$class .= " align-{$attributes['align']}";
	$class .= margin_options_classes($attributes);
	$textColor = array_key_exists('textColor', $attributes) ? $attributes['textColor'] : null;
	
	if($textColor) {
		$style = ' style="color:'.$textColor.';"';
	} else {
		$style = '';
	}


	$output = "<div class=\"component-heading component\"{$style}><{$tagName} class=\"{$class}\">{$attributes['content']}</{$tagName}></div>";

	return $output;
}
