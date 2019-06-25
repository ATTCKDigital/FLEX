<?php
namespace FLEX_LAYOUT_SYSTEM\Blocks\AnimatedGif;

use const FLEX_LAYOUT_SYSTEM\Components\Margin\MARGIN_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Margin\margin_options_classes;
use const FLEX_LAYOUT_SYSTEM\Components\Border\BORDER_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Border\border_options_classes;
use const FLEX_LAYOUT_SYSTEM\Components\Padding\PADDING_OPTIONS_ATTRIBUTES;
use function FLEX_LAYOUT_SYSTEM\Components\Padding\padding_options_classes;

add_action( 'init', __NAMESPACE__ . '\register_animated_gif_block' );
/**
 * Register the dynamic block.
 *
 * @since 2.1.0
 *
 * @return void
 */
function register_animated_gif_block() {

	// Only load if Gutenberg is available.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	// Hook server side rendering into render callback
	register_block_type( 'flexlayout/animated-gif', [
		'attributes'      => array_merge(
			[
				'imgURL' => [
					'type' => 'string',
				],
				'imgID' => [
					'type' => 'number',
				],
				'gifURL' => [
					'type' => 'string',
				],
				'gifID' => [
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
                'align' => [
					'type' => 'string',
					'default' => 'center'
				],

			],
			MARGIN_OPTIONS_ATTRIBUTES,
			PADDING_OPTIONS_ATTRIBUTES,
			BORDER_OPTIONS_ATTRIBUTES
		),
		'render_callback' => __NAMESPACE__ . '\render_animated_gif_block',
	] );

}

/**
 * Server rendering for /blocks/image
 */
function render_animated_gif_block($attributes) {
	$class = " {$attributes['className']}";
	$class .= margin_options_classes($attributes);
	$class .= padding_options_classes($attributes);
	$class .= border_options_classes($attributes);
	$classInner = " align-{$attributes['align']}";
	$url = array_key_exists('url', $attributes) ? $attributes['url'] : null;
	$caption = array_key_exists('caption', $attributes) ? $attributes['caption'] : null;
	$imageID = array_key_exists('imgID', $attributes) ? $attributes['imgID'] : null;
	$imageURL = wp_get_attachment_image($imageID, 'full');
	$gifID = array_key_exists('gifID', $attributes) ? $attributes['gifID'] : null;
	$gifURL = wp_get_attachment_image_src($gifID, 'full');

	if ($url) {
		$image = '<a href="'.$url.'">'.$imageURL.'</a>';
	} else {
		$image = $imageURL;
	}

	if($caption) {
		$caption = '<figcaption class="caption">'.$caption.'</figcaption>';
	} else {
		$caption = '';
	}
	

	$output = '<div class="component-animated-gif component '.$class.'" data-component-name="AnimatedGif"><div class="image-wrapper'.$classInner.'" data-gif-src="'.$gifURL[0].'">'.$image.$caption.'</div></div>';

	return $output;
}
