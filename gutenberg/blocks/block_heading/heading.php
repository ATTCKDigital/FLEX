<?php
namespace FLEX_LAYOUT_SYSTEM\Blocks\Heading;

use const FLEX_LAYOUT_SYSTEM\Components\Margin\MARGIN_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Margin\margin_options_classes;
use const FLEX_LAYOUT_SYSTEM\Components\TextColors\TEXT_COLOR_ATTRIBUTES;
use const FLEX_LAYOUT_SYSTEM\Components\Border\BORDER_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Border\border_options_classes;
use const FLEX_LAYOUT_SYSTEM\Components\Padding\PADDING_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Padding\padding_options_classes;



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
	register_block_type( 'flexlayout/heading', [
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
				'url' => [
					'type' => 'string',
				],
				'className' => [
                    'type' => 'string',
                    'default' => '',
                ],
			],
			MARGIN_OPTIONS_ATTRIBUTES,
			PADDING_OPTIONS_ATTRIBUTES,
			TEXT_COLOR_ATTRIBUTES,
			BORDER_OPTIONS_ATTRIBUTES
		),
		'render_callback' => __NAMESPACE__ . '\render_heading_block',
	] );

}

/**
 * Server rendering for /blocks/heading
 */
function render_heading_block($attributes) {
	$tagName = "h{$attributes['level']}";

	if($attributes['level'] > 6) {
		$tagName = "h4";
	}

	$headlineClass =  "headline{$attributes['level']}";

	$class = $attributes['className'];
	$class .= $headlineClass;
	$class .= " align-{$attributes['align']}";
	$textColor = array_key_exists('textColor', $attributes) ? $attributes['textColor'] : null;
	
	$wrapperClass = margin_options_classes($attributes);
	$wrapperClass .= padding_options_classes($attributes);
	$wrapperClass .= border_options_classes($attributes);

	if($textColor) {
		$style = ' style="color:'.$textColor.';"';
	} else {
		$style = '';
	}

	$url = array_key_exists('url', $attributes) ? $attributes['url'] : null;
	if($url) {
		$link = '<a href="'.$url.'">';
		$linkClose = '</a>';
	} else {
		$link = '';
		$linkClose = '';
	}

	$output = "<div class=\"component-heading component {$wrapperClass}\"{$style}><{$tagName} class=\"{$class}\">{$link}{$attributes['content']}{$linkClose}</{$tagName}></div>";

	return $output;
}
