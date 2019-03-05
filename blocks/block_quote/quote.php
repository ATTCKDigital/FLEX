<?php
namespace FLEX_LAYOUT_SYSTEM\Blocks\Quote;

use const FLEX_LAYOUT_SYSTEM\Components\Margin\MARGIN_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Margin\margin_options_classes;
use const FLEX_LAYOUT_SYSTEM\Components\BackgroundOptions\BACKGROUND_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\BackgroundOptions\background_options_classes;
use function FLEX_LAYOUT_SYSTEM\Components\BackgroundOptions\background_options_inline_styles;
use function FLEX_LAYOUT_SYSTEM\Components\BackgroundOptions\background_options_video_output;


add_action( 'plugins_loaded', __NAMESPACE__ . '\register_quote_block' );
/**
 * Register the dynamic block.
 *
 * @since 2.1.0
 *
 * @return void
 */
function register_quote_block() {

	// Only load if Gutenberg is available.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	// Hook server side rendering into render callback
	register_block_type( 'flexls/quote', [
		'attributes'      => array_merge(
			[
				'content' => [
					'type' => 'string',
					'default' => '',
				],
				'placeholder' => [
					'type' => 'string',
				],
				'contentSource' => [
					'type' => 'string',
					'default' => '',
				],
				'placeholderSource' => [
					'type' => 'string',
				],
				'className' => [
                    'type' => 'string',
                    'default' => '',
                ],
			],
			MARGIN_OPTIONS_ATTRIBUTES,
			BACKGROUND_OPTIONS_ATTRIBUTES

		),
		'render_callback' => __NAMESPACE__ . '\render_quote_block',
	] );

}

/**
 * Server rendering for /blocks/quote
 */
function render_quote_block($attributes) {
	$class = 'component-quote component';
	$class .= ' '.$attributes['className'];
	$class .= margin_options_classes($attributes);
	$class .= background_options_classes($attributes);

	$style = background_options_inline_styles($attributes);

	$output = "<div class=\"{$class}\" style=\"{$style}\"><h5 class=\"quote-text\">{$attributes['content']}</h5><cite class=\"quote-source\">{$attributes['contentSource']}</cite></div>";

	return $output;
}
