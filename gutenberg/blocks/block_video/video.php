<?php
namespace FLEX_LAYOUT_SYSTEM\Blocks\Video;

use const FLEX_LAYOUT_SYSTEM\Components\Margin\MARGIN_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Margin\margin_options_classes;

use const FLEX_LAYOUT_SYSTEM\Components\Border\BORDER_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Border\border_options_classes;


add_action( 'init', __NAMESPACE__ . '\register_video_block' );
/**
 * Register the dynamic block.
 *
 * @since 2.1.0
 *
 * @return void
 */
function register_video_block() {

	// Only load if Gutenberg is available.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	// Hook server side rendering into render callback
	register_block_type( 'flexls/video', [
		'attributes'      => array_merge(
			[
				'className' => [
                    'type' => 'string',
                    'default' => '',
                ],
               	'backgroundVideo' => [
					'type' => 'object',
				],
                
			],
			MARGIN_OPTIONS_ATTRIBUTES,
			BORDER_OPTIONS_ATTRIBUTES
		),
		'render_callback' => __NAMESPACE__ . '\render_video_block',
	] );

}

/**
 * Server rendering for /blocks/row
 */
function render_video_block($attributes, $content) {
	$class = $attributes['className'];
	$class .= ' component-video component';
	$class .= margin_options_classes($attributes);
	$class .= border_options_classes($attributes);
	$videoId = 'video-'.mt_rand(10,100);

	$video = '';
	if ( array_key_exists('backgroundVideo', $attributes) ) {
		$video = "<video id=\"{$videoId}\"><source type=\"video/mp4\" src=\"{$attributes['backgroundVideo']['url']}\" /></video>";
	}


	$output = "<div class=\"{$class}\" data-component-name=\"Video\"><div class=\"video-wrapper\"><mark class=\"playVideo play\" data-video-id=\"{$videoId}\"></mark><mark class=\"pauseVideo close\" data-video-id=\"{$videoId}\"></mark>{$video}</div></div>";

	return $output;
}
