<?php
/**
 * Carousel block (flexlayout/image-carousel): registration and server render.
 *
 * A dynamic block (apiVersion 3, metadata from block.json). The markup is
 * built by the small helpers in render/: slides.php resolves the stored
 * attachment IDs, attributes.php the root attributes, markup.php the HTML.
 * The front end is FLEX's component_carousel (`data-component-name="Carousel"`).
 *
 * @package FLEX
 */

namespace FLEX_LAYOUT_SYSTEM\Blocks\ImageCarousel;

require_once __DIR__ . '/render/slides.php';
require_once __DIR__ . '/render/attributes.php';
require_once __DIR__ . '/render/markup.php';

add_action( 'init', __NAMESPACE__ . '\register_image_carousel_block' );

/**
 * Register the dynamic block from block.json.
 *
 * @return void
 */
function register_image_carousel_block() {
	// Only load if Gutenberg is available.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	register_block_type(
		__DIR__ . '/block.json',
		[
			'render_callback' => __NAMESPACE__ . '\render_image_carousel_block',
		]
	);
}

/**
 * Server render.
 *
 * Defaults live in block.json only; every key is read defensively because
 * stored block comments omit keys that are at their default.
 *
 * @param array $attributes Block attributes.
 * @return string '' for 0 valid slides, a static figure for 1, the carousel for 2+.
 */
function render_image_carousel_block( array $attributes ): string {
	$slides = resolve_slides( $attributes );

	switch ( count( $slides ) ) {
		case 0:
			return '';
		case 1:
			return render_single( $attributes, $slides[0] );
		default:
			return render_carousel( $attributes, $slides );
	}
}
