<?php
namespace FLEX_LAYOUT_SYSTEM\Blocks\SocialMedia;

use const FLEX_LAYOUT_SYSTEM\Components\Margin\MARGIN_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Margin\margin_options_classes;
use const FLEX_LAYOUT_SYSTEM\Components\Border\BORDER_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Border\border_options_classes;
use const FLEX_LAYOUT_SYSTEM\Components\Padding\PADDING_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Padding\padding_options_classes;
use const FLEX_LAYOUT_SYSTEM\Components\BackgroundColorOptions\BACKGROUND_COLOR_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\BackgroundColorOptions\background_color_options_inline_styles;

add_action( 'init', __NAMESPACE__ . '\register_socialmedia_block' );
/**
 * Register the dynamic block.
 *
 * @since 2.1.0
 *
 * @return void
 */
function register_socialmedia_block() {

	// Only load if Gutenberg is available.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	// Hook server side rendering into render callback
	register_block_type( 'flexls/socialmedia', [
		'attributes'      => array_merge(
			[
				'facebook' => [
					'type' => 'boolean',
					'default' => 'false',
				],
				'twitter' => [
					'type' => 'boolean',
					'default' => 'false',
				],
				'instagram' => [
					'type' => 'boolean',
					'default' => 'false',
				],
				'linkedin' => [
					'type' => 'boolean',
					'default' => 'false',
				],
				'youtube' => [
					'type' => 'boolean',
					'default' => 'false',
				],
				'pinterest' => [
					'type' => 'boolean',
					'default' => 'false',
				],
				'className' => [
                    'type' => 'string',
                    'default' => ''
                ],
                'align' => [
					'type' => 'string',
					'default' => 'center'
				]

			],
			MARGIN_OPTIONS_ATTRIBUTES,
			PADDING_OPTIONS_ATTRIBUTES,
			BORDER_OPTIONS_ATTRIBUTES,
			BACKGROUND_COLOR_OPTIONS_ATTRIBUTES

		),
		'render_callback' => __NAMESPACE__ . '\render_socialmedia_block',
	] );

}

/**
 * Server rendering for /blocks/social-media
 */
function render_socialmedia_block($attributes) {
	$class = " {$attributes['className']}";
	$class .= margin_options_classes($attributes);
	$class .= padding_options_classes($attributes);
	$class .= border_options_classes($attributes);
	$classInner = " align-{$attributes['align']}";
	$style = background_color_options_inline_styles($attributes);

	

	$output = '<div class="component-social-media component '.$class.'" style="'.$style.'"><div class="social-media-list'.$classInner.'"></div></div>';

	return $output;
}

