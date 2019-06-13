<?php
namespace FLEX_LAYOUT_SYSTEM\Blocks\ListBlock;

use const FLEX_LAYOUT_SYSTEM\Components\Margin\MARGIN_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Margin\margin_options_classes;
use const FLEX_LAYOUT_SYSTEM\Components\Border\BORDER_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Border\border_options_classes;
use const FLEX_LAYOUT_SYSTEM\Components\Padding\PADDING_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Padding\padding_options_classes;
use const FLEX_LAYOUT_SYSTEM\Components\TextColors\TEXT_COLOR_ATTRIBUTES;


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

	// Hook server side rendering into render callback
	register_block_type( 'flexlayout/list', [
		'attributes'      => array_merge(
			[
				'content' => [
					'type' => 'string',
                    'default' => '',
				],
				'ordered' => [
					'type' => 'boolean',
                    'default' => false,
				],
				'content' => [
					'type' => 'string',
					'default' => ''
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
		'render_callback' => __NAMESPACE__ . '\render_list_block',
	] );

}

/**
 * Server rendering for /blocks/list
 */
function render_list_block($attributes) {
	$tagName = $attributes['ordered'] ? 'ol' : 'ul';
;
	$class = 'component-list component';
	$class .= ' '.$attributes['className'];
	$class .= " align-{$attributes['align']}";
	$class .= margin_options_classes($attributes);
	$class .= padding_options_classes($attributes);
	$class .= border_options_classes($attributes);

	// if(strpos($attributes['className'], 'numbered') !== false) {
	// 	$element = '<ol>';
	// 	$elementClose = '</ol>';
	// } else {
	// 	$element = '<ul>';
	// 	$elementClose = '</ul>';
	// }

	$textColor = array_key_exists('textColor', $attributes) ? $attributes['textColor'] : null;

	if($textColor) {
		$textStyle = ' style="color:'.$textColor.';"';
	} else {
		$textStyle = '';
	}

	$output = "<div class=\"{$class}\"{$textStyle}><{$tagName}>{$attributes['content']}</{$tagName}></div>";

	return $output;
}
