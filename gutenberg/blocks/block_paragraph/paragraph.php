<?php
namespace FLEX_LAYOUT_SYSTEM\Blocks\Paragraph;

use const FLEX_LAYOUT_SYSTEM\Components\Margin\MARGIN_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Margin\margin_options_classes;
use const FLEX_LAYOUT_SYSTEM\Components\Border\BORDER_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Border\border_options_classes;
use const FLEX_LAYOUT_SYSTEM\Components\Padding\PADDING_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Padding\padding_options_classes;
use const FLEX_LAYOUT_SYSTEM\Components\TextColors\TEXT_COLOR_ATTRIBUTES;


add_action( 'init', __NAMESPACE__ . '\register_paragraph_block' );
/**
 * Register the dynamic block.
 *
 * @since 2.1.0
 *
 * @return void
 */
function register_paragraph_block() {

	// Only load if Gutenberg is available.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	// Hook server side rendering into render callback
	register_block_type( 'flexlayout/paragraph', [
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
                'align' => [
					'type' => 'string',
					'default' => 'left'
				],
			],
			MARGIN_OPTIONS_ATTRIBUTES,
			PADDING_OPTIONS_ATTRIBUTES,
			BORDER_OPTIONS_ATTRIBUTES,		
			TEXT_COLOR_ATTRIBUTES

		),
		'render_callback' => __NAMESPACE__ . '\render_paragraph_block',
	] );

}

/**
 * Server rendering for /blocks/paragraph
 */
function render_paragraph_block($attributes) {
	$class = 'component-paragraph component';
	$class .= ' '.$attributes['className'];
	$class .= " align-{$attributes['align']}";
	$class .= margin_options_classes($attributes);
	$class .= padding_options_classes($attributes);
	$class .= border_options_classes($attributes);

	$textColor = array_key_exists('textColor', $attributes) ? $attributes['textColor'] : null;

	if($textColor) {
		$textStyle = ' style="color:'.$textColor.';"';
	} else {
		$textStyle = '';
	}

	$output = "<div class=\"{$class}\"{$textStyle}>{$attributes['content']}</div>";

	return $output;
}
