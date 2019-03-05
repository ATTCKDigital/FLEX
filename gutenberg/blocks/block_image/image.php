<?php
namespace FLEX_LAYOUT_SYSTEM\Blocks\Image;

use const FLEX_LAYOUT_SYSTEM\Components\Margin\MARGIN_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Margin\margin_options_classes;


add_action( 'plugins_loaded', __NAMESPACE__ . '\register_image_block' );
/**
 * Register the dynamic block.
 *
 * @since 2.1.0
 *
 * @return void
 */
function register_image_block() {

	// Only load if Gutenberg is available.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	// Hook server side rendering into render callback
	register_block_type( 'flexls/image', [
		'attributes'      => array_merge(
			[
				'imgURL' => [
					'type' => 'string',
				],
				'imgID' => [
					'type' => 'number',
				],
				'url' => [
					'type' => 'string',
				],
				'caption' => [
					'type' => 'string',
				],
				'className' => [
                    'type' => 'string',
                    'default' => ''
                ],

			],
			MARGIN_OPTIONS_ATTRIBUTES
		),
		'render_callback' => __NAMESPACE__ . '\render_image_block',
	] );

}

/**
 * Server rendering for /blocks/image
 */
function render_image_block($attributes) {
	$class = " {$attributes['className']}";
	$class .= margin_options_classes($attributes);
	$url = array_key_exists('url', $attributes) ? $attributes['url'] : null;
	$caption = array_key_exists('caption', $attributes) ? $attributes['caption'] : null;

	if ($url) {
		$image = '<a href="'.$url.'">'.wp_get_attachment_image($attributes['imgID'], 'full').'</a>';
	} else {
		$image = wp_get_attachment_image($attributes['imgID'], 'full');
	}

	if($caption) {
		$caption = '<figcaption class="caption">'.$caption.'</figcaption>';
	} else {
		$caption = '';
	}
	

	$output = '<div class="component-image component '.$class.'">'.$image.$caption.'</div>';

	return $output;
}
